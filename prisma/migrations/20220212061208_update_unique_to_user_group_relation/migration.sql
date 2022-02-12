/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `UserGroupRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserGroupRelation_userId_groupId_key" ON "UserGroupRelation"("userId", "groupId");
