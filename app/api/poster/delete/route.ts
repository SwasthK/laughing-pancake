import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode, ProgramDeleteBody } from "@/types";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  //user ID
  const session = await auth();
  const userId = session?.user?.id as string;

  const body: ProgramDeleteBody = await request.json();
  if (!body || !body.programSlug) {
    return Response.json(new ApiError("Program Slug is missing", null), {
      status: HttpStatusCode.BadRequest,
    });
  }

  try {
    const res = await prisma.program.delete({
      where: {
        programSlug: body.programSlug,
        creadtedByUserID: userId,
      },
    });
    return Response.json(new ApiResponse("Program deleted successfully", res), {
      status: HttpStatusCode.OK,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(
        new ApiError(
          error.code === "P2025"
            ? "Program not found"
            : "Internal Server Error",
          error.meta,
        ),
        {
          status: HttpStatusCode.NotFound,
        },
      );
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

    return Response.json(new ApiError("Internal Server Error", null), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
