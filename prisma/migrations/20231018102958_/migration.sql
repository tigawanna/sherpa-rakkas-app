/*
  Warnings:

  - You are about to drop the column `last_proompted_on` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_proompted_on",
ADD COLUMN     "last_letter_on" TEXT,
ADD COLUMN     "last_resume_on" TEXT;
