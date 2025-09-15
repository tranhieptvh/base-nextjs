import { apiClient } from '@/lib/api';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse,
  LoginResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  User
} from '@/types/auth.types';

// Token management utilities
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

const tokenManager = {
  // Save tokens to localStorage
  setTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    // Update axios instance with new token
    apiClient.updateAuthToken(accessToken);
  },

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Clear all tokens
  clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    // Clear from axios instance
    apiClient.clearAuthToken();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
};

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    const { access_token, refresh_token } = response.data!;
    
    // Store tokens
    tokenManager.setTokens(access_token, refresh_token);
    
    // Get user data
    const user = await this.getCurrentUser();
    
    return {
      user: user as User | null,
      access_token,
      refresh_token,
      token_type: response.data?.token_type || 'bearer'
    };
  },

  // Register user
  async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    await apiClient.post<{ data: unknown }>('/auth/register', credentials);
    
    // After successful registration, automatically login to get tokens
    const loginResponse = await this.login({
      email: credentials.email,
      password: credentials.password
    });
    
    return loginResponse;
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refresh_token: refreshToken });
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local tokens
      tokenManager.clearTokens();
    }
  },

  // Get current user
  async getCurrentUser() {
    const token = tokenManager.getAccessToken();
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    try {
      const response = await apiClient.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      // If it's a 401 error, clear the tokens
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        tokenManager.clearTokens();
        apiClient.clearAuthToken(); // Also clear from axios instance
        throw new Error('Session expired. Please login again.');
      }
      throw error;
    }
  },

  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<AuthResponse>('/auth/refresh-token', {
      refresh_token: refreshToken
    });
    
    const { access_token, refresh_token } = response.data!;
    
    // Update stored tokens
    tokenManager.setTokens(access_token, refresh_token);
    
    return {
      access_token,
      refresh_token,
      token_type: response.data?.token_type || 'bearer'
    };
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return tokenManager.isAuthenticated();
  },

  // Get stored access token
  getAccessToken(): string | null {
    return tokenManager.getAccessToken();
  },

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await apiClient.post('/auth/forgot-password', data);
  },

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token: data.token,
      new_password: data.password
    });
  },

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await apiClient.post('/auth/change-password', data);
  },

  // Verify email
  async verifyEmail(data: VerifyEmailRequest): Promise<void> {
    await apiClient.post('/auth/verify-email', data);
  },

  // Resend verification email
  async resendVerification(data: ResendVerificationRequest): Promise<void> {
    await apiClient.post('/auth/resend-verification', data);
  },

  // OAuth providers
  async getOAuthProviders() {
    const response = await apiClient.get('/auth/providers');
    return response.data;
  },

  // OAuth callback
  async oauthCallback(provider: string, code: string) {
    const response = await apiClient.post(`/auth/oauth/${provider}/callback`, { code });
    return response.data;
  },
};
