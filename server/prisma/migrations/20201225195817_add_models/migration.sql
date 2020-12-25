-- CreateTable
CREATE TABLE `Operation` (
    `id` VARCHAR(191) NOT NULL,
    `day` ENUM('WEEKDAY', 'HOLIDAY') NOT NULL,

    PRIMARY KEY (`id`,`day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Train` (
    `id` VARCHAR(191) NOT NULL,
    `day` ENUM('WEEKDAY', 'HOLIDAY') NOT NULL,
    `operationId` VARCHAR(191) NOT NULL,
    `typeId` VARCHAR(191),
    `destinationId` VARCHAR(191),

    PRIMARY KEY (`id`,`day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Destination` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `keio_id` VARCHAR(191),
    `odpt_id` VARCHAR(191),
UNIQUE INDEX `Destination.keio_id_unique`(`keio_id`),
UNIQUE INDEX `Destination.odpt_id_unique`(`odpt_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `keio_id` VARCHAR(191),
    `odpt_id` VARCHAR(191),
UNIQUE INDEX `Type.keio_id_unique`(`keio_id`),
UNIQUE INDEX `Type.odpt_id_unique`(`odpt_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Train` ADD FOREIGN KEY (`operationId`) REFERENCES `Operation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Train` ADD FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Train` ADD FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
