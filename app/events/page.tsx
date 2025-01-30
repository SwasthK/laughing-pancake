import { Link } from "@/components/Link";
import {
  IconArchive,
  IconCalendarWeek,
  IconClearAll,
  IconSquareRoundedCheck,
} from "@tabler/icons-react";
import { eventsData } from "../../lib/data";
import { Fragment } from "react";
import { eventsDataType } from "@/types";

export default function Events() {
  return (
    <div>
      <div className="flex gap-2 flex-col p-4 bg-[#DADADA] rounded-xl px-6 py-6">
        <div className="flex gap-2 items-center">
          <p className="text-2xl font-semibold tracking-tight">
            Events posted by <span className="text-[#666666]">you</span>
          </p>
          <IconCalendarWeek />
        </div>
        <p className="text-sm">
          try creating more events to top the{" "}
          <Link
            href="/leaderboard"
            className="text-sky-900 bg-transparent px-0 font-semibold cursor-pointer"
          >
            leaderboard
          </Link>
          🏆
        </p>
      </div>

      <div className="grid grid-rows-4 md:grid-rows-1  grid-cols-1 md:grid-cols-5  gap-3 gap-y-4 my-4">
        <div className="h-[21rem] sm:col-span-3 bg-[#d8d9d3] rounded-xl p-6 bg-gradient-to-l from-teal-400 to-gray-400 ">
          <div className="flex gap-6 flex-col w-full h-full">
            <div className="flex gap-2 items-center">
              <p className="text-lg font-mono">Upcoming events</p>
              <IconCalendarWeek />
            </div>
            <div className="overflow-y-auto flex gap-3 flex-col h-full rounded-md">
              {eventsData.map((event) => (
                <Fragment key={event.eventName}>
                  <EventCard {...event} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[21rem] sm:col-span-2 text-white bg-[#fff] rounded-xl p-6 bg-gradient-to-b from-gray-500 to-gray-300">
          <div className="flex  gap-6 flex-col w-full h-full">
            <div className="flex gap-2 items-center">
              <p className="text-lg font-mono">Past Events</p>
              <IconSquareRoundedCheck />
            </div>
            <div className="overflow-y-auto flex gap-3 flex-col h-full rounded-md">
              {eventsData.map((event) => (
                <Fragment key={event.eventName}>
                  <EventCard {...event} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[21rem] sm:col-span-2 bg-[#d8d9d3] text-white rounded-xl p-6 bg-gradient-to-r from-slate-600 to-slate-300">
          <div className="flex gap-6 flex-col w-full h-full">
            <div className="flex gap-2 items-center">
              <p className="text-lg font-mono">Archived Events</p>
              <IconArchive />
            </div>
            <div className="overflow-y-auto flex gap-3 flex-col h-full rounded-md ">
              {eventsData.map((event) => (
                <Fragment key={event.eventName}>
                  <EventCard {...event} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[21rem] sm:col-span-3 bg-[#DADADA] rounded-xl p-6 bg-gradient-to-br  from-teal-400 to-gray-400 ">
          <div className="flex gap-6 flex-col w-full h-full">
            <div className="flex gap-2 items-center">
              <p className="text-lg font-mono">All events</p>
              <IconClearAll />
            </div>
            <div className="overflow-y-auto flex gap-3 flex-col h-full rounded-md">
              {eventsData.map((event) => (
                <Fragment key={event.eventName}>
                  <EventCard {...event} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ eventName, description, visitLink }: eventsDataType) {
  return (
    <div className="flex gap-1 sm:max-w-[35rem] flex-col bg-[#4f4848] text-white px-6 py-3  rounded-md">
      <p className="text-lg font-semibold tracking-tighter">{eventName}</p>
      <p className="text-[#ffffff64] text-sm font-light sm:max-w-[25rem]  overflow-hidden truncate">
        {description}
      </p>
      <Link
        href={`${visitLink}`}
        className="text-sm bg-[#262728] hover:bg-black mt-1 transition-colors duration-100 ease-in max-w-fit px-2 py-1 rounded-md"
      >
        View
      </Link>
    </div>
  );
}
