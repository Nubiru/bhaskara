/**
 * @fileoverview API Service Re-export for Backward Compatibility
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * This file is now a re-export of the new modular API services.
 * The old monolithic API service has been replaced with specialized
 * services for better performance, maintainability, and developer experience.
 * Legacy endpoints have been removed for cleaner architecture.
 *
 * @dependencies
 * - Nuevos servicios modulares de API
 * - Servicios especializados para cada dominio
 *
 * @usage
 * // OLD WAY (Deprecated)
 * import { apiService } from '../services/api';
 * 
 * // NEW WAY (Recommended)
 * import { mathApiService, businessApiService } from '../services/api';
 *
 * @state
 * ⚠️ DEPRECATED - Re-export de servicios modulares
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: HIGH] Migrar todos los usos a servicios especializados
 * - [PRIORITY: HIGH] Remover este archivo después de migración completa
 * - [PRIORITY: LOW] Agregar más warnings de deprecación
 *
 * @performance
 * - Sin overhead de re-export
 * - Tree-shaking ready
 * - Lazy loading support
 *
 * @accessibility
 * - Mensajes de deprecación claros
 * - Guía de migración disponible
 * - Documentación completa
 *
 * @security
 * - Misma funcionalidad de seguridad
 * - Misma validación de datos
 * - Sin cambios en protección
 */

// ============================================================================
// WARNING: THIS FILE IS DEPRECATED
// ============================================================================

console.warn(`
⚠️  DEPRECATED: The monolithic api.ts file is deprecated.

🔧 MIGRATION REQUIRED:
- Use specialized services instead of the monolithic apiService
- Import specific services: mathApiService, businessApiService, etc.
- See migration guide for details

📚 NEW ARCHITECTURE:
- mathApiService: Mathematical analysis (Bhaskara, quadratic)
- businessApiService: Business analysis (revenue, costs, profit, breakeven)
- financeApiService: Financial tools (compound interest, currency)
- downloadApiService: Report downloads (CSV, PDF, Excel)

🚀 BENEFITS:
- Better performance through specialization
- Improved error handling and validation
- Enhanced type safety
- Easier testing and maintenance
- Clean API v1 endpoints (/api/v1/*)

📖 MIGRATION GUIDE:
import { getMigrationGuide } from '../services/api';
console.log(getMigrationGuide());
`);

// ============================================================================
// RE-EXPORT NEW MODULAR SERVICES
// ============================================================================

// Re-export all new modular services
export {
  // New specialized services
  mathApiService,
  businessApiService,
  financeApiService,
  downloadApiService,
  
  // Base classes and error types
  BaseApiService,
  ApiServiceError,
  NetworkServiceError,
  
  // Utility functions
  checkAllServicesHealth,
  getMigrationGuide,
  
  // Service classes (for advanced usage)
  MathApiService,
  BusinessApiService,
  FinanceApiService,
  DownloadApiService
} from './api/index';

// Import services for deprecated apiService compatibility
import { 
  mathApiService, 
  downloadApiService 
} from './api/index';

// ============================================================================
// LEGACY COMPATIBILITY LAYER
// ============================================================================

/**
 * @deprecated Use mathApiService.analyzeBhaskara instead
 */
export const apiService = {
  analyzeBhaskara: (request: any) => {
    console.warn('⚠️ DEPRECATED: apiService.analyzeBhaskara is deprecated. Use mathApiService.analyzeBhaskara instead.');
    return mathApiService.analyzeBhaskara(request);
  },
  
  analyzeEconomia: (request: any) => {
    console.warn('⚠️ DEPRECATED: apiService.analyzeEconomia is deprecated. Use mathApiService.analyzeBhaskara with economic context instead.');
    return mathApiService.analyzeBhaskara(request);
  },
  
  downloadAnalysis: (format: any, analysisIds?: any) => {
    console.warn('⚠️ DEPRECATED: apiService.downloadAnalysis is deprecated. Use downloadApiService.downloadAnalysis instead.');
    return downloadApiService.downloadAnalysis(format, analysisIds);
  },
  
  healthCheck: () => {
    console.warn('⚠️ DEPRECATED: apiService.healthCheck is deprecated. Use any specialized service healthCheck method instead.');
    return mathApiService.healthCheck();
  },
  
  getConfig: () => {
    console.warn('⚠️ DEPRECATED: apiService.getConfig is deprecated. Use any specialized service getConfig method instead.');
    return mathApiService.getConfig();
  }
};

// ============================================================================
// DEPRECATED FUNCTIONS
// ============================================================================

/**
 * @deprecated Use downloadApiService.downloadAnalysis instead
 */
export const downloadAnalysis = (options: any) => {
  console.warn('⚠️ DEPRECATED: downloadAnalysis function is deprecated. Use downloadApiService.downloadAnalysis instead.');
  return downloadApiService.downloadAnalysis(options.format, options.analysisIds);
};

// ============================================================================
// MIGRATION HELPER
// ============================================================================

/**
 * Get migration status and recommendations
 * @returns Migration status information
 */
export function getMigrationStatus() {
  return {
    file: 'api.ts',
    status: 'DEPRECATED',
    message: 'This file is deprecated and will be removed in future versions.',
    recommendation: 'Migrate to new specialized services for better performance and features.',
    timestamp: new Date().toISOString(),
    nextSteps: [
      '1. Replace apiService.analyzeBhaskara with mathApiService.analyzeBhaskara',
      '2. Replace apiService.analyzeEconomia with mathApiService.analyzeBhaskara (economic context)',
      '3. Replace apiService.downloadAnalysis with downloadApiService.downloadAnalysis',
      '4. Replace apiService.healthCheck with any specialized service healthCheck method',
      '5. Update imports to use specific services instead of the monolithic apiService'
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
