"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { queryType, type EventList } from "@/types";
import { Fragment } from "react";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { toast } from "sonner";
import useSWR from "swr";
import { FilterContext } from "@/app/context/FilterProvider";
import { throttle } from "lodash";
import { EventCardSkeleton } from "./event-card-skeleton";

export default function EventListSection() {
  const { filter, department, page, setPage } = useContext(FilterContext)!;
  const [eventList, setEventList] = useState<EventList[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 9;

  const { data, isLoading, error } = useSWR<
    FetchResponse<EventList[]>,
    FetchError
  >(
    `/api/events?type=${filter}&limit=${limit}&offset=${page}&department=${department}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 1000,
    },
  );

  useEffect(() => {
    if (data?.data) {
      setEventList((prev) => {
        if (page === 1) {
          return data.data;
        }

        const merged = [...prev, ...data.data];
        return merged.filter(
          (event, index, self) =>
            index ===
            self.findIndex((e) => e.programSlug === event.programSlug),
        );
      });

      setHasMore(data.data.length >= limit);
      if (page === 2 && filter === queryType.trending) setHasMore(false);
    }
  }, [data, page, filter]);
  useEffect(() => {
    setHasMore(() => true);
    setPage(() => 1);
  }, [department, filter, setPage]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch events");
    }
  }, [error]);

  useEffect(() => {}, [eventList]);
  const handleScroll = useCallback(() => {
    const throttledCheck = throttle(() => {
      const scrollBottom =
        window.innerHeight + document.documentElement.scrollTop;
      const threshold = document.documentElement.offsetHeight - 100;

      if (scrollBottom >= threshold && !isLoading && hasMore) {
        setPage((prev) => prev + 1);
      }
    }, 300);

    return throttledCheck;
  }, [isLoading, hasMore, setPage])();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) {
    return (
      <div className="text-red-500">
        Error loading events. Please try again.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-6">
      {eventList.map((event: EventList) => (
        <Fragment key={event.programSlug}>
          <EventCard {...event} />
        </Fragment>
      ))}

      {isLoading && (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </>
      )}
    </div>
  );
}
