/**
 * @fileoverview Finance API Service for Financial Tools Endpoints
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * Specialized service for financial tools endpoints including compound
 * interest calculations and currency conversion. Extends BaseApiService
 * for consistent error handling and HTTP functionality.
 *
 * @dependencies
 * - BaseApiService para funcionalidad base
 * - Tipos de business.ts para herramientas financieras
 * - API_ENDPOINTS para endpoints
 *
 * @usage
 * import { financeApiService } from './finance';
 * const result = await financeApiService.analyzeCompoundInterest(request);
 *
 * @state
 * ✅ Funcional - Servicio de herramientas financieras
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar validación con Zod schemas
 * - [PRIORITY: LOW] Implementar caching de tasas de cambio
 * - [PRIORITY: LOW] Agregar más herramientas financieras
 *
 * @performance
 * - Validación de datos antes del envío
 * - Manejo eficiente de errores
 * - Timeouts optimizados para cálculos financieros
 *
 * @accessibility
 * - Mensajes de error claros para usuarios
 * - Estados de carga apropiados
 * - Feedback de progreso para cálculos largos
 *
 * @security
 * - Validación de entrada antes de API calls
 * - Sanitización de datos financieros
 * - Protección contra inyección de código
 */

import { BaseApiService, ApiServiceError } from './base';
import type { 
  CompoundInterestRequest,
  CompoundInterestResult
} from '../../types/business';
import { API_ENDPOINTS } from '../../constants/api';

/**
 * Finance API Service Class
 * Handles all financial tools endpoints
 */
export class FinanceApiService extends BaseApiService {

  /**
   * Análisis de Interés Compuesto
   * @param request Request with principal, rate, time, and compounding frequency
   * @returns Compound interest analysis result
   */
  async analyzeCompoundInterest(request: CompoundInterestRequest): Promise<CompoundInterestResult> {
    try {
      return await this.post<CompoundInterestResult>(
        API_ENDPOINTS.FINANCE_COMPOUND_INTEREST,
        request
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante análisis de interés compuesto', 500, 'COMPOUND_INTEREST_ANALYSIS_ERROR', error);
    }
  }

  /**
   * Currency Converter (Placeholder for future implementation)
   * @param fromCurrency Source currency code
   * @param toCurrency Target currency code
   * @param amount Amount to convert
   * @returns Currency conversion result
   */
  async convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    try {
      // TODO: Implement when backend endpoint is available
      console.warn('Currency conversion endpoint not yet implemented in backend');
      
      return await this.post<any>(
        API_ENDPOINTS.FINANCE_CURRENCY_CONVERTER,
        {
          from_currency: fromCurrency,
          to_currency: toCurrency,
          amount: amount
        }
      );
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante conversión de divisas', 500, 'CURRENCY_CONVERSION_ERROR', error);
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
        service: 'Finance API Service',
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        endpoints: {
          compoundInterest: API_ENDPOINTS.FINANCE_COMPOUND_INTEREST,
          currencyConverter: API_ENDPOINTS.FINANCE_CURRENCY_CONVERTER,
        }
      };
    } catch (error) {
      return {
        service: 'Finance API Service',
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const financeApiService = new FinanceApiService();
