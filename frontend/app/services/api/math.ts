/**
 * @fileoverview Math API Service for Mathematical Analysis Endpoints
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * Specialized service for mathematical analysis endpoints including Bhaskara,
 * quadratic equations, and other mathematical tools. Extends BaseApiService
 * for consistent error handling and HTTP functionality.
 *
 * @dependencies
 * - BaseApiService para funcionalidad base
 * - Tipos de quadratic.ts para análisis matemático
 * - API_ENDPOINTS para endpoints
 *
 * @usage
 * import { mathApiService } from './math';
 * const result = await mathApiService.analyzeBhaskara(request);
 *
 * @state
 * ✅ Funcional - Servicio de análisis matemático
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar validación de coeficientes con Zod
 * - [PRIORITY: LOW] Implementar caching de resultados
 * - [PRIORITY: LOW] Agregar análisis de ecuaciones cúbicas
 *
 * @performance
 * - Validación de coeficientes antes del envío
 * - Manejo eficiente de errores
 * - Timeouts optimizados para cálculos matemáticos
 *
 * @accessibility
 * - Mensajes de error claros para usuarios
 * - Estados de carga apropiados
 * - Feedback de progreso para cálculos largos
 *
 * @security
 * - Validación de entrada antes de API calls
 * - Sanitización de datos matemáticos
 * - Protección contra inyección de código
 */

import { BaseApiService, ApiServiceError } from './base';
import type { 
  AnalysisRequest, 
  FullAnalysisResult 
} from '../../types/quadratic';
import type { Coefficients } from '../../types/quadratic';
import { API_ENDPOINTS } from '../../constants/api';

/**
 * Math API Service Class
 * Handles all mathematical analysis endpoints
 */
export class MathApiService extends BaseApiService {
  
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
   * @param request Request with coefficients and analysis mode
   * @returns Full analysis result with roots, vertex, and graph data
   */
  async analyzeBhaskara(request: AnalysisRequest): Promise<FullAnalysisResult> {
    try {
      this.validateCoefficients(request.coefficients);

      return await this.post<FullAnalysisResult>(
        API_ENDPOINTS.MATH_BHASKARA,
        {
          coefficients: request.coefficients,
          mode: request.mode,
          description: request.description || undefined,
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis Bhaskara', 500, 'BHASKARA_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis Cuadrático Genérico
   * @param request Request with coefficients and analysis mode
   * @returns Full analysis result
   */
  async analyzeQuadratic(request: AnalysisRequest): Promise<FullAnalysisResult> {
    try {
      this.validateCoefficients(request.coefficients);

      return await this.post<FullAnalysisResult>(
        API_ENDPOINTS.MATH_QUADRATIC,
        {
          coefficients: request.coefficients,
          mode: request.mode,
          description: request.description || undefined,
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis cuadrático', 500, 'QUADRATIC_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis Económico - Análisis orientado a economía
   * @param request Request with coefficients and analysis mode
   * @returns Full analysis result
   */
  async analyzeEconomia(request: AnalysisRequest): Promise<FullAnalysisResult> {
    console.warn('analyzeEconomia is deprecated. Use analyzeBhaskara with economic context instead.');
    
    try {
      this.validateCoefficients(request.coefficients);

      return await this.post<FullAnalysisResult>(
        API_ENDPOINTS.MATH_BHASKARA, // Use the main Bhaskara endpoint
        {
          coefficients: request.coefficients,
          mode: request.mode,
          description: request.description || 'Economic analysis context',
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis económico', 500, 'ECONOMIA_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Get service status and health
   * @returns Service health information
   */
  async getServiceStatus() {
    try {
      const isHealthy = await this.healthCheck();
      return {
        service: 'Math API Service',
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        endpoints: {
          bhaskara: API_ENDPOINTS.MATH_BHASKARA,
          quadratic: API_ENDPOINTS.MATH_QUADRATIC,
          economia: API_ENDPOINTS.MATH_BHASKARA, // Uses main Bhaskara endpoint
        }
      };
    } catch (error) {
      return {
        service: 'Math API Service',
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const mathApiService = new MathApiService();
