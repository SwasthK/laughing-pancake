"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { queryType, type EventList } from "@/types";
import { Fragment } from "react";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { toast } from "sonner";
import useSWR from "swr";
import { FilterContext } from "@/app/context/FilterProvider";
import { EventCardSkeleton } from "./event-card-skeleton";

export default function EventListSection() {
  const { filter, department, page, setPage } = useContext(FilterContext)!;
  const [eventList, setEventList] = useState<EventList[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);
  const limit = 9;
  const prevFilterRef = useRef({ filter, department });

  const { data, isLoading, error, mutate } = useSWR<
    FetchResponse<EventList[]>,
    FetchError
  >(
    `/api/events?type=${filter}&limit=${limit}&offset=${page}&department=${department}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 1000,
      onLoadingSlow: () => {
        setIsLoadingMore(true);
      },
      onSuccess: () => {
        setIsLoadingMore(false);
      },
    },
  );

  // Reset state when filter or department changes
  useEffect(() => {
    if (
      prevFilterRef.current.filter !== filter ||
      prevFilterRef.current.department !== department
    ) {
      setEventList([]);
      setHasMore(true);
      setPage(1);
      setIsLoadingMore(false);
      prevFilterRef.current = { filter, department };
      mutate();
    }
  }, [filter, department, setPage, mutate]);

  useEffect(() => {
    if (data?.data) {
      setEventList((prev) => {
        // If it's a new filter or first page, replace the list
        if (
          page === 1 ||
          prevFilterRef.current.filter !== filter ||
          prevFilterRef.current.department !== department
        ) {
          return data.data;
        }

        // For subsequent pages, merge and deduplicate
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
  }, [data, page, filter, department]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch events");
      setIsLoadingMore(false);
    }
  }, [error]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Reset and recreate observer when dependencies change
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          !isLoadingMore
        ) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
        }
      },
      { rootMargin: "200px 0px" },
    );

    observerRef.current = observer;

    if (loadingTriggerRef.current) {
      observer.observe(loadingTriggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, isLoadingMore, setPage, filter, department]);

  if (error && eventList.length === 0) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading events. Please try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-6">
      {/* Render existing event cards */}
      {eventList.map((event: EventList) => (
        <Fragment key={event.programSlug}>
          <EventCard {...event} />
        </Fragment>
      ))}

      {/* Show loading skeletons for initial load */}
      {isLoading && eventList.length === 0 && (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={`initial-${index}`} />
          ))}
        </>
      )}

      {/* Show loading skeletons when scrolling for more */}
      {(isLoadingMore || (isLoading && eventList.length > 0)) && hasMore && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <EventCardSkeleton key={`more-${index}`} />
          ))}
        </>
      )}

      {/* Invisible loading trigger element */}
      {hasMore && !isLoading && (
        <div
          ref={loadingTriggerRef}
          className="col-span-full h-20 w-full -mb-20"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
