'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { handleLogout } from '../../../../auth';
import { useAuth } from '../../../../context/authContext';
import NotificationBell from '../../../components/NotificationBell';
 
export default function SideNav() {
  const {handleLogout}=useAuth();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
        {/* Notification Bell */}
        <div className="flex items-center justify-center md:justify-start md:p-2 md:px-3">
          <NotificationBell />
        </div>
        
        <form
          action={async () => {
            //'use server';
            await ({ redirectTo: '/' });
          }}
        >
          <button onClick={handleLogout}  className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            {<PowerIcon className="w-6" /> }
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}