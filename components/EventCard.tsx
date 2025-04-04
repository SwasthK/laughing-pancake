import { Tooltip } from "./Tooltip";
import { Link } from "./Link";
import { EventList } from "@/types";
import Image from "next/image";
import {  ChevronsRight, NotepadText } from "lucide-react";

export function EventCard({
  title,
  image,
  eventType,
  organizedBy,
  programSlug,
}: EventList) {
  return (
    <div draggable className="flex flex-col w-full">
      <div className="h-40 relative rounded-lg rounded-b-none overflow-hidden">
        <Image
          loading="lazy"
          alt={title}
          src={image}
          fill
          className="rounded-b-none object-cover object-center w-full"
        />
        <div className="bg-[#ebe6e6] text-secondary-light px-4 py-0 rounded-md text-sm shadow-sm absolute bottom-3 right-3">
          {organizedBy}
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-hidden px-4 py-4 bg-[#F3F1F0] rounded-lg rounded-t-none">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold font-trebuchet">{title}</p>
        </div>
        {/* <EditorPreview className="md:pl-8" jsonData={JSON.parse(description)} /> */}
        {/* <p className="text-secondary-light text-sm truncate">{description}</p> */}
        <p className="text-secondary-light text-sm truncate">{eventType}</p>
        <div className="flex justify-between items-center text-sm">
          <Tooltip content="View event details">
            <Link
              href={`/poster/${programSlug}?autoregister=true`}
              className="flex gap-2 justify-center items-center"
            >
              Register
              <NotepadText className=" h-4 w-4" />
            </Link>
          </Tooltip>
          <div className="w-fit p-1 rounded-md cursor-pointer">
            <Tooltip content="Register now">
              <Link
                href={`/poster/${programSlug}`}
                target="_blank"
                className="flex gap-2 justify-center items-center"
              >
                View
                <ChevronsRight className=" h-5 w-5" />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
