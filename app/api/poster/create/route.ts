import { prisma } from "@/lib/prismaCleint"; //actual client
import { Prisma } from "@prisma/client"; //for error handling
import slugify from "slugify";
import { FormType, HttpStatusCode, NormalizedFormData } from "@/types";
import { auth } from "@/auth";
import { getIdByEmail, getIdByRollNumber } from "@/lib/api-helper";
import { z } from "zod";
import { ApiError, ApiResponse } from "@/lib/response";

export async function POST(request: Request) {
  const session = await auth();
  const userId = await getIdByEmail(session?.user?.email as string);

  const body: NormalizedFormData = await request.json();
  console.log("body", body);
  const reqBodySchema = z.object({
    poster: z.object({
      title: z.string({ message: "title is requried" }),
      picture: z.any({ message: "invalid image format" }).optional(),
      description: z.any().optional(),
      date: z.string({ message: "date is required" }),
      time: z.object({
        hour: z.number({ message: "hour is required" }),
        minute: z.number({ message: "minute is required" }),
      }),
      venue: z.string({ message: "venue is required" }),
      phone: z.string({ message: "phone is required" }),
      registration: z.object({
        end: z.string({ message: "registration end date is required" }),
      }),
      eventType: z.string({ message: "event type is required" }),
      organizedBy: z.string({ message: "organized by is required" }),
      brochure: z.string({ message: "brochure is required" }),
      link: z.string().optional(),
    }),
    formType: z.nativeEnum(FormType),
    events: z
      .array(
        z.object({
          name: z.string({ message: "name is required" }),
          caption: z.string({ message: "caption is required" }),
          participants: z.number({ message: "participants is required" }),
          head: z.array(
            z.object({
              roll: z.string({ message: "roll is required" }),
            })
          ),
        })
      )
      .optional(),
  });

  const parseResult = reqBodySchema.safeParse(body);
  if (!parseResult.success) {
    console.error(parseResult.error.errors);
    return Response.json(
      new ApiError(
        parseResult.error.errors[0].message,
        parseResult.error.errors
      ),
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  // if (!body || !body.poster || !body.poster.title) {
  //   return Response.json(new ApiError("Invalid poster data"), {
  //     status: HttpStatusCode.BadRequest,
  //   });
  // }

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
          image: body.poster.picture,
          description: JSON.stringify(body.poster.description),
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
      new ApiResponse("Program successfully", {
        programId: result.programId,
      }),
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
          new ApiError("Program with same title exists", error.message),
          {
            status: HttpStatusCode.Conflict,
          }
        );
      }
      return Response.json(
        new ApiError("Error occurred during poster creation", error.message),
        {
          status: HttpStatusCode.InternalServerError,
        }
      );
    }

    if (error instanceof Error) console.error("Error:", error.stack);
    else console.error("Error: Unexpected error occurred");

    return Response.json(
      new ApiError(
        "Error occurred during poster creation",
        error instanceof Error ? error.message : "Unknown error"
      ),
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
