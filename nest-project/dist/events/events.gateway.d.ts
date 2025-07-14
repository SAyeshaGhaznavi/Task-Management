import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
interface AuthenticatedSocket extends Socket {
    userId?: number;
    user?: any;
}
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    server: Server;
    private logger;
    private connectedUsers;
    afterInit(server: Server): void;
    handleConnection(client: AuthenticatedSocket): void;
    handleDisconnect(client: AuthenticatedSocket): void;
    private extractUserIdFromSocket;
    handleAuthenticate(data: {
        userId: number;
        token?: string;
    }, client: AuthenticatedSocket): {
        success: boolean;
        message: string;
    };
    handleJoinNotifications(data: {
        userId: number;
    }, client: AuthenticatedSocket): {
        success: boolean;
        message: string;
    };
    handleMessage(data: string, client: AuthenticatedSocket): string;
    notifyTodoAssigned(userId: number, payload: {
        todoId: number;
        projectId: number;
        message: string;
        createdAt?: Date;
        todoTitle?: string;
        projectName?: string;
    }): void;
    getConnectedUsersCount(): number;
    isUserConnected(userId: number): boolean;
    onModuleInit(): void;
}
export {};
