import { EventType, FormType, OrganizedBy } from "@/types";
import { z } from "zod";

export const eventsSchema = z.object({
  name: z
    .string({ message: "Invalid event name" })
    .min(2, { message: "Event name seems too short" }),
  caption: z
    .string({ message: "Invalid event caption" })
    .min(5, { message: "Event caption seems too short" }),
  head: z
    .array(
      z.object({
        name: z
          .string({ message: "Invalid name" })
          .min(2, { message: "Head name seems too short" }),
        roll: z
          .number({ message: "Invalid roll-number" })
          .min(10000, { message: "Invalid roll-number" }),
      })
    )
    .min(1, { message: "There must be at least one head." }),
  participants: z
    .number({ message: "Participants must be a valid number." })
    .min(1, { message: "Participants must be at least 1." })
    .max(20, { message: "Participants cannot exceed 20." }),
});

export const eventsArraySchema = z
  .array(eventsSchema)
  .min(1, {
    message:
      "either switch form type to 'NONE' or 'EXTERNAL or add atleast one event",
  });

export const linkSchema = z
  .string({ message: "Invalid registration link" })
  .url({
    message: "either switch form type to 'NONE' or 'INTERNAL or add proper url",
  });

export const createEventFormSchema = z.object({
  title: z
    .string({
      message: "Invalid title",
    })
    .min(2, {
      message: "Title seems too short",
    })
    .max(50, {
      message: "Title seems too long",
    }),
  picture: z.custom<File>((value) => value instanceof File && value.size > 0, {
    message: "Invalid picture",
  }),
  description: z
    .object({
      type: z.string({ message: "Invalid content for event description" }),
      content: z.any({ message: "Invalid content for event description" }),
    })
    .optional(),
  time: z.object(
    {
      hour: z
        .number({
          invalid_type_error: "Invalid time",
        })
        .min(1, { message: "Invalid time" })
        .max(12, { message: "Invalid time" }),
      minute: z
        .number({
          invalid_type_error: "Invalid time",
        })
        .min(0o0, { message: "Invalid time" })
        .max(59, { message: "Invalid time" }),
    },
    { message: "Invalid time" }
  ),
  date: z
    .string({
      message: "Invalid date",
    })
    .date(),
  venue: z
    .string({
      message: "Invalid venue location",
    })
    .min(2, {
      message: "Venue seems too short",
    })
    .max(30, {
      message: "Venue seems too long",
    }),
  registration: z.object(
    {
      individual: z
        .boolean({ message: "Invalid value for individual are allowed or not" })
        .default(false),
      end: z.string({ message: "Invalid end date for registration" }),
    },
    {
      message: "Invalid registration",
    }
  ),
  phone: z
    .string({
      message: "Invalid phone number",
    })
    .min(10, {
      message: "Invalid phone number",
    })
    .max(10, {
      message: "Invalid phone number",
    }),
  organizedBy: z.nativeEnum(OrganizedBy, {
    message: "Inavlid choice for organized by",
  }),
  eventType: z.nativeEnum(EventType, {
    message: "Invalid choice for event type",
  }),
  brochure: z
    .string({ message: "Invalid brochure link" })
    .url({ message: "Invalid brochure link" }),
  events: z.array(eventsSchema, {
    message: "Something went wrong while getting events data",
  }),
  formType: z
    .nativeEnum(FormType, { message: "Invalid choice for form type" })
    .default(FormType.NONE),
  link: z.string({ message: "Invalid registration link" }),
});

export const zodEventIdSchema = z.string({
  message: "Invalid Event Id",
  required_error: "Event Id is required",
  invalid_type_error: "Invalid Event Id"
}).cuid({ message: "Invalid Event Id" }).nonempty({ message: "Invalid Event Id" })

export const zodTeamIdSchema = z.string({
  message: "Invalid Team Id",
  required_error: "Team Id is required",
  invalid_type_error: "Invalid Team Id"
}).cuid({ message: "Invalid Team Id" }).nonempty({ message: "Invalid Team Id" })

export const zodEventIdAndTeamIdSchema = z.union([zodEventIdSchema, zodTeamIdSchema], {
  invalid_type_error: "Invalid Event Id or Team Id",
  required_error: "Event Id or Team Id is required",
  message: "Invalid Event Id or Team Id"
})

export const zodEmailSchema = z.string({
  required_error: "Email Id is required",
  invalid_type_error: "Invalid Email Id",
  message: "Invalid Email Id"
}).email({
  message: "Invalid Email Id"
}).refine((val: string) => {
  return ["@sdmcujire.in"].some((domain: string) => val.endsWith(domain))
}, {
  message: "Email domain is not allowed"
})