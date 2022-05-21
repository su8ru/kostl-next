/*
  Warnings:

  - The primary key for the `Operation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `day` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Operation` DROP PRIMARY KEY,
    ADD COLUMN `day` ENUM('WEEKDAY', 'HOLIDAY') NOT NULL,
    ADD PRIMARY KEY (`id`, `day`);
