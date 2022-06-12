/*
  Warnings:

  - You are about to drop the column `groupId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_id_fkey";

-- DropIndex
DROP INDEX "Room_groupId_key";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "roomId" TEXT;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "groupId";

-- CreateIndex
CREATE UNIQUE INDEX "Group_roomId_key" ON "Group"("roomId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
