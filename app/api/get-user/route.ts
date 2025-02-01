//temorary route

import { prisma } from "@/lib/prismaCleint";
import { HttpStatusCode } from "@/types";

export async function GET(request: Request) {
  //featcha the user and their email and format it and return

  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
      },
    });

    const filterData = users.map((user) => ({
      name: user.name,
      roll: Number(user.email.split("@")[0]),
    }));
    return Response.json(
      {
        success: true,
        data: filterData,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
    return Response.json(
      {
        success: false,
        error: "Something went wrong",
      },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
