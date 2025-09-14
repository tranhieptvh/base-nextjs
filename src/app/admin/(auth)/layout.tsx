'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { isAdmin } from '@/constants/roles';
import { Toaster } from '@/components/ui/sonner';

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && isAdmin(user?.role_id)) {
        router.push('/admin/dashboard'); // Redirect to admin panel if logged in and is admin
      } else if (isAuthenticated && !isAdmin(user?.role_id)) {
        router.push('/dashboard'); // Redirect to user dashboard if logged in but not admin
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
            <span className="text-gray-900 font-bold text-xl">A</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Admin Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Only admins can access this area
          </p>
        </div>
        <div className="bg-white py-6 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
