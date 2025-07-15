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
var UserTodoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTodoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const events_gateway_1 = require("../events/events.gateway");
const notifications_service_1 = require("../notifications/notifications.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let UserTodoService = UserTodoService_1 = class UserTodoService {
    prisma;
    notificationService;
    eventsGateway;
    notificationQueue;
    logger = new common_1.Logger(UserTodoService_1.name);
    constructor(prisma, notificationService, eventsGateway, notificationQueue) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.eventsGateway = eventsGateway;
        this.notificationQueue = notificationQueue;
    }
    async create(createUserTodoDto) {
        const { user_id, project_id, todo_id } = createUserTodoDto;
        this.logger.log(`🔄 Processing todo assignment: User ${user_id}, Todo ${todo_id}, Project ${project_id}`);
        const todo = await this.prisma.todo.findUnique({
            where: { todo_id },
            select: {
                task_id: true,
                todo_name: true,
                todo_description: true,
            },
        });
        if (!todo) {
            throw new Error('Todo not found');
        }
        const member = await this.prisma.user_project.findFirst({
            where: {
                user_id: user_id,
                project_id: project_id,
            },
        });
        if (!member) {
            throw new Error('User is not assigned to this project');
        }
        const todoTask = await this.prisma.todo.findFirst({
            where: {
                todo_id: todo_id,
                task_id: todo.task_id,
            }
        });
        const todoProject = await this.prisma.task.findFirst({
            where: {
                task_id: todoTask?.task_id,
                project_id: project_id,
            }
        });
        if (!todoProject) {
            throw new Error('Todo is not part of the same project');
        }
        const project = await this.prisma.project.findUnique({
            where: { project_id },
            select: { project_name: true },
        });
        const userTodo = await this.prisma.user_todo.create({
            data: createUserTodoDto
        });
        this.logger.log(`✅ Todo ${todo_id} successfully assigned to user ${user_id}`);
        const notificationPayload = {
            todoId: todo_id,
            projectId: project_id,
            todoTitle: todo.todo_name || `Todo ${todo_id}`,
            projectName: project?.project_name || `Project ${project_id}`,
            message: `You've been assigned a new TODO: ${todo.todo_name || `Todo ${todo_id}`}`,
        };
        try {
            await this.notificationQueue.add('create-notification', {
                userId: user_id,
                ...notificationPayload,
                message: `You've been assigned a new TODO: ${todo.todo_name || `Todo ${todo_id}`}`,
                assignedBy: createUserTodoDto.assigned_by ?? null,
            });
            this.logger.log(`📢 Notification job queued for user ${user_id} for todo ${todo_id}`);
        }
        catch (error) {
            this.logger.error(`❌ Failed to queue notification for user ${user_id}: ${error.message}`);
        }
        return userTodo;
    }
    async findTodo(userid) {
        const userTodos = await this.prisma.user_todo.findMany({
            where: {
                user_id: userid,
            },
        });
        const todoIds = userTodos.map((up) => up.todo_id);
        const todos = await this.prisma.todo.findMany({
            where: {
                todo_id: { in: todoIds },
            },
        });
        return todos;
    }
    findAll() {
        return this.prisma.user_todo.findMany();
    }
    findOne(user_id, todo_id) {
        return this.prisma.user_todo.findUnique({
            where: {
                user_id_todo_id: {
                    user_id,
                    todo_id,
                },
            },
        });
    }
    update(user_id, todo_id, updateUserTodoDto) {
        return this.prisma.user_todo.update({
            where: {
                user_id_todo_id: {
                    user_id,
                    todo_id,
                },
            },
            data: updateUserTodoDto,
        });
    }
    remove(user_id, todo_id) {
        return this.prisma.user_todo.delete({
            where: {
                user_id_todo_id: {
                    user_id,
                    todo_id,
                },
            },
        });
    }
};
exports.UserTodoService = UserTodoService;
exports.UserTodoService = UserTodoService = UserTodoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, bullmq_1.InjectQueue)('notification-queue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationService,
        events_gateway_1.EventsGateway,
        bullmq_2.Queue])
], UserTodoService);
//# sourceMappingURL=user_todo.service.js.map