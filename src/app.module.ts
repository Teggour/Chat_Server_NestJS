import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
// import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService /*, ChatGateway ,  PrismaService */],
})
export class AppModule {}
