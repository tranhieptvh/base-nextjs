'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/sonner';
import GuestHeader from './header';
import GuestFooter from './footer';

interface GuestLayoutProps {
  children: ReactNode;
}

export function GuestLayout({ children }: GuestLayoutProps) {
  // Initialize auth state and set up auto-refresh
  useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <GuestHeader />
      <main className="flex-1">
        {children}
      </main>
      <GuestFooter />
      <Toaster />
    </div>
  );
}
