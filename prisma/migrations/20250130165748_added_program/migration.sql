/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contact` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `conver_image` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_reg_link` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_time` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_title` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caption` to the `Event` table without a default value. This is not possible if the table is not empty.
  - The required column `eventId` was added to the `Event` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participants` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeamStatus" AS ENUM ('PENDING', 'REGISTERED', 'VERIFIED', 'DISQUALIFIED');

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_user_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "contact",
DROP COLUMN "conver_image",
DROP COLUMN "course_id",
DROP COLUMN "department_id",
DROP COLUMN "event_date",
DROP COLUMN "event_description",
DROP COLUMN "event_id",
DROP COLUMN "event_location",
DROP COLUMN "event_reg_link",
DROP COLUMN "event_time",
DROP COLUMN "event_title",
DROP COLUMN "user_id",
ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "participants" INTEGER NOT NULL,
ADD COLUMN     "programId" TEXT NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "event_id";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Department";

-- DropEnum
DROP TYPE "CourseName";

-- DropEnum
DROP TYPE "DepartmentName";

-- CreateTable
CREATE TABLE "Program" (
    "programId" TEXT NOT NULL,
    "programSlug" TEXT NOT NULL,
    "creadtedByUserID" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("programId")
);

-- CreateTable
CREATE TABLE "Poster" (
    "posterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "brochure" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "organizedBy" TEXT NOT NULL,
    "link" TEXT,
    "programId" TEXT NOT NULL,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("posterId")
);

-- CreateTable
CREATE TABLE "EventHead" (
    "headId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventHead_pkey" PRIMARY KEY ("headId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "teamLeaderId" TEXT NOT NULL,
    "TeamStatus" "TeamStatus" NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "Participant" (
    "participantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_programSlug_key" ON "Program"("programSlug");

-- CreateIndex
CREATE INDEX "Program_programSlug_idx" ON "Program"("programSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Poster_programId_key" ON "Poster"("programId");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_creadtedByUserID_fkey" FOREIGN KEY ("creadtedByUserID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poster" ADD CONSTRAINT "Poster_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("programId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHead" ADD CONSTRAINT "EventHead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHead" ADD CONSTRAINT "EventHead_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("programId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamLeaderId_fkey" FOREIGN KEY ("teamLeaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("programId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;
