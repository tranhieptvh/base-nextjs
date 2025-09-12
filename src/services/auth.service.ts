import { apiClient } from '@/lib/api';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest
} from '@/types/auth.types';

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data!;
  },

  // Register user
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
    return response.data!;
  },

  // Logout user
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  // Get current user
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    return response.data!;
  },

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await apiClient.post('/auth/forgot-password', data);
  },

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await apiClient.post('/auth/reset-password', data);
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
