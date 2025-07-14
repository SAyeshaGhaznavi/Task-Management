'use client';

import { useAuth } from '../../../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isLoggedIn, handleLogin, authData, setAuthData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push('/dashboard');
  }, [isLoggedIn, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h1>
        <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer font-medium"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
