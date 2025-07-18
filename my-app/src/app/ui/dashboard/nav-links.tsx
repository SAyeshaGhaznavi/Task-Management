'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  AdjustmentsHorizontalIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon  },
  // { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },
  { name: 'Companies', href: '/dashboard/company', icon: BuildingOffice2Icon },
  { name: 'Projects', href: '/dashboard/project', icon: WrenchScrewdriverIcon },
  { name: 'Task', href: '/dashboard/task', icon: DocumentDuplicateIcon },
  { name: 'Todos', href: '/dashboard/todo', icon: ClipboardDocumentListIcon },
  { name: 'Invites', href: '/dashboard/invites', icon: BellIcon },
  { name: 'Admin', href: '/dashboard/admin', icon: UserGroupIcon},
  { name: 'Edit', href: '/dashboard/edit', icon: AdjustmentsHorizontalIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
