import { FilterBar } from "@/components/fiterbar";
import EventListSection from "@/components/event-list/event-list-section";
import { FilterProvider } from "./context/FilterProvider";

export default function Home() {
  return (
    <>
      <FilterProvider>
        {/* <div className="w-full flex flex-col  gap-2 py-4 px-3">
          <p className="text-start ">Hottest Events 🔥</p>
        </div> */}

        {/* <Carousel events={hoteventsData}></Carousel> */}

        <div className="w-full flex flex-col items-start gap-2 py-4 px-3">
          <p className="">Explore all events 🎉</p>
          <div className="flex gap-2 w-full justify-between">
            <FilterBar></FilterBar>
          </div>
        </div>
        <EventListSection />
      </FilterProvider>
    </>
  );
}
