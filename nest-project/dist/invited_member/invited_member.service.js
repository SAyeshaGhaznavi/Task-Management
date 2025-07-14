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
exports.InvitedMemberService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InvitedMemberService = class InvitedMemberService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createInvitedMemberDto) {
        const { invited_id, invited_by_id } = createInvitedMemberDto;
        const invited = await this.prisma.users.findFirst({
            where: {
                user_id: invited_id,
            },
        });
        if (!invited) {
            throw new Error('Invited member does not exist');
        }
        return this.prisma.invited_member.create({
            data: createInvitedMemberDto,
        });
    }
    findAll() {
        return this.prisma.invited_member.findMany();
    }
    findOne(id) {
        return this.prisma.invited_member.findUnique({ where: { invited_id: id }, });
    }
    update(id, updateInvitedMemberDto, user_id) {
        if (id !== user_id) {
            throw new common_1.ForbiddenException("You are not authorized to update invite");
        }
        return this.prisma.invited_member.update({
            where: { invited_id: id },
            data: updateInvitedMemberDto,
        });
    }
    remove(id) {
        return this.prisma.invited_member.delete({ where: { invited_id: id } });
    }
};
exports.InvitedMemberService = InvitedMemberService;
exports.InvitedMemberService = InvitedMemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvitedMemberService);
//# sourceMappingURL=invited_member.service.js.map