import { JSONContent } from "novel";

export interface EditorProps {
    initialContent?: JSONContent;
    setInitialContent: React.Dispatch<React.SetStateAction<JSONContent>>;
}

export type FormHeaderProps = {
    label: string;
    split?: string;
    className?: string;
};

export type FormLabelProps = {
    htmlFor: string;
    label: string;
    className?: string;
    error?: string;
};

export type HotEventsData = {
    eventName: string;
    description: string;
    department: string;
    imgUrl: string;
    visitLink: string;
}

export interface EventsDataType extends HotEventsData {
    registerLink: string;
}

export enum FormType {
    NONE = "NONE",
    INTERNAL = "INTERNAL",
    EXTERNAL = "EXTERNAL",
}

export enum OrganizedBy {
    BCA = "bca",
    BBA = "bba",
    BCom = "bcom",
    BSc = "bsc",
    BA = "ba",
}

export enum EventType {
    INTERCOLLEGIATE = "intercollegiate",
    INTERDEPARTMENT = "interdepartment",
    SEMINAR = "seminar",
    WORKSHOP = "workshop",
    HACKATHON = "hackathon",
    CONFERENCE = "conference",
    MEETUP = "meetup",
}

export namespace PosterType {
    export type Title = string;

    export type EventImage = {
        title: string;
        imageUrl: string;
    };

    export type Description = JSONContent;

    export type EventType = string;

    export type EventMetadata = {
        date: string;
        time: string;
        location: string;
    };

    export type MetadataItem = {
        icon: React.ReactNode;
        text: string;
    };

    export type EndDate = string;

    export type Phone = string;

}