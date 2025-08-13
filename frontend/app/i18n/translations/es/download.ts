/**
 * @fileoverview Traducciones en español para el sistema de descarga
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 */

export const download = {
  // Download options
  options: {
    selectOptions: 'Opciones de Descarga',
    customizeDownload: 'Personalizar Descarga',
    includeCharts: 'Incluir Gráficos',
    includeMetadata: 'Incluir Metadatos',
  },

  // File formats
  formats: {
    selectFormat: 'Seleccionar Formato',
    recommended: 'Recomendado',
    csv: 'CSV',
    excel: 'Excel',
    pdf: 'PDF',
    csvDescription: 'Valores separados por comas',
    excelDescription: 'Formato Microsoft Excel',
    pdfDescription: 'Formato de Documento Portátil',
  },

  // Actions
  actions: {
    downloadAll: 'Descargar Todo',
    cancelDownload: 'Cancelar Descarga',
    clearHistory: 'Limpiar Historial',
  },

  // Download status
  status: {
    inProgress: 'Descarga en Progreso',
    downloading: 'Descargando',
    completed: 'Completado',
    failed: 'Falló',
    cancelled: 'Cancelado',
    processing: 'Procesando',
    error: 'Error',
  },

  // Download history
  history: {
    noDownloads: 'No hay descargas disponibles',
    clearHistory: 'Limpiar Historial',
  },

  // Feedback and errors
  feedback: {
    error: 'Error de Descarga',
    success: 'Descarga Completada',
    cancelled: 'Descarga Cancelada',
  },

  // Page titles
  title: 'Descargar Análisis',
} as const;

export type DownloadTranslations = typeof download;
