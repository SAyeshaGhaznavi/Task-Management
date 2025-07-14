import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from 'express';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(createTodoDto: CreateTodoDto): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TodoClient<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findTodos(task: string, id: string): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }[]>;
    update(id: string, updateTodoDto: UpdateTodoDto, req: Request): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }>;
    remove(id: string, req: Request): Promise<{
        task_id: number;
        todo_id: number;
        todo_name: string;
        todo_description: string | null;
        due_date: Date | null;
        todo_priority: string | null;
        todo_status: string | null;
    }>;
}
