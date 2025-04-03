import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HeadsEvent, HttpStatusCode } from "@/types";

export async function GET() {
  const session = await auth();

  try {
    const programs = await prisma.eventHead.findMany({
      where: {
        userId: session?.user?.id,
      },
      select: {
        Event: {
          select: {
            name: true,
            eventId: true,
            caption: true,
            Program: {
              select: {
                programSlug: true,
                Poster: {
                  select: {
                    title: true,
                    image: true,
                    organizedBy: true,
                    eventType: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formatttedData: HeadsEvent[] = programs.map((item) => {
      return {
        eventName: item.Event.name,
        eventId: item.Event.eventId,
        eventCaption: item.Event.caption,
        programSlug: item.Event.Program.programSlug,
        programTitle: item.Event.Program.Poster?.title,
        programImage: item.Event.Program.Poster?.image,
        programOrganizedBy: item.Event.Program.Poster?.organizedBy,
        ProgrameType: item.Event.Program.Poster?.eventType,
      };
    });

    return Response.json(
      new ApiResponse<HeadsEvent[]>(
        "Fetched events that is you are head of",
        formatttedData,
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
