-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_id_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_id_fkey" FOREIGN KEY ("id") REFERENCES "Room"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;
