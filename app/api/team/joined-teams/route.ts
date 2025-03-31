import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { ApiError, ApiResponse } from "@/lib/response";
import { HttpStatusCode, JoinedTeam } from "@/types";

export async function GET() {
  const session = await auth();
  try {
    const team = await prisma.team.findMany({
      where: {
        Participant: {
          some: {
            userId: session?.user?.id,
          },
        },
      },
      select: {
        teamId: true,
        teamName: true,
        teamKey: true,
        teamLeaderId: true,
        Program: {
          select: {
            programSlug: true,
            Poster: {
              select: {
                title: true,
                eventType: true,
                organizedBy: true,
                description: true,
                image: true,
              },
            },
          },
        },
      },
    });
    console.log(team);
    const teamData: JoinedTeam[] = team.map((team) => ({
      teamId: team.teamId,
      teamName: team.teamName,
      teamKey: team.teamKey,
      teamLeaderId: team.teamLeaderId,
      program: {
        programSlug: team.Program.programSlug,
        title: team.Program.Poster?.title,
        eventType: team.Program.Poster?.eventType,
        organizedBy: team.Program.Poster?.organizedBy,
        description: team.Program.Poster?.description,
        image: team.Program.Poster?.image,
      },
    }));
    return Response.json(new ApiResponse("Registered Teams", teamData), {
      status: HttpStatusCode.OK,
    });
  } catch (err) {
    return Response.json(new ApiError("Internal server error", err), {
      status: HttpStatusCode.InternalServerError,
    });
  }
}
