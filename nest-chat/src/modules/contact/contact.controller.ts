import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService, // Assuming you have a ContactService to handle business logic
  ) {}

  @Get(':id')
  async findByUserId(@Param('id', ParseIntPipe) userId: number) {
    return this.contactService.getAllContactByOwnerId(userId);
  }
}
