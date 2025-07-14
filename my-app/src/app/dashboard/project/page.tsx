'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import { useAuth } from '../../../../context/authContext';
import Link from 'next/link';

interface Project {
  project_id: number;
  project_name: string;
  project_description?: string;
  company_id: number;
}

interface User {
  user_id: number;
}

export default function ProjectsPage() {
  const {projects, setProjects} = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const userId = user?.user_id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiClient.get(`/user-project/${userId}`);
        console.log("Projects: ", data);
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Projects</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {projects.map((project) => (
          <Link key={project.project_id} href={`/dashboard/project/${project.project_id}`}>
          <li key={project.project_id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-medium text-blue-700">{project.project_name}</h3>
            <p className="text-sm text-gray-600">{project.project_description || 'No description'}</p>
            <p className="text-xs text-gray-400 mt-2">Company ID: {project.company_id}</p>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
