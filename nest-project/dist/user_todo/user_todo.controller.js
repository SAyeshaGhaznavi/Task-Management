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
exports.UserTodoController = void 0;
const common_1 = require("@nestjs/common");
const user_todo_service_1 = require("./user_todo.service");
const create_user_todo_dto_1 = require("./dto/create-user_todo.dto");
const update_user_todo_dto_1 = require("./dto/update-user_todo.dto");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let UserTodoController = class UserTodoController {
    userTodoService;
    notificationQueue;
    constructor(userTodoService, notificationQueue) {
        this.userTodoService = userTodoService;
        this.notificationQueue = notificationQueue;
    }
    create(createUserTodoDto) {
        return this.userTodoService.create(createUserTodoDto);
    }
    findAll() {
        return this.userTodoService.findAll();
    }
    findOne(user_id, todo_id) {
        return this.userTodoService.findOne(+user_id, +todo_id);
    }
    findTodo(user_id) {
        return this.userTodoService.findTodo(+user_id);
    }
    update(user_id, todo_id, updateDto) {
        return this.userTodoService.update(+user_id, +todo_id, updateDto);
    }
    remove(user_id, todo_id) {
        return this.userTodoService.remove(+user_id, +todo_id);
    }
};
exports.UserTodoController = UserTodoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_todo_dto_1.CreateUserTodoDto]),
    __metadata("design:returntype", void 0)
], UserTodoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserTodoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':user_id/:todo_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('todo_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserTodoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserTodoController.prototype, "findTodo", null);
__decorate([
    (0, common_1.Patch)(':user_id/:todo_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('todo_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_user_todo_dto_1.UpdateUserTodoDto]),
    __metadata("design:returntype", void 0)
], UserTodoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':user_id/:todo_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('todo_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserTodoController.prototype, "remove", null);
exports.UserTodoController = UserTodoController = __decorate([
    (0, common_1.Controller)('user-todo'),
    __param(1, (0, bullmq_1.InjectQueue)('notification-queue')),
    __metadata("design:paramtypes", [user_todo_service_1.UserTodoService,
        bullmq_2.Queue])
], UserTodoController);
//# sourceMappingURL=user_todo.controller.js.map