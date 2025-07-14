import { PrismaService } from '../prisma/prisma.service';
import { CreateUserTodoDto } from './dto/create-user_todo.dto';
import { UpdateUserTodoDto } from './dto/update-user_todo.dto';
import { EventsGateway } from '../events/events.gateway';
import { NotificationService } from '../notifications/notifications.service';
import { Queue } from 'bullmq';
export declare class UserTodoService {
    private readonly prisma;
    private readonly notificationService;
    private readonly eventsGateway;
    private notificationQueue;
    private readonly logger;
    constructor(prisma: PrismaService, notificationService: NotificationService, eventsGateway: EventsGateway, notificationQueue: Queue);
    create(createUserTodoDto: CreateUserTodoDto): Promise<{
        user_id: number;
        todo_id: number;
        project_id: number;
    }>;
    findTodo(userid: number): Promise<{
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
        task_id: number;
    }[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        user_id: number;
        todo_id: number;
        project_id: number;
    }[]>;
    findOne(user_id: number, todo_id: number): import(".prisma/client").Prisma.Prisma__user_todoClient<{
        user_id: number;
        todo_id: number;
        project_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(user_id: number, todo_id: number, updateUserTodoDto: UpdateUserTodoDto): import(".prisma/client").Prisma.Prisma__user_todoClient<{
        user_id: number;
        todo_id: number;
        project_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(user_id: number, todo_id: number): import(".prisma/client").Prisma.Prisma__user_todoClient<{
        user_id: number;
        todo_id: number;
        project_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
