/*
  Warnings:

  - You are about to drop the `OneOnOneRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OneOnOneRoom" DROP CONSTRAINT "OneOnOneRoom_latestMessageId_fkey";

-- DropForeignKey
ALTER TABLE "OneOnOneRoom" DROP CONSTRAINT "OneOnOneRoom_memberId1_fkey";

-- DropForeignKey
ALTER TABLE "OneOnOneRoom" DROP CONSTRAINT "OneOnOneRoom_memberId2_fkey";

-- DropTable
DROP TABLE "OneOnOneRoom";

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "groupId" TEXT,
    "latestMessageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_groupId_key" ON "Room"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_latestMessageId_key" ON "Room"("latestMessageId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_latestMessageId_fkey" FOREIGN KEY ("latestMessageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
