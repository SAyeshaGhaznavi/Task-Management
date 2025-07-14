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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyMembersController = void 0;
const common_1 = require("@nestjs/common");
const company_members_service_1 = require("./company_members.service");
const create_company_member_dto_1 = require("./dto/create-company_member.dto");
const update_company_member_dto_1 = require("./dto/update-company_member.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
let CompanyMembersController = class CompanyMembersController {
    companyMembersService;
    constructor(companyMembersService) {
        this.companyMembersService = companyMembersService;
    }
    async create(createCompanyMemberDto, req) {
        const user = req.user;
        const isAuthorized = await this.companyMembersService.isAdminOfCompany(user.userId, createCompanyMemberDto.company_id);
        if (!isAuthorized) {
            throw new common_1.ForbiddenException('Only company admins can add members');
        }
        return this.companyMembersService.create(createCompanyMemberDto);
    }
    async remove(company_id, user_id, req) {
        const user = req.user;
        const isAuthorized = await this.companyMembersService.isAdminOfCompany(user.userId, +company_id);
        if (!isAuthorized) {
            throw new common_1.ForbiddenException('Only company admins can remove members');
        }
        return this.companyMembersService.remove(+company_id, +user_id);
    }
    findAll() {
        return this.companyMembersService.findAll();
    }
    async findByCompany(company_id) {
        console.log('findByCompany route hit');
        return this.companyMembersService.findByCompany(company_id);
    }
    findOne(company_id, user_id) {
        console.log(' !!!!!!!!!! ');
        return this.companyMembersService.findOne(+company_id, +user_id);
    }
    findCompany(user_id) {
        return this.companyMembersService.findCompany(+user_id);
    }
    async update(company_id, user_id, updateDto, req) {
        const user = req.user;
        const isAuthorized = await this.companyMembersService.isAdminOfCompany(user.userId, +company_id);
        if (!isAuthorized) {
            throw new common_1.ForbiddenException('Only company admins can update members');
        }
        return this.companyMembersService.update(+company_id, +user_id, updateDto);
    }
};
exports.CompanyMembersController = CompanyMembersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_member_dto_1.CreateCompanyMemberDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyMembersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':company_id/:user_id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('company_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CompanyMembersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyMembersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('find/by-company/:company_id'),
    __param(0, (0, common_1.Param)('company_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyMembersController.prototype, "findByCompany", null);
__decorate([
    (0, common_1.Get)(':company_id/:user_id'),
    __param(0, (0, common_1.Param)('company_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CompanyMembersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompanyMembersController.prototype, "findCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':company_id/:user_id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('company_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_company_member_dto_1.UpdateCompanyMemberDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyMembersController.prototype, "update", null);
exports.CompanyMembersController = CompanyMembersController = __decorate([
    (0, common_1.Controller)('company-members'),
    __metadata("design:paramtypes", [company_members_service_1.CompanyMembersService])
], CompanyMembersController);
//# sourceMappingURL=company_members.controller.js.map