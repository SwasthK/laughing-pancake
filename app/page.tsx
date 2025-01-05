import { EventCard } from "@/components/EventCard";
import { FilterBar } from "@/components/FilterBar";
import { HotEvents } from "@/components/HotEvents";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col  gap-2 py-4 px-3">
        <p className="text-start ">Hottest Events 🔥</p>
      </div>

      <HotEvents />

      <div className="w-full flex  flex-col items-start gap-2 py-4 px-3">
        <p className="">Explore all events 🎉</p>
        <div className="flex gap-2 w-full  justify-between">
          <FilterBar></FilterBar>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-16">
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCard
            key={index}
            title="Event Name"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        ))}
      </div>
    </>
  );
}
