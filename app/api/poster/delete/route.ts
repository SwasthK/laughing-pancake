import { auth } from "@/auth";
import { getIdByEmail } from "@/lib/api-helper";
import { prisma } from "@/lib/prismaCleint";
import { HttpStatusCode, ProgramDeleteBody } from "@/types";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  //user ID
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
  const userId = await getIdByEmail(session?.user?.email as string);
  const body: ProgramDeleteBody = await request.json();
  if (!body || !body.programSlug) {
    return Response.json(
      {
        success: false,
        error: "Invalid request body or missing program slug",
      },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  try {
    const res = await prisma.program.delete({
      where: {
        programSlug: body.programSlug,
        creadtedByUserID: userId,
      },
    });
    return Response.json(
      {
        success: true,
        message: "Program deleted successfully",
        data: res.programSlug,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(
        {
          success: false,
          error: "Program not found",
          details: error.message,
        },
        {
          status: HttpStatusCode.NotFound,
        }
      );
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

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
}
