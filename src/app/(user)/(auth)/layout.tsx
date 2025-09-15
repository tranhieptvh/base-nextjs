'use client';

import { Toaster } from '@/components/ui/sonner';

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            User Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Login to access user features
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
