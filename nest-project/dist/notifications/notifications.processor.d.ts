import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationService } from './notifications.service';
import { EventsGateway } from '../events/events.gateway';
export declare class NotificationProcessor extends WorkerHost {
    private readonly notificationService;
    private readonly eventsGateway;
    constructor(notificationService: NotificationService, eventsGateway: EventsGateway);
    process(job: Job): Promise<{
        id: number;
        userId: number;
        message: string;
        todoId: number | null;
        projectId: number | null;
        createdAt: Date;
    }>;
}
