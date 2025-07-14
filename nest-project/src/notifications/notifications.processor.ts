import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationService } from './notifications.service';
import { EventsGateway } from '../events/events.gateway';

@Processor('notification-queue')
export class NotificationProcessor extends WorkerHost {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly eventsGateway: EventsGateway,
  ) {
    super();
  }

  async process(job: Job) {
    const { userId, todoId, projectId, message } = job.data;
    console.log('Processing notification job:', job.data);

    const notification = await this.notificationService.createNotification({
      userId,
      todoId,
      projectId,
      message,
    });

    this.eventsGateway.notifyTodoAssigned(userId, {
      todoId,
      projectId,
      message,
      createdAt: notification.createdAt,
    });

    return notification;
  }
}
