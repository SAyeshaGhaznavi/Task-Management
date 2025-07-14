"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserTodoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_todo_dto_1 = require("./create-user_todo.dto");
class UpdateUserTodoDto extends (0, mapped_types_1.PartialType)(create_user_todo_dto_1.CreateUserTodoDto) {
}
exports.UpdateUserTodoDto = UpdateUserTodoDto;
//# sourceMappingURL=update-user_todo.dto.js.map