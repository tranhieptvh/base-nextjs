'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { UserLayout } from '@/components/layout/user/layout';

export default function UserRouteLayout({
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
      router.push('/login');
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

  return <UserLayout>{children}</UserLayout>;
}
