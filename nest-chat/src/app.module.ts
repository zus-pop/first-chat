import { Module } from '@nestjs/common';
import { PusherModule } from './modules/pusher/pusher.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PusherModule,
    PrismaModule,
    UserModule,
    AuthModule,
    ContactModule,
    ConversationModule,
    WebsocketModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
