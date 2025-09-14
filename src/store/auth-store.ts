import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '@/types/auth.types';
import { authService } from '@/services/auth.service';
import { setCookie, deleteCookie } from '@/lib/cookies';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  initializeAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  // Internal state
  _isInitialized: boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      _isInitialized: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(credentials);
          
          // Small delay to ensure token is properly stored
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Fetch user data after successful login
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
          console.error('Login error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(credentials);
          
          // Fetch user data after successful registration
          const user = await authService.getCurrentUser();
          
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

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Delete token from cookie
          deleteCookie('auth-token');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            _isInitialized: false,
          });
        }
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token: string | null) => {
        set({ token });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      clearAuth: () => {
        // Delete token from cookie
        deleteCookie('auth-token');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          _isInitialized: false,
        });
      },

      // Initialize auth state on app start
      initializeAuth: async () => {
        // Prevent multiple initializations
        const state = useAuthStore.getState();
        if (state._isInitialized) {
          return;
        }
        
        set({ isLoading: true, _isInitialized: true });
        try {
          if (authService.isAuthenticated()) {
            // Try to get current user
            const user = await authService.getCurrentUser();
            const token = authService.getAccessToken();
            
            // Set token in cookie for middleware
            if (token) {
              setCookie('auth-token', token, 7);
            }
            
            set({
              user: user as User,
              token: token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          // If getting user fails, clear auth state
          console.error('Auth initialization failed:', error);
          
          // Clear tokens if they exist but are invalid
          if (authService.isAuthenticated()) {
            authService.logout();
          }
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      // Refresh access token
      refreshToken: async () => {
        try {
          const response = await authService.refreshToken();
          
          // Fetch user data after successful token refresh
          const user = await authService.getCurrentUser();
          
          set({
            user: user as User,
            token: response.token,
            isAuthenticated: true,
          });
        } catch (error) {
          // If refresh fails, logout user
          console.error('Token refresh failed:', error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
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
