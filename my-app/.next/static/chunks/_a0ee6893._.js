(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// 'use client';
// import { useState, useEffect } from 'react';
// import apiClient from './lib/api';
// import { setAccessToken } from './lib/api';
// interface User {
//   user_id: number;
//   user_name: string;
//   password: string;
//   phone?: string;
//   email: string;
//   createdAt?: string;
// }
// interface Task {
//   id: number;
//   name: string;
//   description: string;
//   //completed: boolean;
//   projectId?: number;
// }
// interface AuthData {
//   email: string;
//   password: string;
//   name?: string;
//   phone?:string;
// }
// export default function HomePage() {
//   // Auth state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
//   const [authData, setAuthData] = useState<AuthData>({ email: '', password: '', name: '' , phone: ''});
//   // Users state
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState({ name: '', email: '' });
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   // Tasks state
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState({ name: '', description: '' });
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   // UI state
//   const [activeTab, setActiveTab] = useState<'users' | 'tasks'|'company'|'projects'>('users');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   // Check if user is logged in on component mount
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);
//   // Load data when logged in
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchUsers();
//       fetchTasks();
//     }
//   }, [isLoggedIn]);
//   // Auth functions
//   const checkAuthStatus = async () => {
//     try {
//       const response = await apiClient.get('/auth/profile');
//       setUser(response);
//       setIsLoggedIn(true);
//     } catch (err) {
//       setIsLoggedIn(false);
//     }
//   };
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await apiClient.post('/auth/login', {
//         email: authData.email,
//         password: authData.password,
//       });
//       setAccessToken(response.access_token);
//       const newUser:User={user_id:response.user.user_id, user_name: response.user.user_name, email: response.user.email, phone: response.user.phone, password: response.user.password};
//       console.log("Response: ",response.user.user_id, response.user.user_name);
//       console.log("Response.users: ",response.user);
//       setUser(newUser);
//       //setUser(response.user);
//       console.log("Users: ",user);
//       setIsLoggedIn(true);
//       setAuthData({ email: '', password: '', name: '', phone:''});
//       //console.log({email,password});
//       setError(null);
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await apiClient.post('/users', {
//         user_name: authData.name,
//         email: authData.email,
//         password: authData.password,
//         phone:authData.phone,
//       });
//       setUser(response.user);
//       setIsLoggedIn(true);
//       setAuthData({ email: '', password: '', name: '', phone:'' });
//       setError(null);
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleLogout = async () => {
//     try {
//       await apiClient.post('/auth/logout', {});
//       setIsLoggedIn(false);
//       setUser(null);
//       setUsers([]);
//       setTasks([]);
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//   };
//   // Users CRUD functions
//   const fetchUsers = async () => {
//     try {
//       const data = await apiClient.get('/users');
//       setUsers(data);
//     } catch (err) {
//       setError('Failed to fetch users');
//     }
//   };
//   // const createUser = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   try {
//   //     const user = await apiClient.post('/users', newUser);
//   //     setUsers([...users, user]);
//   //     setNewUser({ name: '', email: '' });
//   //   } catch (err) {
//   //     setError('Failed to create user');
//   //   }
//   // };
//   const updateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingUser) return;
//     try {
//       const updatedUser = await apiClient.put(`/users/${editingUser.user_id}`, editingUser);
//       setUsers(users.map(u => u.user_id === editingUser.user_id ? updatedUser : u));
//       setEditingUser(null);
//     } catch (err) {
//       setError('Failed to update user');
//     }
//   };
//   const deleteUser = async (id: number) => {
//     try {
//       await apiClient.delete(`/users/${id}`);
//       setUsers(users.filter(u => u.user_id !== id));
//     } catch (err) {
//       setError('Failed to delete user');
//     }
//   };
//   // Tasks CRUD functions
//   const fetchTasks = async () => {
//     try {
//       const data = await apiClient.get('/tasks');
//       setTasks(data);
//     } catch (err) {
//       setError('Failed to fetch tasks');
//     }
//   };
//   const createTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const task = await apiClient.post('/tasks', { ...newTask, completed: false });
//       setTasks([...tasks, task]);
//       setNewTask({ name: '', description: '' });
//     } catch (err) {
//       setError('Failed to create task');
//     }
//   };
//   const updateTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTask) return;
//     try {
//       const updatedTask = await apiClient.put(`/tasks/${editingTask.id}`, editingTask);
//       setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
//       setEditingTask(null);
//     } catch (err) {
//       setError('Failed to update task');
//     }
//   };
//   // const toggleTaskComplete = async (task: Task) => {
//   //   try {
//   //     const updatedTask = await apiClient.patch(`/tasks/${task.id}`, {
//   //       completed: !task.completed
//   //     });
//   //     setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
//   //   } catch (err) {
//   //     setError('Failed to update task status');
//   //   }
//   // };
//   const deleteTask = async (id: number) => {
//     try {
//       await apiClient.delete(`/tasks/${id}`);
//       setTasks(tasks.filter(t => t.id !== id));
//     } catch (err) {
//       setError('Failed to delete task');
//     }
//   };
//   // If not logged in, show auth form
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md w-96">
//           <h1 className="text-2xl font-bold mb-6 text-center">
//             {authMode === 'login' ? 'Login' : 'Register'}
//           </h1>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}
//           <form onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
//             {authMode === 'register' && (
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={authData.name}
//                   onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={authData.email}
//                 onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={authData.password}
//                 onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             {authMode === 'register' && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 value={authData.phone}
//                 onChange={(e) => setAuthData({ ...authData, phone: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             )}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
//             >
//               {loading ? 'Loading...' : (authMode === 'login' ? 'Login' : 'Register')}
//             </button>
//           </form>
//           <div className="mt-4 text-center">
//             <button
//               onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
//               className="text-blue-500 hover:text-blue-700"
//             >
//               {authMode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   // Main dashboard
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">Task Management System</h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">Welcome, {user?.user_name}!</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>
//       {/* Error Display */}
//       {error && (
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//             <button
//               onClick={() => setError(null)}
//               className="float-right ml-4 text-red-500 hover:text-red-700"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Tab Navigation */}
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="border-b border-gray-200">
//           <nav className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'users'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Users
//             </button>
//             <button
//               onClick={() => setActiveTab('tasks')}
//               className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'tasks'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Tasks
//             </button>
//           </nav>
//         </div>
//       </div>
//       {/* Users Tab */}
//       {activeTab === 'users' && (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//   <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
//     <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Profile</h2>
//     <div className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-500">Name</label>
//         <div className="text-lg font-medium text-gray-900 border border-gray-200 rounded-md px-4 py-2 bg-gray-50">
//           {user?.user_name || '—'}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-500">Email</label>
//         <div className="text-lg font-medium text-gray-900 border border-gray-200 rounded-md px-4 py-2 bg-gray-50">
//           {user?.email || '—'}
//         </div>
//       </div>
//     </div>
//     {/* Optional Edit Button */}
//     {/* 
//     <button
//       onClick={() => setEditingUser(currentUser)}
//       className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
//     >
//       Edit Profile
//     </button> 
//     */}
//   </div>
//           {/* Users List */}
//           <div className="mt-6 bg-white rounded-lg shadow">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold">Users List</h2>
//             </div>
//             <div className="divide-y divide-gray-200">
//               {users.map((user) => (
//                 <div key={user.user_id} className="px-6 py-4 flex items-center justify-between">
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-900">{user.user_name}</h3>
//                     <p className="text-sm text-gray-500">{user.email}</p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setEditingUser(user)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteUser(user.user_id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Tasks Tab */}
//       {activeTab === 'tasks' && (
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Create Task Form */}
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
//               <form onSubmit={createTask}>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     value={newTask.name}
//                     onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     value={newTask.description}
//                     onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     rows={3}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Create Task
//                 </button>
//               </form>
//             </div>
//             {/* Edit Task Form */}
//             {editingTask && (
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
//                 <form onSubmit={updateTask}>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       value={editingTask.name}
//                       onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Description
//                     </label>
//                     <textarea
//                       value={editingTask.description}
//                       onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       rows={3}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="flex items-center">
//                       <input
//                         type="checkbox"
//                         //checked={editingTask.completed}
//                         //onChange={(e) => setEditingTask({ ...editingTask, completed: e.target.checked })}
//                         className="mr-2"
//                       />
//                       <span className="text-sm font-medium text-gray-700">Completed</span>
//                     </label>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       type="submit"
//                       className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                       Update Task
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setEditingTask(null)}
//                       className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//           {/* Tasks List */}
//           <div className="mt-6 bg-white rounded-lg shadow">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold">Tasks List</h2>
//             </div>
//             <div className="divide-y divide-gray-200">
//               {tasks.map((task) => (
//                 <div key={task.id} className="px-6 py-4 flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <input
//                       type="checkbox"
//                       //checked={task.completed}
//                       //onChange={() => toggleTaskComplete(task)}
//                       className="w-4 h-4 text-blue-600 rounded"
//                     />
//                     <div>
//                       {/* <h3 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
//                         {task.title}
//                       </h3>
//                       <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-500'}`}>
//                         {task.description}
//                       </p> */}
//                     </div>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => setEditingTask(task)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteTask(task.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function Home() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold",
                children: "Welcome to Task Manager"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 614,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/login'),
                        className: "px-4 py-2 bg-blue-600 text-white rounded",
                        children: "Login"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 616,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/register'),
                        className: "px-4 py-2 bg-green-600 text-white rounded",
                        children: "Register"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 615,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 613,
        columnNumber: 5
    }, this);
}
_s(Home, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_a0ee6893._.js.map