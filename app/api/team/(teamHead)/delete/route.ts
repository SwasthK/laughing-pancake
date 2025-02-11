import { auth } from "@/auth";
import { getIdByEmail } from "@/lib/api-helper";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode } from "@/types";
import { Prisma } from "@prisma/client";
import { z } from "zod";

//body: teamKey
export async function POST(request: Request) {
  //user ID
  const session = await auth();

  const userId = await getIdByEmail(session?.user?.email as string);

  const requestBodySchema = z.object({
    teamKey: z.string(),
  });

  const reqBody: { programSlug: string } = await request.json();
  const { data: body, success } = requestBodySchema.safeParse(reqBody);

  if (!success) {
    return Response.json(
      new ApiError("Invalid request body or missing team Key"),
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  try {
    const team = await prisma.team.delete({
      where: {
        teamKey: body.teamKey,
        teamLeaderId: userId,
      },
      select: {
        teamId: true,
      },
    });

    return Response.json(new ApiResponse("Team deleted", team.teamId), {
      status: HttpStatusCode.OK,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(new ApiError("Team not deleted", error.message), {
        status: HttpStatusCode.NotFound,
      });
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

    return Response.json(new ApiError("Unexpected error occurred"), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
