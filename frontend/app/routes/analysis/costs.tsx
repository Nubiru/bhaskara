/**
 * @fileoverview Página de análisis de costos totales
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Página completa para el análisis de costos totales empresariales.
 * Integra formulario de entrada, cálculos en tiempo real, visualización
 * de resultados y gráficas interactivas.
 *
 * @dependencies
 * - CostForm component
 * - CostChart component
 * - API service
 * - react-i18next
 *
 * @usage
 * Ruta: /analysis/costs
 *
 * @state
 * ✅ Funcional - Página completa con form, chart y API integration
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar exportación de reportes
 * - [PRIORITY: MEDIUM] Implementar comparación histórica
 * - [PRIORITY: LOW] Añadir análisis de sensibilidad
 *
 * @performance
 * - Componente memoizado para optimización
 * - Estados gestionados eficientemente
 * - API calls con retry logic
 *
 * @accessibility
 * - Meta tags apropiados para SEO
 * - Estructura semántica correcta
 * - ARIA labels y descriptions
 */

import { memo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { CostAnalysisRequest, CostAnalysisResult } from '../../types/business';
import { lazy, Suspense } from 'react';
import CostForm from '../../components/forms/CostForm';
import InfoPopover from '../../components/ui/InfoPopover';
const CostChart = lazy(() => import('../../components/charts/CostChart'));
import FileDownloader from '../../components/ui/FileDownloader';
import { apiService } from '../../services/api';
import { withRetry, getErrorMessage } from '../../utils/api-helpers';

export function meta() {
  return [
    { title: 'Total Cost Analysis - MutualMetrics' },
    { name: 'description', content: 'Advanced tool for analysis of fixed and variable business costs' },
    { name: 'keywords', content: 'costs, business analysis, fixed costs, variable costs, business management' },
    { property: 'og:title', content: 'Total Cost Analysis - MutualMetrics' },
    { property: 'og:description', content: 'Analyze your company\'s cost structure' },
    { property: 'og:type', content: 'website' },
  ];
}

interface CostAnalysisPageProps {
  className?: string;
}

const CostAnalysisPage = memo<CostAnalysisPageProps>(({ className = '' }) => {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CostAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CostAnalysisRequest>({
    costosFijos: 0,
    costosVariables: 0,
    cantidad: 1,
    description: '',
  });

  const handleAnalysisSubmit = useCallback(async (data: CostAnalysisRequest) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      const result = await withRetry(
        () => apiService.analyzeCosts(data),
        { maxAttempts: 3, baseDelay: 1000 }
      );
      
      setAnalysisResult(result);
      setFormData(data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setAnalysisError(errorMessage);
      console.error('Cost analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return (
    <div className={`min-h-screen py-8 ${className}`} style={{ background: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t('costs.title')}
            </h1>
            <InfoPopover title={t('costs.help.title')}>
              <ol className="list-decimal list-inside space-y-1">
                <li>{t('costs.help.step1')}</li>
                <li>{t('costs.help.step2')}</li>
                <li>{t('costs.help.step3')}</li>
                <li>{t('costs.help.step4')}</li>
              </ol>
            </InfoPopover>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('costs.subtitle')}
          </p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <section className="rounded-lg shadow-lg p-6" aria-labelledby="form-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="form-title" className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('costs.form.title')}
            </h2>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {t('costs.form.subtitle')}
            </p>
            <CostForm
              onSubmit={handleAnalysisSubmit}
              isLoading={isAnalyzing}
              className="space-y-6"
            />
          </section>

          {/* Results Section */}
          <section className="rounded-lg shadow-lg p-6" aria-labelledby="results-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="results-title" className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('costs.results.title')}
            </h2>

            {/* Loading State */}
            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
                <div className="animate-spin rounded-full h-12 w-12 mb-4" style={{ color: 'var(--color-primary)', borderBottomColor: 'currentColor', borderBottomWidth: '2px' }}></div>
                <p style={{ color: 'var(--color-text-secondary)' }}>{t('costs.states.calculating')}</p>
              </div>
            )}

            {/* Error State */}
            {analysisError && !isAnalyzing && (
              <div className="rounded-lg p-4" style={{ background: 'var(--color-error)', color: 'var(--on-error-text)' }}>
                <h3 className="font-medium mb-2">
                  ❌ {t('costs.states.error')}
                </h3>
                <p className="text-sm">
                  {analysisError}
                </p>
              </div>
            )}

            {/* Results Display */}
            {analysisResult && !isAnalyzing && (
              <div className="space-y-6">
                {/* Summary Results */}
                <div className="rounded-lg p-4" style={{ background: 'var(--color-success)', color: 'var(--on-success-text)' }}>
                  <h3 className="font-medium mb-2">
                    ✅ {t('costs.results.summary')}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span><strong>{t('costs.results.fixedCosts')}:</strong></span>
                      <span>{formData.costosFijos.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>{t('costs.results.variableCosts')}:</strong></span>
                      <span>{formData.costosVariables.toFixed(2)}€/{t('costs.form.cantidadUnit')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>{t('costs.results.quantity')}:</strong></span>
                      <span>{formData.cantidad} {t('costs.form.cantidadUnit')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>{t('costs.results.totalVariableCosts')}:</strong></span>
                      <span>{analysisResult.detalles.breakdown.variables.toFixed(2)}€</span>
                    </div>
                    <hr className="border-purple-300 dark:border-purple-600" />
                    <div className="flex justify-between text-base font-bold">
                      <span><strong>{t('costs.results.totalCosts')}:</strong></span>
                      <span className="text-purple-600 dark:text-purple-400">{analysisResult.costoTotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>{t('costs.results.unitCost')}:</strong></span>
                      <span>{(analysisResult.costoTotal / (formData.cantidad || 1)).toFixed(2)}€</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      <strong>ID:</strong> {analysisResult.metadata.analysisId}
                    </div>
                  </div>
                </div>

                {/* Chart Display */}
                <div className="rounded-lg border p-4" style={{ background: 'var(--color-surface-elevated)', borderColor: 'var(--color-divider)' }}>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                    {t('costs.chart.title')}
                  </h4>
                  <Suspense fallback={<div className="h-[300px]" />}>
                    <CostChart
                      costosFijos={formData.costosFijos}
                      costosVariables={formData.costosVariables}
                      cantidad={formData.cantidad || 1}
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
                    analysisType="cost"
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

            {/* No Results State */}
            {!analysisResult && !isAnalyzing && !analysisError && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('costs.states.noResults')}
                </h3>
              </div>
            )}
          </section>
        </main>

        {/* Help content trasladado a InfoPopover del header */}
      </div>
    </div>
  );
});

CostAnalysisPage.displayName = 'CostAnalysisPage';

export default CostAnalysisPage;