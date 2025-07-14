import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
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
    findOne(id: string): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    } | null>;
    findProjects(project_id: string, company_id: string): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }[]>;
    update(id: string, updateProjectDto: UpdateProjectDto, req: Request): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }>;
    remove(id: string, req: Request): Promise<{
        project_id: number;
        project_name: string;
        project_description: string | null;
        company_id: number;
    }>;
}
