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
exports.NotificationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const notifications_service_1 = require("./notifications.service");
const events_gateway_1 = require("../events/events.gateway");
let NotificationProcessor = class NotificationProcessor extends bullmq_1.WorkerHost {
    notificationService;
    eventsGateway;
    constructor(notificationService, eventsGateway) {
        super();
        this.notificationService = notificationService;
        this.eventsGateway = eventsGateway;
    }
    async process(job) {
        const { userId, todoId, projectId, message, assignedBy } = job.data;
        console.log('Processing notification job:', job.data);
        if (assignedBy && userId === assignedBy) {
            console.log('Skipping notification: assigned user is the same as assigning user.');
            return null;
        }
        const notification = await this.notificationService.createNotification({
            userId,
            todoId,
            projectId,
            message,
        });
        this.eventsGateway.notifyTodoAssigned(userId, {
            todoId,
            projectId,
            message,
            createdAt: notification.createdAt,
        });
        return notification;
    }
};
exports.NotificationProcessor = NotificationProcessor;
exports.NotificationProcessor = NotificationProcessor = __decorate([
    (0, bullmq_1.Processor)('notification-queue'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationService,
        events_gateway_1.EventsGateway])
], NotificationProcessor);
//# sourceMappingURL=notifications.processor.js.map