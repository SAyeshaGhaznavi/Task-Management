// import { Module } from '@nestjs/common';
// import { UserTodoService } from './user_todo.service';
// import { UserTodoController } from './user_todo.controller';
// import { EventsModule } from '../events/events.module';
// import { NotificationModule } from '../notifications/notifications.module'
// import { PrismaService } from 'src/prisma/prisma.service';

// @Module({
//   imports: [EventsModule, NotificationModule],
//   controllers: [UserTodoController],
//   providers: [UserTodoService, PrismaService],
// })
// export class UserTodoModule {}

import { Module } from '@nestjs/common';
import { UserTodoService } from './user_todo.service';
import { UserTodoController } from './user_todo.controller';
import { EventsModule } from '../events/events.module';
import { NotificationModule } from '../notifications/notifications.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    EventsModule,
    NotificationModule,
    BullModule.registerQueue({
      name: 'notification-queue', 
    }),
  ],
  controllers: [UserTodoController],
  providers: [UserTodoService, PrismaService],
})
export class UserTodoModule {}
