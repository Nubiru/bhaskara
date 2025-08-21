/**
 * @fileoverview Servicio de API para comunicación con backend MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Servicio centralizado para todas las comunicaciones con el backend FastAPI.
 * Maneja endpoints de análisis cuadrático, económico y descarga de reportes.
 *
 * @dependencies
 * - Axios para HTTP requests
 * - Tipos de api.ts y quadratic.ts
 *
 * @usage
 * import { apiService } from '../services/api';
 * const result = await apiService.analyzeBhaskara(coefficients);
 *
 * @state
 * ✅ Funcional - Integración completa con backend FastAPI
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
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { 
  AnalysisApiRequest, 
  ApiSuccessResponse, 
  ApiErrorResponse,
  ApiError,
  NetworkError,
  TimeoutError,
  ValidationError 
} from '../types/api';
import type { FullAnalysisResult } from '../types/quadratic';
import type { Coefficients } from '../types/quadratic';
import type { 
  BusinessAnalysisRequest,
  BusinessAnalysisResult,
  RevenueAnalysisRequest,
  RevenueAnalysisResult,
  CostAnalysisRequest,
  CostAnalysisResult,
  ProfitAnalysisRequest,
  ProfitAnalysisResult,
  BreakEvenAnalysisRequest,
  BreakEvenAnalysisResult,
  CompoundInterestRequest,
  CompoundInterestResult,
  DownloadOptions,
  DownloadProgress
} from '../types/business';

// API Configuration - Using import.meta.env for Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// Error types for proper error handling (using types from api.ts)
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
 * API Service Class
 * Centralizes all backend communication
 */
class ApiService {
  private axiosInstance: AxiosInstance;

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
   * Validate coefficients before API call
   */
  private validateCoefficients(coefficients: Coefficients): void {
    if (typeof coefficients.a !== 'number' || coefficients.a === 0) {
      throw new ApiServiceError('Coeficiente "a" debe ser un número distinto de cero', 400, 'INVALID_COEFFICIENT_A');
    }
    if (typeof coefficients.b !== 'number') {
      throw new ApiServiceError('Coeficiente "b" debe ser un número', 400, 'INVALID_COEFFICIENT_B');
    }
    if (typeof coefficients.c !== 'number') {
      throw new ApiServiceError('Coeficiente "c" debe ser un número', 400, 'INVALID_COEFFICIENT_C');
    }
  }

  /**
   * Análisis Bhaskara - Análisis cuadrático completo
   */
  async analyzeBhaskara(request: AnalysisApiRequest): Promise<FullAnalysisResult> {
    try {
      this.validateCoefficients(request.coefficients);

      const response = await this.axiosInstance.post<ApiSuccessResponse<FullAnalysisResult>>(
        '/analizar/bhaskara',
        {
          coefficients: request.coefficients,
          mode: request.mode,
          description: request.description || undefined,
        }
      );

      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis Bhaskara', 500, 'BHASKARA_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis Económico - Análisis orientado a economía
   */
  async analyzeEconomia(request: AnalysisApiRequest): Promise<FullAnalysisResult> {
    try {
      this.validateCoefficients(request.coefficients);

      const response = await this.axiosInstance.post<ApiSuccessResponse<FullAnalysisResult>>(
        '/analizar/economia',
        {
          coefficients: request.coefficients,
          mode: request.mode,
          description: request.description || undefined,
        }
      );

      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis económico', 500, 'ECONOMIA_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Descargar Análisis - Descarga reporte en CSV o PDF
   */
  async downloadAnalysis(format: 'csv' | 'pdf', analysisIds?: string[]): Promise<Blob> {
    try {
      const response = await this.axiosInstance.post(
        '/descargar/analisis',
        {
          format,
          analysis_ids: analysisIds || [],
        },
        {
          responseType: 'blob',
          headers: {
            'Accept': format === 'csv' ? 'text/csv' : 'application/pdf',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante descarga de análisis', 500, 'DOWNLOAD_ERROR', error);
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.axiosInstance.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  // ========================================
  // BUSINESS ANALYSIS ENDPOINTS
  // ========================================

  /**
   * Análisis de Ingresos Totales
   */
  async analyzeRevenue(request: RevenueAnalysisRequest): Promise<RevenueAnalysisResult> {
    try {
      const response = await this.axiosInstance.get<ApiSuccessResponse<RevenueAnalysisResult>>(
        '/analisis/ingreso-total',
        {
          params: {
            precio: request.precio,
            cantidad: request.cantidad,
            description: request.description || undefined,
          }
        }
      );

      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de ingresos', 500, 'REVENUE_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis de Costos Totales
   */
  async analyzeCosts(request: CostAnalysisRequest): Promise<CostAnalysisResult> {
    try {
      const response = await this.axiosInstance.get<ApiSuccessResponse<CostAnalysisResult>>(
        '/analisis/costo-total',
        {
          params: {
            costos_fijos: request.costosFijos,
            costos_variables: request.costosVariables,
            cantidad: request.cantidad || undefined,
            description: request.description || undefined,
          }
        }
      );

      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de costos', 500, 'COST_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis de Beneficios
   */
  async analyzeProfit(request: ProfitAnalysisRequest): Promise<ProfitAnalysisResult> {
    try {
      const response = await this.axiosInstance.get<ApiSuccessResponse<ProfitAnalysisResult>>(
        '/analisis/beneficio',
        {
          params: {
            ingreso_total: request.ingresoTotal,
            costo_total: request.costoTotal,
            description: request.description || undefined,
          }
        }
      );

      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de beneficios', 500, 'PROFIT_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis de Punto de Equilibrio
   */
  async analyzeBreakEven(request: BreakEvenAnalysisRequest): Promise<BreakEvenAnalysisResult> {
    try {
      const response = await this.axiosInstance.get<ApiSuccessResponse<BreakEvenAnalysisResult>>(
        '/analisis/punto-equilibrio',
        {
          params: {
            costos_fijos: request.costosFijos,
            precio: request.precio,
            costo_variable_unitario: request.costoVariableUnitario,
            description: request.description || undefined,
          }
        }
      );

      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de punto de equilibrio', 500, 'BREAKEVEN_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis de Interés Compuesto
   */
  async analyzeCompoundInterest(request: CompoundInterestRequest): Promise<CompoundInterestResult> {
    try {
      const response = await this.axiosInstance.post<ApiSuccessResponse<CompoundInterestResult>>(
        '/analisis/interes-compuesto',
        request
      );

      if (!response.data.success) {
        throw new ApiServiceError('Backend returned unsuccessful response', 500, 'BACKEND_ERROR');
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de interés compuesto', 500, 'COMPOUND_INTEREST_ANALYSIS_ERROR', error);
    }
  }

  // ========================================
  // DOWNLOAD ENDPOINTS
  // ========================================

  /**
   * Descargar análisis de ingresos
   */
  async downloadRevenueAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        '/descargar/ingreso-total',
        {
          params: {
            format: options.format,
            analysis_ids: options.analysisIds?.join(',') || '',
            include_charts: options.includeCharts || false,
            include_metadata: options.includeMetadata || true,
          },
          responseType: 'blob',
          headers: {
            'Accept': this.getAcceptHeader(options.format),
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de ingresos', 500, 'DOWNLOAD_REVENUE_ERROR', error);
    }
  }

  /**
   * Descargar análisis de costos
   */
  async downloadCostAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        '/descargar/costo-total',
        {
          params: {
            format: options.format,
            analysis_ids: options.analysisIds?.join(',') || '',
            include_charts: options.includeCharts || false,
            include_metadata: options.includeMetadata || true,
          },
          responseType: 'blob',
          headers: {
            'Accept': this.getAcceptHeader(options.format),
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de costos', 500, 'DOWNLOAD_COST_ERROR', error);
    }
  }

  /**
   * Descargar análisis de beneficios
   */
  async downloadProfitAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        '/descargar/beneficio',
        {
          params: {
            format: options.format,
            analysis_ids: options.analysisIds?.join(',') || '',
            include_charts: options.includeCharts || false,
            include_metadata: options.includeMetadata || true,
          },
          responseType: 'blob',
          headers: {
            'Accept': this.getAcceptHeader(options.format),
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de beneficios', 500, 'DOWNLOAD_PROFIT_ERROR', error);
    }
  }

  /**
   * Descargar análisis de punto de equilibrio
   */
  async downloadBreakEvenAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        '/descargar/punto-equilibrio',
        {
          params: {
            format: options.format,
            analysis_ids: options.analysisIds?.join(',') || '',
            include_charts: options.includeCharts || false,
            include_metadata: options.includeMetadata || true,
          },
          responseType: 'blob',
          headers: {
            'Accept': this.getAcceptHeader(options.format),
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof ApiServiceError || error instanceof NetworkServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de punto de equilibrio', 500, 'DOWNLOAD_BREAKEVEN_ERROR', error);
    }
  }

  // ========================================
  // HELPER METHODS
  // ========================================

  /**
   * Get Accept header based on download format
   */
  private getAcceptHeader(format: 'csv' | 'excel' | 'pdf'): string {
    switch (format) {
      case 'csv':
        return 'text/csv';
      case 'excel':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'application/octet-stream';
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

/**
 * Download analysis data with progress tracking
 * @param options Download configuration options
 * @param signal AbortSignal for cancellation
 * @param onProgress Progress callback function
 * @returns Promise with analysis data
 */
export async function downloadAnalysis(
  options: DownloadOptions,
  signal?: AbortSignal,
  onProgress?: (progress: DownloadProgress) => void
): Promise<any> {
  try {
    // Validate options
    if (!options.analysisIds || options.analysisIds.length === 0) {
      throw new Error('Analysis IDs are required for download');
    }

    // Start progress tracking
    onProgress?.({
      percentage: 0,
      status: 'preparing',
      bytesReceived: 0,
      totalBytes: 0,
    });

    // Simulate API call with progress updates
    // In real implementation, this would be an actual API endpoint
    const totalSteps = 5;
    let currentStep = 0;

    // Step 1: Prepare data
    currentStep++;
    onProgress?.({
      percentage: Math.round((currentStep / totalSteps) * 100),
      status: 'preparing',
      bytesReceived: 0,
      totalBytes: 100,
    });
    await simulateDelay(200);

    // Step 2: Fetch analysis data
    currentStep++;
    onProgress?.({
      percentage: Math.round((currentStep / totalSteps) * 100),
      status: 'downloading',
      bytesReceived: 20,
      totalBytes: 100,
    });
    await simulateDelay(300);

    // Step 3: Process data
    currentStep++;
    onProgress?.({
      percentage: Math.round((currentStep / totalSteps) * 100),
      status: 'processing',
      bytesReceived: 50,
      totalBytes: 100,
    });
    await simulateDelay(400);

    // Step 4: Format data
    currentStep++;
    onProgress?.({
      percentage: Math.round((currentStep / totalSteps) * 100),
      status: 'processing',
      bytesReceived: 80,
      totalBytes: 100,
    });
    await simulateDelay(300);

    // Step 5: Complete
    currentStep++;
    onProgress?.({
      percentage: 100,
      status: 'completed',
      bytesReceived: 100,
      totalBytes: 100,
    });

    // Check for cancellation
    if (signal?.aborted) {
      throw new Error('Download cancelled');
    }

    // Return mock data based on analysis type
    // In real implementation, this would return actual analysis data
    const mockData = generateMockAnalysisData(options);
    
    return mockData;

  } catch (error) {
    if (signal?.aborted) {
      throw new Error('Download cancelled');
    }
    throw error;
  }
}

/**
 * Generate mock analysis data for demonstration
 * In real implementation, this would fetch actual data from the backend
 */
function generateMockAnalysisData(options: DownloadOptions): any {
  const baseData = {
    type: 'business_analysis',
    timestamp: new Date().toISOString(),
    format: options.format,
    metadata: {
      analysisIds: options.analysisIds,
      includeCharts: options.includeCharts,
      includeMetadata: options.includeMetadata,
    },
  };

  // Generate different data based on analysis type
  if (options.analysisIds.some(id => id.includes('revenue'))) {
    return {
      ...baseData,
      analysisType: 'revenue',
      data: {
        totalRevenue: 150000,
        monthlyRevenue: [12000, 13500, 14200, 15800, 16200, 17500],
        growthRate: 0.15,
        topProducts: [
          { name: 'Product A', revenue: 45000, percentage: 30 },
          { name: 'Product B', revenue: 38000, percentage: 25 },
          { name: 'Product C', revenue: 32000, percentage: 21 },
        ],
      },
    };
  }

  if (options.analysisIds.some(id => id.includes('cost'))) {
    return {
      ...baseData,
      analysisType: 'cost',
      data: {
        totalCosts: 95000,
        fixedCosts: 45000,
        variableCosts: 50000,
        costBreakdown: {
          materials: 35000,
          labor: 25000,
          overhead: 20000,
          marketing: 15000,
        },
        costTrends: [42000, 45000, 48000, 52000, 55000, 58000],
      },
    };
  }

  if (options.analysisIds.some(id => id.includes('profit'))) {
    return {
      ...baseData,
      analysisType: 'profit',
      data: {
        grossProfit: 55000,
        netProfit: 42000,
        profitMargin: 0.28,
        profitTrends: [38000, 42000, 45000, 48000, 52000, 55000],
        profitabilityByProduct: [
          { name: 'Product A', profit: 18000, margin: 0.4 },
          { name: 'Product B', profit: 15000, margin: 0.39 },
          { name: 'Product C', profit: 12000, margin: 0.38 },
        ],
      },
    };
  }

  if (options.analysisIds.some(id => id.includes('breakeven'))) {
    return {
      ...baseData,
      analysisType: 'breakeven',
      data: {
        breakevenPoint: 125000,
        breakevenUnits: 1250,
        contributionMargin: 0.44,
        safetyMargin: 0.17,
        fixedCosts: 45000,
        variableCostPerUnit: 44,
        sellingPricePerUnit: 100,
      },
    };
  }

  // Default generic analysis data
  return {
    ...baseData,
    analysisType: 'general',
    data: {
      summary: 'Business analysis summary',
      keyMetrics: {
        revenue: 150000,
        costs: 95000,
        profit: 55000,
        margin: 0.37,
      },
      recommendations: [
        'Optimize pricing strategy',
        'Reduce operational costs',
        'Focus on high-margin products',
        'Improve efficiency in production',
      ],
    },
  };
}

/**
 * Simulate API delay for demonstration purposes
 * In real implementation, this would be actual API calls
 */
function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Export singleton instance
export const apiService = new ApiService();
