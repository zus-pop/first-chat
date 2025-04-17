import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Conversation, Message } from '../../../generated/prisma';
import {
  CONNECTION_EVENT,
  DISCONNECTION_EVENT,
  JOIN_ROOM_EVENT,
  MESSAGE_EVENT,
  SENT_MESSAGE_EVENT,
} from './constant';
import { MessageService } from '../message/message.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from '../message/dto';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  private server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage(MESSAGE_EVENT)
  async handleMessage(@MessageBody() message: CreateMessageDto) {
    // this.logger.log('Message received:', message);
    const newMessage = await this.messageService.createMessage({
      text: message.text,
      senderId: message.senderId,
      conversationId: message.conversationId,
    });
    this.server
      .to(this.getRoom(newMessage.conversation))
      .emit(SENT_MESSAGE_EVENT, {
        ...newMessage,
      });
  }

  private getRoom(conversation: Conversation) {
    if (conversation.type === 'GROUP') {
      return `GROUP_${conversation.id}`;
    }

    return `PRIVATE_${conversation.id}`;
  }

  @SubscribeMessage(JOIN_ROOM_EVENT)
  handleJoinRoom(
    @MessageBody() conversation: Conversation,
    @ConnectedSocket() client: Socket,
  ) {
    const room = this.getRoom(conversation);
    client.join(room);
    this.logger.log(`Client joined room: ${room}`);
    return {
      message: `Joined room: ${room}`,
    };
  }

  @SubscribeMessage(CONNECTION_EVENT)
  handleConnection() {
    this.logger.log('Client connected');
  }

  @SubscribeMessage(DISCONNECTION_EVENT)
  handleDisconnect() {
    this.logger.log('Client disconnected');
  }
}
