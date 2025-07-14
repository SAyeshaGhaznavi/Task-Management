import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }>;
    findAll(): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }[]>;
    findOne(id: number): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    } | null>;
    findProjects(company_id: number): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }[]>;
    update(id: number, updateProjectDto: UpdateProjectDto, userid: number): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }>;
    remove(id: number, userid: number): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }>;
}
