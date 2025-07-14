import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createNotification(data: {
        userId: number;
        message: string;
        todoId?: number;
        projectId?: number;
    }): Promise<{
        id: number;
        userId: number;
        message: string;
        todoId: number | null;
        projectId: number | null;
        createdAt: Date;
    }>;
}
