-- CreateTable
CREATE TABLE `Contact` (
    `ownerId` INTEGER NOT NULL,
    `contactId` INTEGER NOT NULL,
    `contactName` VARCHAR(255) NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'BLOCKED') NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `contactId`(`contactId`),
    PRIMARY KEY (`ownerId`, `contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type` ENUM('GROUP', 'ONE_TO_ONE') NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConversationParticipant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `conversationId` INTEGER NULL,
    `joinedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `leavedAt` TIMESTAMP(0) NULL,

    INDEX `conversationId`(`conversationId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NULL,
    `senderId` INTEGER NOT NULL,
    `conversationId` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('SENT', 'DELIVERED', 'READ') NULL,

    INDEX `conversationId`(`conversationId`),
    INDEX `senderId`(`senderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` CHAR(255) NOT NULL,
    `avatar` CHAR(255) NULL,
    `status` ENUM('ONLINE', 'OFFLINE', 'AWAY') NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_ibfk_2` FOREIGN KEY (`contactId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ConversationParticipant` ADD CONSTRAINT `ConversationParticipant_ibfk_1` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ConversationParticipant` ADD CONSTRAINT `ConversationParticipant_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_ibfk_1` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_ibfk_2` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

