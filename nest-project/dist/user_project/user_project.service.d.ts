import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
export declare class UserProjectService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserProjectDto: CreateUserProjectDto): Promise<{
        project_id: number;
        user_id: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        project_id: number;
        user_id: number;
    }[]>;
    findOne(project_id: number, user_id: number): import(".prisma/client").Prisma.Prisma__user_projectClient<{
        project_id: number;
        user_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findProject(userId: number): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }[]>;
    update(project_id: number, user_id: number, updateUserProjectDto: UpdateUserProjectDto): import(".prisma/client").Prisma.Prisma__user_projectClient<{
        project_id: number;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(project_id: number, user_id: number): import(".prisma/client").Prisma.Prisma__user_projectClient<{
        project_id: number;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
