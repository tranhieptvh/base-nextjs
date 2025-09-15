'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { AdminLayout } from '@/components/layout/admin/layout';

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isClient, isLoading, isAuthenticated, router]);

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
