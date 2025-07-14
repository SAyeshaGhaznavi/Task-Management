'use client';

import { useAuth } from '../../../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterPage() {
  const { isLoggedIn, handleRegister, authData, setAuthData, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push('/dashboard');
  }, [isLoggedIn, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Register</h1>
        <form onSubmit={(e) => handleRegister(e)} className="space-y-4">
          <input
            type="text"
            value={authData.name}
            onChange={(e) => setAuthData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            value={authData.email}
            onChange={(e) => setAuthData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={authData.password}
            onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={authData.phone}
            onChange={(e) => setAuthData((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Register
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
