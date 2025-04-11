import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getConversationByUserId(userId: number) {
    this.logger.log(`Fetching conversation for userId: ${userId}`);
    return this.prismaService.conversationParticipant
      .findMany({
        where: {
          userId: userId,
        },
        select: {
          conversation: true,
        },
      })
      .then((cv) => cv.map((c) => c.conversation));
  }
}
