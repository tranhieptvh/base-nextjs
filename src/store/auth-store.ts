import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '@/types/auth.types';
import { authService } from '@/services/auth.service';
import { setCookie, deleteCookie } from '@/lib/cookies';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Login
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(credentials);
          const user = await authService.getCurrentUser();
          
          // Set token in cookie for middleware
          setCookie('auth-token', response.token, 7);
          
          set({
            user: user as User,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Register
      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(credentials);
          const user = await authService.getCurrentUser();
          
          // Set token in cookie for middleware
          setCookie('auth-token', response.token, 7);
          
          set({
            user: user as User,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // Logout
      logout: () => {
        // Clear cookie
        deleteCookie('auth-token');
        
        // Clear state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      // Initialize auth on app start
      initializeAuth: async () => {
        const { token } = get();
        
        if (token) {
          try {
            const user = await authService.getCurrentUser();
            set({
              user: user as User,
              isAuthenticated: true,
              isLoading: false,
            });
        } catch {
          // Token is invalid, clear auth
          get().logout();
        }
        } else {
          set({ isLoading: false });
        }
      },

      // Refresh token
      refreshToken: async () => {
        try {
          const response = await authService.refreshToken();
          const user = await authService.getCurrentUser();
          
          set({
            user: user as User,
            token: response.token,
            isAuthenticated: true,
          });
        } catch {
          // Refresh failed, logout
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
