"use client";

import { useContext, useState } from "react";
import { Select } from "./shadcn/Select";
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
import { FilterContext } from "@/app/context/FilterProvider";
import { OrganizedBy, queryType } from "@/types";

const sortCourses = [
  {
    value: OrganizedBy.All,
    label: "All (default)",
  },
  {
    value: OrganizedBy.BCA,
    label: "BCA",
  },
  {
    value: OrganizedBy.BCom,
    label: "BCOM",
  },
  {
    value: OrganizedBy.BBA,
    label: "BBA",
  },
  {
    value: OrganizedBy.BSc,
    label: "BSC",
  },
  {
    value: OrganizedBy.BVoc,
    label: "BVOC",
  },
];

const sortEvents = [
  {
    value: queryType.all,
    label: "All",
  },
  {
    value: queryType.trending,
    label: "Trending",
  },
  {
    value: queryType.oldest,
    label: "Oldest",
  },
  {
    value: queryType.upcoming,
    label: "Upcoming",
  },
];

export function FilterBar() {
  const { setFilter, setDeparment, filter, department } =
    useContext(FilterContext)!;

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex text-gray-700 items-center cursor-pointer flex-wrap gap-3 font-normal px-0">
        {sortEvents.map((item) => (
          <div
            onClick={() => setFilter(item.value)}
            key={item.value}
            className={`${
              item.value == filter ? "bg-black text-white" : "bg-background"
            } border border-input hidden text-sm lg:block rounded-full md:px-4 py-1.5 transition-colors duration-500 ease-in`}
          >
            <p>{item.label}</p>
          </div>
        ))}
        <div className="block lg:hidden">
          <Select items={sortEvents} filter={filter} setFilter={setFilter} />
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
              {!department ? (
                <>
                  <p className="hidden md:block">{`Select department...`}</p>
                  <p className="block md:hidden capitalize">Select</p>
                </>
              ) : (
                <>
                  <p>
                    {sortCourses
                      .filter((item) => item.value == department)
                      .map((item) => item.label)}
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
                  {sortCourses.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => {
                        setDeparment(item.value);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          item.value === department
                            ? "opacity-100"
                            : "opacity-0",
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
