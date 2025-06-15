import { Tooltip } from "./Tooltip";
import { Link } from "./Link";
import { EventList } from "@/types";
import Image from "next/image";
import { ChevronsRight, NotepadText } from "lucide-react";
import { cn } from "@/lib/utils";

export function EventCard({
  title,
  image,
  eventType,
  organizedBy,
  programSlug,
}: EventList) {
  return (
    <div
      draggable
      className="flex flex-col w-full group hover:shadow-xl transition-all duration-300 rounded-lg"
    >
      <div className="h-40 relative rounded-lg rounded-b-none overflow-hidden">
        <Image
          loading="lazy"
          alt={title}
          src={image}
          fill
          className="rounded-b-none object-cover object-center w-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="bg-[#F3F1F0]/90 dark:bg-black/90 backdrop-blur-sm text-[#262728] dark:text-white px-4 py-1.5 rounded-md text-sm shadow-sm absolute bottom-3 right-3 font-medium">
          {organizedBy}
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-hidden px-6 py-5 bg-[#F3F1F0] dark:bg-[#1A1A1A] rounded-lg rounded-t-none border border-[#E6E4E4] dark:border-[#2A2A2A]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold font-trebuchet text-[#262728] dark:text-white line-clamp-2 group-hover:text-[#262728]/90 dark:group-hover:text-white/90 transition-colors">
            {title}
          </h3>
        </div>
        {/* <EditorPreview className="md:pl-8" jsonData={JSON.parse(description)} /> */}
        {/* <p className="text-secondary-light text-sm truncate">{description}</p> */}
        <p className="text-[#666666] dark:text-[#A8A8A8] text-sm font-medium">
          {eventType}
        </p>
        <div className="flex justify-between items-center text-sm mt-2">
          <Tooltip content="View event details">
            <Link
              href={`/poster/${programSlug}?autoregister=true`}
              className="flex gap-2 justify-center items-center bg-[#262728] text-white dark:bg-white dark:text-[#262728] px-4 py-1.5 rounded-md hover:bg-slate-700 dark:hover:bg-slate-200 hover:scale-105 transition-all duration-300 font-medium"
            >
              Register
              <NotepadText className="h-4 w-4" />
            </Link>
          </Tooltip>
          <div className="w-fit">
            <Tooltip content="Register now">
              <Link
                href={`/poster/${programSlug}`}
                target="_blank"
                className="flex gap-2 justify-center items-center bg-[#262728]/10 dark:bg-white/10 text-[#262728] dark:text-white px-4 py-1.5 rounded-md hover:bg-[#262728]/20 dark:hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium"
              >
                View
                <ChevronsRight className="h-5 w-5" />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
