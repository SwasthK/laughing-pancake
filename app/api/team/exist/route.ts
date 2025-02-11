import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode } from "@/types";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function POST(request: Request) {
  //user ID

  const requestBodySchema = z.object({
    teamKey: z.string(),
  });

  const reqBody: { teamKey: string } = await request.json();
  const { data: body, success } = requestBodySchema.safeParse(reqBody);

  if (!success) {
    return Response.json(new ApiError("missing teamkey"), {
      status: HttpStatusCode.BadRequest,
    });
  }
  try {
    const team = await prisma.team.findFirst({
      where: {
        teamKey: body.teamKey,
      },
    });
    if (!team) {
      return Response.json(
        new ApiError("Team not found", { teamKey: body.teamKey }),
        {
          status: HttpStatusCode.NotFound,
        }
      );
    }
    return Response.json(new ApiResponse("Team found", team.teamKey), {
      status: HttpStatusCode.OK,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(
        new ApiError("Internal Server Error", error.message),
        {
          status: HttpStatusCode.InternalServerError,
        }
      );
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

    return Response.json(
      new ApiError("Internal Server Error", "An unexpected error occurred"),
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
