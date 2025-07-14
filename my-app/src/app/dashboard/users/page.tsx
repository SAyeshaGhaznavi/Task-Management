'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../lib/api';

interface User {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
  phone?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiClient.get('/users');
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await apiClient.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.user_id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">All Users</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.user_id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-gray-800">{user.user_name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            {user.phone && <p className="text-sm text-gray-500 mt-1">📞 {user.phone}</p>}

            <button
              onClick={() => deleteUser(user.user_id)}
              className="mt-3 text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}