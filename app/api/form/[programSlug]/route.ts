import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { FormattedEvent, HttpStatusCode } from "@/types";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ programSlug: string }> },
) {
  const programSlug = (await params).programSlug;
  const { searchParams } = new URL(request.url);

  const teamKey = searchParams.get("teamKey");
  const RequestcredSchema = z.object({
    teamKey: z.string().min(5, { message: "teamkey is requred" }),
    programSlug: z.string().min(2, { message: "program slug required" }),
  });

  const result = RequestcredSchema.safeParse({ teamKey, programSlug });
  if (!result.success) {
    return Response.json(
      new ApiError(result.error.errors[0].message, result.error.errors),
      {
        status: HttpStatusCode.BadRequest,
      },
    );
  }

  let team;

  try {
    team = await prisma.team.findFirst({
      where: {
        teamKey: result.data.teamKey,
        Program: {
          programSlug: result.data.programSlug,
        },
      },
    });

    if (!team) {
      return Response.json(new ApiError("No team found", null), {
        status: HttpStatusCode.NotFound,
      });
    }
  } catch (error) {
    if (error instanceof Error) console.error(error);
    else console.error("Error in fetching team");
    return Response.json(new ApiError("Internal Server Error", null), {
      status: HttpStatusCode.InternalServerError,
    });
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
                teamId: team.teamId,
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
      return Response.json(new ApiError("No event found for the team", null), {
        status: HttpStatusCode.NotFound,
      });
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
      new ApiResponse("Fetched the events for the team", formattedData),
      {
        status: HttpStatusCode.OK,
      },
    );
  } catch (error) {
    if (error instanceof Error) console.error(error);
    else console.error("Error in fetching team");
    return Response.json(new ApiError("Internal Server Error", null), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
