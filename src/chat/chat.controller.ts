import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage, Prisma } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('createMessage')
  createMessage(
    @Body() createMessagekDto: Prisma.ChatMessageCreateInput,
  ): Promise<ChatMessage> {
    return this.chatService.createMessage(createMessagekDto);
  }

  @Get('getMessages')
  getMessages(): Promise<ChatMessage[]> {
    return this.chatService.getMessages();
  }
}
