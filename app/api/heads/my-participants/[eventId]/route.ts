import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode, TeamForEvent } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const session = await auth();
  const eventId = (await params).eventId;

  try {
    const isEventHead = await prisma.eventHead.findFirst({
      where: {
        eventId: eventId,
        userId: session?.user?.id,
      },
    });
    if (!isEventHead) {
      return Response.json(
        new ApiError("You are not event head of this event to see this data"),
        {
          status: HttpStatusCode.Unauthorized,
        },
      );
    }

    const teamsWithParticipants = await prisma.team.findMany({
      where: {
        Participant: {
          some: {
            eventId: eventId, // Filter by the specific event
          },
        },
      },
      select: {
        teamId: true,
        teamKey: true, // Unique team identifier
        Participant: {
          select: {
            userId: true,
            User: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return Response.json(
      new ApiResponse<TeamForEvent[]>(
        "fethed the participants details",
        teamsWithParticipants,
      ),
      {
        status: HttpStatusCode.OK,
      },
    );
  } catch (error) {
    if (error instanceof Error) console.error(error.stack);
    return Response.json(new ApiError("Internal Server Error", error), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
