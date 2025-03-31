"use client";

import MyProgramCard from "@/components/program/my-program/MyProgramCard";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { MyProgram } from "@/types";
import useSWR from "swr";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/loader-one";

export default function Page() {
  const router = useRouter();
  const { data, mutate, isLoading, error } = useSWR<
    FetchResponse<MyProgram[]>,
    FetchError
  >("/api/poster/my-programs", fetcher, {
    shouldRetryOnError: false,
  });

  const hasPrograms = data && data.data.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Programs</h1>
          <p className="text-gray-600 mt-1">
            {hasPrograms
              ? `You have ${data?.data.length} ${data?.data.length === 1 ? "program" : "programs"}`
              : "Create your first program to get started"}
          </p>
        </div>
        <Button
          onClick={() => router.push("/events/create")}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Program
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader message="Loading your teams" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          Unable to load your programs. Please try again later.
        </div>
      ) : hasPrograms ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((program) => (
            <MyProgramCard
              key={program.programId}
              programSlug={program.programSlug}
              title={program.Poster!.title!}
              date={program.Poster!.date!}
              eventType={program.Poster!.eventType!}
              organizedBy={program.Poster!.organizedBy!}
              mutate={() => mutate()}
              image={program.Poster!.image!}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="bg-white p-4 rounded-full mb-4">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Programs Yet
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            You haven&apos;t created any programs yet. Create your first program
            to get started.
          </p>
          <Button
            onClick={() => router.push("/events/create")}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Program
          </Button>
        </div>
      )}
    </div>
  );
}
