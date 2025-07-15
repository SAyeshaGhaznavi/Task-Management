'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
      <div className="flex gap-4">
        <button onClick={() => router.push('/login')} className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
        <button onClick={() => router.push('/register')} className="px-4 py-2 bg-green-600 text-white rounded">Register</button>
      </div>
    </div>
  );
}
