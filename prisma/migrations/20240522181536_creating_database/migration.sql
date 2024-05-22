-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(127) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `role` ENUM('ASSOCIATE', 'ADMIN') NOT NULL DEFAULT 'ASSOCIATE',
    `password` VARCHAR(127) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adress` (
    `addressId` VARCHAR(191) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `number` VARCHAR(5) NOT NULL,
    `neighborhood` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `state` VARCHAR(30) NOT NULL,
    `zipCode` VARCHAR(8) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Associate` (
    `associateId` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `birthAt` DATETIME(3) NOT NULL,
    `document` VARCHAR(11) NOT NULL,
    `healthInsuranceIdentifier` VARCHAR(20) NOT NULL,
    `addressId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Associate_userId_key`(`userId`),
    PRIMARY KEY (`associateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specialty` (
    `specialtyId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Specialty_name_key`(`name`),
    PRIMARY KEY (`specialtyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `unitId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `displayName` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `addressId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Unit_name_key`(`name`),
    UNIQUE INDEX `Unit_displayName_key`(`displayName`),
    UNIQUE INDEX `Unit_addressId_key`(`addressId`),
    PRIMARY KEY (`unitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnitHasSpecialty` (
    `unitHasSpecialtyId` VARCHAR(191) NOT NULL,
    `unitId` VARCHAR(191) NOT NULL,
    `specialtyId` VARCHAR(191) NOT NULL,
    `isPrincipalSpecialty` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`unitHasSpecialtyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `doctorId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(11) NOT NULL,
    `MedicalRegistrationNumber` VARCHAR(11) NOT NULL,
    `unitId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`doctorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorHasSpecialty` (
    `doctorHasSpecialtyId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `specialtyId` VARCHAR(191) NOT NULL,
    `isPrincipalSpecialty` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`doctorHasSpecialtyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Associate` ADD CONSTRAINT `Associate_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Adress`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Associate` ADD CONSTRAINT `Associate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit` ADD CONSTRAINT `Unit_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Adress`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnitHasSpecialty` ADD CONSTRAINT `UnitHasSpecialty_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`unitId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnitHasSpecialty` ADD CONSTRAINT `UnitHasSpecialty_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `Specialty`(`specialtyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`unitId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorHasSpecialty` ADD CONSTRAINT `DoctorHasSpecialty_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`doctorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorHasSpecialty` ADD CONSTRAINT `DoctorHasSpecialty_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `Specialty`(`specialtyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
