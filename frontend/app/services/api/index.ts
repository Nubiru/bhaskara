/**
 * @fileoverview Main API Service Index - Unified Interface for All API Services
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * Main entry point for all API services. Exports specialized services for
 * different domains (math, business, finance, download) and provides a
 * unified interface for the application. Also exports the legacy service
 * for backward compatibility during migration.
 *
 * @dependencies
 * - Todos los servicios especializados de API
 * - BaseApiService para tipos comunes
 *
 * @usage
 * import { 
 *   mathApiService, 
 *   businessApiService, 
 *   financeApiService,
 *   downloadApiService,
 *   legacyApiService 
 * } from '../services/api';
 *
 * @state
 * ✅ Funcional - Interfaz unificada para todos los servicios de API
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar service discovery automático
 * - [PRIORITY: LOW] Implementar health check agregado
 * - [PRIORITY: LOW] Agregar métricas de performance
 *
 * @performance
 * - Tree-shaking ready para importaciones específicas
 * - Lazy loading support para servicios grandes
 * - Sin overhead de inicialización innecesaria
 *
 * @accessibility
 * - Interfaz clara y consistente
 * - Documentación completa de cada servicio
 * - Guía de migración para desarrolladores
 *
 * @security
 * - Misma validación en todos los servicios
 * - Misma sanitización de datos
 * - Misma protección contra inyección
 */

// ============================================================================
// EXPORTAR SERVICIOS ESPECIALIZADOS
// ============================================================================

// Math API Service - For mathematical analysis
export { mathApiService, MathApiService } from './math';

// Business API Service - For business analysis
export { businessApiService, BusinessApiService } from './business';

// Finance API Service - For financial tools
export { financeApiService, FinanceApiService } from './finance';

// Download API Service - For report downloads
export { downloadApiService, DownloadApiService } from './download';

// Legacy API Service - REMOVED (no longer needed)

// ============================================================================
// EXPORTAR TIPOS Y CLASES BASE
// ============================================================================

// Base classes and error types
export { BaseApiService, ApiServiceError, NetworkServiceError } from './base';

// ============================================================================
// INTERFAZ UNIFICADA PARA HEALTH CHECKS
// ============================================================================

/**
 * Unified health check for all API services
 * @returns Health status of all services
 */
export async function checkAllServicesHealth() {
  try {
    const results = await Promise.allSettled([
      mathApiService.getServiceStatus(),
      businessApiService.getServiceStatus(),
      financeApiService.getServiceStatus(),
      downloadApiService.getServiceStatus(),
    ]);

    return {
      timestamp: new Date().toISOString(),
      overallStatus: results.every(result => 
        result.status === 'fulfilled' && result.value.status.includes('healthy')
      ) ? 'healthy' : 'degraded',
      services: {
        math: results[0].status === 'fulfilled' ? results[0].value : { status: 'error', error: 'Service unavailable' },
        business: results[1].status === 'fulfilled' ? results[1].value : { status: 'error', error: 'Service unavailable' },
        finance: results[2].status === 'fulfilled' ? results[2].value : { status: 'error', error: 'Service unavailable' },
        download: results[3].status === 'fulfilled' ? results[3].value : { status: 'error', error: 'Service unavailable' },
      }
    };
  } catch (error) {
    return {
      timestamp: new Date().toISOString(),
      overallStatus: 'error',
      error: error instanceof Error ? error.message : 'Unknown error during health check',
      services: {}
    };
  }
}

// ============================================================================
// GUÍA DE MIGRACIÓN
// ============================================================================

/**
 * Get migration guide for developers
 * @returns Complete migration guide information
 */
export function getMigrationGuide() {
  return {
    title: 'API Service Migration Guide',
    version: '1.0.0',
    lastUpdated: '2025-08-26',
    message: 'Migrate from legacy API service to new specialized services for better performance and features.',
    migrationMap: {
      'apiService.analyzeBhaskara': 'mathApiService.analyzeBhaskara',
      'apiService.analyzeEconomia': 'mathApiService.analyzeBhaskara (with economic context)',
      'apiService.downloadAnalysis': 'downloadApiService.downloadAnalysis',
    },
    newServices: {
      math: {
        service: 'mathApiService',
        description: 'Mathematical analysis including Bhaskara and quadratic equations',
        endpoints: ['/api/v1/math/bhaskara', '/api/v1/math/quadratic'],
        features: ['Coefficient validation', 'Multiple analysis modes', 'Graph data generation']
      },
      business: {
        service: 'businessApiService',
        description: 'Business analysis including revenue, costs, profit, and breakeven',
        endpoints: ['/api/v1/business/revenue', '/api/v1/business/costs', '/api/v1/business/profit', '/api/v1/business/breakeven'],
        features: ['Business metrics calculation', 'Financial analysis', 'Report generation']
      },
      finance: {
        service: 'financeApiService',
        description: 'Financial tools including compound interest and currency conversion',
        endpoints: ['/api/v1/finance/compound-interest', '/api/v1/finance/currency-converter'],
        features: ['Interest calculations', 'Currency conversion', 'Financial modeling']
      },
      download: {
        service: 'downloadApiService',
        description: 'Report downloads in various formats (CSV, PDF, Excel)',
        endpoints: ['/api/v1/download/*'],
        features: ['Multiple formats', 'Progress tracking', 'Batch downloads']
      }
    },
    benefits: [
      'Better performance through specialized services',
      'Improved error handling and validation',
      'Enhanced type safety and developer experience',
      'Easier testing and maintenance',
      'Future extensibility and feature additions'
    ],
    examples: {
      before: `
// OLD WAY (Deprecated)
import { apiService } from '../services/api';
const result = await apiService.analyzeBhaskara(request);
      `,
      after: `
// NEW WAY (Recommended)
import { mathApiService } from '../services/api';
const result = await mathApiService.analyzeBhaskara(request);
      `
    }
  };
}

// ============================================================================
// FUNCIONES DE UTILIDAD EXPORTADAS DIRECTAMENTE
// ============================================================================
