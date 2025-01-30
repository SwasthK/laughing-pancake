import { EventType, FormType, OrganizedBy } from "@/types";
import { createEventFormSchema, eventsArraySchema, linkSchema } from "@/zod";
import { toast } from "sonner";
import { z } from "zod";

export const defaultValues: z.infer<typeof createEventFormSchema> = {
    title: "",
    picture: undefined as unknown as File,
    description: {
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [],
            },
        ],
    },
    time: {
        hour: 0,
        minute: 0,
    },
    date: "",
    venue: "",
    registration: {
        individual: false,
        end: "",
    },
    phone: "",
    eventType: EventType.SEMINAR,
    organizedBy: OrganizedBy.BCA,
    brochure: "",
    events: [],
    link: "",
    formType: FormType.NONE,
};

export const normalizedData = (formdata: z.infer<typeof createEventFormSchema>) => {

    let err = null;

    switch (formdata.formType) {
        case FormType.INTERNAL:
            err = eventsArraySchema.safeParse(formdata.events).error?.errors[0]
                .message;
            formdata.link = "";
            break;
        case FormType.EXTERNAL:
            err = linkSchema.safeParse(formdata.link).error?.errors[0].message;
            formdata.events = [];
            break;
        default:
            formdata.link = "";
            formdata.events = [];
    }

    if (err) {
        toast.error(err);
        return false;
    }

    formdata.registration.end === ""
        ? (formdata.registration.end = formdata.date)
        : formdata.registration.end;


    let { events, link, formType, ...rest } = formdata;

    return {
        poster: {
            ...rest,
        },
        events,
        link,
        formType,
    };
};

export const onError = (errors: any) => {
    const errorMessages = Object.values(errors)
        .map((error: any) => error.message)
        .join(", ");
    toast.error(`Validation failed: ${errorMessages} .`);
};
