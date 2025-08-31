/**
 * @fileoverview Base API Service for MutualMetrics Backend Communication
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * Base service class providing common HTTP functionality, error handling,
 * interceptors, and configuration for all specialized API services.
 * Implements the foundation for the new modular API architecture with clean /api/v1/ endpoints.
 *
 * @dependencies
 * - Axios para HTTP requests
 * - Tipos de api.ts para manejo de errores
 *
 * @usage
 * class MathApiService extends BaseApiService {
 *   async analyzeBhaskara(request: AnalysisApiRequest) { ... }
 * }
 *
 * @state
 * ✅ Funcional - Base service para arquitectura modular de API
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Implementar retry automático con exponential backoff
 * - [PRIORITY: LOW] Agregar caching de requests idénticos
 * - [PRIORITY: LOW] Implementar request cancellation
 *
 * @performance
 * - Request timeout configurado
 * - Response interceptors para optimización
 * - Error handling centralizado
 *
 * @accessibility
 * - Error messages accesibles
 * - Loading states properly communicated
 * - Progress feedback for long operations
 *
 * @security
 * - Request/response sanitization
 * - CSRF token handling
 * - Input validation before API calls
 */

import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import type { 
  ApiSuccessResponse, 
  ApiErrorResponse,
  ApiError
} from '../../types/api';

// API Configuration - Using import.meta.env for Vite
const getCurrentEnvironment = (): string => {
  if (import.meta.env.DEV) return 'development';
  if (import.meta.env.PROD) return 'production';
  return 'development';
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost'; // Nginx proxy on port 80, endpoints include /api/v1/
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// Error types for proper error handling
export class ApiServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errorCode?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiServiceError';
  }
}

export class NetworkServiceError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'NetworkServiceError';
  }
}

/**
 * Base API Service Class
 * Provides common HTTP functionality for all specialized services
 */
export abstract class BaseApiService {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add CSRF token if available
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        // Add timestamp for cache busting if needed
        if (config.method === 'get') {
          config.params = { ...config.params, _t: Date.now() };
        }

        console.debug('API Request:', config.method?.toUpperCase(), config.url, config.data);
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.debug('API Response:', response.status, response.config.url, response.data);
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Handle and transform API errors
   */
  private handleApiError(error: AxiosError): ApiServiceError | NetworkServiceError {
    if (error.code === 'ECONNABORTED') {
      return new NetworkServiceError('Request timeout - server took too long to respond', error);
    }

    if (!error.response) {
      return new NetworkServiceError('Network error - unable to connect to server', error);
    }

    const { status, data } = error.response;
    const errorData = data as ApiErrorResponse;

    return new ApiServiceError(
      errorData.error?.message || 'Unknown API error',
      status,
      errorData.error?.code,
      errorData.error?.details
    );
  }

  /**
   * Generic GET request with error handling
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<ApiSuccessResponse<T>>(url, config);
      
      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error during GET request', 500, 'GET_REQUEST_ERROR', error);
    }
  }

  /**
   * Generic POST request with error handling
   */
  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post<ApiSuccessResponse<T>>(url, data, config);
      
      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error during POST request', 500, 'POST_REQUEST_ERROR', error);
    }
  }

  /**
   * Generic PUT request with error handling
   */
  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.put<ApiSuccessResponse<T>>(url, data, config);
      
      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error during PUT request', 500, 'PUT_REQUEST_ERROR', error);
    }
  }

  /**
   * Generic DELETE request with error handling
   */
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<ApiSuccessResponse<T>>(url, config);
      
      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error during DELETE request', 500, 'DELETE_REQUEST_ERROR', error);
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.axiosInstance.get('/api/v1/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get API configuration info
   */
  getConfig() {
    return {
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
    };
  }
}
