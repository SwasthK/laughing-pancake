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

  //if there is two pariticpatns on same event

  try {
    const noOfParitipants = await prisma.event.findFirst({
      where: {
        eventId: body.eventId,
      },
      select: {
        _count: {
          select: {
            Participant: {
              where: {
                Team: {
                  teamKey: body.teamKey,
                },
              },
            },
          },
        },
        participants: true,
      },
    });
    if (
      noOfParitipants?._count?.Participant !== undefined &&
      noOfParitipants._count.Participant >= noOfParitipants.participants
    ) {
      return Response.json(
        {
          success: false,
          error: "Event is full",
        },
        {
          status: HttpStatusCode.BadRequest,
        }
      );
    }
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

    const participant = await prisma.participant.create({
      data: {
        teamId: team.teamId,
        eventId: body.eventId,
        userId: userId,
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
        message: "Registration successful",
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
          error: "Failed to register",
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
