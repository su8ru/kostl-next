-- DropForeignKey
ALTER TABLE `Train` DROP FOREIGN KEY `Train_operationId_fkey`;

-- AddForeignKey
ALTER TABLE `Train` ADD CONSTRAINT `Train_operationId_day_fkey` FOREIGN KEY (`operationId`, `day`) REFERENCES `Operation`(`id`, `day`) ON DELETE RESTRICT ON UPDATE CASCADE;
