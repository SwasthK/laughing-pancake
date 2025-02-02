"use client";

import { generateHTML } from "@tiptap/html";
import { JSONContent } from "novel";
import { useMemo } from "react";
import { defaultExtensions } from "./extensions";
import { cn } from "@/lib/utils";

export const sampleData = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "wscnbsc",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "scjbsdcsc",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "scsjkcbsac",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "paschabdcajkhbcasdcvb",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "pppppppppppppppppp",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
          text: "pppppppppppppppppp",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "italic",
            },
            {
              type: "underline",
            },
          ],
          text: "ppppppppppppppppp",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
          text: "ppppppppppppppppppppppp",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "highlight",
              attrs: {
                color: "var(--novel-highlight-yellow)",
              },
            },
          ],
          text: "pppppppppppppppppppppppp",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                color: "#2563EB",
              },
            },
          ],
          text: "ppppppppppppppppppppppppppppp",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "ppppppppppppppppppppppppp",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/docs/editor/api/utilities/html",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class:
                  "text-blue-600 underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
              },
            },
          ],
          text: "ppppppppppppppppppppppp",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "dcvsdvjnbsdv",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "daxsdcvadcv",
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "scasdhcvhdsa",
                        },
                      ],
                    },
                    {
                      type: "bulletList",
                      content: [
                        {
                          type: "listItem",
                          content: [
                            {
                              type: "paragraph",
                              content: [
                                {
                                  type: "text",
                                  text: "qscjhksadc",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        start: 1,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "dxvcjsdxvsdvjshdcvsdv",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "advdsavd",
                },
              ],
            },
            {
              type: "orderedList",
              attrs: {
                start: 1,
              },
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "sckjsancsda",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "axcacasdcacs",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: true,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "ascccsacs",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "ascacaccascsa",
            },
          ],
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "scacaccc",
        },
      ],
    },
    {
      type: "paragraph",
    },
  ],
};

export const EditorPreview = ({
  jsonData,
  className,
}: {
  jsonData: JSONContent;
  className?: string;
}) => {
  const htmlData = useMemo(() => {
    return generateHTML(jsonData, defaultExtensions);
  }, [jsonData]);

  return (
    <>
      <div
        className={cn("prose-lg", className)}
        dangerouslySetInnerHTML={{ __html: htmlData }}
      ></div>
    </>
  );
};
