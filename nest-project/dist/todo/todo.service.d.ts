import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTodoDto: CreateTodoDto): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }>;
    findTodos(id: string): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TodoClient<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateTodoDto: UpdateTodoDto, userid: number): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }>;
    remove(id: number, userid: number): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }>;
}
