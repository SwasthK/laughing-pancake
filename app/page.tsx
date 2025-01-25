import { EventCard } from "@/components/EventCard";
import { FilterBar } from "@/components/fiterbar";
import { eventsData, hoteventsData } from "./data";
import { Fragment } from "react";
import { Carousel } from "@/components/hot-events";
import { eventsDataType } from "@/types";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col  gap-2 py-4 px-3">
        <p className="text-start ">Hottest Events 🔥</p>
      </div>

      <Carousel events={hoteventsData}></Carousel>

      <div className="w-full flex flex-col items-start gap-2 py-4 px-3">
        <p className="">Explore all events 🎉</p>
        <div className="flex gap-2 w-full justify-between">
          <FilterBar></FilterBar>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-6">
        {eventsData.map((event: eventsDataType) => (
          <Fragment key={event.eventName}>
            <EventCard {...event} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
