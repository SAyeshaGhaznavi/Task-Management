(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/lib/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiClient": (()=>apiClient),
    "default": (()=>__TURBOPACK__default__export__),
    "setAccessToken": (()=>setAccessToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3001/api") || 'http://localhost:3001/api';
let accessToken = null;
function setAccessToken(token) {
    accessToken = token;
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem('access_token', token);
    }
}
function getAccessToken() {
    if (accessToken) return accessToken;
    if ("TURBOPACK compile-time truthy", 1) {
        return localStorage.getItem('access_token');
    }
    "TURBOPACK unreachable";
}
async function fetchWithRetry(endpoint, options, retry = true) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            ...options.headers || {},
            ...getAccessToken() ? {
                Authorization: `Bearer ${getAccessToken()}`
            } : {}
        }
    });
    if (response.status === 401 && retry) {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include'
        });
        if (refreshRes.ok) {
            const { access_token } = await refreshRes.json();
            setAccessToken(access_token);
            return fetchWithRetry(endpoint, options, false);
        } else {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
            throw new Error('Session expired. Please log in again.');
        }
    }
    if (!response.ok) {
        let message = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            message = errorData.message || message;
        } catch (_) {}
        throw new Error(message);
    }
    return response.json();
}
const apiClient = {
    get (endpoint) {
        return fetchWithRetry(endpoint, {
            method: 'GET' /*, ...options*/ 
        });
    },
    post (endpoint, data) {
        return fetchWithRetry(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    put (endpoint, data) {
        return fetchWithRetry(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    patch (endpoint, data) {
        return fetchWithRetry(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    delete (endpoint) {
        return fetchWithRetry(endpoint, {
            method: 'DELETE'
        });
    }
};
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/context/authContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const AuthProvider = ({ children })=>{
    _s();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [authData, setAuthData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingUser, setEditingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingTask, setEditingTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [company, setCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [project, setProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAdmin, setIsAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [companyProjects, setCompanyProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [companyUsers, setCompanyUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const tryRefresh = {
                "AuthProvider.useEffect.tryRefresh": async ()=>{
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
                }
            }["AuthProvider.useEffect.tryRefresh"];
            tryRefresh();
        }
    }["AuthProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            checkAuthStatus();
        }
    }["AuthProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (isLoggedIn) {
                fetchUsers();
                fetchTasks();
            }
        }
    }["AuthProvider.useEffect"], [
        isLoggedIn
    ]);
    const checkAuthStatus = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/auth/profile');
            setUser(response);
            setIsLoggedIn(true);
        } catch  {
            setIsLoggedIn(false);
        }
    };
    const handleLogin = async (e)=>{
        try {
            e.preventDefault();
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/login', {
                email: authData.email,
                password: authData.password
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAccessToken"])(response.access_token);
            console.log("Access Token: ", response.access_token);
            console.log("Refresh Token: ", response.refresh_token);
            setUser({
                user_id: response.user.user_id,
                user_name: response.user.user_name,
                email: response.user.email,
                phone: response.user.phone,
                password: response.user.password
            });
            console.log("User: ", user);
            setIsLoggedIn(true);
            setAuthData({
                email: '',
                password: '',
                name: '',
                phone: ''
            });
            setError(null);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally{
            setLoading(false);
        }
    };
    const handleRegister = async (e)=>{
        e.preventDefault();
        try {
            try {
                setLoading(true);
            } catch (error) {
                console.log("loading failed");
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/register', {
                user_name: authData.name,
                email: authData.email,
                password: authData.password,
                phone: authData.phone
            });
            console.log("Response: ", response.user.user_name);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAccessToken"])(response.access_token);
            setUser({
                user_id: response.user.user_id,
                user_name: response.user.user_name,
                email: response.user.email,
                phone: response.user.phone,
                password: response.user.password
            });
            console.log("User after register: ", user);
            setIsLoggedIn(true);
            setAuthData({
                email: '',
                password: '',
                name: '',
                phone: ''
            });
            setError(null);
        //window.location.href = 'http://localhost:3000/dashboard';
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    const handleLogout = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/logout', {});
        setIsLoggedIn(false);
        setUser(null);
        setUsers([]);
        setTasks([]);
        window.location.href = 'http://localhost:3000';
    };
    const fetchUsers = async ()=>{
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/users');
        setUsers(data);
    };
    const updateUser = async (e)=>{
        e.preventDefault();
        if (!editingUser) return;
        const updatedUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/users/${editingUser.user_id}`, editingUser);
        setUsers((prev)=>prev.map((u)=>u.user_id === editingUser.user_id ? updatedUser : u));
        setEditingUser(null);
    };
    const deleteUser = async (id)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/users/${id}`);
        setUsers((prev)=>prev.filter((u)=>u.user_id !== id));
    };
    const fetchTasks = async ()=>{
    // const data = await apiClient.get('/tasks');
    // setTasks(data);
    };
    const createTask = async (e)=>{
        e.preventDefault();
        const task = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/tasks', {
            name: 'New Task',
            description: '...'
        });
        setTasks((prev)=>[
                ...prev,
                task
            ]);
    };
    const updateTask = async (e)=>{
        e.preventDefault();
        if (!editingTask) return;
        const updatedTask = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/tasks/${editingTask.id}`, editingTask);
        setTasks((prev)=>prev.map((t)=>t.id === editingTask.id ? updatedTask : t));
        setEditingTask(null);
    };
    const deleteTask = async (id)=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/tasks/${id}`);
        setTasks((prev)=>prev.filter((t)=>t.id !== id));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
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
            setCompanyUsers
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/authContext.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
};
_s(AuthProvider, "c6aJQfwfXndkLAU9CllgRrk6+YI=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/websocketContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WebSocketProvider": (()=>WebSocketProvider),
    "useWebSocket": (()=>useWebSocket)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/authContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const WebSocketContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const WebSocketProvider = ({ children })=>{
    _s();
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { user, isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WebSocketProvider.useEffect": ()=>{
            if (!isLoggedIn || !user) {
                if (socket) {
                    socket.disconnect();
                    setSocket(null);
                    setIsConnected(false);
                }
                return;
            }
            const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])('http://localhost:3001/notifications', {
                query: {
                    userId: user.user_id.toString()
                },
                auth: {
                    token: localStorage.getItem('access_token')
                }
            });
            newSocket.on('connect', {
                "WebSocketProvider.useEffect": ()=>{
                    console.log('🔌 WebSocket connected');
                    setIsConnected(true);
                    newSocket.emit('authenticate', {
                        userId: user.user_id,
                        token: localStorage.getItem('access_token')
                    });
                }
            }["WebSocketProvider.useEffect"]);
            newSocket.on('disconnect', {
                "WebSocketProvider.useEffect": ()=>{
                    console.log('🔌 WebSocket disconnected');
                    setIsConnected(false);
                }
            }["WebSocketProvider.useEffect"]);
            newSocket.on('todoAssigned', {
                "WebSocketProvider.useEffect": (notification)=>{
                    console.log('📢 Received todo assignment notification:', notification);
                    setNotifications({
                        "WebSocketProvider.useEffect": (prev)=>[
                                notification,
                                ...prev
                            ]
                    }["WebSocketProvider.useEffect"]);
                    // Show browser notification if permission is granted
                    if (Notification.permission === 'granted') {
                        new Notification('New Todo Assigned', {
                            body: notification.message,
                            icon: '/favicon.ico'
                        });
                    }
                }
            }["WebSocketProvider.useEffect"]);
            newSocket.on('connect_error', {
                "WebSocketProvider.useEffect": (error)=>{
                    console.error('❌ WebSocket connection error:', error);
                    setIsConnected(false);
                }
            }["WebSocketProvider.useEffect"]);
            setSocket(newSocket);
            // Cleanup on unmount
            return ({
                "WebSocketProvider.useEffect": ()=>{
                    newSocket.disconnect();
                }
            })["WebSocketProvider.useEffect"];
        }
    }["WebSocketProvider.useEffect"], [
        isLoggedIn,
        user
    ]);
    const clearNotifications = ()=>{
        setNotifications([]);
    };
    const markAsRead = (index)=>{
        setNotifications((prev)=>prev.filter((_, i)=>i !== index));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WebSocketContext.Provider, {
        value: {
            isConnected,
            notifications,
            clearNotifications,
            markAsRead
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/websocketContext.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
};
_s(WebSocketProvider, "xWt43JcNSyiYJ7cwEEiYKGhlaUM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$authContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = WebSocketProvider;
const useWebSocket = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
_s1(useWebSocket, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "WebSocketProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_6bbba739._.js.map