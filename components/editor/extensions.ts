import {
    TiptapLink,
    TaskList,
    TaskItem,
    HorizontalRule,
    StarterKit,
    Placeholder,
    AIHighlight,
    TiptapUnderline,
    Color,
    TextStyle,
    HighlightExtension,
} from "novel/extensions";
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import AutoJoiner from 'tiptap-extension-auto-joiner' // optional

import { cx } from "class-variance-authority";

const aiHighlight = AIHighlight;
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
    HTMLAttributes: {
        class: cx(
            "text-blue-600 underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
        ),
    },
});

const taskList = TaskList.configure({
    HTMLAttributes: {
        class: cx("not-prose pl-2 "),
    },
});
const taskItem = TaskItem.configure({
    HTMLAttributes: {
        class: cx("flex gap-2 items-start my-4"),
    },
    nested: true,
});

const horizontalRule = HorizontalRule.configure({
    HTMLAttributes: {
        class: cx("mt-4 mb-6 border-t border-muted-foreground"),
    },
});

const starterKit = StarterKit.configure({
    bulletList: {
        HTMLAttributes: {
            class: cx("list-disc marker:text-black list-outside leading-3 -mt-2"),
        },
    },
    orderedList: {
        HTMLAttributes: {
            class: cx("  list-outside leading-3 -mt-2"),
        },
    },
    listItem: {
        HTMLAttributes: {
            class: cx("leading-normal -mb-2"),
        },
    },
    blockquote: {
        HTMLAttributes: {
            class: cx("border-l-4 border-primary"),
        },
    },
    codeBlock: {
        HTMLAttributes: {
            class: cx(
                "rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium",
            ),
        },
    },
    code: {
        HTMLAttributes: {
            class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
            spellcheck: "false",
        },
    },
    horizontalRule: false,
    dropcursor: {
        color: "#DBEAFE",
        width: 4,
    },
    gapcursor: false,
});

const globalDragHandle = GlobalDragHandle.configure({
    dragHandleWidth: 20,    // default

    // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic 
    // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an 
    // element to a position that is max. 99px away from the edge of the screen
    // You can set this to 0 to prevent auto scrolling caused by this extension
    scrollTreshold: 100     // default
})

const autoJoiner = AutoJoiner.configure({
    elementsToJoin: ["bulletList", "orderedList"] // default
})

export const defaultExtensions = [
    globalDragHandle,
    autoJoiner,
    autoJoiner,
    starterKit,
    placeholder,
    tiptapLink,
    taskList,
    taskItem,
    horizontalRule,
    aiHighlight,
    TiptapUnderline,
    Color,
    TextStyle,
    HighlightExtension.configure({
        multicolor: true,
    }),
];

