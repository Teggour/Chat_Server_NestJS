import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from '@src/prisma.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, PrismaService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
