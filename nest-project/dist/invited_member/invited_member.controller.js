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
exports.InvitedMemberController = void 0;
const common_1 = require("@nestjs/common");
const invited_member_service_1 = require("./invited_member.service");
const create_invited_member_dto_1 = require("./dto/create-invited_member.dto");
const update_invited_member_dto_1 = require("./dto/update-invited_member.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let InvitedMemberController = class InvitedMemberController {
    invitedMemberService;
    constructor(invitedMemberService) {
        this.invitedMemberService = invitedMemberService;
    }
    create(createInvitedMemberDto) {
        return this.invitedMemberService.create(createInvitedMemberDto);
    }
    findAll() {
        return this.invitedMemberService.findAll();
    }
    findOne(id) {
        return this.invitedMemberService.findOne(+id);
    }
    update(id, updateInvitedMemberDto, req) {
        const user = req.user;
        return this.invitedMemberService.update(+id, updateInvitedMemberDto, user.userId);
    }
    remove(id) {
        return this.invitedMemberService.remove(+id);
    }
};
exports.InvitedMemberController = InvitedMemberController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invited_member_dto_1.CreateInvitedMemberDto]),
    __metadata("design:returntype", void 0)
], InvitedMemberController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvitedMemberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvitedMemberController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invited_member_dto_1.UpdateInvitedMemberDto, Object]),
    __metadata("design:returntype", void 0)
], InvitedMemberController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvitedMemberController.prototype, "remove", null);
exports.InvitedMemberController = InvitedMemberController = __decorate([
    (0, common_1.Controller)('invited-member'),
    __metadata("design:paramtypes", [invited_member_service_1.InvitedMemberService])
], InvitedMemberController);
//# sourceMappingURL=invited_member.controller.js.map