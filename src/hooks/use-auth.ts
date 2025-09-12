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
  } = useAuthStore();

  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    if (token && !user) {
      // TODO: Verify token and fetch user data
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [token, user, setLoading]);

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
