'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../../lib/api';
import { useAuth } from '../../../../../context/authContext';

interface Todo {
  todo_id: number;
  todo_name: string;
  todo_description?: string;
  due_date?: string;
  todo_priority?: string;
  todo_status?: string;
  task_id: number;
}

interface Task {
  task_id: number;
  task_name: string;
  project_id: number;
}

export default function ProjectsPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showUsersFor, setShowUsersFor] = useState<number | null>(null);
  const {companyProjects, companyUsers} = useAuth();
  const [curtodo, setCurTodo] =useState<number|null>(null);

  const { user, isAdmin } = useAuth();
  const userId = user?.user_id;

  useEffect(() => {
  const fetchTodos = async () => {
    try {
      const allTasksPerProject = await Promise.all(
        companyProjects.map((project) =>
          apiClient.get(`/task/by-project/${project.project_id}`)
        )
      );

      console.log("allTasksPerProject: ", allTasksPerProject);

      const allTasks = allTasksPerProject.flat();

      console.log("allTasks: ", allTasks);

      const allTodosPerTask = await Promise.all(
        allTasks.map((task) =>
          apiClient.get(`/todo/by-task/${task.task_id}`)
        )
      );

      console.log("allTodosPerTask: ", allTodosPerTask);

      const allTodos = allTodosPerTask.flat();
      console.log("allTodos: ", allTodos);
      setTodos(allTodos);
      console.log("Todos: ", todos);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch company TODOs');
    }
  };

  if (companyProjects.length > 0) {
    fetchTodos();
  }
}, []);


  const handleAssign = async (todoId: number, userId: number) => {
    try {
      const todotemp:Todo = await apiClient.get(`/todo/${todoId}`);
      console.log("Todo temp todo: ", todotemp);
      console.log("Todo temp task: ", todotemp.task_id);
      const tasktemp:Task = await apiClient.get(`/task/${todotemp.task_id}`);
      console.log("Task temp task: ", tasktemp);
      console.log("Task temp project: ", tasktemp.project_id);
      console.log("user_id: ", userId);
      console.log("todo_id: ", todoId);
      console.log("project_id: ", tasktemp.project_id);
      await apiClient.post('/user-todo', {
        user_id: userId,
        todo_id: todoId,
        project_id: tasktemp.project_id,
      });
      alert(`User assigned to Todo!`);
    } catch (err) {
      alert('Failed to assign user.');
    }
  };

  const toggleUserList = (projectId: number) => {
    setShowUsersFor((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Company Todos</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-6">
        {todos.map((todo:Todo) => (
          <li
            key={todo.todo_id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-blue-700">{todo.todo_name}</h3>
            <p className="text-sm text-gray-600">{todo.todo_description || 'No description'}</p>
            <p className="text-xs text-gray-400 mt-2">Task ID: {todo.task_id}</p>

            <button
              onClick={() => toggleUserList(todo.todo_id)}
              className="mt-3 text-sm text-blue-600 underline"
            >
              {showUsersFor === todo.todo_id ? 'Hide users' : 'Assign user to todo'}
            </button>

            {showUsersFor === todo.todo_id && (
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
                        onClick={() => handleAssign(todo.todo_id, u.user_id)}
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
