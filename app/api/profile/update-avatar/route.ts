import { auth } from "@/auth";
import { prisma } from "@/lib/prismaCleint";
import { HttpStatusCode } from "@/types";
import { avatarUrlSchema } from "@/zod";
import { zodHandler } from "@/zod/resolve";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function PUT(request: Request) {
  const body: { url: z.infer<typeof avatarUrlSchema> } = await request.json();

  const session = await auth();
  const userId = session?.user?.id as string;

  const { error } = zodHandler(body.url, avatarUrlSchema);
  if (error) {
    return Response.json(
      {
        success: false,
        error,
      },
      {
        status: HttpStatusCode.NotFound,
      },
    );
  }

  try {
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: body.url,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Profile Image Updated Successfuly",
        data: {
          image: result.image,
        },
      },
      {
        status: HttpStatusCode.OK,
      },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("DBError stack:", error.stack);

      return Response.json(
        {
          success: false,
          error: "Error occurred during profile image update",
          details: error.message,
        },
        {
          status: HttpStatusCode.InternalServerError,
        },
      );
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

    return Response.json(
      {
        success: false,
        error: "Error occurred during profile image update",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: HttpStatusCode.InternalServerError,
      },
    );
  }
}
