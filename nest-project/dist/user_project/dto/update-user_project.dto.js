"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProjectDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_project_dto_1 = require("./create-user_project.dto");
class UpdateUserProjectDto extends (0, mapped_types_1.PartialType)(create_user_project_dto_1.CreateUserProjectDto) {
}
exports.UpdateUserProjectDto = UpdateUserProjectDto;
//# sourceMappingURL=update-user_project.dto.js.map