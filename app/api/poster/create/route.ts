import { prisma } from "@/lib/prismaCleint"; //actual client
import { Prisma } from "@prisma/client"; //for error handling
import slugify from "slugify";
import { FormType, HttpStatusCode, NormalizedFormData } from "@/types";
import { auth } from "@/auth";
import { getIdByEmail, getIdByRollNumber } from "@/lib/api-helper";

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

  const body: NormalizedFormData = await request.json();

  //validate body
  //TODO: check with zod
  if (!body || !body.poster || !body.poster.title) {
    return Response.json(
      {
        success: false,
        error: "Invalid request body or missing poster data",
      },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  //slug ( need to make more optimized)
  const slugTitle = slugify(body.poster.title);

  try {
    const result = await prisma.$transaction(async (tx) => {
      //1.Create a Program
      const programData = await tx.program.create({
        data: {
          programSlug: slugTitle, //need to slugify
          creadtedByUserID: userId, //need to get current user
        },
      });
      console.log("program created");

      //2.Create an Event (if INTERNAL FORM)
      let link = "";

      if (body.formType === FormType.INTERNAL) {
        const fromattedResult = body.events.map((event) => ({
          name: event.name,
          caption: event.caption,
          participants: event.participants,
          programId: programData.programId,
        }));

        const events = await tx.event.createManyAndReturn({
          data: fromattedResult,
        });

        const formattedEventHead = await Promise.all(
          events.flatMap((event, idx) =>
            body.events[idx].head.map(async (head) => ({
              eventId: event.eventId,
              userId: await getIdByRollNumber(head.roll),
            }))
          )
        );

        await tx.eventHead.createManyAndReturn({
          data: formattedEventHead,
        });
        link = `${process.env.DOMAIN_URL}/events/form/${slugTitle}`;
      }

      if (body.formType === FormType.EXTERNAL) {
        link = body.link;
      }
      console.log("events created");

      //3.Create a Poster
      const timeOfEvent = new Date(body.poster.date);
      timeOfEvent.setHours(body.poster.time.hour, body.poster.time.minute);

      await tx.poster.create({
        data: {
          title: body.poster.title,
          image: "https://source.unsplash.com/random", //TODO: Upload image to object store,
          description: JSON.stringify(body.poster.description), //make this optional
          programId: programData.programId,
          brochure: body.poster.brochure,
          venue: body.poster.venue,
          contact: body.poster.phone,
          endDate: new Date(body.poster.registration.end),
          eventType: body.poster.eventType,
          organizedBy: body.poster.organizedBy,
          time: timeOfEvent,
          date: new Date(body.poster.date),
          link: link,
        },
      });
      console.log("poster created");
      return { programId: programData.programId };
    });

    return Response.json(
      {
        success: true,
        message: "Poster created successfully",
        data: {
          programId: result.programId,
        },
      },
      {
        status: HttpStatusCode.Created,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("DBError stack:", error.stack);

      if (
        error.code == "P2002" &&
        (error.meta?.target as string[])?.includes("programSlug")
      ) {
        return Response.json(
          {
            success: false,
            error: "Program with same title already exists",
            details: error.message,
          },
          {
            status: HttpStatusCode.Conflict,
          }
        );
      }
      return Response.json(
        {
          success: false,
          error: "Error occurred during poster creation",
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
        error: "Error occurred during poster creation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
