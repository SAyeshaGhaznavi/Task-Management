import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedSocket extends Socket {
  userId?: number;
  user?: any;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/notifications',
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('EventsGateway');
  private connectedUsers = new Map<string, number>();

  afterInit(server: Server) {
    this.logger.log('✅ WebSocket Gateway Initialized');
  }

  handleConnection(client: AuthenticatedSocket) {
    this.logger.log(`🔌 Client connected: ${client.id}`);
    
    const userId = this.extractUserIdFromSocket(client);
    if (userId) {
      client.userId = userId;
      this.connectedUsers.set(client.id, userId);
      
      client.join(`user:${userId}`);
      this.logger.log(`👤 User ${userId} joined room: user:${userId}`);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`🔌 Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id);
  }

  private extractUserIdFromSocket(client: AuthenticatedSocket): number | null {

    const userId = client.handshake.query.userId;
    if (userId) {
      return parseInt(userId as string);
    }

    const token = client.handshake.auth.token;
    if (token) {

      return null;
    }

    return null;
  }

  @SubscribeMessage('authenticate')
  handleAuthenticate(
    @MessageBody() data: { userId: number; token?: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { userId } = data;
    client.userId = userId;
    this.connectedUsers.set(client.id, userId);
    
    client.join(`user:${userId}`);
    this.logger.log(`🔐 User ${userId} authenticated via WebSocket`);
    
    return { success: true, message: 'Authenticated successfully' };
  }

  @SubscribeMessage('join-notifications')
  handleJoinNotifications(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { userId } = data;
    client.userId = userId;
    this.connectedUsers.set(client.id, userId);
    
    client.join(`user:${userId}`);
    this.logger.log(`📢 User ${userId} joined notifications room`);
    
    return { success: true, message: 'Joined notifications room' };
  }

  @SubscribeMessage('messageToServer')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: AuthenticatedSocket): string {
    return 'Message received: ' + data;
  }

  notifyTodoAssigned(userId: number, payload: {
    todoId: number;
    projectId: number;
    message: string;
    createdAt?: Date;
    todoTitle?: string;
    projectName?: string;
  }) {
    const notificationPayload = {
      type: 'TODO_ASSIGNED',
      ...payload,
      timestamp: new Date().toISOString(),
    };

    this.server.to(`user:${userId}`).emit('todoAssigned', notificationPayload);
    
    this.server.emit('todoAssigned', { ...notificationPayload, userId });
    
    this.logger.log(`📢 Todo assignment notification sent to user ${userId}: ${payload.message}`);
  }

  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  isUserConnected(userId: number): boolean {
    return Array.from(this.connectedUsers.values()).includes(userId);
  }

  onModuleInit() {
    // setTimeout(() => {
    //   const testUserId = 5;
    //   const payload = {
    //     todoId: 999,
    //     projectId: 1,
    //     message: 'Test todo assignment',
    //     todoTitle: 'Test Todo',
    //     projectName: 'Test Project',
    //   };
    //   this.notifyTodoAssigned(testUserId, payload);
    //   this.logger.log(`✅ Test notification sent to user ${testUserId}`);
    // }, 3000);
  }
}