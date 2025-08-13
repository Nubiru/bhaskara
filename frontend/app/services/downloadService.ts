/**
 * @fileoverview Download service for business analysis reports
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Centralized service for downloading business analysis reports in multiple formats.
 * Handles CSV, Excel, and PDF generation with progress tracking.
 *
 * @dependencies
 * - API service for backend communication
 * - Business analysis types
 * - File download utilities
 *
 * @usage
 * import { downloadService } from '../services/downloadService';
 * await downloadService.downloadReport(options);
 *
 * @state
 * ✅ Funcional - Servicio de descarga completo para análisis de negocio
 */

import { apiService } from './api';
import { downloadBlob } from '../utils/api-helpers';
import type { 
  DownloadOptions, 
  BusinessAnalysisType,
  BusinessAnalysisResult,
  DownloadProgress 
} from '../types/business';

/**
 * Download service for business analysis reports
 */
export class DownloadService {
  /**
   * Download a single analysis report
   */
  async downloadReport(
    options: DownloadOptions,
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<void> {
    try {
      // Validate options
      if (!options.analysisIds || options.analysisIds.length === 0) {
        throw new Error('Analysis IDs are required for download');
      }

      // Determine analysis type from first ID
      const analysisType = this.determineAnalysisType(options.analysisIds[0]);
      
      // Download based on type
      let blob: Blob;
      
      switch (analysisType) {
        case 'revenue':
          blob = await apiService.downloadRevenueAnalysis(options);
          break;
        case 'cost':
          blob = await apiService.downloadCostAnalysis(options);
          break;
        case 'profit':
          blob = await apiService.downloadProfitAnalysis(options);
          break;
        case 'breakeven':
          blob = await apiService.downloadBreakEvenAnalysis(options);
          break;
        default:
          throw new Error(`Unsupported analysis type: ${analysisType}`);
      }

      // Generate filename
      const filename = this.generateFilename(options, analysisType);
      
      // Trigger download
      downloadBlob(blob, filename);
      
      // Report completion
      onProgress?.({
        percentage: 100,
        status: 'completed',
        bytesReceived: blob.size,
        totalBytes: blob.size,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown download error';
      
      onProgress?.({
        percentage: 0,
        status: 'failed',
        bytesReceived: 0,
        totalBytes: 0,
      });
      
      throw new Error(`Download failed: ${errorMessage}`);
    }
  }

  /**
   * Download multiple analysis reports
   */
  async downloadMultipleReports(
    downloads: DownloadOptions[],
    onProgress?: (overallProgress: number, completed: number, total: number) => void
  ): Promise<void> {
    const total = downloads.length;
    let completed = 0;
    let failed = 0;

    // Process downloads sequentially to avoid overwhelming the system
    for (const download of downloads) {
      try {
        await this.downloadReport(download);
        completed++;
      } catch (error) {
        failed++;
        console.error(`Download failed for ${download.analysisIds}:`, error);
      }

      // Update overall progress
      const overallProgress = Math.round((completed / total) * 100);
      onProgress?.(overallProgress, completed, total);
    }

    if (failed > 0) {
      throw new Error(`${failed} out of ${total} downloads failed`);
    }
  }

  /**
   * Generate appropriate filename for download
   */
  private generateFilename(options: DownloadOptions, analysisType: BusinessAnalysisType): string {
    const timestamp = new Date().toISOString().split('T')[0];
    const type = analysisType.charAt(0).toUpperCase() + analysisType.slice(1);
    
    if (options.customFilename) {
      return `${options.customFilename}.${options.format}`;
    }
    
    return `${type}Analysis_${timestamp}.${options.format}`;
  }

  /**
   * Determine analysis type from ID
   */
  private determineAnalysisType(analysisId: string): BusinessAnalysisType {
    // This is a simplified approach - in a real app, you might store type info in the ID
    // or have a mapping service
    if (analysisId.includes('revenue')) return 'revenue';
    if (analysisId.includes('cost')) return 'cost';
    if (analysisId.includes('profit')) return 'profit';
    if (analysisId.includes('breakeven')) return 'breakeven';
    
    // Default fallback
    return 'revenue';
  }

  /**
   * Get supported formats for analysis type
   */
  getSupportedFormats(analysisType: BusinessAnalysisType): Array<'csv' | 'excel' | 'pdf'> {
    return ['csv', 'excel', 'pdf'];
  }

  /**
   * Validate download options
   */
  validateOptions(options: DownloadOptions): string | null {
    if (!options.format) {
      return 'Download format is required';
    }
    
    if (!options.analysisIds || options.analysisIds.length === 0) {
      return 'At least one analysis ID is required';
    }
    
    if (!['csv', 'excel', 'pdf'].includes(options.format)) {
      return 'Unsupported download format';
    }
    
    return null;
  }
}

// Export singleton instance
export const downloadService = new DownloadService();

// Export default for convenience
export default downloadService;
