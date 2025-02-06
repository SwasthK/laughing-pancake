import { auth } from "@/auth";
import { getIdByEmail } from "@/lib/api-helper";
import { prisma } from "@/lib/prismaCleint";
import { HttpStatusCode } from "@/types";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const body: {
    eventId: string;
    teamKey: string;
  } = await request.json();

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
  const userEmail = session?.user?.email as string;

  //replace this with zod
  if (!body.eventId || !body.teamKey) {
    return Response.json(
      {
        success: false,
        error: "Event ID or Team ID not found",
      },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }
  //   if (!params.programSlug) {
  //     return Response.json(
  //       {
  //         success: false,
  //         error: "Program slug not found",
  //       },
  //       {
  //         status: HttpStatusCode.BadRequest,
  //       }
  //     );
  //   }

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
    const userId = await getIdByEmail(userEmail);

    const findParticipant = await prisma.participant.findFirst({
      where: {
        eventId: body.eventId,
        userId: userId,
        teamId: team.teamId,
      },
    });

    if (!findParticipant) {
      return Response.json(
        {
          success: false,
          error: "Participant not found",
        },
        {
          status: HttpStatusCode.NotFound,
        }
      );
    }

    const participant = await prisma.participant.delete({
      where: {
        participantId: findParticipant.participantId,
      },
    });
    if (!participant) {
      return Response.json(
        {
          success: false,
          error: "Failed to register",
        },
        {
          status: HttpStatusCode.InternalServerError,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Unregistraion successful",
        data: participant,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("DBError:", error.stack);
      return Response.json(
        {
          success: false,
          error: "Failed to unregister",
          detail: error.message,
        },
        {
          status: HttpStatusCode.InternalServerError,
        }
      );
    }
    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("unexpected error ocured");
  }
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
