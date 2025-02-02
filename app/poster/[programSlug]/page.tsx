import { ContactInfo } from "@/components/poster/event-contact-info";
import { EventDetails } from "@/components/poster/event-details";
import { EventImage } from "@/components/poster/event-image";
import { EventMetadata } from "@/components/poster/event-meta-data";
import { RegistrationInfo } from "@/components/poster/event-reg-info";
import { EventTypeTag } from "@/components/poster/event-type-tag";
import { posterData } from "@/lib/data";
const { poster } = posterData;

export default function EventPoster() {
  return (
    <>
      <div className="xl:py-16 py-5 pb-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-6">
          <EventImage title={poster.title} imageUrl={poster.picture.url} />

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
              time={poster.time.hour + ":" + poster.time.minute}
              location={poster.venue}
            />

            <RegistrationInfo closingDate={poster.registration.end} />
          </div>
        </div>

        <EventDetails description={poster.description} />
        <ContactInfo phoneNumber={poster.phone} />
      </div>
    </>
  );
}
