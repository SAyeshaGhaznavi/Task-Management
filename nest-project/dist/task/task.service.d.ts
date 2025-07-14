import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }>;
    findTask(id: number): import(".prisma/client").Prisma.Prisma__TaskClient<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TaskClient<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findTasks(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }[]>;
    update(id: number, updateTaskDto: UpdateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TaskClient<{
        project_id: number;
        task_id: number;
        task_name: string;
        task_description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
