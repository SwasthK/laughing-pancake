import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { FormattedEvent, HttpStatusCode } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { programSlug: string } }
) {
  try {
    const programSlug = params.programSlug;
    const { searchParams } = new URL(request.url);

    //check for user session
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

    //validate the team id
    const teamId = searchParams.get("teamId");
    // const teamKey = searchParams.get("teamKey");   //disabled for now
    if (!teamId) {
      return Response.json(
        {
          success: false,
          error: "Team ID is not present",
        },
        {
          status: HttpStatusCode.BadRequest,
        }
      );
    }

    try {
      const team = await prisma.team.findFirst({
        where: {
          teamId,
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
    } catch (error) {
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

    try {
      const res = await prisma.program.findFirst({
        where: {
          programSlug: programSlug,
        },
        select: {
          Event: {
            select: {
              eventId: true,
              name: true,
              caption: true,
              participants: true,
              EventHead: {
                select: {
                  User: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                },
              },
              Participant: {
                where: {
                  teamId,
                },
                select: {
                  User: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      //just in case
      if (!res) {
        return Response.json(
          {
            success: false,
            error: "No data found",
          },
          {
            status: HttpStatusCode.NotFound,
          }
        );
      }

      const formattedData: FormattedEvent[] = res.Event.map((event) => {
        return {
          eventId: event.eventId,
          title: event.name,
          caption: event.caption,
          teamSize: event.participants,
          Participants: event.Participant.map((participant) => ({
            name: participant.User.name,
            email: participant.User.email,
          })),
          EventHead: event.EventHead.map((head) => ({
            name: head.User.name,
            email: head.User.email,
          })),
        };
      });

      //format the data
      return Response.json(
        {
          success: true,
          message: `Event form fetched successfullyf for ${teamId}`,
          data: formattedData,
        },
        {
          status: HttpStatusCode.OK,
        }
      );
    } catch (error) {}

    return Response.json({
      programSlug,
      teamId,
    });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}
