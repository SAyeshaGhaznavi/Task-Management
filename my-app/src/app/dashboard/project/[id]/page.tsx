'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '../../../lib/api';
import { useAuth } from '../../../../../context/authContext';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user , project, setProject} = useAuth();

  //const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  //const isAdmin = project?.owner_id === user?.user_id;

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const projectRes = await apiClient.get(`/project/${id}`);
        setProject(projectRes);

        const tasksRes = await apiClient.get(`/task/1/${id}`);
        setTasks(tasksRes);
      } catch (err) {
        setError('Failed to load project or tasks');
      }
    };

    if (id) fetchProjectAndTasks();
  }, [id]);

  if (!project) {
    return <p className="p-6">Loading project...</p>;
  }

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-2xl font-bold mb-2">{project.project_name}</h2>
      <p className="text-gray-600 mb-4">{project.project_description || 'No description'}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Tasks</h3>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.task_id} className="border p-4 rounded shadow-sm bg-white">
            <p className="font-medium">{task.task_title}</p>
            <p className="text-sm text-gray-500">{task.task_description || 'No description'}</p>
          </li>
        ))}
      </ul>
      <br/>

      
      <div>
            <>
              {/* Create New Task Form */}
              <CreateTaskForm/>
            </>
      </div>
    </div>
  );
}

function CreateTaskForm({ }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');
  const {project, setProject}=useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newTask = await apiClient.post('/task', {
        task_name: title,
        task_description: desc,
        project_id: project?.project_id,
      });

      setTitle('');
      setDesc('');
      setError('');
      //onSuccess(newTask);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
        <h4 className="text-lg font-semibold">Create New Task</h4>
      <input
        type="text"
        placeholder="Task Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Task description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Task
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
