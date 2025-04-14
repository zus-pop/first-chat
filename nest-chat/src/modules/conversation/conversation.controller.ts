import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get(':id')
  async findByUserId(@Param('id', ParseIntPipe) userId: number) {
    return this.conversationService.getConversationByUserId(userId);
  }
}
