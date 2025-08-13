/**
 * @fileoverview Download system translations for English
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 */

export const download = {
  // Download options
  options: {
    selectOptions: 'Download Options',
    customizeDownload: 'Customize Download',
    includeCharts: 'Include Charts',
    includeMetadata: 'Include Metadata',
  },

  // File formats
  formats: {
    selectFormat: 'Select Format',
    recommended: 'Recommended',
    csv: 'CSV',
    excel: 'Excel',
    pdf: 'PDF',
    csvDescription: 'Comma-separated values',
    excelDescription: 'Microsoft Excel format',
    pdfDescription: 'Portable Document Format',
  },

  // Actions
  actions: {
    downloadAll: 'Download All',
    cancelDownload: 'Cancel Download',
    clearHistory: 'Clear History',
  },

  // Download status
  status: {
    inProgress: 'Download in Progress',
    downloading: 'Downloading',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
    processing: 'Processing',
    error: 'Error',
  },

  // Download history
  history: {
    noDownloads: 'No downloads available',
    clearHistory: 'Clear History',
  },

  // Feedback and errors
  feedback: {
    error: 'Download Error',
    success: 'Download Completed',
    cancelled: 'Download Cancelled',
  },

  // Page titles
  title: 'Download Analysis',
} as const;

export type DownloadTranslations = typeof download;
