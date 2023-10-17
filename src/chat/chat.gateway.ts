import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChatService } from './chat.service';
import { Prisma } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    console.log({ server });
  }

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    messagePayload: Prisma.ChatMessageCreateInput,
  ): Promise<void> {
    const message = await this.chatService.createMessage(messagePayload);
    this.server.emit('recieveMessage', message);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleDbClear() {
    await this.chatService.clearMessages();
    this.server.emit('clearMessages', []);
  }
}
