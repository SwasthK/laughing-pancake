import { auth } from "@/auth";
import {
  generateTeamKey,
  getIdByEmail,
  getProgramIdBySlug,
} from "@/lib/api-helper";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode } from "@/types";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function POST(request: Request) {
  //user ID
  const session = await auth();

  const userId = await getIdByEmail(session?.user?.email as string);

  const requestBodySchema = z.object({
    programSlug: z.string(),
    teamName: z.string(),
  });

  const reqBody: { programSlug: string; teamName: string | null } =
    await request.json();
  const { data: body, success, error } = requestBodySchema.safeParse(reqBody);

  if (!success) {
    return Response.json(
      new ApiError(
        "Invalid request body or missing program slug",
        error.errors
      ),
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }
  const programId = await getProgramIdBySlug(body.programSlug);
  if (!programId) {
    return Response.json(
      new ApiError("Program not found", { programSlug: body.programSlug }),
      {
        status: HttpStatusCode.NotFound,
      }
    );
  }

  try {
    const team = await prisma.team.create({
      data: {
        teamKey: generateTeamKey(body.programSlug),
        teamName: body.teamName,
        programId: programId,
        teamLeaderId: userId,
      },
    });
    if (!team) {
      return Response.json(
        new ApiError("Team not created", { teamName: body.teamName }),
        {
          status: HttpStatusCode.InternalServerError,
        }
      );
    }
    return Response.json(
      new ApiResponse("Team created successfully", team.teamKey),
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(
        new ApiError("you have already created a team", error.message),
        {
          status: HttpStatusCode.Conflict,
        }
      );
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

    return Response.json(new ApiError("Failed to create team", null), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
