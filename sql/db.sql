-- Active: 1744182489396@@127.0.0.1@3306@first_chat

DROP DATABASE IF EXISTS `first_chat`;
CREATE DATABASE `first_chat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `first_chat`;

CREATE TABLE `Conversation` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` ENUM('GROUP', 'ONE_TO_ONE') NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `User` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `password` VARCHAR(255) NOT NULL,
  `email` CHAR(255) NOT NULL,
  `avatar` CHAR(255),
  `status` ENUM('ONLINE', 'OFFLINE', 'AWAY'),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ConversationParticipant` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `userId` INT,
  `conversationId` INT,
  `joinedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `leavedAt` TIMESTAMP,
  FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Message` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `text` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `senderId` INT NOT NULL,
  `conversationId` INT NOT NULL,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('SENT', 'DELIVERED', 'READ'),
  FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`),
  FOREIGN KEY (`senderId`) REFERENCES `User`(`id`),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Contact` (
  `ownerId` INT NOT NULL,
  `contactId` INT NOT NULL,
  `contactName` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` ENUM('PENDING', 'ACCEPTED', 'BLOCKED'),
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`),
  FOREIGN KEY (`contactId`) REFERENCES `User`(`id`),
  PRIMARY KEY (`OwnerId`, `contactId`)
);

