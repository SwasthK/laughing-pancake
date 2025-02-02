import { PosterType } from "@/types";
import { EditorPreview } from "../editor/editor-preview";

export const EventDetails = ({
    description,
  }: {
    description: PosterType.Description;
  }) => (
    <div className="flex flex-col gap-5 py-16">
      <p className="font-mono text-2xl">
        About the <span className="text-[#666666]">event</span>
      </p>
      <EditorPreview className="md:pl-8" jsonData={description} />
    </div>
  );