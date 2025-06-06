import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';

@Module({
  providers: [ConversationService],
  exports: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
