import { Injectable } from '@nestjs/common';
import { ChatMessage, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '@src/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(
    messageData: Prisma.ChatMessageCreateInput,
  ): Promise<ChatMessage> {
    if (!messageData.text) return;

    const { author } = messageData;

    const formattedMessageData = {
      ...messageData,
      author: this.getFormattedUser(author),
    };

    const newMessage = await this.prisma.chatMessage.create({
      data: formattedMessageData,
    });

    return newMessage;
  }

  async getMessages(): Promise<ChatMessage[]> {
    const messages = await this.prisma.chatMessage.findMany();

    return messages;
  }

  async clearMessages(): Promise<Prisma.BatchPayload> {
    return this.prisma.chatMessage.deleteMany();
  }

  async removeMessage(id: string) {
    return this.prisma.chatMessage.delete({ where: { id } });
  }

  getFormattedUser(
    author: Partial<ChatMessage['author']>,
  ): ChatMessage['author'] {
    const newUser = { ...author };

    if (!author.id) {
      newUser.id = uuidv4();
    }

    if (!author.name) {
      newUser.name = 'Anonymous User';
    }

    if (!author.given_name) {
      newUser.given_name = 'Anonymous';
    }

    if (!author.family_name) {
      newUser.family_name = 'User';
    }

    if (!author.email) {
      newUser.email = '';
    }

    if (!author.picture) {
      newUser.picture = '';
    }

    return newUser as ChatMessage['author'];
  }
}
