-- CreateTable
CREATE TABLE `UnitPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operationId` VARCHAR(191) NOT NULL,
    `unitId` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `disabledAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;