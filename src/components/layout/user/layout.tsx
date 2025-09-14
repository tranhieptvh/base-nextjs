'use client';

import { useAuth } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/sonner';
import Header from './header';
import Footer from './footer';

interface UserLayoutProps {
  children: React.ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  // Initialize auth state and set up auto-refresh
  useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
