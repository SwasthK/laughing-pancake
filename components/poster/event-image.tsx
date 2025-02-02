import { PosterType } from "@/types";
import Image from "next/image";

export const EventImage = ({ title, imageUrl }: PosterType.EventImage) => (
  <div className="h-full min-h-72 w-full relative overflow-hidden rounded-xl">
    <Image
      loading="lazy"
      alt={title}
      src={imageUrl}
      fill
      className="rounded-b-none object-cover object-center"
    />
  </div>
);