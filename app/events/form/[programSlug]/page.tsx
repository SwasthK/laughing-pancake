"use client";

import EventRegisterCard from "@/components/event-register/EventRegisterCard";
import { FormattedEvent } from "@/types";
import { useSession } from "next-auth/react";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const { programSlug } = useParams();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId") as string; //temporarily set as string

  const { data } = useSession();
  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const res = await fetch(`/api/form/${programSlug}?teamId=${teamId}`);
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setEvents(data.data);
        } else {
          toast.error(data.error);
        }
      })();
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);
  if (!teamId) {
    toast.error("Team ID is not present");
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {events.map((event, indx) => (
          <EventRegisterCard
            key={indx}
            teamId={teamId} // This is a dummy value
            eventId={event.eventId}
            title={event.title}
            caption={event.caption}
            participants={event.Participants}
            teamSize={event.teamSize}
            useremail={data?.user?.email} // This is a dummy value
            programSlug={programSlug}
            userExist={
              event.Participants.find(
                (participant) => participant.email === data?.user?.email
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
