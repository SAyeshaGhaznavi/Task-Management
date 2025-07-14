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
exports.CompanyMembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CompanyMembersService = class CompanyMembersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCompanyDto) {
        return this.prisma.company_members.create({
            data: createCompanyDto,
        });
    }
    findAll() {
        return this.prisma.company_members.findMany();
    }
    findOne(company_id, user_id) {
        return this.prisma.company_members.findUnique({
            where: {
                company_id_user_id: {
                    company_id,
                    user_id,
                },
            },
        });
    }
    update(company_id, user_id, updateDto) {
        return this.prisma.company_members.update({
            where: {
                company_id_user_id: {
                    company_id,
                    user_id,
                },
            },
            data: updateDto,
        });
    }
    remove(company_id, user_id) {
        return this.prisma.company_members.delete({
            where: {
                company_id_user_id: {
                    company_id,
                    user_id,
                },
            },
        });
    }
    async isAdminOfCompany(userId, companyId) {
        const member = await this.prisma.company_members.findFirst({
            where: {
                user_id: userId,
                company_id: companyId,
                user_role: 'ADMIN',
            },
        });
        return !!member;
    }
    async findByCompany(company_id) {
        const userCompany = await this.prisma.company_members.findMany({
            where: {
                company_id: Number(company_id),
            },
        });
        const userIds = userCompany.map((up) => up.user_id);
        const users = await this.prisma.users.findMany({
            where: {
                user_id: { in: userIds },
            },
        });
        console.log('Users by company: ', users);
        return users;
    }
    async findCompany(userId) {
        const userCompany = await this.prisma.company_members.findMany({
            where: {
                user_id: userId,
            },
        });
        const companyIds = userCompany.map((up) => up.company_id);
        const companies = await this.prisma.company.findMany({
            where: {
                company_id: { in: companyIds },
            },
        });
        return companies;
    }
};
exports.CompanyMembersService = CompanyMembersService;
exports.CompanyMembersService = CompanyMembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyMembersService);
//# sourceMappingURL=company_members.service.js.map