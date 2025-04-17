import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages() {
    const messages = await this.messageService.getMessages(1);
    return messages;
  }
}
