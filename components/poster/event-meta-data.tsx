import { PosterType } from "@/types";
import { Calendar, Clock, MapPin } from "lucide-react";

export const EventMetadata = ({
  date,
  time,
  location,
}: PosterType.EventMetadata) => (
  <div className="py-2 md:py-4 rounded-md mt-4 font-mono text-sm flex justify-start gap-3 md:gap-8 xl:justify-between flex-wrap">
    <MetadataItem icon={<Calendar className="h-4 w-4" />} text={date} />
    <MetadataItem icon={<Clock className="h-4 w-4" />} text={time} />
    <MetadataItem icon={<MapPin className="h-4 w-4" />} text={location} />
  </div>
);

export const MetadataItem = ({ icon, text }: PosterType.MetadataItem) => (
  <div className="flex w-fit flex-grow items-center gap-2 p-2 rounded-lg bg-[#edecec] hover:bg-indigo-50 transition-colors">
    {icon}
    <span className="text-gray-700">{text}</span>
  </div>
);
