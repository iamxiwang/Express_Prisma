/*
  Warnings:

  - You are about to drop the column `contents` on the `Joke` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[content]` on the table `Joke` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Joke` table without a default value. This is not possible if the table is not empty.

*/


-- AlterTable
ALTER TABLE "Joke"
RENAME COLUMN "contents" TO "content";

-- RenameIndex
ALTER INDEX "Joke_contents_key" RENAME TO "Joke_content_key";

