'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '../../../lib/api';
import { useAuth } from '../../../../../context/authContext';

interface User {
  user_id: number;
  user_name: string;
  password: string;
  phone?: string;
  email: string;
  createdAt?: string;
}

export default function CompanyDetailPage() {
  const {company, setCompany, projects, setProjects, user}=useAuth();
  const { id } = useParams();
  //const [company, setCompany] = useState(null);
  //const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  //const { user } = useAuth();

  const curCompany= apiClient.get(`/company/${id}`);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyRes = await apiClient.get(`/company/${id}`);
        setCompany(companyRes);

        const projectsRes = await apiClient.get(`/project/1/${id}`);
        setProjects(projectsRes);
      } catch (err) {
        setError('Failed to load company or projects');
      }
    };

    if (id) fetchCompany();
  }, [id]);

    if (!company) {
    return <p className="p-6">Loading company...</p>;
  }

  const isAdmin = company?.owner_id === user?.user_id;

  return (
    <div className="p-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {company && (
        <>
          <h2 className="text-2xl font-bold mb-2">{company.company_name}</h2>
          <p className="text-gray-600 mb-4">
            {company.company_location || 'No location'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Projects</h3>
          <ul className="space-y-3">
            {projects.map((proj) => (
              <li
                key={proj.project_id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <p className="font-medium">{proj.project_name}</p>
                <p className="text-sm text-gray-500">
                  {proj.project_description || 'No description'}
                </p>
              </li>
            ))}
          </ul>

          {isAdmin && (
            <>
              {/* Create New Project Form */}
              <CreateProjectForm/>

              {/* Invite Member Form */}
              <InviteMemberForm />
            </>
          )}
        </>
      )}
    </div>
  );
}

function CreateProjectForm({  }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [msg, setMsg] = useState('');
  const {company, setProjects}=useAuth();
  const companyId=company?.company_id;

  const handleSubmit = async () => {
    //e.preventDefault();
    try {
      const newProject = await apiClient.post('/project', {
        project_name: name,
        project_description: desc,
        company_id: companyId,
      });
      //setProjects((prev) => [...prev, newProject]);
      setMsg('Project created successfully!');
      setName('');
      setDesc('');
    } catch {
      setMsg('Failed to create project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h4 className="text-lg font-semibold">Create New Project</h4>
      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Project description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
      {msg && <p className="text-sm text-gray-500">{msg}</p>}
    </form>
  );
}


function InviteMemberForm() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const { company } = useAuth();
  const {user} = useAuth();
  const companyId = company?.company_id;


  const handleInvite = async (e: React.FormEvent) => {
  e.preventDefault();

  const fetchUser = async () => {
    if (!email) return null;

    try {
      console.log("Email: ", email);
      const res: User = await apiClient.get(`/users/by-email/${email}`);
      console.log('Fetched user:', res.user_name);
      return res.user_id;
    } catch (err) {
      console.error('Error fetching user:', err);
      return null;
    }
  };

  const invitedId = await fetchUser();

  if (!invitedId) {
    setMsg('No user found with this email.');
    return;
  }

  try {
    const response = await apiClient.post(`/invited-member`, {
      invited_id: invitedId,
      invited_by_id: user?.user_id,
      status: "Pending",
      user_email: email,
    });

    console.log("Response: ", response);

    setMsg('Invitation sent!');
    setUserId('');
    setEmail('');
  } catch (err) {
    console.error(err);
    setMsg('Failed to send invitation');
  }
};


  return (
    <form onSubmit={handleInvite} className="mt-6 space-y-4">
      <h4 className="text-lg font-semibold">Invite New Member</h4>
      <input
        type="text"
        placeholder="User email to invite"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Invite
      </button>
      {msg && <p className="text-sm text-gray-500">{msg}</p>}
    </form>
  );
}