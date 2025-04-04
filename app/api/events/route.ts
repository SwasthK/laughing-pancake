/*
  API USAGE:
  deparment is optional
  /api/events?type=oldest&limit=12&offset=1&department=bca
  /api/events?type=upcoming&limit=12&offset=1&department=bca

  /api/events?type=trending&limit=12

  //NOTE: for the home page link button
  http://localhost:3000/poster/program-1?autoregister=true
*/

import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { EventList, OrganizedBy, queryType } from "@/types";
import { HttpStatusCode } from "axios";
import { z } from "zod";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const qType = url.searchParams.get("type");
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);
  const offset = parseInt(url.searchParams.get("offset") ?? "1", 10);
  const d = url.searchParams.get("department");

  const {
    success: typeSuccess,
    data: type,
    error: typeError,
  } = z.nativeEnum(queryType).safeParse(qType);
  if (!typeSuccess) {
    console.error("Error::invalid query type", typeError);
    return Response.json(new ApiError("invalid query type", null), {
      status: HttpStatusCode.InternalServerError,
    });
  }
  const {
    success,
    data: department,
    error: departmentError,
  } = z.nativeEnum(OrganizedBy).nullable().safeParse(d);
  if (!success) {
    console.error("Error::invalid department", departmentError);
    return Response.json(new ApiError("invalid department", null), {
      status: HttpStatusCode.InternalServerError,
    });
  }
  if (type === queryType.oldest) {
    const { formattedData, err } = await fetchOldest(
      limit,
      limit * (offset - 1),
      department,
      true,
    );
    if (err != null) {
      return Response.json(new ApiError("Internal server error", err), {
        status: HttpStatusCode.InternalServerError,
      });
    }
    return Response.json(
      new ApiResponse(
        `${limit} oldest events fetched for page ${offset}`,
        formattedData,
      ),
      {
        status: HttpStatusCode.Ok,
      },
    );
  } else if (type === queryType.upcoming) {
    const { formattedData, err } = await fetchUpcomingFest(
      limit,
      limit * (offset - 1),
      department,
      true,
    );
    if (err != null) {
      return Response.json(new ApiError("Internal server error", err), {
        status: HttpStatusCode.InternalServerError,
      });
    }
    return Response.json(
      new ApiResponse(
        `${limit} upcoming events fetched for page ${offset}`,
        formattedData,
      ),
      {
        status: HttpStatusCode.Ok,
      },
    );
  } else if (type == queryType.trending) {
    const { formattedData, err } = await fetchTrending(limit);
    if (err != null) {
      return Response.json(new ApiError("Internal server error", err), {
        status: HttpStatusCode.InternalServerError,
      });
    }
    return Response.json(
      new ApiResponse(
        `${limit} trending events fetched for page ${offset}`,
        formattedData,
      ),
      {
        status: HttpStatusCode.Ok,
      },
    );
  }

  const { formattedData, err } = await fetchAll(
    limit,
    limit * (offset - 1),
    department,
    true,
  );
  if (err != null) {
    return Response.json(new ApiError("Internal server error", err), {
      status: HttpStatusCode.InternalServerError,
    });
  }
  return Response.json(
    new ApiResponse(
      `${limit} trending events fetched for page ${offset}`,
      formattedData,
    ),
    {
      status: HttpStatusCode.Ok,
    },
  );
}

async function fetchOldest(
  limit: number,
  offset: number,
  department: OrganizedBy | null,
  asc: boolean,
) {
  try {
    const data = await prisma.program.findMany({
      where: {
        Poster: {
          date: {
            lt: new Date(Date.now()),
          },
          ...(department && department != OrganizedBy.All
            ? { organizedBy: department }
            : {}),
        },
      },
      select: {
        programSlug: true,
        Poster: {
          select: {
            title: true,
            image: true,
            eventType: true,
            organizedBy: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        Poster: {
          endDate: asc ? "asc" : "desc",
        },
      },
    });

    const formattedData: EventList[] = data.map((item) => {
      return {
        programSlug: item.programSlug,
        title: item.Poster?.title ?? "",
        image: item.Poster?.image ?? "",
        eventType: item.Poster?.eventType ?? "",
        organizedBy: item.Poster?.organizedBy ?? "",
      };
    });
    return { formattedData, err: null };
  } catch (err) {
    console.error(err);
    return { formattedData: null, err };
  }
}

async function fetchUpcomingFest(
  limit: number,
  offset: number,
  department: OrganizedBy | null,
  asc: boolean,
) {
  try {
    const data = await prisma.program.findMany({
      where: {
        Poster: {
          date: {
            gt: new Date(Date.now()),
          },
          ...(department && department != OrganizedBy.All
            ? { organizedBy: department }
            : {}),
        },
      },
      select: {
        programSlug: true,
        Poster: {
          select: {
            title: true,
            image: true,
            eventType: true,
            organizedBy: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        Poster: {
          endDate: asc ? "asc" : "desc",
        },
      },
    });
    const formattedData: EventList[] = data.map((item) => {
      return {
        programSlug: item.programSlug,
        title: item.Poster?.title ?? "",
        image: item.Poster?.image ?? "",
        eventType: item.Poster?.eventType ?? "",
        organizedBy: item.Poster?.organizedBy ?? "",
      };
    });
    return { formattedData, err: null };
  } catch (err) {
    console.error(err);
    return { formattedData: null, err };
  }
}

async function fetchAll(
  limit: number,
  offset: number,
  department: OrganizedBy | null,
  asc: boolean,
) {
  try {
    const data = await prisma.program.findMany({
      where: {
        Poster: {
          ...(department && department != OrganizedBy.All
            ? { organizedBy: department }
            : {}),
        },
      },
      select: {
        programSlug: true,
        Poster: {
          select: {
            title: true,
            image: true,
            eventType: true,
            organizedBy: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        Poster: {
          endDate: asc ? "asc" : "desc",
        },
      },
    });
    const formattedData: EventList[] = data.map((item) => {
      return {
        programSlug: item.programSlug,
        title: item.Poster?.title ?? "",
        image: item.Poster?.image ?? "",
        eventType: item.Poster?.eventType ?? "",
        organizedBy: item.Poster?.organizedBy ?? "",
      };
    });
    return { formattedData, err: null };
  } catch (err) {
    console.error(err);
    return { formattedData: null, err };
  }
}

async function fetchTrending(limit: number) {
  const recentTimeWinodw = new Date();
  recentTimeWinodw.setHours(recentTimeWinodw.getHours() - 24 * 7);
  try {
    const d = await prisma.program.findMany({
      select: {
        programSlug: true,
        Poster: {
          select: {
            title: true,
            image: true,
            eventType: true,
            organizedBy: true,
          },
        },
        Event: {
          select: {
            Participant: true,
            _count: {
              select: {
                Participant: {
                  where: {
                    createdAt: {
                      gte: recentTimeWinodw,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const e = d.map((item) => {
      const recentRegistaion = item.Event.reduce((sum, event) => {
        return sum + event._count.Participant;
      }, 0);
      const totalRegistration = item.Event.reduce((sum, event) => {
        return sum + event.Participant.length;
      }, 0);
      // console.log(
      //   `recentregistaion:${recentRegistaion} and total registraion ${totalRegistration} for event ${item.programSlug}`,
      // );
      let score;
      if (totalRegistration > 0) {
        score = (recentRegistaion / totalRegistration) * totalRegistration;
      } else {
        score = -1;
      }
      return {
        ...item,
        score,
      };
    });

    // console.log(
    //   e
    //     .sort((a, b) => b.score - a.score)
    //     .map((item) => {
    //       return {
    //         slug: item.programSlug,
    //         score: item.score,
    //       };
    //     }),
    // );

    const formattedData: EventList[] = e
      .sort((a, b) => b.score - a.score)
      .map((item) => {
        return {
          programSlug: item.programSlug,
          title: item.Poster?.title ?? "",
          image: item.Poster?.image ?? "",
          eventType: item.Poster?.eventType ?? "",
          organizedBy: item.Poster?.organizedBy ?? "",
        };
      })
      .slice(0, limit);
    return { formattedData, err: null };
  } catch (err) {
    console.error(err);
    return { formattedData: null, err };
  }
}
