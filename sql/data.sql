-- Active: 1744182489396@@127.0.0.1@3306@first_chat
-- Sample data for First Chat application

-- Clear existing data (if needed)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `Message`;
TRUNCATE TABLE `Contact`;
TRUNCATE TABLE `ConversationParticipant`;
TRUNCATE TABLE `Conversation`;
TRUNCATE TABLE `User`;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert sample users - Plain password included as comment
INSERT INTO `User` (`name`, `password`, `email`, `avatar`, `status`) VALUES
('John Doe', '$2a$10$YWd/7S6uHBB55gy0iHmJsuhr.X7IZRGg1zi0FM24wdPmw0NusRThy', 'john@example.com', 'https://i.pravatar.cc/400?img=11', 'online'),          -- Password: john123
('Jane Smith', '$2a$10$QcqMKR1LZji4bF0YaZdHuetO5aDaWahy9O77e07KIyiBFkmrDOquO', 'jane@example.com', 'https://i.pravatar.cc/400?img=47', 'online'),         -- Password: jane123
('Alex Johnson', '$2a$10$oEt/vEqE0.bvwvbmbWI4H.Z30WKmtjZpfGoZsiLgHlMBYrOXkdbRm', 'alex@example.com', 'https://i.pravatar.cc/400?img=57', 'away'),         -- Password: alex123
('Emily Williams', '$2a$10$BZHY9TZUGro.94DUKjGJaeIqOtJ3.iq9/I1Pu4hvKVCb5es0M6IUS', 'emily@example.com', 'https://i.pravatar.cc/400?img=43', 'offline'),   -- Password: emily123
('Mike Brown', '$2a$10$gWRV1Y7XxjrBSd2qO3ZiFuaUsTzeiT0XfXDIPwZjU5SgpA5rQCopW', 'mike@example.com', 'https://i.pravatar.cc/400?img=13', 'online');        -- Password: mike123

-- For testing, you can also insert with plain passwords
-- Uncomment this if you want to skip hashing for testing:
/*
INSERT INTO `User` (`name`, `password`, `email`, `avatar`, `status`) VALUES
('Test User', 'testpassword', 'test@example.com', 'avatar6.png', 'online');
*/

-- Insert sample conversations
INSERT INTO `Conversation` (`name`, `type`) VALUES
('John and Jane', 'ONE_TO_ONE'),
('Alex and Emily', 'ONE_TO_ONE'),
('Project Discussion', 'GROUP'),
('Friends Group', 'GROUP'),
('Team Chat', 'GROUP');

-- Insert conversation participants
INSERT INTO `ConversationParticipant` (`userId`, `conversationId`, `joinedAt`) VALUES
-- John and Jane conversation
(1, 1, NOW()),
(2, 1, NOW()),
-- Alex and Emily conversation
(3, 2, NOW()),
(4, 2, NOW()),
-- Project Discussion group
(1, 3, NOW()),
(2, 3, NOW()),
(3, 3, NOW()),
-- Friends Group
(2, 4, NOW()),
(3, 4, NOW()),
(4, 4, NOW()),
(5, 4, NOW()),
-- Team Chat
(1, 5, NOW()),
(2, 5, NOW()),
(3, 5, NOW()),
(4, 5, NOW()),
(5, 5, NOW());

-- Insert sample messages
INSERT INTO `Message` (`text`, `senderId`, `conversationId`, `timestamp`, `status`) VALUES
-- John and Jane conversation
('Hey Jane, how are you?', 1, 1, NOW() - INTERVAL 2 HOUR, 'READ'),
('Hi John! I\'m good, thanks. How about you?', 2, 1, NOW() - INTERVAL 115 MINUTE, 'READ'),
('Doing well! Want to grab lunch later?', 1, 1, NOW() - INTERVAL 110 MINUTE, 'READ'),
('Sure, that sounds great!', 2, 1, NOW() - INTERVAL 105 MINUTE, 'READ'),
-- Alex and Emily conversation
('Emily, did you see that new movie?', 3, 2, NOW() - INTERVAL 5 HOUR, 'READ'),
('Not yet, is it good?', 4, 2, NOW() - INTERVAL 295 MINUTE, 'READ'),
('Yes, it\'s amazing! We should go watch it this weekend.', 3, 2, NOW() - INTERVAL 290 MINUTE, 'READ'),
('Sounds like a plan!', 4, 2, NOW() - INTERVAL 285 MINUTE, 'READ'),
-- Project Discussion group
('Team, let\'s discuss the project timeline.', 1, 3, NOW() - INTERVAL 3 HOUR, 'READ'),
('I think we need to extend the deadline.', 2, 3, NOW() - INTERVAL 175 MINUTE, 'READ'),
('I agree with Jane.', 3, 3, NOW() - INTERVAL 170 MINUTE, 'READ'),
('Let\'s schedule a meeting to discuss this further.', 1, 3, NOW() - INTERVAL 165 MINUTE, 'READ'),
-- Friends Group
('Who\'s up for a weekend getaway?', 2, 4, NOW() - INTERVAL 10 HOUR, 'READ'),
('I\'m in!', 3, 4, NOW() - INTERVAL 595 MINUTE, 'READ'),
('Count me in too!', 4, 4, NOW() - INTERVAL 590 MINUTE, 'READ'),
('Great! Let\'s plan it out.', 2, 4, NOW() - INTERVAL 585 MINUTE, 'READ'),
('Sorry, I can\'t make it this weekend.', 5, 4, NOW() - INTERVAL 580 MINUTE, 'READ'),
-- Team Chat
('Good morning team!', 1, 5, NOW() - INTERVAL 8 HOUR, 'READ'),
('Morning, John!', 2, 5, NOW() - INTERVAL 479 MINUTE, 'READ'),
('Hello everyone!', 3, 5, NOW() - INTERVAL 478 MINUTE, 'READ'),
('Hi team! Ready for today\'s challenges.', 4, 5, NOW() - INTERVAL 477 MINUTE, 'READ'),
('Let\'s have a productive day!', 5, 5, NOW() - INTERVAL 476 MINUTE, 'READ');

-- Insert sample contacts
INSERT INTO `Contact` (`contactName`, `ownerId`, `contactId`, `status`) VALUES
-- John's contacts
('Jane', 1, 2, 'ACCEPTED'),
('Alex', 1, 3, 'ACCEPTED'),
('Emily', 1, 4, 'PENDING'),
('Mike', 1, 5, 'BLOCKED'),
-- Jane's contacts
('John', 2, 1, 'ACCEPTED'),
('Alex', 2, 3, 'ACCEPTED'),
('Emily', 2, 4, 'ACCEPTED'),
-- Alex's contacts
('John', 3, 1, 'ACCEPTED'),
('Jane', 3, 2, 'ACCEPTED'),
('Mike', 3, 5, 'ACCEPTED'),
-- Emily's contacts
('Jane', 4, 2, 'ACCEPTED'),
('Mike', 4, 5, 'PENDING'),
-- Mike's contacts
('Alex', 5, 3, 'ACCEPTED'),
('Emily', 5, 4, 'ACCEPTED');

SELECT 'Sample data has been successfully inserted!' AS 'Success';