"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitedMemberModule = void 0;
const common_1 = require("@nestjs/common");
const invited_member_service_1 = require("./invited_member.service");
const invited_member_controller_1 = require("./invited_member.controller");
let InvitedMemberModule = class InvitedMemberModule {
};
exports.InvitedMemberModule = InvitedMemberModule;
exports.InvitedMemberModule = InvitedMemberModule = __decorate([
    (0, common_1.Module)({
        controllers: [invited_member_controller_1.InvitedMemberController],
        providers: [invited_member_service_1.InvitedMemberService],
    })
], InvitedMemberModule);
//# sourceMappingURL=invited_member.module.js.map