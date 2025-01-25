"use client";

import { useEffect, useState } from "react";
import { Select } from "./shadcn/Select";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const sortCourses = [
  {
    value: "all",
    label: "All (default)",
  },
  {
    value: "bca",
    label: "BCA",
  },
  {
    value: "bcom",
    label: "BCOM",
  },
  {
    value: "bba",
    label: "BBA",
  },
  {
    value: "bsc",
    label: "BSC",
  },
  {
    value: "bvoc",
    label: "BVOC",
  },
];

const sortEvents = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "trending",
    label: "Trending",
  },
  {
    value: "latest",
    label: "Latest",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
  {
    value: "upcoming",
    label: "Upcoming",
  },
];

export function FilterBar() {
  const [sortEventsIndex, setSortEventsIndex] = useState(0);
  const [sortCoursesIndex, setSortCoursesIndex] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    toast("Sorting changed", {
      description: (
        <code>
          sort by : {sortEvents[sortEventsIndex].value}
          <br />
          course : {sortCourses[sortCoursesIndex].value}
        </code>
      ),
    });
  }, [sortEventsIndex, sortCoursesIndex]);

  return (
    <>
      <div className="flex text-gray-700 items-center cursor-pointer flex-wrap gap-3 font-normal px-0">
        {sortEvents.map((item, index: number) => (
          <div
            onClick={() => setSortEventsIndex(index)}
            key={item.value}
            className={`${
              index == sortEventsIndex ? "bg-black text-white" : "bg-background"
            } border border-input hidden text-sm lg:block rounded-full md:px-4 py-1.5 transition-colors duration-500 ease-in`}
          >
            <p>{item.label}</p>
          </div>
        ))}
        <div className="block lg:hidden">
          <Select
            items={sortEvents}
            sortIndex={sortEventsIndex}
            setSortIndex={setSortEventsIndex}
            label="filter"
          />
        </div>
      </div>

      <div className="flex text-gray-700 items-center cursor-pointer  gap-3 font-normal py-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-fit justify-between lg:rounded-md lg:px-4 lg:py-1.5 lg:h-fit h-10 px-4 py-2`}
            >
              {sortCoursesIndex === 0 ? (
                <>
                  <p className="hidden md:block">{`Select department...`}</p>
                  <p className="block md:hidden capitalize">Select</p>
                </>
              ) : (
                <>
                  <p>
                    {sortCourses[sortCoursesIndex].label}
                  </p>
                </>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search course..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {sortCourses.map((item, index) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => {
                        setSortCoursesIndex(
                          index === sortCoursesIndex ? 0 : index
                        );
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          index === sortCoursesIndex
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
