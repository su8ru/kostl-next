/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Train` (
    `id` VARCHAR(191) NOT NULL,
    `day` ENUM('WEEKDAY', 'HOLIDAY') NOT NULL,
    `operationId` VARCHAR(191) NOT NULL,
    `depTime` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`, `day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operation` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeChange` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stationId` VARCHAR(191) NOT NULL,
    `typeId` VARCHAR(191) NOT NULL,
    `trainId` VARCHAR(191) NOT NULL,
    `trainDay` ENUM('WEEKDAY', 'HOLIDAY') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Train` ADD CONSTRAINT `Train_operationId_fkey` FOREIGN KEY (`operationId`) REFERENCES `Operation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeChange` ADD CONSTRAINT `TypeChange_trainId_trainDay_fkey` FOREIGN KEY (`trainId`, `trainDay`) REFERENCES `Train`(`id`, `day`) ON DELETE RESTRICT ON UPDATE CASCADE;
