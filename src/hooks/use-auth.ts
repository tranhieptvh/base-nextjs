import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    initializeAuth,
    refreshToken,
  } = useAuthStore();

  const router = useRouter();

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Note: Auto refresh is handled by UserLayout component
  // to avoid duplicate refresh calls

  const handleLogin = async (credentials: Parameters<typeof login>[0]) => {
    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (credentials: Parameters<typeof register>[0]) => {
    try {
      await register(credentials);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    
    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
