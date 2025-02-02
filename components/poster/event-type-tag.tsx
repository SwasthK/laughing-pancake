import { PosterType } from "@/types";

export const EventTypeTag = ({ type }: { type: PosterType.EventType }) => (
  <div className="bg-[#c3c6e2] p-1 px-3 rounded-md text-sm absolute top-0 right-0">
    <p className="font-mono capitalize text-sm rounded-md w-fit px-3 font-semibold">
      {type}
    </p>
  </div>
);
