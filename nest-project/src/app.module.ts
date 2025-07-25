import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from './prisma/prisma.service';
import { ProjectModule } from './project/project.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { CompanyMembersModule } from './company_members/company_members.module';
import { UserProjectModule } from './user_project/user_project.module';
import { TaskModule } from './task/task.module';
import { TodoModule } from './todo/todo.module';
import { UserTodoModule } from './user_todo/user_todo.module';
import { InvitedMemberModule } from './invited_member/invited_member.module';
import { AuthModule } from './auth/auth.module';
import { EventsGateway } from './events/events.gateway';
import { NotificationModule } from './notifications/notifications.module';
//import { WebsocketbackendGateway } from './websocketbackend/websocketbackend.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    BullModule.registerQueue({
      name: 'notification-queue',
    }),

    ProjectModule,
    UsersModule,
    CompanyModule,
    CompanyMembersModule,
    UserProjectModule,
    TaskModule,
    TodoModule,
    UserTodoModule,
    InvitedMemberModule,
    AuthModule,
    NotificationModule,
  ],
  providers: [PrismaService, EventsGateway],
  exports: [PrismaService],
})
export class AppModule {}
