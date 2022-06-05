-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_id_fkey" FOREIGN KEY ("id") REFERENCES "Room"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;
