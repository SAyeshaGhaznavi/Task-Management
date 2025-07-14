'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/app/lib/api';
import { setAccessToken } from '@/app/lib/api';

interface User {
  user_id: number;
  user_name: string;
  password: string;
  phone?: string;
  email: string;
  createdAt?: string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  //completed: boolean;
  projectId?: number;
}

interface AuthData {
  email: string;
  password: string;
  name?: string;
  phone?:string;
}

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authData, setAuthData] = useState<AuthData>({ email: '', password: '', name: '' , phone: ''});

  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // UI state
  const [activeTab, setActiveTab] = useState<'users' | 'tasks'|'company'|'projects'>('users');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  // Load data when logged in
  useEffect(() => {
      if (isLoggedIn) {
          fetchUsers();
          fetchTasks();
        }
    }, [isLoggedIn]);

    // Auth functions
  const checkAuthStatus = async () => {
      try {
          const response = await apiClient.get('/auth/profile');
      setUser(response);
      setIsLoggedIn(true);
    } catch (err) {
        setIsLoggedIn(false);
    }
};

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await apiClient.post('/auth/login', {
            email: authData.email,
            password: authData.password,
      });
      setAccessToken(response.access_token);
      const newUser:User={user_id:response.user.user_id, user_name: response.user.user_name, email: response.user.email, phone: response.user.phone, password: response.user.password};
      console.log("Response: ",response.user.user_id, response.user.user_name);
      console.log("Response.users: ",response.user);
      setUser(newUser);
      //setUser(response.user);
      console.log("Users: ",user);
      setIsLoggedIn(true);
      setAuthData({ email: '', password: '', name: '', phone:''});
      //console.log({email,password});
      setError(null);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiClient.post('/users', {
          user_name: authData.name,
          email: authData.email,
        password: authData.password,
        phone:authData.phone,
      });
      setUser(response.user);
      setIsLoggedIn(true);
      setAuthData({ email: '', password: '', name: '', phone:'' });
      setError(null);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
};

  const handleLogout = async () => {
    try {
        await apiClient.post('/auth/logout', {});
        setIsLoggedIn(false);
      setUser(null);
      setUsers([]);
      setTasks([]);
    } catch (err) {
        console.error('Logout error:', err);
    }
};

// Users CRUD functions
const fetchUsers = async () => {
    try {
        const data = await apiClient.get('/users');
        setUsers(data);
    } catch (err) {
        setError('Failed to fetch users');
    }
};

// const createUser = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   try {
        //     const user = await apiClient.post('/users', newUser);
        //     setUsers([...users, user]);
        //     setNewUser({ name: '', email: '' });
        //   } catch (err) {
            //     setError('Failed to create user');
  //   }
  // };

  const updateUser = async (e: React.FormEvent) => {
      e.preventDefault();
    if (!editingUser) return;
    try {
      const updatedUser = await apiClient.put(`/users/${editingUser.user_id}`, editingUser);
      setUsers(users.map(u => u.user_id === editingUser.user_id ? updatedUser : u));
      setEditingUser(null);
    } catch (err) {
        setError('Failed to update user');
    }
};

const deleteUser = async (id: number) => {
    try {
        await apiClient.delete(`/users/${id}`);
        setUsers(users.filter(u => u.user_id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
};

// Tasks CRUD functions
const fetchTasks = async () => {
    try {
      const data = await apiClient.get('/tasks');
      setTasks(data);
    } catch (err) {
        setError('Failed to fetch tasks');
    }
};

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const task = await apiClient.post('/tasks', { ...newTask, completed: false });
        setTasks([...tasks, task]);
        setNewTask({ name: '', description: '' });
    } catch (err) {
        setError('Failed to create task');
    }
};

const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    try {
        const updatedTask = await apiClient.put(`/tasks/${editingTask.id}`, editingTask);
      setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
      setEditingTask(null);
    } catch (err) {
        setError('Failed to update task');
    }
};

// const toggleTaskComplete = async (task: Task) => {
    //   try {
        //     const updatedTask = await apiClient.patch(`/tasks/${task.id}`, {
            //       completed: !task.completed
            //     });
            //     setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
            //   } catch (err) {
                //     setError('Failed to update task status');
                //   }
                // };

                const deleteTask = async (id: number) => {
                    try {
      await apiClient.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
        setError('Failed to delete task');
    }
};

export {deleteTask, updateTask, createTask, fetchTasks, deleteUser, updateUser, fetchUsers, handleLogout, handleLogin, handleRegister, checkAuthStatus}

