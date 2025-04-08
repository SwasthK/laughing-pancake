import { auth } from "@/auth";
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
        parseResult.error.errors,
      ),
      {
        status: HttpStatusCode.BadRequest,
      },
    );
  }

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
      return Response.json(new ApiError("Maximum participants reached", null), {
        status: HttpStatusCode.BadRequest,
      });
    }
    const team = await prisma.team.findFirst({
      where: {
        teamKey: body.teamKey,
      },
    });

    if (!team) {
      return Response.json(new ApiError("No team found", null), {
        status: HttpStatusCode.NotFound,
      });
    }
    const userId = session?.user?.id as string;
    const participant = await prisma.participant.create({
      data: {
        teamId: team.teamId,
        eventId: body.eventId,
        userId: userId,
      },
    });
    if (!participant) {
      return Response.json(new ApiError("Failed to register", null), {
        status: HttpStatusCode.InternalServerError,
      });
    }

    return Response.json(
      new ApiResponse("Registration successful", participant),
      {
        status: HttpStatusCode.OK,
      },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("DBError:", error.code);
      if (error.code === "P2002") {
        return Response.json(
          new ApiError("Already registered to other event", error.meta),
          {
            status: HttpStatusCode.BadRequest,
          },
        );
      }
      return Response.json(new ApiError("Failed to register", error.message), {
        status: HttpStatusCode.InternalServerError,
      });
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
    },
  );
}
