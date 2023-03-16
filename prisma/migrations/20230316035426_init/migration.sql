/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Author" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION DEFAULT 0,
    "Is_like" BOOLEAN,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
