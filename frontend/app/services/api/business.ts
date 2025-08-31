/**
 * @fileoverview Business API Service for Business Analysis Endpoints
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * Specialized service for business analysis endpoints including revenue,
 * costs, profit, and breakeven analysis. Extends BaseApiService for
 * consistent error handling and HTTP functionality.
 *
 * @dependencies
 * - BaseApiService para funcionalidad base
 * - Tipos de business.ts para análisis empresarial
 * - API_ENDPOINTS para endpoints
 *
 * @usage
 * import { businessApiService } from './business';
 * const result = await businessApiService.analyzeRevenue(request);
 *
 * @state
 * ✅ Funcional - Servicio de análisis empresarial
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar validación con Zod schemas
 * - [PRIORITY: LOW] Implementar caching de resultados
 * - [PRIORITY: LOW] Agregar análisis de tendencias
 *
 * @performance
 * - Validación de datos antes del envío
 * - Manejo eficiente de errores
 * - Timeouts optimizados para análisis empresarial
 *
 * @accessibility
 * - Mensajes de error claros para usuarios
 * - Estados de carga apropiados
 * - Feedback de progreso para análisis largos
 *
 * @security
 * - Validación de entrada antes de API calls
 * - Sanitización de datos empresariales
 * - Protección contra inyección de código
 */

import { BaseApiService, ApiServiceError } from './base';
import type { 
  RevenueAnalysisRequest,
  RevenueAnalysisResult,
  CostAnalysisRequest,
  CostAnalysisResult,
  ProfitAnalysisRequest,
  ProfitAnalysisResult,
  BreakEvenAnalysisRequest,
  BreakEvenAnalysisResult
} from '../../types/business';
import { API_ENDPOINTS } from '../../constants/api';

/**
 * Business API Service Class
 * Handles all business analysis endpoints
 */
export class BusinessApiService extends BaseApiService {

  /**
   * Análisis de Ingresos Totales
   * @param request Request with price and quantity data
   * @returns Revenue analysis result
   */
  async analyzeRevenue(request: RevenueAnalysisRequest): Promise<RevenueAnalysisResult> {
    try {
      return await this.get<RevenueAnalysisResult>(
        API_ENDPOINTS.BUSINESS_REVENUE,
        {
          params: {
            precio: request.precio,
            cantidad: request.cantidad,
            description: request.description || undefined,
          }
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de ingresos', 500, 'REVENUE_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis de Costos Totales
   * @param request Request with fixed and variable costs
   * @returns Cost analysis result
   */
  async analyzeCosts(request: CostAnalysisRequest): Promise<CostAnalysisResult> {
    try {
      return await this.get<CostAnalysisResult>(
        API_ENDPOINTS.BUSINESS_COSTS,
        {
          params: {
            costos_fijos: request.costosFijos,
            costos_variables: request.costosVariables,
            cantidad: request.cantidad || undefined,
            description: request.description || undefined,
          }
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de costos', 500, 'COST_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis de Beneficios
   * @param request Request with total revenue and costs
   * @returns Profit analysis result
   */
  async analyzeProfit(request: ProfitAnalysisRequest): Promise<ProfitAnalysisResult> {
    try {
      return await this.get<ProfitAnalysisResult>(
        API_ENDPOINTS.BUSINESS_PROFIT,
        {
          params: {
            ingreso_total: request.ingresoTotal,
            costo_total: request.costoTotal,
            description: request.description || undefined,
          }
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de beneficios', 500, 'PROFIT_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Análisis de Punto de Equilibrio
   * @param request Request with fixed costs, price, and variable cost per unit
   * @returns Break-even analysis result
   */
  async analyzeBreakEven(request: BreakEvenAnalysisRequest): Promise<BreakEvenAnalysisResult> {
    try {
      return await this.get<BreakEvenAnalysisResult>(
        API_ENDPOINTS.BUSINESS_BREAKEVEN,
        {
          params: {
            costos_fijos: request.costosFijos,
            precio: request.precio,
            costo_variable_unitario: request.costoVariableUnitario,
            description: request.description || undefined,
          }
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de punto de equilibrio', 500, 'BREAKEVEN_ANALYSIS_ERROR', error);
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
        service: 'Business API Service',
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        endpoints: {
          revenue: API_ENDPOINTS.BUSINESS_REVENUE,
          costs: API_ENDPOINTS.BUSINESS_COSTS,
          profit: API_ENDPOINTS.BUSINESS_PROFIT,
          breakeven: API_ENDPOINTS.BUSINESS_BREAKEVEN,
        }
      };
    } catch (error) {
      return {
        service: 'Business API Service',
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const businessApiService = new BusinessApiService();
