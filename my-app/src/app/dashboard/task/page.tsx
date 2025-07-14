'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import { useAuth } from '../../../../context/authContext';
import Link from 'next/link';

interface Task {
  task_id: number;
  task_name: string;
  task_description?: string;
  project_id: number;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const userId = user?.user_id;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;
      try {
        const data = await apiClient.get(`/task/${userId}`);
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch Tasks');
      }
    };

    fetchTasks();
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.task_id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-green-700">{task.task_name}</h3>
            <p className="text-sm text-gray-600">{task.task_description || 'No description'}</p>
            <p className="text-sm text-gray-500 mt-2">Project ID: {task.project_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
