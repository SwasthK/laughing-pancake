import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode } from "@/types";
import { Poster } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  requst: NextRequest,
  { params }: { params: Promise<{ posterSlug: string }> },
) {
  const posterSlug = (await params).posterSlug;
  if (!posterSlug) {
    return Response.json(new ApiError("Invalid poster slug"), {
      status: HttpStatusCode.BadRequest,
    });
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
      return Response.json(new ApiError("Poster not found"), {
        status: HttpStatusCode.NotFound,
      });
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
    return Response.json(
      new ApiResponse("Poster fetched successfully", formattedEvent),
      {
        status: HttpStatusCode.OK,
      },
    );
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error("Unknown error");

    return Response.json(new ApiError("Internal server error"), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
