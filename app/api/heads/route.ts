//temorary route

import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode, userList } from "@/types";

export async function GET(request: Request) {
  // Fetch the user and their email and format it and return
  const param = new URL(request.url).searchParams;
  const query = param.get("query")!;
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
      },
      where: {
        email: {
          startsWith: query,
        },
      },
    });

    const filterData: userList[] = users.map((user) => ({
      name: user.name,
      roll: Number(user.email.split("@")[0]),
    }));
    //format the data
    return Response.json(
      new ApiResponse<userList[]>(
        "Fetched the events for the team",
        filterData
      ),
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (error instanceof Error) console.error(error.stack);
    return Response.json(new ApiError("Internal Server Error", null), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
