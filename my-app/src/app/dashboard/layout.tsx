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

'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
//export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}