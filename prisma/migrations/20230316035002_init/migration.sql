/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Author" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION DEFAULT 0,
    "Is_like" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
