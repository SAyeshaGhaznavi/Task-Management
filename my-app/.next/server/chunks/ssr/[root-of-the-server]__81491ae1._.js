module.exports = {

"[next]/internal/font/google/inter_59dee874.module.css [app-rsc] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "className": "inter_59dee874-module__9CtR0q__className",
});
}}),
"[next]/internal/font/google/inter_59dee874.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_59dee874.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}}),
"[project]/context/authContext.tsx [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
// 'use client';
// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import apiClient, { setAccessToken } from '@/app/lib/api';
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
//   projectId?: number;
// }
// interface AuthData {
//   email: string;
//   password: string;
//   name?: string;
//   phone?: string;
// }
// interface AuthContextType {
//   user: User | null;
//   error: string | null;
//   isLoggedIn: boolean;
//   setUser: (u: User | null) => void;
//   handleLogin: (e: React.FormEvent) => Promise<void>;
//   handleLogout: () => Promise<void>;
//   handleRegister: (e: React.FormEvent) => Promise<void>;
//   checkAuthStatus: () => Promise<void>;
//   users: User[];
//   fetchUsers: () => Promise<void>;
//   updateUser: (e: React.FormEvent) => Promise<void>;
//   deleteUser: (id: number) => Promise<void>;
//   tasks: Task[];
//   fetchTasks: () => Promise<void>;
//   createTask: (e: React.FormEvent) => Promise<void>;
//   updateTask: (e: React.FormEvent) => Promise<void>;
//   deleteTask: (id: number) => Promise<void>;
//   authData: AuthData;
//   setAuthData: React.Dispatch<React.SetStateAction<AuthData>>;
// }
// const AuthContext = createContext<AuthContextType | null>(null);
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [authData, setAuthData] = useState<AuthData>({ email: '', password: '', name: '', phone: '' });
//   const [users, setUsers] = useState<User[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchUsers();
//       fetchTasks();
//     }
//   }, [isLoggedIn]);
//   const checkAuthStatus = async () => {
//     try {
//       const response = await apiClient.get('/auth/profile');
//       setUser(response);
//       setIsLoggedIn(true);
//     } catch {
//       setIsLoggedIn(false);
//     }
//   };
//   const handleLogin = async (e: React.FormEvent) => {
//     try {
//         e.preventDefault();
//         const response = await apiClient.post('/auth/login', {
//           email: authData.email,
//           password: authData.password,
//         });
//         setAccessToken(response.access_token);
//         setUser({
//           user_id: response.user.user_id,
//           user_name: response.user.user_name,
//           email: response.user.email,
//           phone: response.user.phone,
//           password: response.user.password,
//         });
//         console.log("User: ", user);
//         setIsLoggedIn(true);
//         setAuthData({ email: '', password: '', name: '', phone: '' });
//         setError(null);
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };
// //   const handleRegister = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const response = await apiClient.post('/users', {
// //       user_name: authData.name,
// //       email: authData.email,
// //       password: authData.password,
// //       phone: authData.phone,
// //     });
// //     setUser(response.user);
// //     setIsLoggedIn(true);
// //   };
//   const handleRegister = async (e: React.FormEvent, form: RegisterForm) => {
//   e.preventDefault();
//   try {
//     // 1. Register the user
//     const res = await apiClient.post('/auth/register', {
//       user_name: form.name,
//       email: form.email,
//       password: form.password,
//       phone: form.phone,
//     });
//     if (res.status === 201) {
//       // 2. Immediately login the user using the same credentials
//       const loginRes = await apiClient.post('/auth/login', {
//         email: form.email,
//         password: form.password,
//       });
//       const { accessToken, user } = loginRes.data;
//       setAccessToken(accessToken);
//       setAuthData({ email: form.email, password: form.password });
//       setUser(user);
//       setIsLoggedIn(true);
//     }
//   } catch (error) {
//     console.error('Registration/Login failed:', error);
//   }
// };
//   const handleLogout = async () => {
//     await apiClient.post('/auth/logout', {});
//     setIsLoggedIn(false);
//     setUser(null);
//     setUsers([]);
//     setTasks([]);
//   };
//   const fetchUsers = async () => {
//     const data = await apiClient.get('/users');
//     setUsers(data);
//   };
//   const updateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingUser) return;
//     const updatedUser = await apiClient.put(`/users/${editingUser.user_id}`, editingUser);
//     setUsers((prev) => prev.map((u) => (u.user_id === editingUser.user_id ? updatedUser : u)));
//     setEditingUser(null);
//   };
//   const deleteUser = async (id: number) => {
//     await apiClient.delete(`/users/${id}`);
//     setUsers((prev) => prev.filter((u) => u.user_id !== id));
//   };
//   const fetchTasks = async () => {
//     const data = await apiClient.get('/tasks');
//     setTasks(data);
//   };
//   const createTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const task = await apiClient.post('/tasks', { name: 'New Task', description: '...' });
//     setTasks((prev) => [...prev, task]);
//   };
//   const updateTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingTask) return;
//     const updatedTask = await apiClient.put(`/tasks/${editingTask.id}`, editingTask);
//     setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? updatedTask : t)));
//     setEditingTask(null);
//   };
//   const deleteTask = async (id: number) => {
//     await apiClient.delete(`/tasks/${id}`);
//     setTasks((prev) => prev.filter((t) => t.id !== id));
//   };
//   return (
//     <AuthContext.Provider
//   value={{
//     user,
//     isLoggedIn,
//     setUser,
//     handleLogin,
//     handleLogout,
//     handleRegister,
//     checkAuthStatus,
//     users,
//     fetchUsers,
//     updateUser,
//     deleteUser,
//     tasks,
//     fetchTasks,
//     createTask,
//     updateTask,
//     deleteTask,
//     error,
//     authData,
//     setAuthData,
//   }}
// >
//   {children}
// </AuthContext.Provider>
//   );
// };
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
//   return context;
// };
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
__turbopack_context__.s({
    "default": (()=>RootLayout),
    "metadata": (()=>metadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_59dee874.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$authContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/authContext.tsx [app-rsc] (ecmascript)");
;
;
;
;
const metadata = {
    title: 'Task Manager',
    description: 'Manage your companies and tasks'
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$authContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__81491ae1._.js.map