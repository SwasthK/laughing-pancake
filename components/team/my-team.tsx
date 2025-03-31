"use client";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import type { JoinedTeam } from "@/types";
import useSWR from "swr";
import MyTeamCard from "./my-team-card";
import { Users, Loader2 } from "lucide-react";

export default function MyTeam() {
  const { data, mutate, isLoading, error } = useSWR<
    FetchResponse<JoinedTeam[]>,
    FetchError
  >("/api/team/my-teams", fetcher, {
    shouldRetryOnError: false,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Teams</h1>
        <p className="text-gray-600">Teams that you have created or joined</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          Unable to load teams. Please try again later.
        </div>
      ) : data?.data.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No teams yet
          </h3>
          <p className="text-gray-600 mb-4">
            You haven't created or joined any teams yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((team, idx) => (
            <MyTeamCard
              key={idx}
              programSlug={team.program.programSlug}
              teamName={team.teamName!}
              teamKey={team.teamKey!}
              title={team.program.title!}
              eventType={team.program.eventType!}
              organizedBy={team.program.organizedBy!}
              imageUrl={team.program.image!}
              mutate={() => mutate()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
