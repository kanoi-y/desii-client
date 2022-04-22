/*
  Warnings:

  - You are about to drop the column `latestMessage` on the `OneOnOneRoom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[latestMessageId]` on the table `OneOnOneRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OneOnOneRoom" DROP COLUMN "latestMessage",
ADD COLUMN     "latestMessageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OneOnOneRoom_latestMessageId_key" ON "OneOnOneRoom"("latestMessageId");

-- AddForeignKey
ALTER TABLE "OneOnOneRoom" ADD CONSTRAINT "OneOnOneRoom_latestMessageId_fkey" FOREIGN KEY ("latestMessageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
