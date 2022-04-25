-- CreateTable
CREATE TABLE "ReadManagement" (
    "id" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "MessageId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReadManagement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadManagement" ADD CONSTRAINT "ReadManagement_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadManagement" ADD CONSTRAINT "ReadManagement_MessageId_fkey" FOREIGN KEY ("MessageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
