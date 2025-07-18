"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyMemberDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_company_member_dto_1 = require("./create-company_member.dto");
class UpdateCompanyMemberDto extends (0, mapped_types_1.PartialType)(create_company_member_dto_1.CreateCompanyMemberDto) {
}
exports.UpdateCompanyMemberDto = UpdateCompanyMemberDto;
//# sourceMappingURL=update-company_member.dto.js.map