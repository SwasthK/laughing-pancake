
import { JSONContent } from "novel"
import { z } from "zod"

export const eventsSchema = z.object({
    name: z.string({ message: "Invalid name" }).min(2, { message: "Event name seems too short" }),
    caption: z.string({ message: "Invalid caption" }).min(10, { message: "Event caption seems too short" }),
    head: z.array(z.object({
        name: z.string({ message: "Invalid name" }).min(2, { message: "Head name seems too short" }),
        roll: z.number({ message: "Invalid roll-number" }).min(10000, { message: "Invalid roll-number" }),
    })).min(1, { message: "There must be at least one head." }),
    participants: z
        .number({ message: "Participants must be a valid number." })
        .min(1, { message: "Participants must be at least 1." })
        .max(20, { message: "Participants cannot exceed 20." }),
})


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
        individual: z.boolean({ message: "Invalid Value" }).optional(),
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
    brochure: z.string({ message: "Invalid url" }).url({ message: "Invalid url" }),
    events: z.array(eventsSchema)
})


// { roll: 220982, name: "Alice" },
// { roll: 220983, name: "Bob" },
// { roll: 220984, name: "Carol" },
// { roll: 220985, name: "Dave" },
// { roll: 220986, name: "Eve" },
// { roll: 220987, name: "Frank" },
// { roll: 220988, name: "Grace" },
// { roll: 220989, name: "Hank" },
// { roll: 220990, name: "Ivy" },
