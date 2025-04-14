import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConversationService } from '../conversation/conversation.service';
import { JwtGuard } from '../auth/guards';
import { Me } from '../auth/decorators';
import { ContactService } from '../contact/contact.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
    private readonly contactService: ContactService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me/conversations')
  @UseGuards(JwtGuard)
  getConversations(@Me('id') id: number) {
    return this.conversationService.getConversationByUserId(id);
  }

  @Get('me/contacts')
  @UseGuards(JwtGuard)
  getContacts(@Me('id') id: number) {
    return this.contactService.getAllContactByOwnerId(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
}
