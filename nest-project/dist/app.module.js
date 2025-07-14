"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("@nestjs/bullmq");
const prisma_service_1 = require("./prisma/prisma.service");
const project_module_1 = require("./project/project.module");
const users_module_1 = require("./users/users.module");
const company_module_1 = require("./company/company.module");
const company_members_module_1 = require("./company_members/company_members.module");
const user_project_module_1 = require("./user_project/user_project.module");
const task_module_1 = require("./task/task.module");
const todo_module_1 = require("./todo/todo.module");
const user_todo_module_1 = require("./user_todo/user_todo.module");
const invited_member_module_1 = require("./invited_member/invited_member.module");
const auth_module_1 = require("./auth/auth.module");
const events_gateway_1 = require("./events/events.gateway");
const notifications_module_1 = require("./notifications/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'notification-queue',
            }),
            project_module_1.ProjectModule,
            users_module_1.UsersModule,
            company_module_1.CompanyModule,
            company_members_module_1.CompanyMembersModule,
            user_project_module_1.UserProjectModule,
            task_module_1.TaskModule,
            todo_module_1.TodoModule,
            user_todo_module_1.UserTodoModule,
            invited_member_module_1.InvitedMemberModule,
            auth_module_1.AuthModule,
            notifications_module_1.NotificationModule,
        ],
        providers: [prisma_service_1.PrismaService, events_gateway_1.EventsGateway],
        exports: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map