import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getAllContactByOwnerId(ownerId: number) {
    this.logger.log(`Fetching contacts for ownerId: ${ownerId}`);
    return this.prismaService.contact.findMany({
      where: {
        ownerId: ownerId,
      },
      include: {
        contact: true,
      },
      omit: {
        contactId: true,
      },
    });
  }
}
