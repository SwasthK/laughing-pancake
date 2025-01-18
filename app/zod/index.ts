
import { JSONContent } from "novel"
import { z } from "zod"

export const createEventFormSchema = z.object({
    title: z.string({
        message: "Invalid title",
    }).min(2, {
        message: "Title seems too short",
    }).max(50, {
        message: "Title seems too long",
    }),
    picture: z.custom<File>(
        (value) => value instanceof File && value.size > 0, {
        message: "Invalid picture",
    }),
    description: z.object({
        type: z.string({ message: "Invalid content" }),
        content: z.any({ message: "Invalid content" }),
    }).optional(),
    time: z.object({
        hour: z.number({
            invalid_type_error: "Invalid time",
        }).min(1, { message: "Invalid time" }).max(12, { message: "Invalid time" }),
        minute: z.number({
            invalid_type_error: "Invalid time",
        }
        ).min(0o0, { message: "Invalid time" }).max(59, { message: "Invalid time" }),
    }, { message: "Invalid time" }),
    date: z.string({
        message: "Invalid date",
    }).date(),
    venue: z.string({
        message: "Invalid venue",
    }).min(2, {
        message: "Venue seems too short",
    }).max(30, {
        message: "Venue seems too long",
    }),
    registration: z.object({
        url: z.string({
            message: "Invalid link",
        }).url({
            message: "Invalid link",
        }),
        end: z.string({
            message: "Invalid date",
        }).date().optional(),
    }, {
        message: "Invalid registration",
    }),
    phone: z.string({
        message: "Invalid phone number",
    }).min(10, {
        message: "Invalid phone number",
    }).max(10, {
        message: "Invalid phone number",
    }),
    organizedBy: z.enum(["bca", "bba", "bcom", "bsc", "ba"], {
        message: "Invalid input",
    }),
    eventType: z.enum([
        "intercollegiate",
        "interdepartment",
        "seminar",
        "workshop",
        "hackathon",
        "conference",
        "meetup"], {
        message: "Invalid input"
    }),
    brochure: z.string({ message: "Invalid url" }).url({ message: "Invalid url" })
})

