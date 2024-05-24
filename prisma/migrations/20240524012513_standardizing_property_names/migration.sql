/*
  Warnings:

  - You are about to drop the column `MedicalRegistrationNumber` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `medicalRegistrationNumber` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `MedicalRegistrationNumber`,
    ADD COLUMN `medicalRegistrationNumber` VARCHAR(11) NOT NULL;
