import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  //this.prisma.notifications
  async createNotification(data: {
    userId: number;
    message: string;
    todoId?: number;
    projectId?: number;
  }) {
    return this.prisma.notification.create({
      data,
    });
  }
}