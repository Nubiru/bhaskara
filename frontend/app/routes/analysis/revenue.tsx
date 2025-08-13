/**
 * @fileoverview Página de análisis de ingresos totales
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Página completa para análisis de ingresos que integra formulario,
 * visualización y resultados. Implementa patrones de diseño responsivo
 * y accesibilidad completa siguiendo el patrón de BhaskaraForm.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * - RevenueForm component
 * - RevenueChart component
 * 
 * @usage
 * Ruta accesible en "/analysis/revenue"
 * 
 * @state
 * ✅ Funcional - Integración completa con formulario, gráfica y API
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar exportación de resultados
 * - [PRIORITY: LOW] Implementar comparación histórica
 * - [PRIORITY: LOW] Agregar análisis de sensibilidad
 * 
 * @performance
 * - Lazy loading de componentes pesados
 * - Memoización de cálculos
 * - Optimización de re-renders
 * 
 * @accessibility
 * - Estructura semántica correcta
 * - Navegación por teclado implementada
 * - ARIA labels y roles apropiados
 * - Contraste de colores optimizado
 * 
 * @security
 * - Validación de entrada
 * - Sanitización de datos
 * - Protección contra XSS
 */

import { memo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { RevenueAnalysisRequest, RevenueAnalysisResult } from '../../types/business';
import RevenueForm from '../../components/forms/RevenueForm';
import { lazy, Suspense } from 'react';
import FileDownloader from '../../components/ui/FileDownloader';
import InfoPopover from '../../components/ui/InfoPopover';
const RevenueChart = lazy(() => import('../../components/charts/RevenueChart'));
import { apiService } from '../../services/api';
import { withRetry, getErrorMessage } from '../../utils/api-helpers';

/**
 * Configuración de meta tags para SEO y accesibilidad
 */
export function meta() {
  return [
    { title: "Revenue Analysis - MutualMetrics" },
    { name: "description", content: "Analyze total revenue based on unit price and quantity sold" },
    { name: "keywords", content: "revenue analysis, income calculation, business metrics, sales analysis" },
    { name: "author", content: "MutualMetrics Team" },
    { property: "og:title", content: "Revenue Analysis - MutualMetrics" },
    { property: "og:description", content: "Analyze total revenue based on unit price and quantity" },
    { property: "og:type", content: "website" },
  ];
}

/**
 * Props del componente RevenueAnalysisPage
 */
interface RevenueAnalysisPageProps {
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Página de análisis de ingresos totales
 * Contiene el formulario principal y la visualización de resultados
 * Implementa patrones de diseño responsivo y accesibilidad completa
 */
const RevenueAnalysisPage = memo<RevenueAnalysisPageProps>(({ className = '' }) => {
  const { t } = useTranslation();
  
  // Estado para manejo del análisis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<RevenueAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RevenueAnalysisRequest>({
    precio: 0,
    cantidad: 0,
    description: '',
  });

  /**
   * Handler para envío del formulario de análisis
   */
  const handleAnalysisSubmit = useCallback(async (data: RevenueAnalysisRequest) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      console.log('Iniciando análisis de ingresos:', data);
      
      // Llamada real al backend con retry automático
      const result = await withRetry(
        () => apiService.analyzeRevenue(data),
        { maxAttempts: 3, baseDelay: 1000 }
      );
      
      console.log('Análisis de ingresos completado:', result);
      setAnalysisResult(result);
      setFormData(data);
      
    } catch (error) {
      console.error('Error durante análisis de ingresos:', error);
      const userFriendlyMessage = getErrorMessage(error);
      setAnalysisError(userFriendlyMessage);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return (
    <div className={`min-h-screen py-8 ${className}`} style={{ background: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la página */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t('revenue.title')}
            </h1>
            <InfoPopover title={t('revenue.help.title')}>
              <ol className="list-decimal list-inside space-y-1">
                <li>{t('revenue.help.step1Title')}: {t('revenue.help.step1Description')}</li>
                <li>{t('revenue.help.step2Title')}: {t('revenue.help.step2Description')}</li>
                <li>{t('revenue.help.step3Title')}: {t('revenue.help.step3Description')}</li>
              </ol>
            </InfoPopover>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('revenue.subtitle')}
          </p>
        </header>

        {/* Contenido principal */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel de formulario */}
          <section className="rounded-lg shadow-lg p-6" aria-labelledby="form-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="form-title" className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('revenue.form.title')}
            </h2>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {t('revenue.subtitle')}
            </p>
            
            {/* Formulario de análisis de ingresos */}
            <RevenueForm
              onSubmit={handleAnalysisSubmit}
              isLoading={isAnalyzing}
              className="space-y-6"
            />
          </section>

          {/* Panel de resultados */}
          <section className="rounded-lg shadow-lg p-6" aria-labelledby="results-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="results-title" className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('revenue.results.title')}
            </h2>
            
            {/* Visualización de resultados */}
            {isAnalyzing && (
              <div className="rounded-lg p-4 text-center" role="status" aria-live="polite" style={{ background: 'var(--color-info)', color: 'var(--on-info-text)' }}>
                <p className="font-medium">
                  🔄 {t('revenue.form.analyzing')}
                </p>
                <p className="text-sm mt-2">
                  {t('revenue.states.calculating')}
                </p>
              </div>
            )}

            {analysisError && (
              <div className="rounded-lg p-4" role="alert" aria-live="assertive" style={{ background: 'var(--color-error)', color: 'var(--on-error-text)' }}>
                <p className="font-medium">
                  ❌ {t('revenue.states.error')}
                </p>
                <p className="text-sm mt-1">
                  {analysisError}
                </p>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="space-y-6">
                {/* Resultados numéricos */}
                <div className="rounded-lg p-4" style={{ background: 'var(--color-success)', color: 'var(--on-success-text)' }}>
                  <h3 className="font-medium mb-2">
                    ✅ {t('revenue.results.title')}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>{t('revenue.results.unitPrice')}:</strong> {formData.precio.toFixed(2)}€</p>
                    <p><strong>{t('revenue.results.quantity')}:</strong> {formData.cantidad}</p>
                    <p><strong>{t('revenue.results.totalRevenue')}:</strong> {analysisResult.ingresoTotal.toFixed(2)}€</p>
                    <p><strong>ID:</strong> {analysisResult.metadata.analysisId}</p>
                  </div>
                </div>
                
                {/* Gráfica interactiva */}
                <div className="rounded-lg border p-4" style={{ background: 'var(--color-surface-elevated)', borderColor: 'var(--color-divider)' }}>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                    {t('revenue.chart.title')}
                  </h4>
                  <Suspense fallback={<div className="h-[300px]" />}>
                    <RevenueChart
                      precio={formData.precio}
                      cantidad={formData.cantidad}
                      analysisResult={analysisResult}
                      height={300}
                      showKeyPoints={true}
                      showArea={true}
                      className="w-full"
                    />
                  </Suspense>
                </div>

                {/* Descarga de resultados */}
                <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    📥 {t('download.title')}
                  </h4>
                  <FileDownloader
                    analysisResults={[analysisResult]}
                    analysisType="revenue"
                    defaultFormat="pdf"
                    showFormatSelector={true}
                    showOptions={true}
                    onDownloadComplete={(filename, fileSize) => {
                      console.log(`Download completed: ${filename} (${fileSize} bytes)`);
                    }}
                    onDownloadError={(error) => {
                      console.error('Download error:', error);
                    }}
                  />
                </div>
              </div>
            )}

            {!analysisResult && !isAnalyzing && !analysisError && (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center" role="status" aria-live="polite">
                <p className="text-gray-500 dark:text-gray-400">
                  📊 {t('revenue.results.title')}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  {t('revenue.states.noResults')}
                </p>
              </div>
            )}
          </section>
        </main>

        {/* Información adicional movida a InfoPopover en el header */}
      </div>
    </div>
  );
});

export default RevenueAnalysisPage;
