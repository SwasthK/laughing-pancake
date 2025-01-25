
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

export interface eventsDataType extends HotEventsData {
    registerLink: string;
}