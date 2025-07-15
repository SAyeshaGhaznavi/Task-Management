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
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let EventsGateway = class EventsGateway {
    server;
    logger = new common_1.Logger('EventsGateway');
    connectedUsers = new Map();
    afterInit(server) {
        this.logger.log('✅ WebSocket Gateway Initialized');
    }
    handleConnection(client) {
        this.logger.log(`🔌 Client connected: ${client.id}`);
        const userId = this.extractUserIdFromSocket(client);
        if (userId) {
            client.userId = userId;
            this.connectedUsers.set(client.id, userId);
            client.join(`user:${userId}`);
            this.logger.log(`👤 User ${userId} joined room: user:${userId}`);
        }
    }
    handleDisconnect(client) {
        this.logger.log(`🔌 Client disconnected: ${client.id}`);
        this.connectedUsers.delete(client.id);
    }
    extractUserIdFromSocket(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            return parseInt(userId);
        }
        const token = client.handshake.auth.token;
        if (token) {
            return null;
        }
        return null;
    }
    handleAuthenticate(data, client) {
        const { userId } = data;
        client.userId = userId;
        this.connectedUsers.set(client.id, userId);
        client.join(`user:${userId}`);
        this.logger.log(`🔐 User ${userId} authenticated via WebSocket`);
        return { success: true, message: 'Authenticated successfully' };
    }
    handleJoinNotifications(data, client) {
        const { userId } = data;
        client.userId = userId;
        this.connectedUsers.set(client.id, userId);
        client.join(`user:${userId}`);
        this.logger.log(`📢 User ${userId} joined notifications room`);
        return { success: true, message: 'Joined notifications room' };
    }
    handleMessage(data, client) {
        return 'Message received: ' + data;
    }
    notifyTodoAssigned(userId, payload) {
        const notificationPayload = {
            type: 'TODO_ASSIGNED',
            ...payload,
            timestamp: new Date().toISOString(),
        };
        this.server.to(`user:${userId}`).emit('todoAssigned', notificationPayload);
        this.server.emit('todoAssigned', { ...notificationPayload, userId });
        this.logger.log(`📢 Todo assignment notification sent to user ${userId}: ${payload.message}`);
    }
    getConnectedUsersCount() {
        return this.connectedUsers.size;
    }
    isUserConnected(userId) {
        return Array.from(this.connectedUsers.values()).includes(userId);
    }
    onModuleInit() {
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('authenticate'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleAuthenticate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-notifications'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinNotifications", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageToServer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", String)
], EventsGateway.prototype, "handleMessage", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: '/notifications',
    })
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map