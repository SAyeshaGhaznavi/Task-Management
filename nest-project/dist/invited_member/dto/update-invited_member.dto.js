"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvitedMemberDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_invited_member_dto_1 = require("./create-invited_member.dto");
class UpdateInvitedMemberDto extends (0, mapped_types_1.PartialType)(create_invited_member_dto_1.CreateInvitedMemberDto) {
}
exports.UpdateInvitedMemberDto = UpdateInvitedMemberDto;
//# sourceMappingURL=update-invited_member.dto.js.map