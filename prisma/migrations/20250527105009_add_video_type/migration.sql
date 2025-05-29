-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('STANDARD', 'LIVE', 'TREND');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "videoType" "VideoType" NOT NULL DEFAULT 'STANDARD';
