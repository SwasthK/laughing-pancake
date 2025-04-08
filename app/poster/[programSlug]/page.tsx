"use client";

import { ContactInfo } from "@/components/poster/event-contact-info";
import { EventDetails } from "@/components/poster/event-details";
import { EventImage } from "@/components/poster/event-image";
import { EventMetadata } from "@/components/poster/event-meta-data";
import { RegistrationInfo } from "@/components/poster/event-reg-info";
import { EventTypeTag } from "@/components/poster/event-type-tag";
import { fetcher, FetchResponse } from "@/lib/fetcher";
import { Poster } from "@/types";
import { Loader } from "lucide-react";
import { JSONContent } from "novel";
import { use } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export default function EventPoster({
  params,
}: {
  params: Promise<{ programSlug: string }>;
}) {
  const { programSlug } = use(params);
  //default values

  const {
    data: posterData,
    isLoading,
    error,
  } = useSWR<FetchResponse<Poster>>(`/api/poster/${programSlug}`, fetcher);
  const poster = posterData?.data;

  if (error) {
    toast.error(error.message);
  }
  //TODO:Loader
  if (isLoading) {
    return <Loader size={40} className="animate-spin" />;
  }

  return (
    <>
      <div className="xl:py-16 py-5 pb-10">
        {poster && (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-6">
              <EventImage title={poster.title} imageUrl={poster.image} />

              <div className="bg-red-100 h-full py-10 pb-16 px-8 rounded-xl font-mono text-sm relative">
                <div>
                  <p className="md:text-5xl text-4xl font-semibold pb-4">
                    {poster.title}
                  </p>
                  <EventTypeTag type={poster.eventType} />
                </div>

                <p className="text-sm text-gray-700 font-sans">
                  <span className="uppercase font-semibold">
                    {poster.organizedBy}{" "}
                    <span className="text-xs capitalize font-light">
                      [Bachuleors of Bussiness Administration]
                    </span>
                  </span>
                </p>

                <EventMetadata
                  date={poster.date}
                  time={poster.time}
                  location={poster.venue}
                />
                {poster.link && (
                  <RegistrationInfo
                    closingDate={poster.endDate}
                    link={poster.link}
                    programSlug={programSlug}
                  />
                )}
              </div>
            </div>

            <EventDetails
              description={JSON.parse(poster.description) as JSONContent}
            />
            <ContactInfo phoneNumber={poster.contact} />
          </>
        )}
      </div>
    </>
  );
}
