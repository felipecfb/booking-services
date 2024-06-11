/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `establishments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `establishments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "establishments" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "establishments_ownerId_key" ON "establishments"("ownerId");
