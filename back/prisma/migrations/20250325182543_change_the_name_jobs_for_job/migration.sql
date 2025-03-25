/*
  Warnings:

  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_userId_fkey";

-- DropTable
DROP TABLE "jobs";

-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "application_status" "JobStatus" NOT NULL DEFAULT 'APPLIED',
    "description" TEXT NOT NULL,
    "feedback" TEXT,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
