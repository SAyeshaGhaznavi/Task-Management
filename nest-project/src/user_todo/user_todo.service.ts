import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserTodoDto } from './dto/create-user_todo.dto';
import { UpdateUserTodoDto } from './dto/update-user_todo.dto';
import { EventsGateway } from '../events/events.gateway';
import { NotificationService } from '../notifications/notifications.service'
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class UserTodoService {
  private readonly logger = new Logger(UserTodoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly eventsGateway: EventsGateway,
    @InjectQueue('notification-queue') private notificationQueue: Queue,
  ) {}

  async create(createUserTodoDto: CreateUserTodoDto) {
    const {user_id, project_id, todo_id} = createUserTodoDto;

    this.logger.log(`🔄 Processing todo assignment: User ${user_id}, Todo ${todo_id}, Project ${project_id}`);

    // Validate todo exists
    const todo = await this.prisma.todo.findUnique({
      where: { todo_id },
      select: { 
        task_id: true,
        todo_name: true,
        todo_description: true,
      },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    const member = await this.prisma.user_project.findFirst({
      where: {
        user_id: user_id,
        project_id: project_id,
      },
    });

    if (!member) {
      throw new Error('User is not assigned to this project');
    }    

    const todoTask = await this.prisma.todo.findFirst({
      where: {
        todo_id: todo_id,
        task_id: todo.task_id,
      }
    });

    const todoProject = await this.prisma.task.findFirst({
      where: {
        task_id: todoTask?.task_id,
        project_id: project_id,
      }
    });

    if (!todoProject) {
      throw new Error('Todo is not part of the same project');
    }

    const project = await this.prisma.project.findUnique({
      where: { project_id },
      select: { project_name: true },
    });

    const userTodo = await this.prisma.user_todo.create({ 
      data: createUserTodoDto
    });

    this.logger.log(`✅ Todo ${todo_id} successfully assigned to user ${user_id}`);

    const notificationPayload = {
      todoId: todo_id,
      projectId: project_id,
      todoTitle: todo.todo_name || `Todo ${todo_id}`,
      projectName: project?.project_name || `Project ${project_id}`,
      message: `You've been assigned a new TODO: ${todo.todo_name || `Todo ${todo_id}`}`,
    };

    try {
      await this.notificationQueue.add('create-notification', {
        userId: user_id,
        ...notificationPayload,
        message: `You've been assigned a new TODO (ID: ${todo_id})`,
      });

      const notification = await this.notificationService.createNotification({
        userId: user_id,
        todoId: todo_id,
        projectId: project_id,
        message: notificationPayload.message,
      });

      this.eventsGateway.notifyTodoAssigned(user_id, {
        ...notificationPayload,
        createdAt: notification.createdAt,
      });

      this.logger.log(`📢 Notification sent to user ${user_id} for todo ${todo_id}`);
    } catch (error) {
      this.logger.error(`❌ Failed to send notification to user ${user_id}: ${error.message}`);
    }

    return userTodo;
  }

  async findTodo(userid: number) {
    const userTodos = await this.prisma.user_todo.findMany({
      where: {
        user_id: userid,
      },
    });

    const todoIds = userTodos.map((up) => up.todo_id);

    const todos = await this.prisma.todo.findMany({
      where: {
        todo_id: { in: todoIds },
      },
    });

    return todos;
  }

  findAll() {
    return this.prisma.user_todo.findMany();
  }

  findOne(user_id: number, todo_id: number) {
    return this.prisma.user_todo.findUnique({
      where: {
        user_id_todo_id: {
          user_id,
          todo_id,
        },
      },
    });
  }

  update(user_id: number, todo_id: number, updateUserTodoDto: UpdateUserTodoDto) {
    return this.prisma.user_todo.update({
      where: {
        user_id_todo_id: {
          user_id,
          todo_id,
        },
      },
      data: updateUserTodoDto,
    });
  }

  remove(user_id: number, todo_id: number) {
    return this.prisma.user_todo.delete({
      where: {
        user_id_todo_id: {
          user_id,
          todo_id,
        },
      },
    });
  }
}