
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
