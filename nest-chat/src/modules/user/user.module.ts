import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConversationModule } from '../conversation/conversation.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [ConversationModule, ContactModule],
})
export class UserModule {}
