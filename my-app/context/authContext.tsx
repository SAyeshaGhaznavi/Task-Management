'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient, { setAccessToken } from '@/app/lib/api';

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
  projectId?: number;
}

interface AuthData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

interface Project {
  project_id: number;
  project_name: string;
  project_description?: string;
  company_id: number;
}

interface Company {
  company_id: number;
  company_name: string;
  company_location: string;
  owner_id: number;
}

interface Admin {
  type: boolean;
  company: number;
}

interface AuthContextType {
  user: User | null;
  error: string | null;
  isLoggedIn: boolean;
  setUser: (u: User | null) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  users: User[];
  fetchUsers: () => Promise<void>;
  updateUser: (e: React.FormEvent) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (e: React.FormEvent) => Promise<void>;
  updateTask: (e: React.FormEvent) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  authData: AuthData;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  company: Company|null;
  setCompany: (c: Company | null) => void;
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  project: Project|null;
  setProject: (p: Project|null)=>void;
  isAdmin: Admin|null;
  setIsAdmin: (a: Admin|null)=>void;
  companyProjects: Project[];
  setCompanyProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  companyUsers: User[];
  setCompanyUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authData, setAuthData] = useState<AuthData>({ email: '', password: '', name: '', phone: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [company, setCompany] = useState<Company|null>(null);
  const [project, setProject] = useState<Project|null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isAdmin, setIsAdmin] = useState<Admin|null>(null);
  const [companyProjects, setCompanyProjects] = useState<Project[]>([]);
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);

   useEffect(() => {
   const tryRefresh = async () => {
    // try {
    //   const res = await fetch('http://localhost:3001/api/auth/refresh', {
    //     method: 'POST',
    //     credentials: 'include',
    //   });


    //   if (!res.ok)
    //   { 
    //     console.log("Refresh Failed console");
    //     throw new Error('Refresh failed');
    //   }
    //   const data = await res.json();
    //   const token = data.access_token;
    //   setAccessToken(token);

    //   const userRes = await fetch('http://localhost:3001/api/auth/profile', {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   const userData = await userRes.json();
    //   setUser(userData);
    //   setIsLoggedIn(true);
    // } catch (err) {
    //   console.error('Refresh error:', err);
    //   setUser(null);
    //   setIsLoggedIn(false);
    // }
  };

  tryRefresh();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      setAccessToken(storedToken);
      checkAuthStatus();
    }
  }, []);

  

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
      fetchTasks();
    }
  }, [isLoggedIn]);

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      setUser(response);
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  // const handleLogin = async (e: React.FormEvent) => {
  //   try {
  //       e.preventDefault();
  //       const response = await apiClient.post('/auth/login', {
  //         email: authData.email,
  //         password: authData.password,
  //       });
  //       setAccessToken(response.access_token);
  //       console.log("Access Token: ", response.access_token);
  //       console.log("Refresh Token: ", response.refresh_token);
  //       setUser({
  //         user_id: response.user.user_id,
  //         user_name: response.user.user_name,
  //         email: response.user.email,
  //         phone: response.user.phone,
  //         password: response.user.password,
  //       });
  //       console.log("User: ", user);
  //       setIsLoggedIn(true);
  //       setAuthData({ email: '', password: '', name: '', phone: '' });
  //       setError(null);
  //       localStorage.setItem('user', JSON.stringify(user));
  //       localStorage.setItem('token', response.access_token);
  //       //setUser(user);
  //       //setToken(response.access_token);
  //   } catch (err) {
  //     setError('Login failed. Please check your credentials.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
  try {
    e.preventDefault();
    const response = await apiClient.post('/auth/login', {
      email: authData.email,
      password: authData.password,
    });
    setAccessToken(response.access_token);
    const newUser = {
      user_id: response.user.user_id,
      user_name: response.user.user_name,
      email: response.user.email,
      phone: response.user.phone,
      password: response.user.password,
    };
    setUser(newUser);
    console.log("Access Token: ", response.access_token);
    console.log("Refresh Token: ", response.refresh_token);
    setIsLoggedIn(true);
    setAuthData({ email: '', password: '', name: '', phone: '' });
    setError(null);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', response.access_token);
  } catch (err) {
    setError('Login failed. Please check your credentials.');
  } finally {
    setLoading(false);
  }
};

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  try {

    try {
      setLoading(true);
    } catch (error) {
      console.log("loading failed");
    }
    const response = await apiClient.post('/auth/register', {
      user_name: authData.name,
      email: authData.email,
      password: authData.password,
      phone: authData.phone,
    });

    console.log("Response: ", response.user.user_name);

    setAccessToken(response.access_token);

    const newUser = {
      user_id: response.user.user_id,
      user_name: response.user.user_name,
      email: response.user.email,
      phone: response.user.phone,
      password: response.user.password,
    };

    setUser(newUser);

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', response.access_token);

    console.log("User after register: ", user);

    setIsLoggedIn(true);
    setAuthData({ email: '', password: '', name: '', phone: '' });
    setError(null);

    //window.location.href = 'http://localhost:3000/dashboard';
  } catch (err) {
    setError('Registration failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    await apiClient.post('/auth/logout', {});
    setIsLoggedIn(false);
    setUser(null);
    setUsers([]);
    setTasks([]);

    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    //setToken(null);

    window.location.href = 'http://localhost:3000';
  };

  const fetchUsers = async () => {
    const data = await apiClient.get('/users');
    setUsers(data);
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const updatedUser = await apiClient.put(`/users/${editingUser.user_id}`, editingUser);
    setUsers((prev) => prev.map((u) => (u.user_id === editingUser.user_id ? updatedUser : u)));
    setEditingUser(null);
  };

  const deleteUser = async (id: number) => {
    await apiClient.delete(`/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.user_id !== id));
  };

  const fetchTasks = async () => {
    // const data = await apiClient.get('/tasks');
    // setTasks(data);
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = await apiClient.post('/tasks', { name: 'New Task', description: '...' });
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    const updatedTask = await apiClient.put(`/tasks/${editingTask.id}`, editingTask);
    setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const deleteTask = async (id: number) => {
    await apiClient.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AuthContext.Provider
  value={{
    user,
    isLoggedIn,
    setUser,
    handleLogin,
    handleLogout,
    handleRegister,
    checkAuthStatus,
    users,
    fetchUsers,
    updateUser,
    deleteUser,
    tasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    error,
    authData,
    setAuthData,
    projects,
    setProjects,
    company,
    setCompany,
    companies,
    setCompanies,
    project,
    setProject,
    isAdmin,
    setIsAdmin,
    companyProjects,
    setCompanyProjects,
    companyUsers,
    setCompanyUsers,
    //accessToken,
    //setAccessToken,
  }}
>
  {children}
</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
};
