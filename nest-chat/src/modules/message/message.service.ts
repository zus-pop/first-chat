import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessages(conversationId: number) {
    return this.prismaService.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        user: true,
      },
    });
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    return this.prismaService.message.create({
      data: {
        text: createMessageDto.text,
        senderId: createMessageDto.senderId,
        conversationId: createMessageDto.conversationId,
        status: 'SENT',
      },
      include: { conversation: true, user: true },
    });
  }
}
