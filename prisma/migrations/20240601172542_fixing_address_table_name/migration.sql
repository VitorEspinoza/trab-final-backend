/*
  Warnings:

  - You are about to drop the `adress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `associate` DROP FOREIGN KEY `Associate_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `unit` DROP FOREIGN KEY `Unit_addressId_fkey`;

-- DropTable
DROP TABLE `adress`;

-- CreateTable
CREATE TABLE `Address` (
    `addressId` VARCHAR(191) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `number` VARCHAR(5) NOT NULL,
    `neighborhood` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `state` VARCHAR(30) NOT NULL,
    `zipCode` VARCHAR(8) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Address_zipCode_number_key`(`zipCode`, `number`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Associate` ADD CONSTRAINT `Associate_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit` ADD CONSTRAINT `Unit_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;
