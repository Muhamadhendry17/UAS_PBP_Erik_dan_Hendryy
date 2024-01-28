-- CreateTable
CREATE TABLE `cards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `nik` INTEGER NOT NULL,
    `tempatlahir` VARCHAR(100) NOT NULL,
    `jeniskelamin` VARCHAR(100) NULL,
    `alamat` VARCHAR(100) NOT NULL,
    `agama` VARCHAR(1000) NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
