'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import { useAuth } from '../../../../context/authContext';
import Link from 'next/link';

export default function CompaniesPage() {
  const {companies, setCompanies}=useAuth();
  //const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user, isAdmin, setIsAdmin } = useAuth();
  const userId = user?.user_id;


  useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const data = await apiClient.get(`/company-members/${userId}`);
      setCompanies(data);

      const detailedCompanyPromises = data.map((company: any) =>
        apiClient.get(`/company-members/${company.company_id}/${userId}`)
      );

      const detailedCompanyMemberships = await Promise.all(detailedCompanyPromises);

      const adminCompany = detailedCompanyMemberships.find(
        (company: any) => company.user_role === 'ADMIN'
      );

      if (adminCompany) {
        setIsAdmin({ type: true, company: adminCompany.company_id });
        console.log("Admin of company ID:", adminCompany.company_id);
      } else {
        setIsAdmin({ type: false, company: -1 });
        console.log("User is not admin of any company.");
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch companies');
    }
  };

  if (userId) {
    fetchCompanies();
  }
}, [userId, setCompanies, setIsAdmin]);



  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name.trim()) {
      setFormError('Company name is required.');
      return;
    }

    try {
      setLoading(true);
      const newCompany = await apiClient.post('/company', {
        company_name: name,
        company_location: location,
        owner_id: user?.user_id,
      });

      setCompanies((prev) => [...prev, newCompany]);
      console.log("Set Companies: ", companies);
      setName('');
      setLocation('');
    } catch (err) {
      setFormError('Failed to create company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Companies</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4 mb-6">
        {companies.map((company) => (
          <Link key={company.company_id} href={`/dashboard/company/${company.company_id}`}>
            <li className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
              <h3 className="text-lg font-medium text-green-700">{company.company_name}</h3>
              <p className="text-sm text-gray-600">
                {company.company_location || 'No location'}
              </p>
            </li>
          </Link>
        ))}
      </ul>

      <form onSubmit={handleCreateCompany} className="space-y-4 border-t pt-6">
        <h3 className="text-xl font-semibold">Create a New Company</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Company'}
        </button>
      </form>
    </div>
  );
}
