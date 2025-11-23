-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(255) NOT NULL DEFAULT 'temp_hash_value';
