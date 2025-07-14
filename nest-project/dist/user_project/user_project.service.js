"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserProjectService = class UserProjectService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserProjectDto) {
        const { user_id, project_id } = createUserProjectDto;
        const project = await this.prisma.project.findUnique({
            where: { project_id: project_id },
            select: { company_id: true },
        });
        if (!project) {
            throw new Error('Project not found');
        }
        const member = await this.prisma.company_members.findFirst({
            where: {
                user_id: user_id,
                company_id: project.company_id,
            },
        });
        if (!member) {
            throw new Error('User is not part of the same company as the project');
        }
        return this.prisma.user_project.create({
            data: createUserProjectDto,
        });
    }
    findAll() {
        return this.prisma.user_project.findMany();
    }
    findOne(project_id, user_id) {
        return this.prisma.user_project.findUnique({
            where: {
                user_id_project_id: {
                    project_id,
                    user_id,
                },
            },
        });
    }
    async findProject(userId) {
        const userProjects = await this.prisma.user_project.findMany({
            where: {
                user_id: userId,
            },
        });
        const projectIds = userProjects.map((up) => up.project_id);
        const projects = await this.prisma.project.findMany({
            where: {
                project_id: { in: projectIds },
            },
        });
        return projects;
    }
    update(project_id, user_id, updateUserProjectDto) {
        return this.prisma.user_project.update({
            where: {
                user_id_project_id: {
                    project_id,
                    user_id,
                },
            },
            data: updateUserProjectDto,
        });
    }
    remove(project_id, user_id) {
        return this.prisma.user_project.delete({
            where: {
                user_id_project_id: {
                    project_id,
                    user_id,
                },
            },
        });
    }
};
exports.UserProjectService = UserProjectService;
exports.UserProjectService = UserProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserProjectService);
//# sourceMappingURL=user_project.service.js.map