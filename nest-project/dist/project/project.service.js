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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectService = class ProjectService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        return this.prisma.project.create({
            data: createProjectDto,
        });
    }
    async findAll() {
        return this.prisma.project.findMany();
    }
    async findOne(id) {
        return this.prisma.project.findUnique({
            where: { project_id: id },
        });
    }
    async findProjects(company_id) {
        return this.prisma.project.findMany({
            where: { company_id: company_id, },
        });
    }
    async update(id, updateProjectDto, userid) {
        const userToProject = await this.prisma.user_project.findUnique({
            where: {
                user_id_project_id: {
                    user_id: userid,
                    project_id: id,
                }
            },
        });
        if (!userToProject) {
            throw new common_1.ForbiddenException("You are not authorized to update this Project");
        }
        return this.prisma.project.update({
            where: { project_id: id },
            data: updateProjectDto,
        });
    }
    async remove(id, userid) {
        const userToProject = await this.prisma.user_project.findUnique({
            where: {
                user_id_project_id: {
                    user_id: userid,
                    project_id: id,
                }
            },
        });
        if (!userToProject) {
            throw new common_1.ForbiddenException("You are not authorized to delete this Project");
        }
        return this.prisma.project.delete({
            where: { project_id: id },
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectService);
//# sourceMappingURL=project.service.js.map