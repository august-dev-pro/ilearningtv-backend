/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Channel_userId_key" ON "Channel"("userId");
