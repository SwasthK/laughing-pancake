"use client";

import { ContactInfo } from "@/components/poster/event-contact-info";
import { EventDetails } from "@/components/poster/event-details";
import { EventImage } from "@/components/poster/event-image";
import { EventMetadata } from "@/components/poster/event-meta-data";
import { RegistrationInfo } from "@/components/poster/event-reg-info";
import { EventTypeTag } from "@/components/poster/event-type-tag";
import { Poster } from "@/types";
import { JSONContent } from "novel";
import { useEffect, useState } from "react";
// const { poster } = posterData;

export default function EventPoster({
  params,
}: {
  params: { programSlug: string };
}) {
  //default values
  const [poster, setPoster] = useState<Poster>({
    title: "",
    image:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eventType: "",
    organizedBy: "",
    date: "",
    time: "",
    venue: "",
    description: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            level: 3,
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "‎",
            },
          ],
        },
      ],
    }),
    endDate: "",
    contact: "",
    brochure: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const p = await params;
      try {
        setLoading(true);
        const res = await fetch(`/api/poster/${p.programSlug}`);
        const data = await res.json();
        setPoster({ ...data.data });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);
  if (loading) return <div>Loading</div>;
  return (
    <>
      <div className="xl:py-16 py-5 pb-10">
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
                programSlug={params.programSlug}
              />
            )}
          </div>
        </div>

        <EventDetails
          description={JSON.parse(poster.description) as JSONContent}
        />
        <ContactInfo phoneNumber={poster.contact} />
      </div>
    </>
  );
}
