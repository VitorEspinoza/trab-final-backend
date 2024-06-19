/*
  Warnings:

  - A unique constraint covering the columns `[zipCode,number]` on the table `Adress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Adress_zipCode_number_key` ON `Adress`(`zipCode`, `number`);
