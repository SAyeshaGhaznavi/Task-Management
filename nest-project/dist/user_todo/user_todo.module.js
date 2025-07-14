"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTodoModule = void 0;
const common_1 = require("@nestjs/common");
const user_todo_service_1 = require("./user_todo.service");
const user_todo_controller_1 = require("./user_todo.controller");
const events_module_1 = require("../events/events.module");
const notifications_module_1 = require("../notifications/notifications.module");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
let UserTodoModule = class UserTodoModule {
};
exports.UserTodoModule = UserTodoModule;
exports.UserTodoModule = UserTodoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            events_module_1.EventsModule,
            notifications_module_1.NotificationModule,
            bullmq_1.BullModule.registerQueue({
                name: 'notification-queue',
            }),
        ],
        controllers: [user_todo_controller_1.UserTodoController],
        providers: [user_todo_service_1.UserTodoService, prisma_service_1.PrismaService],
    })
], UserTodoModule);
//# sourceMappingURL=user_todo.module.js.map