import { UserProjectService } from './user_project.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
export declare class UserProjectController {
    private readonly userProjectService;
    constructor(userProjectService: UserProjectService);
    create(createUserProjectDto: CreateUserProjectDto): Promise<{
        project_id: number;
        user_id: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        project_id: number;
        user_id: number;
    }[]>;
    findOne(project_id: string, user_id: string): import(".prisma/client").Prisma.Prisma__user_projectClient<{
        project_id: number;
        user_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findProject(user_id: string): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }[]>;
    update(project_id: string, user_id: string, updateDto: UpdateUserProjectDto): import(".prisma/client").Prisma.Prisma__user_projectClient<{
        project_id: number;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(project_id: string, user_id: string): import(".prisma/client").Prisma.Prisma__user_projectClient<{
        project_id: number;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
