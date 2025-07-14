import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationService } from './notifications.service';
import { NotificationProcessor } from './notifications.processor';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification-queue',
    }),
  ],
  providers: [NotificationService, NotificationProcessor, PrismaService, EventsGateway],
  exports: [NotificationService],
})
export class NotificationModule {}