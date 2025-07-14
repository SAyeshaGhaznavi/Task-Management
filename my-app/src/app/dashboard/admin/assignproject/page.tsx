'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../../lib/api';
import { useAuth } from '../../../../../context/authContext';

interface Project {
  project_id: number;
  project_name: string;
  project_description?: string;
  company_id: number;
}

interface User {
  user_id: number;
  user_name: string;
  password: string;
  phone?: string;
  email: string;
  createdAt?: string;
}

export default function ProjectsPage() {
  const [error, setError] = useState<string | null>(null);
  const [showUsersFor, setShowUsersFor] = useState<number | null>(null);
  const {companyProjects, companyUsers} = useAuth();

  const { user, isAdmin } = useAuth();
  const userId = user?.user_id;

  const handleAssign = async (projectId: number, userId: number) => {
    try {
      await apiClient.post('/user-project', {
        user_id: userId,
        project_id: projectId,
      });
      alert(`User assigned to project!`);
    } catch (err) {
      alert('Failed to assign user.');
    }
  };

  const toggleUserList = (projectId: number) => {
    setShowUsersFor((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Company Projects</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-6">
        {companyProjects.map((project) => (
          <li
            key={project.project_id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-blue-700">{project.project_name}</h3>
            <p className="text-sm text-gray-600">{project.project_description || 'No description'}</p>
            <p className="text-xs text-gray-400 mt-2">Company ID: {project.company_id}</p>

            <button
              onClick={() => toggleUserList(project.project_id)}
              className="mt-3 text-sm text-blue-600 underline"
            >
              {showUsersFor === project.project_id ? 'Hide users' : 'Assign user to project'}
            </button>

            {showUsersFor === project.project_id && (
              <div className="mt-3 p-3 bg-gray-50 border rounded">
                <p className="font-semibold mb-2">Select a user:</p>
                <ul className="space-y-2">
                  {companyUsers?.map((u) => (
                    <li
                      key={u.user_id}
                      className="flex justify-between items-center bg-white p-2 rounded border"
                    >
                      <span>{u.user_name}</span>
                      <button
                        onClick={() => handleAssign(project.project_id, u.user_id)}
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Assign
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
