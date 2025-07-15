'use client';

import { useAuth } from '../../../context/authContext';
import { useRouter } from 'next/navigation';
import apiClient from '../lib/api'; 
import { useEffect, useState } from 'react';

export default function DashboardHome() {
  const { user, handleLogout, isAdmin, setIsAdmin, companies, setCompanies} = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  //const { user, isAdmin, setIsAdmin } = useAuth();
  const userId = user?.user_id;

    useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await apiClient.get(`/company-members/${userId}`);
        setCompanies(data);
  
        const detailedCompanyPromises = data.map((company: any) =>
          apiClient.get(`/company-members/${company.company_id}/${userId}`)
        );
  
        const detailedCompanyMemberships = await Promise.all(detailedCompanyPromises);
  
        const adminCompany = detailedCompanyMemberships.find(
          (company: any) => company.user_role === 'ADMIN'
        );
  
        if (adminCompany) {
          setIsAdmin({ type: true, company: adminCompany.company_id });
          console.log("Admin of company ID:", adminCompany.company_id);
        } else {
          setIsAdmin({ type: false, company: -1 });
          console.log("User is not admin of any company.");
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch companies');
      }
    };
  
    if (userId) {
      fetchCompanies();
    }
  }, [userId, setCompanies, setIsAdmin]);

  const logout = async () => {
    await handleLogout();
    router.push('/login');
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Welcome, {user?.user_name} 👋
          </h1>
          <p className="text-gray-600 mb-6">
            Email: <span className="font-medium">{user?.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
