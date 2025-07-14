import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto): Promise<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findTasks(task_id: string, project_id: string): import(".prisma/client").Prisma.PrismaPromise<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }[]>;
    update(id: string, updateTaskDto: UpdateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
