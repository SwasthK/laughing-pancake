"use client";

import { Link } from "./Link";
import * as React from "react";
import {
  Carousel as CarouselContainer,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HotEventsData } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export function HotEvents(data: {
  eventName: string;
  description: string;
  department: string;
  imgUrl: string;
  visitLink: string;
}) {
  return (
    <div className="relative p-6 px-6 flex text-white  gap-7 flex-wrap items-center w-full rounded-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-400 ">
      <div className="h-32 w-60 rounded-md overflow-hidden relative">
        <Image
          alt={data.eventName}
          src={data.imgUrl}
          fill
          loading="lazy"
          className="object-cover" 
        />
      </div>

      <div className="flex flex-col gap-3 justify-between h-32 ">
        <div className="flex flex-col gap-2">
          <p className=" font-light">
            <span className="font-semibold text-3xl">{data.eventName}</span>{" "}
            <span className="text-xs">[{data.department}]</span>
          </p>
          <p className="text-sm text-secondary-light max-w-72 sm:max-w-80 truncate">
            {data.description}
          </p>
        </div>
        <Link
          href={data.visitLink}
          className="w-fit bg-white text-black rounded-md text-sm"
        >
          Visit
        </Link>
      </div>
    </div>
  );
}

export function Carousel({ events }: { events: HotEventsData[] }) {
  return (
    <CarouselContainer
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.eventName}>
            <HotEvents {...event} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselContainer>
  );
}
