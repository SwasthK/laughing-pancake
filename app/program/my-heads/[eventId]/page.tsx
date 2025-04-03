"use client";
import { Loader } from "@/components/Loader/loader-one";
import TeamParticipantsCard from "@/components/program/head/team-participants-card";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { TeamForEvent } from "@/types";
import { Users, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  const { data, isLoading, error } = useSWR<
    FetchResponse<TeamForEvent[]>,
    FetchError
  >(`/api/heads/my-participants/${eventId}`, fetcher, {
    shouldRetryOnError: false,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="mr-1" size={18} />
          <span>Back to My Events</span>
        </button>

        <div className="flex items-center mb-2">
          <Users className="mr-2 text-blue-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">
            Event Participants
          </h1>
        </div>
        <p className="text-gray-600">Teams and participants for this event</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader message="Loading participants" />
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-700 text-center">
          Unable to load participants. Please try again later.
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Teams Registered
          </h3>
          <p className="text-gray-500">
            There are no teams registered for this event yet
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700 font-medium">
              {data?.data.length} {data?.data.length === 1 ? "Team" : "Teams"}{" "}
              Registered
            </p>
          </div>

          {data?.data.map((team) => (
            <TeamParticipantsCard key={team.teamId} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
