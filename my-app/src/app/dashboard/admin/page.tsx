'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import { useAuth } from '../../../../context/authContext';
import Link from 'next/link';

export default function ProjectsPage() {
  const [error, setError] = useState<string | null>(null);
  const {user, companies, isAdmin, companyProjects, setCompanyProjects, companyUsers, setCompanyUsers} = useAuth();

  console.log("Companies: ", companies);

  useEffect(() => {
      const fetchProjects = async () => {
        try {
          const data = await apiClient.get(`/project/1/${isAdmin?.company}`);
          setCompanyProjects(data);
          const u = await apiClient.get(`/company-members/find/by-company/${isAdmin?.company}`)
          console.log("U: ", u);
          setCompanyUsers(u);
          console.log("Users: ", companyUsers);
        } catch (err) {
          setError('Failed to fetch projects');
        }
      };
      fetchProjects();
    }, []);

  return (
  <div className="p-6">
    <h2 className="text-2xl font-semibold mb-4">Admin Page</h2>

    {error && <p className="text-red-500 mb-4">{error}</p>}

    {isAdmin?.type ? (
      <>
        <ul className="space-y-4">
          <Link href={`/dashboard/admin/members`}>
            <li className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-medium text-blue-700">Add or Remove Members</h3>
            </li>
          </Link>
        </ul>

        <br />

        <ul className="space-y-4">
          <Link href={`/dashboard/admin/assignproject`}>
            <li className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-medium text-blue-700">Assign Projects</h3>
            </li>
          </Link>
        </ul>

        <br />

        <ul className="space-y-4">
          <Link href={`/dashboard/admin/assigntodo`}>
            <li className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-medium text-blue-700">Assign Todo</h3>
            </li>
          </Link>
        </ul>
      </>
    ) : (
      <p className="text-red-600 font-medium">You are not authorized to access this section.</p>
    )}
  </div>
);

}
