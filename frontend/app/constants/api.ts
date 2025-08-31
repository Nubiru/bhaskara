/**
 * @fileoverview Constantes para configuración de API
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * Constantes centralizadas para configuración de API v1, endpoints,
 * timeouts, y configuraciones de retry. Actualizado para nueva
 * arquitectura de backend con endpoints /api/v1/* y sin endpoints legacy.
 *
 * @dependencies
 * - Ninguna
 *
 * @usage
 * import { API_ENDPOINTS, TIMEOUTS } from '../constants/api';
 *
 * @state
 * ✅ Funcional - Constantes para configuración de API v1 (Backend Refactored)
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar constantes para rate limiting
 * - [PRIORITY: LOW] Configuraciones por ambiente
 *
 * @performance
 * - Constantes optimizadas para performance
 * - Timeouts balanceados
 * - Retry configurations tuned
 *
 * @accessibility
 * - Error messages constants
 * - User feedback configurations
 * - Loading state timeouts
 *
 * @security
 * - Secure defaults
 * - Timeout protections
 * - Rate limiting constants
 */

/**
 * API Endpoints - Clean API v1 architecture (no legacy endpoints)
 */
export const API_ENDPOINTS = {
  // Math Analysis Endpoints
  MATH_BHASKARA: '/api/v1/math/bhaskara',
  MATH_QUADRATIC: '/api/v1/math/quadratic',
  
  // Business Analysis Endpoints
  BUSINESS_REVENUE: '/api/v1/business/revenue',
  BUSINESS_COSTS: '/api/v1/business/costs',
  BUSINESS_PROFIT: '/api/v1/business/profit',
  BUSINESS_BREAKEVEN: '/api/v1/business/breakeven',
  
  // Financial Tools Endpoints
  FINANCE_COMPOUND_INTEREST: '/api/v1/finance/compound-interest',
  FINANCE_CURRENCY_CONVERTER: '/api/v1/finance/currency-converter',
  
  // Utility Endpoints
  UTILS_NUMBER_CONVERTER: '/api/v1/utils/number-converter',
  
  // Download endpoints
  DOWNLOAD_ANALYSIS: '/api/v1/download/analysis',
  DOWNLOAD_REVENUE: '/api/v1/download/revenue',
  DOWNLOAD_COSTS: '/api/v1/download/costs',
  DOWNLOAD_PROFIT: '/api/v1/download/profit',
  DOWNLOAD_BREAKEVEN: '/api/v1/download/breakeven',
  
  // System endpoints
  HEALTH_CHECK: '/api/v1/health',
  READINESS_CHECK: '/api/v1/ready',
} as const;

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Timeout configurations (in milliseconds)
 */
export const TIMEOUTS = {
  API_REQUEST: 30000,      // 30 seconds for API requests
  DOWNLOAD: 120000,        // 2 minutes for download requests
  HEALTH_CHECK: 5000,      // 5 seconds for health checks
  RETRY_DELAY_BASE: 1000,  // 1 second base delay for retries
  RETRY_DELAY_MAX: 10000,  // 10 seconds max delay for retries
} as const;

/**
 * Retry configurations
 */
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  EXPONENTIAL_BASE: 2,
  SHOULD_RETRY_ON_NETWORK_ERROR: true,
  SHOULD_RETRY_ON_SERVER_ERROR: true,
  SHOULD_RETRY_ON_CLIENT_ERROR: false,
} as const;

/**
 * Content Types
 */
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  TEXT_PLAIN: 'text/plain',
  TEXT_CSV: 'text/csv',
  APPLICATION_PDF: 'application/pdf',
} as const;

/**
 * Analysis modes
 */
export const ANALYSIS_MODES = {
  ROOTS: 'roots',
  VERTEX: 'vertex', 
  OPTIMAL: 'optimal',
  FULL: 'full',
} as const;

/**
 * Download formats
 */
export const DOWNLOAD_FORMATS = {
  CSV: 'csv',
  PDF: 'pdf',
} as const;

/**
 * Error codes from backend
 */
export const API_ERROR_CODES = {
  INVALID_COEFFICIENT_A: 'INVALID_COEFFICIENT_A',
  INVALID_COEFFICIENT_B: 'INVALID_COEFFICIENT_B',
  INVALID_COEFFICIENT_C: 'INVALID_COEFFICIENT_C',
  BHASKARA_ANALYSIS_ERROR: 'BHASKARA_ANALYSIS_ERROR',
  ECONOMIA_ANALYSIS_ERROR: 'ECONOMIA_ANALYSIS_ERROR',
  DOWNLOAD_ERROR: 'DOWNLOAD_ERROR',
  BACKEND_ERROR: 'BACKEND_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

/**
 * Cache configurations
 */
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300000,     // 5 minutes
  ANALYSIS_TTL: 600000,    // 10 minutes for analysis results
  HEALTH_CHECK_TTL: 30000, // 30 seconds for health checks
  MAX_CACHE_SIZE: 100,     // Maximum number of cached items
} as const;

/**
 * Request headers
 */
export const DEFAULT_HEADERS = {
  'Content-Type': CONTENT_TYPES.JSON,
  'Accept': CONTENT_TYPES.JSON,
  'X-Requested-With': 'XMLHttpRequest',
} as const;

/**
 * Environment configurations
 */
export const ENV_CONFIG = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

/**
 * API Base URLs by environment - Nginx proxy setup
 */
export const API_BASE_URLS = {
  [ENV_CONFIG.DEVELOPMENT]: 'http://localhost', // Nginx proxy on port 80, endpoints include /api/v1/
  [ENV_CONFIG.PRODUCTION]: import.meta.env.VITE_API_BASE_URL || 'https://api.mutualmetrics.com',
  [ENV_CONFIG.TEST]: 'http://localhost', // Nginx proxy on port 80, endpoints include /api/v1/
} as const;

/**
 * File size limits
 */
export const FILE_LIMITS = {
  MAX_DOWNLOAD_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_REQUEST_SIZE: 10 * 1024 * 1024,  // 10MB
} as const;

/**
 * User feedback messages
 */
export const USER_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet y el estado del servidor',
  TIMEOUT_ERROR: 'El servidor tardó demasiado en responder. Verifica tu conexión',
  SERVER_ERROR: 'Error en el servidor. Intenta nuevamente en unos momentos',
  VALIDATION_ERROR: 'Los datos ingresados no son válidos. Verifica la información',
  UNKNOWN_ERROR: 'Error desconocido. Intenta nuevamente',
  ANALYSIS_SUCCESS: 'Análisis completado exitosamente',
  DOWNLOAD_SUCCESS: 'Descarga iniciada exitosamente',
  DOWNLOAD_PREPARING: 'Preparando descarga...',
  ANALYZING: 'Analizando función...',
} as const;

/**
 * Loading states
 */
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

/**
 * Progress indicators
 */
export const PROGRESS_STEPS = {
  VALIDATING: 'Validando datos...',
  SENDING_REQUEST: 'Enviando solicitud...',
  PROCESSING: 'Procesando análisis...',
  RECEIVING_RESPONSE: 'Recibiendo resultados...',
  FINALIZING: 'Finalizando...',
} as const;
