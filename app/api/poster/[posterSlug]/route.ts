import { prisma } from "@/lib/prismaCleint";
import { HttpStatusCode } from "@/types";
import { Poster } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { posterSlug: string } }
) {
  const posterSlug = (await params).posterSlug;
  if (!posterSlug) {
    return Response.json(
      {
        success: false,
        error: "No poster slug provided",
      },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  try {
    const poster = await prisma.poster.findFirst({
      where: {
        Program: {
          programSlug: posterSlug,
        },
      },
      select: {
        title: true,
        image: true,
        eventType: true,
        organizedBy: true,
        date: true,
        time: true,
        venue: true,
        brochure: true,
        description: true,
        contact: true,
        endDate: true,
        link: true,
      },
    });

    if (!poster) {
      return Response.json(
        {
          success: false,
          error: "Poster not found",
        },
        {
          status: HttpStatusCode.NotFound,
        }
      );
    }
    const formattedEvent: Poster = {
      ...poster,
      time: poster.time.getHours() + ":" + poster.time.getMinutes(),
      date: poster.date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
      endDate: poster.endDate
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
    };
    return Response.json({
      sucess: true,
      data: formattedEvent,
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error("Unknown error");

    return Response.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
