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
    setUser,
    setToken,
    setLoading,
    clearAuth,
    initializeAuth,
    refreshToken,
  } = useAuthStore();

  const router = useRouter();

  // Initialize auth state on mount (only once)
  useEffect(() => {
    initializeAuth();
  }, []); // Empty dependency array to run only once

  // Auto refresh token before expiry
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        refreshToken();
      }, 15 * 60 * 1000); // Refresh every 15 minutes

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]); // Remove refreshToken from dependencies

  const handleLogin = async (credentials: Parameters<typeof login>[0]) => {
    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleRegister = async (credentials: Parameters<typeof register>[0]) => {
    try {
      await register(credentials);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return false;
    }
    return true;
  };

  const requireGuest = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
      return false;
    }
    return true;
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
    setUser,
    setToken,
    setLoading,
    clearAuth,
    
    // Utilities
    requireAuth,
    requireGuest,
  };
};
