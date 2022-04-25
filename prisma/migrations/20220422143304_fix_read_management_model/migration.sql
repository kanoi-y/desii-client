/*
  Warnings:

  - You are about to drop the column `MessageId` on the `ReadManagement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[targetUserId,messageId]` on the table `ReadManagement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `ReadManagement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReadManagement" DROP CONSTRAINT "ReadManagement_MessageId_fkey";

-- DropIndex
DROP INDEX "ReadManagement_targetUserId_MessageId_key";

-- AlterTable
ALTER TABLE "ReadManagement" DROP COLUMN "MessageId",
ADD COLUMN     "messageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReadManagement_targetUserId_messageId_key" ON "ReadManagement"("targetUserId", "messageId");

-- AddForeignKey
ALTER TABLE "ReadManagement" ADD CONSTRAINT "ReadManagement_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
