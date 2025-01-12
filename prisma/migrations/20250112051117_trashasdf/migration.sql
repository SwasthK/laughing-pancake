/*
  Warnings:

  - You are about to drop the column `expires` on the `EmailList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailList" DROP COLUMN "expires",
ADD COLUMN     "token_expires" TIMESTAMP(3);
