'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { AdminLayout } from '@/components/layout/admin/layout';
import { isAdmin } from '@/constants/roles';

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/admin/login');
      } else if (!isAdmin(user?.role_id)) {
        router.push('/dashboard'); // Redirect to user dashboard if not admin
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin(user?.role_id)) {
    return null;
  }

  // AdminLayout already has useAuth() and Toaster, so just return it
  return <AdminLayout>{children}</AdminLayout>;
}
