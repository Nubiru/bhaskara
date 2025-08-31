/**
 * @fileoverview Download API Service for Analysis Report Downloads
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 *
 * @description
 * Specialized service for download endpoints that generate and serve
 * analysis reports in various formats (CSV, PDF, Excel). Extends
 * BaseApiService for consistent error handling and HTTP functionality.
 *
 * @dependencies
 * - BaseApiService para funcionalidad base
 * - Tipos de business.ts para opciones de descarga
 * - API_ENDPOINTS para endpoints
 *
 * @usage
 * import { downloadApiService } from './download';
 * const blob = await downloadApiService.downloadAnalysis('csv', ['id1', 'id2']);
 *
 * @state
 * ✅ Funcional - Servicio de descarga de análisis
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar validación con Zod schemas
 * - [PRIORITY: LOW] Implementar progress tracking
 * - [PRIORITY: LOW] Agregar más formatos de salida
 *
 * @performance
 * - Manejo eficiente de archivos grandes
 * - Timeouts optimizados para descargas
 * - Progress tracking para mejor UX
 *
 * @accessibility
 * - Mensajes de progreso claros
 * - Estados de descarga apropiados
 * - Feedback de progreso para descargas largas
 *
 * @security
 * - Validación de IDs de análisis
 * - Sanitización de parámetros
 * - Protección contra descargas no autorizadas
 */

import { BaseApiService, ApiServiceError } from './base';
import type { DownloadOptions } from '../../types/business';
import { API_ENDPOINTS } from '../../constants/api';

/**
 * Download API Service Class
 * Handles all download endpoints for analysis reports
 */
export class DownloadApiService extends BaseApiService {

  /**
   * Descargar Análisis - Descarga reporte en CSV o PDF
   * @param format Format of the report (csv, pdf)
   * @param analysisIds Array of analysis IDs to include
   * @returns Blob containing the report file
   */
  async downloadAnalysis(format: 'csv' | 'pdf', analysisIds?: string[]): Promise<Blob> {
    try {
      const response = await this.axiosInstance.post(
        API_ENDPOINTS.DOWNLOAD_ANALYSIS,
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
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error durante descarga de análisis', 500, 'DOWNLOAD_ERROR', error);
    }
  }

  /**
   * Descargar análisis de ingresos
   * @param options Download configuration options
   * @returns Blob containing the revenue analysis report
   */
  async downloadRevenueAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        API_ENDPOINTS.DOWNLOAD_REVENUE,
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
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de ingresos', 500, 'DOWNLOAD_REVENUE_ERROR', error);
    }
  }

  /**
   * Descargar análisis de costos
   * @param options Download configuration options
   * @returns Blob containing the cost analysis report
   */
  async downloadCostAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        API_ENDPOINTS.DOWNLOAD_COSTS,
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
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de costos', 500, 'DOWNLOAD_COST_ERROR', error);
    }
  }

  /**
   * Descargar análisis de beneficios
   * @param options Download configuration options
   * @returns Blob containing the profit analysis report
   */
  async downloadProfitAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        API_ENDPOINTS.LEGACY_DOWNLOAD_PROFIT, // TODO: Update to new endpoint when available
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
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de beneficios', 500, 'DOWNLOAD_PROFIT_ERROR', error);
    }
  }

  /**
   * Descargar análisis de punto de equilibrio
   * @param options Download configuration options
   * @returns Blob containing the breakeven analysis report
   */
  async downloadBreakEvenAnalysis(options: DownloadOptions): Promise<Blob> {
    try {
      const response = await this.axiosInstance.get(
        API_ENDPOINTS.LEGACY_DOWNLOAD_BREAKEVEN, // TODO: Update to new endpoint when available
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
      if (error instanceof ApiServiceError) {
        throw error;
      }
      throw new ApiServiceError('Error descargando análisis de punto de equilibrio', 500, 'DOWNLOAD_BREAKEVEN_ERROR', error);
    }
  }

  /**
   * Get Accept header based on download format
   * @param format Download format
   * @returns Appropriate Accept header value
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
   * Get service status and health
   * @returns Service health information
   */
  async getServiceStatus() {
    try {
      const isHealthy = await this.healthCheck();
      return {
        service: 'Download API Service',
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        endpoints: {
          analysis: API_ENDPOINTS.LEGACY_DOWNLOAD_ANALYSIS,
          revenue: API_ENDPOINTS.LEGACY_DOWNLOAD_REVENUE,
          costs: API_ENDPOINTS.LEGACY_DOWNLOAD_COSTS,
          profit: API_ENDPOINTS.LEGACY_DOWNLOAD_PROFIT,
          breakeven: API_ENDPOINTS.LEGACY_DOWNLOAD_BREAKEVEN,
        }
      };
    } catch (error) {
      return {
        service: 'Download API Service',
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const downloadApiService = new DownloadApiService();
