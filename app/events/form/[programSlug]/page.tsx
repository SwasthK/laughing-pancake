"use client";

import EventRegisterCard from "@/components/event-register/EventRegisterCard";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// import { useParams } from "next/navigation";
const dummyData = [
  {
    eventId: "1",
    title: "Event 1",
    caption: "random caption",
    registered: [{ name: "name", email: "email" }],
  },
  {
    eventId: "2",
    title: "Event 1",
    caption: "random caption",
    registered: [
      { name: "name", email: "email" },
      { name: "name", email: "email" },
      { name: "name", email: "email" },
    ],
  },
];
function Page() {
  const { programSlug } = useParams();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId") as string; //temporarily set as string
  const res = fetch(`/api/program/${programSlug}/events`);

  if (!teamId) {
    toast.error("Team ID is not present");
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {dummyData.map((it, indx) => (
          <EventRegisterCard
            key={indx}
            teamId={teamId} // This is a dummy value
            eventId={it.eventId}
            title={it.title}
            caption={it.caption}
            registered={it.registered}
            useremail="email" // This is a dummy value
          />
        ))}
      </div>
    </>
  );
}

export default Page;
