/*
  Warnings:

  - A unique constraint covering the columns `[targetUserId,MessageId]` on the table `ReadManagement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReadManagement_targetUserId_MessageId_key" ON "ReadManagement"("targetUserId", "MessageId");
