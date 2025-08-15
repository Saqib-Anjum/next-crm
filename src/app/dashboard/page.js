"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../_components/Layout';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Welcome to the Dashboard!</h2>
      <button
        onClick={handleLogout}
        className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </Layout>
  );
}
