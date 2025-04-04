import { prisma } from "@/lib/prismaCleint";
import { HttpStatusCode } from "@/types";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    const param = new URL(request.url).searchParams;
    const email = param.get("email");
    if (!email) {
        return Response.json(
            {
                success: false,
                error: "Invalid Credentials",
            },
            {
                status: HttpStatusCode.BadRequest,
            }
        );
    }

    try {
        const result = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                name: true,
                bio: true,
                image: true,
                Program: true
            }
        });

        return Response.json(
            {
                success: true,
                message: "Profile Fetched Successfully",
                data: {
                    name: result?.name,
                    email,
                    bio: result?.bio,
                    image: result?.image
                },
            },
            {
                status: HttpStatusCode.OK,
            }
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("DBError stack:", error.stack);

            return Response.json(
                {
                    success: false,
                    error: "Error occurred while fetching profile details",
                    details: error.message,
                },
                {
                    status: HttpStatusCode.InternalServerError,
                }
            );
        }

        if (error instanceof Error) console.error("Error:", error.stack);
        else console.error("Error: Unexpected error occurred");

        return Response.json(
            {
                success: false,
                error: "Error occurred while fetching profile details",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            {
                status: HttpStatusCode.InternalServerError,
            }
        );
    }
}
