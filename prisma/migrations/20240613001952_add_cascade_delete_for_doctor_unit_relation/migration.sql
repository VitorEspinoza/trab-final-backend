-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `Doctor_unitId_fkey`;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`unitId`) ON DELETE CASCADE ON UPDATE CASCADE;
