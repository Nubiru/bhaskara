/**
 * @fileoverview Download button component for business analysis results
 * @version 2.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Enhanced download button that integrates with the download service
 * and provides format selection for business analysis results.
 *
 * @dependencies
 * - Download service for file generation
 * - Business analysis types
 * - i18n for internationalization
 *
 * @usage
 * <DownloadButton 
 *   analysisResult={result}
 *   analysisType="revenue"
 *   onDownloadStart={handleDownloadStart}
 * />
 *
 * @state
 * ✅ Funcional - Botón de descarga integrado con servicio de descarga
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { downloadService } from '../../services/downloadService';
import type { 
  BusinessAnalysisResult, 
  BusinessAnalysisType,
  DownloadOptions 
} from '../../types/business';

// Component props
export interface DownloadButtonProps {
  // Analysis data
  analysisResult?: BusinessAnalysisResult;
  analysisType: BusinessAnalysisType;
  analysisId?: string;
  
  // UI customization
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showFormatSelector?: boolean;
  
  // Event handlers
  onDownloadStart?: (options: DownloadOptions) => void;
  onDownloadComplete?: (filename: string, fileSize?: number) => void;
  onDownloadError?: (error: string) => void;
  
  // Children for custom content
  children?: React.ReactNode;
}

// Download format options
type DownloadFormat = 'csv' | 'excel' | 'pdf';

/**
 * Download button component for business analysis results
 */
export const DownloadButton: React.FC<DownloadButtonProps> = ({
  analysisResult,
  analysisType,
  analysisId,
  className = '',
  variant = 'primary',
  size = 'md',
  showFormatSelector = true,
  onDownloadStart,
  onDownloadComplete,
  onDownloadError,
  children,
}) => {
  // Hooks
  const { t } = useTranslation();
  
  // Local state
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('csv');
  const [showFormatMenu, setShowFormatMenu] = useState(false);

  // Generate analysis ID if not provided
  const finalAnalysisId = analysisId || analysisResult?.metadata?.analysisId || `${analysisType}-${Date.now()}`;

  // Button variants
  const getButtonClasses = useCallback(() => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  }, [variant, size]);

  // Handle download
  const handleDownload = useCallback(async () => {
    if (!analysisResult && !analysisId) {
      const error = 'No analysis result or ID provided for download';
      onDownloadError?.(error);
      return;
    }

    setIsDownloading(true);
    setShowFormatMenu(false);

    try {
      const options: DownloadOptions = {
        format: selectedFormat,
        analysisIds: [finalAnalysisId],
        includeCharts: true,
        includeMetadata: true,
      };

      // Notify download start
      onDownloadStart?.(options);

      // Execute download
      await downloadService.downloadReport(options, (progress) => {
        // Progress tracking if needed
        if (progress.status === 'completed') {
          const filename = `${analysisType}Analysis.${selectedFormat}`;
          onDownloadComplete?.(filename);
        }
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      onDownloadError?.(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  }, [analysisResult, analysisId, selectedFormat, finalAnalysisId, analysisType, onDownloadStart, onDownloadComplete, onDownloadError]);

  // Format selection handler
  const handleFormatSelect = useCallback((format: DownloadFormat) => {
    setSelectedFormat(format);
    setShowFormatMenu(false);
  }, []);

  // Format menu items
  const formatOptions = [
    { value: 'csv' as const, label: 'CSV', description: t('download.formats.csv') },
    { value: 'excel' as const, label: 'Excel', description: t('download.formats.excel') },
    { value: 'pdf' as const, label: 'PDF', description: t('download.formats.pdf') },
  ];

  // Render format selector
  const renderFormatSelector = () => {
    if (!showFormatSelector) return null;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowFormatMenu(!showFormatMenu)}
          className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
          aria-label="Select download format"
        >
          {selectedFormat.toUpperCase()}
        </button>
        
        {showFormatMenu && (
          <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div className="py-1">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFormatSelect(option.value)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render button content
  const renderButtonContent = () => {
    if (children) return children;
    
    return (
      <>
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
      </>
    );
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className={`${getButtonClasses()} ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
        aria-label={`Download ${analysisType} analysis as ${selectedFormat}`}
      >
        {renderButtonContent()}
      </button>
      
      {renderFormatSelector()}
    </div>
  );
};

// Display name for debugging
DownloadButton.displayName = 'DownloadButton';

export default DownloadButton;
