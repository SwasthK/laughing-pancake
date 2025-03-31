import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode, MyProgram } from "@/types";

export async function GET() {
  const session = await auth();
  //
  try {
    const programs: MyProgram[] = await prisma.program.findMany({
      where: {
        creadtedByUserID: session?.user?.id,
      },
      select: {
        programId: true,
        programSlug: true,
        Poster: {
          select: {
            image: true,
            title: true,
            organizedBy: true,
            eventType: true,
            date: true,
          },
        },
      },
    });
    return Response.json(
      new ApiResponse<MyProgram[]>("My events fetched", programs),
      {
        status: HttpStatusCode.OK,
      },
    );
  } catch (err) {
    return Response.json(new ApiError("Internal server error", err), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
