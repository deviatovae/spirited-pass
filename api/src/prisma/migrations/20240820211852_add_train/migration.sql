/*
  Warnings:

  - Added the required column `trainId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "trainId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "seats" INTEGER NOT NULL,
    "departureAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Train_departureAt_key" ON "Train"("departureAt");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
