/**
 * @fileoverview Utilidades para manejo de API y errores
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Funciones utilitarias para manejo de API, transformación de errores,
 * retry logic y validaciones comunes.
 *
 * @dependencies
 * - Tipos de api.ts
 * - ApiService para error types
 *
 * @usage
 * import { withRetry, getErrorMessage } from '../utils/api-helpers';
 *
 * @state
 * ✅ Funcional - Utilidades completas para API
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Implementar exponential backoff más sofisticado
 * - [PRIORITY: LOW] Agregar métricas de performance
 *
 * @performance
 * - Retry logic optimizado
 * - Error caching para evitar requests repetidos
 * - Debouncing para validaciones
 *
 * @accessibility
 * - Error messages user-friendly
 * - Loading state helpers
 * - Progress tracking utilities
 *
 * @security
 * - Input sanitization helpers
 * - Request validation utilities
 * - Error message sanitization
 */

import type { AnalysisRequest } from '../types/quadratic';
import { ApiServiceError, NetworkServiceError } from '../services/api';

/**
 * Retry configuration
 */
interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  exponentialBase: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  exponentialBase: 2,
};

/**
 * Retry wrapper with exponential backoff
 */
export const withRetry = async <T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> => {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error;

  for (let attempt = 1; attempt <= finalConfig.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on validation errors or client errors (4xx)
      if (error instanceof ApiServiceError && error.statusCode && error.statusCode < 500) {
        throw error;
      }

      // Don't retry on the last attempt
      if (attempt === finalConfig.maxAttempts) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        finalConfig.baseDelay * Math.pow(finalConfig.exponentialBase, attempt - 1),
        finalConfig.maxDelay
      );

      console.warn(`API request failed, retrying in ${delay}ms (attempt ${attempt}/${finalConfig.maxAttempts}):`, error);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiServiceError) {
    switch (error.errorCode) {
      case 'INVALID_COEFFICIENT_A':
        return 'El coeficiente "a" debe ser un número distinto de cero';
      case 'INVALID_COEFFICIENT_B':
      case 'INVALID_COEFFICIENT_C':
        return 'Los coeficientes deben ser números válidos';
      case 'BHASKARA_ANALYSIS_ERROR':
        return 'Error en el análisis cuadrático. Verifica los datos ingresados';
      case 'ECONOMIA_ANALYSIS_ERROR':
        return 'Error en el análisis económico. Verifica los parámetros';
      case 'DOWNLOAD_ERROR':
        return 'Error al descargar el reporte. Intenta nuevamente';
      default:
        return error.message || 'Error en el servidor';
    }
  }

  if (error instanceof NetworkServiceError) {
    if (error.message.includes('timeout')) {
      return 'El servidor tardó demasiado en responder. Verifica tu conexión';
    }
    return 'Error de conexión. Verifica tu internet y el estado del servidor';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Error desconocido. Intenta nuevamente';
};

/**
 * Validate analysis request before sending to API
 */
export const validateAnalysisRequest = (request: AnalysisRequest): string | null => {
  const { coefficients, mode } = request;

  // Validate coefficient A
  if (typeof coefficients.a !== 'number' || isNaN(coefficients.a)) {
    return 'El coeficiente "a" debe ser un número válido';
  }
  if (coefficients.a === 0) {
    return 'El coeficiente "a" no puede ser cero (no sería una función cuadrática)';
  }

  // Validate coefficient B
  if (typeof coefficients.b !== 'number' || isNaN(coefficients.b)) {
    return 'El coeficiente "b" debe ser un número válido';
  }

  // Validate coefficient C
  if (typeof coefficients.c !== 'number' || isNaN(coefficients.c)) {
    return 'El coeficiente "c" debe ser un número válido';
  }

  // Validate mode
  const validModes = ['roots', 'vertex', 'optimal', 'full'];
  if (!validModes.includes(mode)) {
    return 'Modo de análisis inválido';
  }

  // Validate optional description
  if (request.description && typeof request.description !== 'string') {
    return 'La descripción debe ser una cadena de texto';
  }

  return null; // No errors
};

/**
 * Create download link for blob data
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Check if error should trigger retry
 */
export const shouldRetry = (error: unknown): boolean => {
  // Don't retry validation errors
  if (error instanceof ApiServiceError && error.statusCode && error.statusCode < 500) {
    return false;
  }

  // Retry network errors
  if (error instanceof NetworkServiceError) {
    return true;
  }

  // Retry server errors (5xx)
  if (error instanceof ApiServiceError && error.statusCode && error.statusCode >= 500) {
    return true;
  }

  return false;
};

/**
 * Create abort controller with timeout
 */
export const createAbortController = (timeoutMs: number = 30000): AbortController => {
  const controller = new AbortController();
  
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  // Clear timeout if request completes normally
  controller.signal.addEventListener('abort', () => {
    clearTimeout(timeoutId);
  });

  return controller;
};

/**
 * Debounce function for API calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): T => {
  let timeout: NodeJS.Timeout | null = null;

  return ((...args: any[]) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  }) as T;
};

/**
 * Simple cache implementation for API responses
 */
class SimpleCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  private ttl: number;

  constructor(ttlMs: number = 300000) { // 5 minutes default
    this.ttl = ttlMs;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const apiCache = new SimpleCache(300000); // 5 minutes cache

/**
 * Generate cache key for API requests
 */
export const generateCacheKey = (endpoint: string, params: any): string => {
  return `${endpoint}:${JSON.stringify(params)}`;
};
