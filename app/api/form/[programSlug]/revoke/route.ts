import { auth } from "@/auth";
import { getIdByEmail } from "@/lib/api-helper";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode } from "@/types";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function POST(request: Request) {
  const body: {
    eventId: string;
    teamKey: string;
  } = await request.json();

  const session = await auth();
  const userId = session?.user?.id as string;

  const RequestCredSchema = z.object({
    eventId: z
      .string({ message: "event Id missing" })
      .min(1, { message: "event Id missing" }),
    teamKey: z.string({ message: "teamKey is missing" }).min(1, {
      message: "teamKey is missing",
    }),
  });

  const parseResult = RequestCredSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json(
      new ApiError(
        parseResult.error.errors[0].message,
        parseResult.error.errors
      ),
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
      return Response.json(new ApiError("Team not found", null), {
        status: HttpStatusCode.NotFound,
      });
    }

    const findParticipant = await prisma.participant.findFirst({
      where: {
        eventId: body.eventId,
        userId: userId,
        teamId: team.teamId,
      },
    });

    if (!findParticipant) {
      return Response.json(new ApiError("Participant not found", null), {
        status: HttpStatusCode.NotFound,
      });
    }

    const participant = await prisma.participant.delete({
      where: {
        participantId: findParticipant.participantId,
      },
    });
    if (!participant) {
      return Response.json(new ApiError("Failed to unregister", null), {
        status: HttpStatusCode.InternalServerError,
      });
    }

    return Response.json(
      new ApiResponse("Unregistraion successful", participant),
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("DBError:", error.stack);
      return Response.json(
        new ApiError("Failed to unregister", error.message),
        {
          status: HttpStatusCode.InternalServerError,
        }
      );
    }
    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("unexpected error ocured");
  }
  return Response.json(new ApiError("Internal Server Error", null), {
    status: HttpStatusCode.InternalServerError,
  });
}
