"use client";

import Image from "next/image";
import { CalendarFold, Users } from "lucide-react";
import { HeadsEvent } from "@/types";
import Link from "next/link";

interface HeadEventCardProps {
  event: HeadsEvent;
}

const HeadEventCard = ({ event }: HeadEventCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 w-full">
        {event.programImage ? (
          <Image
            src={event.programImage}
            alt={event.eventName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CalendarFold size={48} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 truncate">
            {event.eventName}
          </h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {event.ProgrameType || "Event"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.eventCaption}
        </p>

        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarFold size={16} className="mr-2" />
            <span>{event.programTitle || "Untitled Program"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">Organized by:</span>
            <span className="ml-2">
              {event.programOrganizedBy || "Unknown"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
            <Users size={16} className="mr-1" />
            <Link href={`/program/my-heads/${event.eventId}`}>
              View Participants
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadEventCard;
