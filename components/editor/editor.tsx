"use client";
import { useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorBubble,
  JSONContent,
} from "novel";

import { handleCommandNavigation } from "novel/extensions";
import { useDebouncedCallback } from "use-debounce";

import {
  slashCommand,
  suggestionItems,
} from "@/components/editor/slash-command";

import { defaultExtensions } from "@/components/editor/extensions";
import { TextButtons } from "@/components/editor/selectors/text-buttons";
import { LinkSelector } from "@/components/editor/selectors/link-selector";
import { NodeSelector } from "@/components/editor/selectors/node-selector";
import { ColorSelector } from "@/components/editor/selectors/color-selector";
import { EditorProps } from "@/types";

const extensions = [...defaultExtensions, slashCommand];

export const Editor: React.FC<{
  initialContent?: EditorProps | undefined;
  setEditorContent?: React.Dispatch<React.SetStateAction<JSONContent>>;
}> = ({ initialContent, setEditorContent }) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI] = useState(false);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setEditorContent?.(json);
    },
    500
  );

  return (
    <div className="relative w-full flex justify-center items-center h-[45rem]">
      {/* <p className="absolute top-2 px-2 py-1 right-2 rounded-md bg-black text-sm text-white">{saveStatus}</p> */}
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={initialContent}
          extensions={extensions}
          className="rounded-md h-[34rem]  p-4 w-full bg-[#E6E4E4] border overflow-scroll"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class:
                "prose dark:prose-invert prose-headings:font-title font-sans focus:outline-none max-w-full h-80 ",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-1 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-3 py-2.5 text-left text-sm hover:bg-accent aria-selected:bg-[#DADADA] transition-colors duration-200 ease-in"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble
            tippyOptions={{
              placement: openAI ? "bottom-start" : "top",
            }}
            className="flex w-fit max-w-[90vw] py-1  overflow-hidden rounded border border-muted bg-background shadow-xl"
          >
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <TextButtons />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};
