/*
  Warnings:

  - You are about to drop the column `author` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `is_like` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Book` table. All the data in the column will be lost.
  - Added the required column `Author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "author",
DROP COLUMN "is_like",
DROP COLUMN "name",
DROP COLUMN "rating",
ADD COLUMN     "Author" TEXT NOT NULL,
ADD COLUMN     "Is_like" BOOLEAN,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Rating" DOUBLE PRECISION DEFAULT 0;
