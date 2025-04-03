"use client";

import { Loader } from "@/components/Loader/loader-one";
import HeadEventCard from "@/components/program/head/head-event-card";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { HeadsEvent } from "@/types";
import { CalendarFold } from "lucide-react";
import useSWR from "swr";

export default function Page() {
  const { data, isLoading, error } = useSWR<
    FetchResponse<HeadsEvent[]>,
    FetchError
  >(`/api/heads/my-programs`, fetcher, {
    shouldRetryOnError: false,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <CalendarFold className="mr-2 text-blue-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">My Events</h1>
      </div>
      <p className="text-gray-600 mb-8">Events that you are head of</p>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader message="Loading your Events" />
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-700 text-center">
          Unable to load teams. Please try again later.
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <CalendarFold size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Event yet
          </h3>
          <p className="text-gray-500">You aren&apos;t head of any Event</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((event) => (
            <HeadEventCard key={event.eventId} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
