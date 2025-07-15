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
    const { userId, todoId, projectId, message, assignedBy } = job.data;
    console.log('Processing notification job:', job.data);

    // Prevent notifying the assigning user if userId === assignedBy
    if (assignedBy && userId === assignedBy) {
      console.log('Skipping notification: assigned user is the same as assigning user.');
      return null;
    }

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
