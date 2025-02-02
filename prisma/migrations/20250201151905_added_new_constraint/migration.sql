/*
  Warnings:

  - A unique constraint covering the columns `[programId,name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,eventId]` on the table `EventHead` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,eventId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,teamId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[programId,teamLeaderId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "teamName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_programId_name_key" ON "Event"("programId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "EventHead_userId_eventId_key" ON "EventHead"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_eventId_key" ON "Participant"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_teamId_key" ON "Participant"("userId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_programId_teamLeaderId_key" ON "Team"("programId", "teamLeaderId");
