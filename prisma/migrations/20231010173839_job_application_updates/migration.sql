/*
  Warnings:

  - You are about to drop the column `projects` on the `JobApplication` table. All the data in the column will be lost.
  - Made the column `description` on table `JobApplication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job_posting_url` on table `JobApplication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `JobApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_userId_fkey";

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "projects",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "job_posting_url" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
