'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../context/authContext';

interface Notification {
  type: 'TODO_ASSIGNED';
  todoId: number;
  projectId: number;
  message: string;
  todoTitle?: string;
  projectName?: string;
  timestamp: string;
  createdAt?: Date;
}

interface WebSocketContextType {
  isConnected: boolean;
  notifications: Notification[];
  clearNotifications: () => void;
  markAsRead: (index: number) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const newSocket = io('http://localhost:3001/notifications', {
      query: {
        userId: user.user_id.toString(),
      },
      auth: {
        token: localStorage.getItem('access_token'),
      },
    });

    newSocket.on('connect', () => {
      console.log('🔌 WebSocket connected');
      setIsConnected(true);
      
      newSocket.emit('authenticate', {
        userId: user.user_id,
        token: localStorage.getItem('access_token'),
      });
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 WebSocket disconnected');
      setIsConnected(false);
    });

    newSocket.on('todoAssigned', (notification: Notification) => {
      console.log('📢 Received todo assignment notification:', notification);
      setNotifications(prev => [notification, ...prev]);
      
      if (Notification.permission === 'granted') {
        new Notification('New Todo Assigned', {
          body: notification.message,
          icon: '/favicon.ico',
        });
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ WebSocket connection error:', error);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isLoggedIn, user]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        notifications,
        clearNotifications,
        markAsRead,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}; 