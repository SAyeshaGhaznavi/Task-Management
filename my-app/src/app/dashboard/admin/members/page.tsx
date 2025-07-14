'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../../lib/api';
import { useAuth } from '../../../../../context/authContext';

interface User {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
  phone?: string;
}

interface Company {
  company_id: number;
  company_name: string;
  company_location: string;
  owner_id: number;
}

interface CompanyMember {
  company_id: number;
  user_id: number;
  user_role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const {user, isAdmin} = useAuth();
  const [company, setCompany] = useState<string | null>(null);
  const [companyid, setCompanyid] = useState<number|null>(null);
  const [email, setEmail] = useState<string|null>(null);
  const [mes, setMes] = useState<string|null>(null);
  const [role, setRole] = useState<string|null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiClient.get(`/company-members/find/by-company/${isAdmin?.company}`);
      setUsers(data);
      const comp:Company = await apiClient.get(`/company/${isAdmin?.company}`);
      console.log("Comp: ", comp.company_name);
      setCompany(comp.company_name);
      setCompanyid(comp.company_id);
      console.log("Company: ", company);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await apiClient.delete(`/company-members/${companyid}/${id}`);
      setUsers(users.filter((u) => u.user_id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res: User = await apiClient.get(`/users/by-email/${email}`);
    const userid=res.user_id;

    if (!email || !companyid) {
      setMes("Missing email or company ID");
      return;
    }

    await apiClient.post(`/company-members/`, {
      user_id: userid,
      company_id: companyid,
      user_role: role,
    });

    setMes("User added successfully!");
    setEmail("");
    fetchUsers();
  } catch (error) {
    console.log("Error: ", error);
    setMes("Cannot add the user");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">{company}</h2>
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Company Members</h2>
      {/* <br></br> */}

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
              Remove from company
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={addUser} className="mt-6 space-y-4">
      <h4 className="text-lg font-semibold">Add New Member</h4>
      <input
        type="text"
        placeholder="User email to add"
        value={email ?? ''}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <h4 className="text-lg font-semibold">New Member Role</h4>
      <select
        value={role ?? ''}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="" disabled>Select role</option>
        <option value="ADMIN">ADMIN</option>
        <option value="MEMBER">MEMBER</option>
        <option value="USER">EMPLOYEE</option>
      </select>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add
      </button>
      {mes && <p className="text-sm text-gray-500">{mes}</p>}
    </form>
    </div>
    
  );
}