module.exports = {

"[project]/src/app/ui/dashboard/sidenav.tsx [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
// 'use client'
// import Link from 'next/link';
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { handleLogout } from '../../../../auth';
// import { useAuth } from '../../../../context/authContext';
// export default function SideNav() {
//   const {handleLogout}=useAuth();
//   return (
//     <div className="flex h-full flex-col px-3 py-4 md:px-2">
//       <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
//         <NavLinks />
//         <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
//         <form
//           action={async () => {
//             //'use server';
//             await ({ redirectTo: '/' });
//           }}
//         >
//           <button onClick={handleLogout}  className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//             {<PowerIcon className="w-6" /> }
//             <div className="hidden md:block">Sign Out</div>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
}}),
"[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// // import SideNav from '@/app/ui/dashboard/sidenav';
// // //export const experimental_ppr = true;
// // export default function Layout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
// //       <div className="w-full flex-none md:w-64">
// //         <SideNav />
// //       </div>
// //       <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
// //     </div>
// //   );
// // }
// // app/dashboard/layout.tsx
// import { ReactNode } from 'react';
// import Link from 'next/link';
// import { AuthProvider } from '';
// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthProvider>
//       <div className="flex">
//       <aside className="w-64 bg-gray-200 h-screen p-4">
//         <nav className="space-y-2">
//           <Link href="/dashboard/users">Users</Link>
//           <Link href="/dashboard/tasks">Tasks</Link>
//           <Link href="/dashboard/company">Company</Link>
//           <Link href="/dashboard/projects">Projects</Link>
//         </nav>
//       </aside>
//       <main className="flex-1 p-6">
//         {children}
//       </main>
//     </div>
//     </AuthProvider>
//   );
// }
// import { AuthProvider } from '../../../context/authContext';
// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthProvider>
//       <main>{children}</main>
//     </AuthProvider>
//   );
// }
// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/app/lib/utils'; // Optional helper for classnames
// const links = [
//   { name: 'Home', href: '/dashboard/homepage' },
//   { name: 'Users', href: '/dashboard/users' },
//   { name: 'Tasks', href: '/dashboard/tasks' },
//   { name: 'Projects', href: '/dashboard/projects' },
//   { name: 'Company', href: '/dashboard/company' },
// ];
// export default function SideNav() {
//   const pathname = usePathname();
//   return (
//     <aside className="h-full bg-gray-100 p-4 space-y-2">
//       <h2 className="text-lg font-semibold mb-4">Navigation</h2>
//       <nav className="space-y-2">
//         {links.map((link) => (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={cn(
//               'block px-4 py-2 rounded hover:bg-blue-200 transition',
//               pathname === link.href ? 'bg-blue-300 font-semibold' : 'bg-gray-200'
//             )}
//           >
//             {link.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }
__turbopack_context__.s({
    "default": (()=>Layout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ui$2f$dashboard$2f$sidenav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/ui/dashboard/sidenav.tsx [app-rsc] (ecmascript)");
;
;
function Layout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen flex-col md:flex-row md:overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex-none md:w-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$ui$2f$dashboard$2f$sidenav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/dashboard/layout.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/layout.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow p-6 md:overflow-y-auto md:p-12",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/layout.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/layout.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_app_216c2099._.js.map