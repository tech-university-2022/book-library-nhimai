/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRateBook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `is_like` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRateBook" DROP CONSTRAINT "UserRateBook_book_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRateBook" DROP CONSTRAINT "UserRateBook_user_id_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "is_like" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserRateBook";
