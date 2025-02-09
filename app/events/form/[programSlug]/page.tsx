"use client";

import { Loader } from "lucide-react";
import EventRegisterCard from "@/components/event-register/EventRegisterCard";
import { fetcher, FetchError, FetchResponse } from "@/lib/fetcher";
import { FormattedEvent } from "@/types";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";

function Page() {
  const { programSlug } = useParams();
  const searchParams = useSearchParams();
  const teamKey = searchParams.get("teamKey") as string;
  const { data: session } = useSession();

  const {
    data: eventsData,
    isLoading,
    error,
    mutate,
  } = useSWR<FetchResponse<FormattedEvent[]>, FetchError>(
    `/api/form/${programSlug}?teamKey=${teamKey}`,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  if (error) {
    toast.error(error.message);
  }

  //TODO:Loader
  if (isLoading) {
    return <Loader size={40} className="animate-spin" />;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {eventsData &&
          eventsData.data.map((event, indx) => (
            <EventRegisterCard
              key={indx}
              mutate={mutate}
              teamKey={teamKey}
              eventId={event.eventId}
              title={event.title}
              caption={event.caption}
              participants={event.Participants}
              teamSize={event.teamSize}
              useremail={session?.user?.email}
              programSlug={programSlug}
              userExist={
                event.Participants.find(
                  (participant) => participant.email === session?.user?.email
                )
                  ? true
                  : false
              }
            />
          ))}
      </div>
    </>
  );
}

export default Page;
