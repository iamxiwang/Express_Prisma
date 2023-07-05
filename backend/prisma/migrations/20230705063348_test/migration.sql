/*
  Warnings:

  - You are about to drop the column `content` on the `Joke` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contents]` on the table `Joke` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contents` to the `Joke` table without a default value. This is not possible if the table is not empty.

*/


-- AlterTable
ALTER TABLE "Joke"
RENAME COLUMN "content" TO "contents"


