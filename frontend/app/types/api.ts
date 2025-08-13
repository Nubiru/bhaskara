/**
 * @fileoverview Tipos TypeScript para comunicación con API backend
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Definiciones de tipos para respuestas del API, manejo de errores,
 * y comunicación con el backend Python (FastAPI). Incluye tipos
 * para requests, responses y estados de comunicación.
 * 
 * @dependencies
 * - TypeScript 5.8.3+
 * - Axios para HTTP requests
 * - Tipos de quadratic.ts
 * 
 * @usage
 * import type { ApiResponse, ApiError, AnalysisApiRequest } from './types/api';
 * 
 * @state
 * ✅ Funcional - Tipos base implementados
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar tipos para paginación
 * - [PRIORITY: LOW] Implementar tipos para websockets
 * 
 * @performance
 * - Tipos optimizados para serialización JSON
 * - Manejo eficiente de errores de red
 * 
 * @security
 * - Validación de respuestas del servidor
 * - Sanitización de datos de entrada
 */

import type { 
  AnalysisRequest, 
  AnalysisResult, 
  AnalysisMode, 
  FullAnalysisResult,
  AnalysisId 
} from './quadratic';

// ============================================================================
// TIPOS DE REQUEST
// ============================================================================

/**
 * Request para análisis de función cuadrática
 */
export interface AnalysisApiRequest extends AnalysisRequest {
  timestamp: string;
  clientVersion: string;
  sessionId?: string;
}

/**
 * Request para obtener historial de análisis
 */
export interface HistoryRequest {
  limit?: number;
  offset?: number;
  mode?: AnalysisMode;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Request para exportar análisis
 */
export interface ExportRequest {
  analysisId: AnalysisId;
  format: 'pdf' | 'csv' | 'json';
  includeGraph?: boolean;
}

// ============================================================================
// TIPOS DE RESPONSE
// ============================================================================

/**
 * Respuesta exitosa del API
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  timestamp: string;
  requestId: string;
}

/**
 * Respuesta de error del API
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
    field?: string;
  };
  timestamp: string;
  requestId: string;
}

/**
 * Respuesta genérica del API
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Respuesta específica para análisis
 */
export type AnalysisApiResponse = ApiResponse<FullAnalysisResult>;

/**
 * Respuesta para historial de análisis
 */
export interface HistoryResponse {
  analyses: FullAnalysisResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Respuesta para exportación
 */
export interface ExportResponse {
  downloadUrl: string;
  expiresAt: string;
  filename: string;
  size: number;
}

// ============================================================================
// TIPOS DE ERROR
// ============================================================================

/**
 * Códigos de error del API
 */
export type ApiErrorCode = 
  | 'VALIDATION_ERROR'
  | 'INVALID_COEFFICIENTS'
  | 'ANALYSIS_FAILED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND';

/**
 * Error del API con información detallada
 */
export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: string;
  field?: string;
  timestamp: string;
  requestId?: string;
}

/**
 * Error de red
 */
export interface NetworkError {
  type: 'network';
  message: string;
  status?: number;
  statusText?: string;
  url?: string;
}

/**
 * Error de timeout
 */
export interface TimeoutError {
  type: 'timeout';
  message: string;
  timeout: number;
  url?: string;
}

/**
 * Error de validación
 */
export interface ValidationError {
  type: 'validation';
  field: string;
  message: string;
  value?: unknown;
}

/**
 * Union de todos los tipos de error
 */
export type AppError = ApiError | NetworkError | TimeoutError | ValidationError;

// ============================================================================
// TIPOS DE CONFIGURACIÓN
// ============================================================================

/**
 * Configuración del cliente API
 */
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
}

/**
 * Configuración de endpoints
 */
export interface ApiEndpoints {
  analyze: string;
  history: string;
  export: string;
  health: string;
}

/**
 * Estado de la conexión con el API
 */
export type ApiConnectionState = 
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'reconnecting';

// ============================================================================
// TIPOS DE CACHE
// ============================================================================

/**
 * Item en cache del API
 */
export interface ApiCacheItem<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number;
  key: string;
}

/**
 * Configuración de cache
 */
export interface CacheConfig {
  enabled: boolean;
  ttl: number;
  maxSize: number;
  strategy: 'lru' | 'fifo' | 'ttl';
}

// ============================================================================
// TIPOS DE MONITORING
// ============================================================================

/**
 * Métricas de performance del API
 */
export interface ApiMetrics {
  requestCount: number;
  successCount: number;
  errorCount: number;
  averageResponseTime: number;
  lastRequestTime: string;
  uptime: number;
}

/**
 * Evento de request
 */
export interface ApiRequestEvent {
  type: 'request_start' | 'request_success' | 'request_error';
  url: string;
  method: string;
  timestamp: string;
  duration?: number;
  error?: AppError;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Headers de request
 */
export type RequestHeaders = Record<string, string>;

/**
 * Parámetros de query
 */
export type QueryParams = Record<string, string | number | boolean | undefined>;

/**
 * Configuración de request
 */
export interface RequestConfig {
  headers?: RequestHeaders;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

/**
 * Función de transformación de datos
 */
export type DataTransformer<T, U> = (data: T) => U;

/**
 * Función de validación de respuesta
 */
export type ResponseValidator<T> = (response: unknown) => response is T;

// ============================================================================
// CONSTANTES
// ============================================================================

/**
 * Timeouts por defecto
 */
export const DEFAULT_TIMEOUTS = {
  REQUEST: 10000,
  RETRY_DELAY: 1000,
  CACHE_TTL: 300000, // 5 minutos
} as const;

/**
 * Códigos de estado HTTP
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  RATE_LIMIT: 429,
  INTERNAL_ERROR: 500,
} as const;

/**
 * Headers por defecto
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'MutualMetrics-Frontend/1.0.0',
} as const;
