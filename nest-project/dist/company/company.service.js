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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateCompanyMemberDto {
    company_id;
    user_id;
    user_role;
}
let CompanyService = class CompanyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCompanyDto) {
        const company = await this.prisma.company.create({
            data: createCompanyDto,
        });
        const companyMembers = {
            company_id: company.company_id,
            user_id: company.owner_id,
            user_role: 'ADMIN',
        };
        try {
            await this.prisma.company_members.create({ data: companyMembers });
        }
        catch (error) {
            console.log("Failed to post company member");
        }
        return company;
    }
    findAll() {
        return this.prisma.company.findMany();
    }
    findOne(id) {
        return this.prisma.company.findUnique({ where: { company_id: id } });
    }
    update(id, updateUserDto) {
        return this.prisma.company.update({
            where: { company_id: id },
            data: updateUserDto,
        });
    }
    remove(id) {
        return this.prisma.company.delete({ where: { company_id: id } });
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyService);
//# sourceMappingURL=company.service.js.map