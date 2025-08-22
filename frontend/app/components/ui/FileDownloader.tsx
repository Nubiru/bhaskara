/**
 * @fileoverview File downloader component for business analysis reports
 * @version 2.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-21
 *
 * @description
 * Enhanced file downloader that integrates with the download service
 * and provides comprehensive download options for business analysis.
 * Implementa tokens temáticos y estados hover/focus mejorados.
 *
 * @dependencies
 * - Download service for file generation
 * - Business analysis types
 * - i18n for internationalization
 * - Sistema de temas unificado
 *
 * @usage
 * <FileDownloader 
 *   analysisResults={results}
 *   onDownloadComplete={handleComplete}
 * />
 *
 * @state
 * ✅ Funcional - Descargador de archivos integrado con servicio de descarga y tokens temáticos
 *
 * @accessibility
 * - Estados hover/focus mejorados con transiciones suaves
 * - Indicadores visuales claros para estados de descarga
 * - Contraste optimizado para WCAG 2.1 AA
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { downloadService } from '../../services/downloadService';
import { DownloadButton } from './DownloadButton';
import type { 
  BusinessAnalysisResult, 
  BusinessAnalysisType,
  DownloadOptions,
  DownloadProgress 
} from '../../types/business';

// Component props
export interface FileDownloaderProps {
  // Analysis data
  analysisResults?: BusinessAnalysisResult[];
  analysisType?: BusinessAnalysisType;
  
  // Download configuration
  defaultFormat?: 'csv' | 'excel' | 'pdf';
  allowMultiple?: boolean;
  showFormatSelector?: boolean;
  showOptions?: boolean;
  
  // UI customization
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  
  // Event handlers
  onDownloadStart?: (options: DownloadOptions) => void;
  onDownloadComplete?: (filename: string, fileSize: number) => void;
  onDownloadError?: (error: string) => void;
  onDownloadProgress?: (progress: DownloadProgress) => void;
  
  // Children for custom content
  children?: React.ReactNode;
}

// Download format options - will be populated with translations
const DOWNLOAD_FORMATS = [
  { value: 'csv' as const, label: 'CSV', icon: '📊' },
  { value: 'excel' as const, label: 'Excel', icon: '📈' },
  { value: 'pdf' as const, label: 'PDF', icon: '📄' },
] as const;

/**
 * File downloader component for business analysis reports
 */
export const FileDownloader: React.FC<FileDownloaderProps> = ({
  analysisResults = [],
  analysisType = 'revenue',
  defaultFormat = 'csv',
  allowMultiple = true,
  showFormatSelector = true,
  showOptions = true,
  className = '',
  variant = 'primary',
  size = 'md',
  onDownloadStart,
  onDownloadComplete,
  onDownloadError,
  onDownloadProgress,
  children,
}) => {
  // Hooks
  const { t } = useTranslation();
  
  // Local state
  const [selectedFormat, setSelectedFormat] = useState(defaultFormat);
  const [downloadOptions, setDownloadOptions] = useState({
    includeCharts: true,
    includeMetadata: true,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    percentage: 0,
    status: 'idle',
    bytesReceived: 0,
    totalBytes: 0,
  });

  // Memoized values
  const hasResults = useMemo(() => analysisResults.length > 0, [analysisResults]);
  const canDownload = useMemo(() => hasResults && !isDownloading, [hasResults, isDownloading]);
  
  const selectedResults = useMemo(() => {
    if (!allowMultiple) return analysisResults.slice(0, 1);
    return analysisResults;
  }, [analysisResults, allowMultiple]);

  // Generate analysis IDs
  const analysisIds = useMemo(() => 
    selectedResults.map(result => result.metadata?.analysisId || `${analysisType}-${Date.now()}`),
    [selectedResults, analysisType]
  );

  // Handle download
  const handleDownload = useCallback(async () => {
    if (!canDownload) return;

    setIsDownloading(true);
    setDownloadProgress({
      percentage: 0,
      status: 'preparing',
      bytesReceived: 0,
      totalBytes: analysisIds.length * 1024, // Estimate 1KB per analysis
    });

    try {
      const options: DownloadOptions = {
        format: selectedFormat,
        analysisIds,
        includeCharts: downloadOptions.includeCharts,
        includeMetadata: downloadOptions.includeMetadata,
      };

      // Notify download start
      onDownloadStart?.(options);

      // Execute download with progress tracking
      await downloadService.downloadReport(options, (progress) => {
        setDownloadProgress(progress);
        onDownloadProgress?.(progress);
        
        if (progress.status === 'completed') {
          const filename = `${analysisType}Analysis.${selectedFormat}`;
          const fileSize = progress.bytesReceived || 0;
          onDownloadComplete?.(filename, fileSize);
        }
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      setDownloadProgress({
        percentage: 0,
        status: 'failed',
        bytesReceived: 0,
        totalBytes: 0,
      });
      onDownloadError?.(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  }, [
    canDownload,
    selectedFormat,
    analysisIds,
    downloadOptions,
    analysisType,
    onDownloadStart,
    onDownloadComplete,
    onDownloadError,
    onDownloadProgress,
  ]);

  // Handle format change
  const handleFormatChange = useCallback((format: typeof DOWNLOAD_FORMATS[number]['value']) => {
    setSelectedFormat(format);
  }, []);

  // Handle option change
  const handleOptionChange = useCallback((key: keyof typeof downloadOptions, value: boolean) => {
    setDownloadOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  // Component classes
  const getComponentClasses = useCallback(() => {
    const baseClasses = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm';
    const stateClasses = isDownloading ? 'opacity-75 pointer-events-none' : '';
    return `${baseClasses} ${stateClasses} ${className}`.trim();
  }, [isDownloading, className]);

  // Button classes
  const getButtonClasses = useCallback(() => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 hover:shadow-lg hover:scale-105',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 hover:shadow-lg hover:scale-105',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500 hover:shadow-md hover:scale-105',
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    const stateClasses = isDownloading 
      ? 'opacity-75 cursor-not-allowed hover:scale-100 hover:shadow-none' 
      : '';
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${stateClasses}`.trim();
  }, [variant, size, isDownloading]);

  // Render format selector
  const renderFormatSelector = () => {
    if (!showFormatSelector) return null;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('download.formats.selectFormat')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {DOWNLOAD_FORMATS.map((format) => (
            <label
              key={format.value}
              className={`relative flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedFormat === format.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="format"
                value={format.value}
                checked={selectedFormat === format.value}
                onChange={() => handleFormatChange(format.value)}
                className="sr-only"
              />
              <span className="text-2xl mb-1">{format.icon}</span>
              <span className="text-sm font-medium text-gray-900">{format.label}</span>
              <span className="text-xs text-gray-500 text-center">{t(`download.formats.${format.value}Description`)}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Render download options
  const renderDownloadOptions = () => {
    if (!showOptions) return null;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('download.options.selectOptions')}
        </label>
        <div className="space-y-3">
          {Object.entries(downloadOptions).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleOptionChange(key as keyof typeof downloadOptions, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                {t(`download.options.${key}`)}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Render progress indicator
  const renderProgress = () => {
    if (downloadProgress.status === 'idle') return null;

    return (
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            {downloadProgress.status === 'downloading' && t('download.status.downloading')}
            {downloadProgress.status === 'completed' && t('download.status.completed')}
            {downloadProgress.status === 'failed' && t('download.status.error')}
          </span>
          {downloadProgress.status === 'downloading' && (
            <span className="text-sm text-gray-500">
              {Math.round(downloadProgress.percentage)}%
            </span>
          )}
        </div>
        
        {downloadProgress.status === 'downloading' && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress.percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">
              {t('download.status.processing')}: {analysisType} analysis
            </p>
          </>
        )}
        
        {downloadProgress.status === 'failed' && (
          <p className="text-sm text-red-600">Download failed</p>
        )}
      </div>
    );
  };

    // Render download button
  const renderDownloadButton = () => {
    if (children) return children;

    // If we have multiple results, use the custom download button
    // If we have a single result, use the DownloadButton component
    if (selectedResults.length === 1) {
      return (
        <DownloadButton
          analysisResult={selectedResults[0]}
          analysisType={analysisType}
          variant={variant}
          size={size}
          showFormatSelector={false}
          onDownloadStart={onDownloadStart}
          onDownloadComplete={(filename, fileSize) => onDownloadComplete?.(filename, fileSize || 0)}
          onDownloadError={onDownloadError}
        />
      );
    }

    // Custom download button for multiple results
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={!canDownload}
        className={getButtonClasses()}
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t('download.status.downloading')}
          </>
        ) : (
          <>
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('download.actions.downloadAll')}
          </>
        )}
      </button>
    );
  };

  return (
    <div className={getComponentClasses()}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {t('download.options.customizeDownload')}
        </h3>
        <p className="text-sm text-gray-500">
          {t('download.options.selectOptions')}
        </p>
      </div>

      {/* Format Selection */}
      {renderFormatSelector()}

      {/* Download Options */}
      {renderDownloadOptions()}

      {/* Progress Indicator */}
      {renderProgress()}

      {/* Download Button */}
      <div className="flex justify-end">
        {renderDownloadButton()}
      </div>
    </div>
  );
};

// Display name for debugging
FileDownloader.displayName = 'FileDownloader';

export default FileDownloader;
