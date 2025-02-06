import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { HttpStatusCode } from "@/types";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function POST(request: Request) {
  //user ID
  const session = await auth();

  //(optional check) if session expired
  if (session?.expires && new Date(session.expires).getTime() <= Date.now()) {
    return Response.json(
      {
        success: false,
        error: "Session expired",
      },
      {
        status: HttpStatusCode.Unauthorized,
      }
    );
  }

  const requestBodySchema = z.object({
    teamKey: z.string(),
  });

  const reqBody: { teamKey: string } = await request.json();
  const { data: body, success } = requestBodySchema.safeParse(reqBody);

  if (!success) {
    return Response.json(
      {
        success: false,
        error: "missing teamkey",
      },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  try {
    const team = await prisma.team.findFirst({
      where: {
        teamKey: body.teamKey,
      },
    });
    if (!team) {
      return Response.json(
        {
          success: false,
          error: "Team not found",
        },
        {
          status: HttpStatusCode.NotFound,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Team found",
        data: team.teamKey,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(
        {
          success: false,
          error: "Team not found",
          details: error.message,
        },
        {
          status: HttpStatusCode.NotFound,
        }
      );
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

    return Response.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
