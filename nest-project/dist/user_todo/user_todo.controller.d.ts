import { UserTodoService } from './user_todo.service';
import { CreateUserTodoDto } from './dto/create-user_todo.dto';
import { UpdateUserTodoDto } from './dto/update-user_todo.dto';
import { Queue } from 'bullmq';
export declare class UserTodoController {
    private readonly userTodoService;
    private readonly notificationQueue;
    constructor(userTodoService: UserTodoService, notificationQueue: Queue);
    create(createUserTodoDto: CreateUserTodoDto): Promise<{
        project_id: number;
        user_id: number;
        todo_id: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        project_id: number;
        user_id: number;
        todo_id: number;
    }[]>;
    findOne(user_id: string, todo_id: string): import(".prisma/client").Prisma.Prisma__user_todoClient<{
        project_id: number;
        user_id: number;
        todo_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findTodo(user_id: string): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }[]>;
    update(user_id: string, todo_id: string, updateDto: UpdateUserTodoDto): import(".prisma/client").Prisma.Prisma__user_todoClient<{
        project_id: number;
        user_id: number;
        todo_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(user_id: string, todo_id: string): import(".prisma/client").Prisma.Prisma__user_todoClient<{
        project_id: number;
        user_id: number;
        todo_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
