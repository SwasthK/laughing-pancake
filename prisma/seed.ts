import { OrganizedBy } from "@/types";
import { PrismaClient } from "@prisma/client";
import { Captions } from "lucide-react";

const prisma = new PrismaClient();

const users = [
  { name: "jogn", email: "220942@sdmcujire.in" },
  { name: "will", email: "220943@sdmcujire.in" },
  { name: "smith", email: "220944@sdmcujire.in" },
  { name: "jogn", email: "220945@sdmcujire.in" },
  { name: "zoro", email: "220946@sdmcujire.in" },
  { name: "luffy", email: "220947@sdmcujire.in" },
  { name: "sanji", email: "220948@sdmcujire.in" },
  { name: "kraken", email: "220949@sdmcujire.in" },
  { name: "nami", email: "220950@sdmcujire.in" },
  { name: "robin", email: "220951@sdmcujire.in" },
];

async function main() {
  console.log("Seeding users...");
  const createdUsers = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  const admin = createdUsers[0].id; // Picking the first user as admin

  console.log("Seeding programs and posters...");
  const programs = [
    ...Array.from({ length: 20 }, (_, i) => ({
      programSlug: `program-${i + 1}`,
      creadtedByUserID: admin,
      poster: {
        title: `FEST ${i + 1}`,
        image:
          "https://images.unsplash.com/photo-1738839406047-09f5a018d9bb?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: JSON.stringify({
          type: "doc",
          content: [{ type: "paragraph", content: [] }],
        }),
        date: new Date(Date.now() + (i + 10) * 1000 * 60 * 60 * 24),
        time: new Date(Date.now()),
        endDate: new Date(Date.now() + (i + 4) * 1000 * 60 * 60 * 24),
        venue: `Venue ${i + 1}`,
        brochure: `Brochure ${i + 1}`,
        contact: `Contact ${i + 1}`,
        link: "https://google.com",
        eventType: "MEETUP",
        organizedBy: OrganizedBy.BCA,
      },
    })),
  ];

  const createdProgram = await Promise.all(
    programs.map((program) =>
      prisma.program.create({
        data: {
          programSlug: program.programSlug,
          creadtedByUserID: program.creadtedByUserID,
        },
      })
    )
  );

  const events = [
    {
      programId: createdProgram[0].programId,
      name: `Event_1`,
      caption: `short caption for event 1`,
      participants: (Math.random() * 10) % 5,
    },
    {
      programId: createdProgram[0].programId,
      name: `Event_2`,
      caption: `short caption for event 2`,
      participants: (Math.random() * 10) % 5,
    },
    {
      programId: createdProgram[1].programId,
      name: `Event_1`,
      caption: `short caption for event 2`,
      participants: (Math.random() * 10) % 5,
    },
    {
      programId: createdProgram[2].programId,
      name: `Event_1`,
      caption: `short caption for event 2`,
      participants: (Math.random() * 10) % 5,
    },
  ];

  const creaetdEvents = await Promise.all(
    events.map((event) => {
      return prisma.event.create({
        data: event,
      });
    })
  );

  const eventHeads = [
    {
      userId: createdUsers[0].id,
      eventId: creaetdEvents[0].eventId,
    },
    {
      userId: createdUsers[1].id,
      eventId: creaetdEvents[0].eventId,
    },
    {
      userId: createdUsers[2].id,
      eventId: creaetdEvents[1].eventId,
    },
    {
      userId: createdUsers[3].id,
      eventId: creaetdEvents[1].eventId,
    },
    {
      userId: createdUsers[4].id,
      eventId: creaetdEvents[2].eventId,
    },
    {
      userId: createdUsers[5].id,
      eventId: creaetdEvents[2].eventId,
    },
  ];

  const createdEventHead = await Promise.all(
    eventHeads.map((eventHead) => {
      return prisma.eventHead.create({
        data: eventHead,
      });
    })
  );
  const formattedProgram = programs.map((program, idx) => {
    if (idx == 0 || idx == 1 || idx == 2)
      program.poster.link = `${process.env.DOMAIN_URL}/events/form/${program.programSlug}`;
    return {
      ...program,
      poster: {
        ...program.poster,
        programId: createdProgram[idx].programId,
      },
    };
  });

  await Promise.all(
    formattedProgram.map((program) => {
      return prisma.poster.create({
        data: program.poster,
      });
    })
  );

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
