/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `establishments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `establishments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "establishments_slug_key";

-- AlterTable
ALTER TABLE "establishments" ADD COLUMN     "document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "establishments_document_key" ON "establishments"("document");
