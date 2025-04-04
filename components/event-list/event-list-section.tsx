"use client";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
      }
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
    setEventList([]); // Clear existing events when filter/department changes
    setHasMore(() => true);
    setPage(() => 1);
    mutate(); // Refetch with new parameters
  }, [department, filter, setPage, mutate]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch events");
      setIsLoadingMore(false);
    }
  }, [error]);

  // Instagram-style loading trigger
  const loadMoreObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          setIsLoadingMore(true);
          // Small delay to ensure skeleton loaders are visible before the fetch completes
          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
        }
      },
      { rootMargin: "200px 0px" } // Start loading before the element is fully visible
    );

    if (loadingTriggerRef.current) {
      observerRef.current.observe(loadingTriggerRef.current);
    }
  }, [hasMore, isLoading, isLoadingMore, setPage]);

  useEffect(() => {
    loadMoreObserver();
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreObserver, eventList]);

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