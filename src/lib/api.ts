import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/common.types';
import { API_CONFIG } from './config';
import { authService } from '@/services/auth.service';

class ApiClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: string | null) => void;
    reject: (error: Error) => void;
  }> = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  private setupInterceptors() {
    // Add request interceptor for auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth-token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling and auto-refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If already refreshing, queue this request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.axiosInstance(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await authService.refreshToken();
            const newToken = response.access_token;
            
            // Update access token in localStorage
            localStorage.setItem('auth-token', newToken);
            
            // Process queued requests
            this.processQueue(null, newToken);
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Refresh failed, process queue with error
            this.processQueue(refreshError instanceof Error ? refreshError : new Error('Token refresh failed'), null);
            
            // Clear tokens and redirect to login
            localStorage.removeItem('auth-token');
            localStorage.removeItem('refresh-token');
            
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle other errors
        if (error.response) {
          const { status, data } = error.response;
          let errorMessage = 'An error occurred';
          
          if (data?.message) {
            errorMessage = data.message;
          } else if (data?.detail) {
            errorMessage = data.detail;
          } else if (data?.error) {
            errorMessage = data.error;
          } else {
            switch (status) {
              case 401:
                errorMessage = 'Unauthorized. Please login again.';
                break;
              case 403:
                errorMessage = 'Forbidden. You do not have permission to access this resource.';
                break;
              case 404:
                errorMessage = 'Resource not found.';
                break;
              case 422:
                errorMessage = 'Validation error. Please check your input.';
                break;
              case 500:
                errorMessage = 'Internal server error. Please try again later.';
                break;
              default:
                errorMessage = `Request failed with status ${status}`;
            }
          }
          
          const customError = new Error(errorMessage) as Error & { status?: number; response?: unknown };
          customError.status = status;
          customError.response = error.response;
          return Promise.reject(customError);
        } else if (error.request) {
          return Promise.reject(new Error('Network error. Please check your connection and try again.'));
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.request({
        method,
        url: endpoint,
        data,
        ...config,
      });
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Retry logic for network errors
      if (retryCount < API_CONFIG.RETRY.ATTEMPTS && 
          error instanceof Error && 
          error.message.includes('Network error')) {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY.DELAY * (retryCount + 1)));
        return this.request<T>(method, endpoint, data, config, retryCount + 1);
      }
      
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, { params });
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data);
  }

  // PUT request
  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data);
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data);
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }

  // Upload file
  async upload<T>(endpoint: string, file: File): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<T>('POST', endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Get axios instance for advanced usage
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  // Update auth token manually (useful for token refresh)
  updateAuthToken(token: string): void {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Clear auth token
  clearAuthToken(): void {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }
}

export const apiClient = new ApiClient();
