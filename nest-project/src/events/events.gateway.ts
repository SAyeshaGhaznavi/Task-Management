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
  private connectedUsers = new Map<string, number>(); // socketId -> userId

  afterInit(server: Server) {
    this.logger.log('✅ WebSocket Gateway Initialized');
  }

  handleConnection(client: AuthenticatedSocket) {
    this.logger.log(`🔌 Client connected: ${client.id}`);
    
    // Extract user ID from query params or headers
    const userId = this.extractUserIdFromSocket(client);
    if (userId) {
      client.userId = userId;
      this.connectedUsers.set(client.id, userId);
      
      // Join user-specific room
      client.join(`user:${userId}`);
      this.logger.log(`👤 User ${userId} joined room: user:${userId}`);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`🔌 Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id);
  }

  private extractUserIdFromSocket(client: AuthenticatedSocket): number | null {
    // Method 1: From query parameters
    const userId = client.handshake.query.userId;
    if (userId) {
      return parseInt(userId as string);
    }

    // Method 2: From auth token (if you implement JWT in WebSocket)
    const token = client.handshake.auth.token;
    if (token) {
      // Decode JWT and extract userId
      // This would require implementing JWT verification for WebSocket
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
    
    // Join user-specific room
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
    
    // Join user-specific notification room
    client.join(`user:${userId}`);
    this.logger.log(`📢 User ${userId} joined notifications room`);
    
    return { success: true, message: 'Joined notifications room' };
  }

  @SubscribeMessage('messageToServer')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: AuthenticatedSocket): string {
    return 'Message received: ' + data;
  }

  // Enhanced notification method for todo assignments
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

    // Emit to specific user room
    this.server.to(`user:${userId}`).emit('todoAssigned', notificationPayload);
    
    // Also emit to all connected clients (for debugging)
    this.server.emit('todoAssigned', { ...notificationPayload, userId });
    
    this.logger.log(`📢 Todo assignment notification sent to user ${userId}: ${payload.message}`);
  }

  // Method to get connected users count
  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  // Method to check if a specific user is connected
  isUserConnected(userId: number): boolean {
    return Array.from(this.connectedUsers.values()).includes(userId);
  }

  onModuleInit() {
    // Remove the test notification after 3 seconds
    setTimeout(() => {
      const testUserId = 5;
      const payload = {
        todoId: 999,
        projectId: 1,
        message: 'Test todo assignment',
        todoTitle: 'Test Todo',
        projectName: 'Test Project',
      };
      this.notifyTodoAssigned(testUserId, payload);
      this.logger.log(`✅ Test notification sent to user ${testUserId}`);
    }, 3000);
  }
}