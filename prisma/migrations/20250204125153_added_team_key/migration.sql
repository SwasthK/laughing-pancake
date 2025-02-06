/*
  Warnings:

  - A unique constraint covering the columns `[teamKey]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamKey` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "teamKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamKey_key" ON "Team"("teamKey");

-- CreateIndex
CREATE INDEX "Team_teamKey_idx" ON "Team"("teamKey");
