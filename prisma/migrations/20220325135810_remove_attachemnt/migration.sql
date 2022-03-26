/*
  Warnings:

  - You are about to drop the column `iconImageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_createdUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_iconImageId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "iconImageId";

-- DropTable
DROP TABLE "Attachment";
