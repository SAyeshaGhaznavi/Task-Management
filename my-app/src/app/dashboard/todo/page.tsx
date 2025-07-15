'use client';

import { useEffect, useState, memo } from 'react';
import apiClient from '../../lib/api';
import { useAuth } from '../../../../context/authContext';

interface Todo {
  todo_id: number;
  todo_name: string;
  todo_description?: string;
  due_date?: string;
  todo_priority?: string;
  todo_status?: string;
  task_id: number;
}

const STATUS_CYCLE = ['Pending', 'In Progress', 'Completed'];

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const userId = user?.user_id;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await apiClient.get(`/user-todo/${userId}`);
        setTodos(data);
      } catch (err) {
        setError('Failed to fetch TODOs');
      }
    };

    if (userId) fetchTodos();
  }, [userId]);

  const cycleStatus = async (todo: Todo) => {
    const currentIndex = STATUS_CYCLE.indexOf(todo.todo_status || 'Pending');
    const nextStatus = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length];

    try {
      await apiClient.patch(`/todo/${todo.todo_id}`, {
        todo_status: nextStatus,
      });

      setTodos((prev) =>
        prev.map((t) =>
          t.todo_id === todo.todo_id ? { ...t, todo_status: nextStatus } : t
        )
      );
    } catch (err) {
      console.error('Failed to update status');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My TODOs</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.todo_id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-blue-700">{todo.todo_name}</h3>
            <p className="text-sm text-gray-600">{todo.todo_description || 'No description'}</p>
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              {todo.due_date && <p>Due: {new Date(todo.due_date).toLocaleDateString()}</p>}
              <p>Priority: {todo.todo_priority || 'N/A'}</p>
              <p>Task ID: {todo.task_id}</p>

              <button
                onClick={() => cycleStatus(todo)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Status: {todo.todo_status || 'Pending'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
