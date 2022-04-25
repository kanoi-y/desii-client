-- CreateTable
CREATE TABLE "OneOnOneRoom" (
    "id" TEXT NOT NULL,
    "memberId1" TEXT NOT NULL,
    "memberId2" TEXT NOT NULL,
    "latestMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OneOnOneRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OneOnOneRoom_memberId1_memberId2_key" ON "OneOnOneRoom"("memberId1", "memberId2");

-- AddForeignKey
ALTER TABLE "OneOnOneRoom" ADD CONSTRAINT "OneOnOneRoom_memberId1_fkey" FOREIGN KEY ("memberId1") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneOnOneRoom" ADD CONSTRAINT "OneOnOneRoom_memberId2_fkey" FOREIGN KEY ("memberId2") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
