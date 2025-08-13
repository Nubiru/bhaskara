/**
 * @fileoverview Página de análisis de beneficios/rentabilidad empresarial
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Página completa para el análisis de beneficios y rentabilidad empresarial.
 * Integra formulario de entrada, cálculos en tiempo real, visualización
 * de resultados, métricas avanzadas y recomendaciones estratégicas.
 *
 * @dependencies
 * - ProfitForm component
 * - ProfitChart component
 * - API service
 * - react-i18next
 *
 * @usage
 * Ruta: /analysis/profit
 *
 * @state
 * ✅ Funcional - Página completa con form, chart, metrics y API integration
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar comparación de periodos históricos
 * - [PRIORITY: MEDIUM] Implementar alertas inteligentes de rentabilidad
 * - [PRIORITY: LOW] Añadir proyecciones de beneficios futuros
 * - [PRIORITY: MEDIUM] Integrar benchmarking por industria
 *
 * @performance
 * - Componente memoizado para optimización
 * - Estados gestionados eficientemente
 * - API calls con retry logic
 * - Cálculos optimizados para métricas complejas
 *
 * @accessibility
 * - Meta tags apropiados para SEO
 * - Estructura semántica correcta
 * - ARIA labels y descriptions
 * - Indicadores visuales para diferentes estados de rentabilidad
 */

import { memo, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProfitAnalysisRequest, ProfitAnalysisResult } from '../../types/business';
import { lazy, Suspense } from 'react';
import ProfitForm from '../../components/forms/ProfitForm';
import InfoPopover from '../../components/ui/InfoPopover';
const ProfitChart = lazy(() => import('../../components/charts/ProfitChart'));
import FileDownloader from '../../components/ui/FileDownloader';
import { apiService } from '../../services/api';
import { withRetry, getErrorMessage } from '../../utils/api-helpers';

export function meta() {
  return [
    { title: 'Análisis de Beneficios - MutualMetrics' },
    { name: 'description', content: 'Herramienta avanzada para análisis de rentabilidad y beneficios empresariales' },
    { name: 'keywords', content: 'beneficios, análisis de rentabilidad, margen de beneficio, ROI, análisis financiero' },
    { property: 'og:title', content: 'Análisis de Beneficios - MutualMetrics' },
    { property: 'og:description', content: 'Analiza la rentabilidad y beneficios de tu empresa' },
    { property: 'og:type', content: 'website' },
  ];
}

interface ProfitAnalysisPageProps {
  className?: string;
}

const ProfitAnalysisPage = memo<ProfitAnalysisPageProps>(({ className = '' }) => {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProfitAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfitAnalysisRequest>({
    ingresoTotal: 0,
    costoTotal: 0,
    description: '',
  });

  // Calculate derived metrics
  const metrics = useMemo(() => {
    if (!formData.ingresoTotal || !formData.costoTotal) return null;
    
    const profit = formData.ingresoTotal - formData.costoTotal;
    const profitMargin = formData.ingresoTotal > 0 ? (profit / formData.ingresoTotal) * 100 : 0;
    const costRatio = formData.ingresoTotal > 0 ? (formData.costoTotal / formData.ingresoTotal) * 100 : 0;
    const roi = formData.costoTotal > 0 ? (profit / formData.costoTotal) * 100 : 0;
    
    // Determine profitability status
    let status: 'excellent' | 'good' | 'average' | 'poor' | 'loss' = 'average';
    if (profit < 0) status = 'loss';
    else if (profitMargin >= 20) status = 'excellent';
    else if (profitMargin >= 10) status = 'good';
    else if (profitMargin >= 5) status = 'average';
    else status = 'poor';

    return {
      profit,
      profitMargin,
      costRatio,
      roi,
      status,
      interpretation: profit > 0 ? 'profit' : profit < 0 ? 'loss' : 'breakeven',
    };
  }, [formData.ingresoTotal, formData.costoTotal]);

  const handleAnalysisSubmit = useCallback(async (data: ProfitAnalysisRequest) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      const result = await withRetry(
        () => apiService.analyzeProfit(data),
        { maxAttempts: 3, baseDelay: 1000 }
      );
      
      setAnalysisResult(result);
      setFormData(data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setAnalysisError(errorMessage);
      console.error('Profit analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const getStatusBadge = useCallback((status: string) => {
    const badges: Record<string, string> = {
      excellent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      good: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      average: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      poor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      loss: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    const labels: Record<string, string> = {
      excellent: t('profit.margin.excellent'),
      good: t('profit.margin.good'),
      average: t('profit.margin.average'),
      poor: t('profit.margin.poor'),
      loss: t('profit.interpretation.loss'),
    };
    return {
      className: badges[status] || badges.average,
      label: labels[status] || labels.average,
    };
  }, [t]);

  const getRecommendations = useCallback((status: string, profitMargin: number) => {
    const recommendations = [];
    
    if (status === 'loss') {
      recommendations.push(t('profit.recommendations.urgentAction'));
      recommendations.push(t('profit.recommendations.reduceCosts'));
    } else if (status === 'poor') {
      recommendations.push(t('profit.recommendations.increaseRevenue'));
      recommendations.push(t('profit.recommendations.optimizeOperations'));
    } else if (status === 'excellent') {
      recommendations.push(t('profit.recommendations.investGrowth'));
    }
    
    return recommendations;
  }, [t]);

  return (
    <div className={`min-h-screen py-8 ${className}`} style={{ background: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t('profit.title')}
            </h1>
            <InfoPopover title={t('profit.help.title')}>
              <ol className="list-decimal list-inside space-y-1">
                <li>{t('profit.help.step1')}</li>
                <li>{t('profit.help.step2')}</li>
                <li>{t('profit.help.step3')}</li>
                <li>{t('profit.help.step4')}</li>
              </ol>
            </InfoPopover>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('profit.subtitle')}
          </p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <section className="rounded-lg shadow-lg p-6" aria-labelledby="form-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="form-title" className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('profit.form.title')}
            </h2>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {t('profit.form.subtitle')}
            </p>
            <ProfitForm
              onSubmit={handleAnalysisSubmit}
              isLoading={isAnalyzing}
              className="space-y-6"
            />
          </section>

          {/* Results Section */}
          <section className="rounded-lg shadow-lg p-6" aria-labelledby="results-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="results-title" className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
              {t('profit.results.title')}
            </h2>

            {/* Loading State */}
            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
                <div className="animate-spin rounded-full h-12 w-12 mb-4" style={{ color: 'var(--color-primary)', borderBottomColor: 'currentColor', borderBottomWidth: '2px' }}></div>
                <p style={{ color: 'var(--color-text-secondary)' }}>{t('profit.states.calculating')}</p>
              </div>
            )}

            {/* Error State */}
            {analysisError && !isAnalyzing && (
              <div className="rounded-lg p-4" style={{ background: 'var(--color-error)', color: 'var(--on-error-text)' }}>
                <h3 className="font-medium mb-2">
                  ❌ {t('profit.states.error')}
                </h3>
                <p className="text-sm">
                  {analysisError}
                </p>
              </div>
            )}

            {/* Results Display */}
            {analysisResult && metrics && !isAnalyzing && (
              <div className="space-y-6">
                {/* Summary Results */}
                <div className="rounded-lg p-4" style={{ background: 'var(--color-success)', color: 'var(--on-success-text)' }}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">
                      ✅ {t('profit.results.summary')}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(metrics.status).className}`}>
                      {getStatusBadge(metrics.status).label}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span><strong>{t('profit.results.totalRevenue')}:</strong></span>
                      <span>{formData.ingresoTotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>{t('profit.results.totalCosts')}:</strong></span>
                      <span>{formData.costoTotal.toFixed(2)}€</span>
                    </div>
                    <hr className="border-green-300 dark:border-green-600" />
                    <div className="flex justify-between text-base font-bold">
                      <span><strong>{t('profit.results.profit')}:</strong></span>
                      <span className={`${metrics.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {metrics.profit >= 0 ? '+' : ''}{metrics.profit.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>{t('profit.results.profitMargin')}:</strong></span>
                      <span className={`${metrics.profitMargin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {metrics.profitMargin.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span><strong>{t('profit.results.roi')}:</strong></span>
                      <span className={`${metrics.roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {metrics.roi.toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      <strong>ID:</strong> {analysisResult.metadata.analysisId}
                    </div>
                  </div>
                </div>

                {/* Chart Display */}
                <div className="rounded-lg border p-4" style={{ background: 'var(--color-surface-elevated)', borderColor: 'var(--color-divider)' }}>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                    {t('profit.chart.title')}
                  </h4>
                  <Suspense fallback={<div className="h-[300px]" />}>
                    <ProfitChart
                      ingresoTotal={formData.ingresoTotal}
                      costoTotal={formData.costoTotal}
                      analysisResult={analysisResult}
                      height={300}
                      showDonutChart={true}
                      showComparison={true}
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
                    analysisType="profit"
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

                {/* Recommendations */}
                {getRecommendations(metrics.status, metrics.profitMargin).length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h4 className="text-blue-800 dark:text-blue-200 font-medium mb-3">
                      💡 {t('profit.recommendations.title')}
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      {getRecommendations(metrics.status, metrics.profitMargin).map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* No Results State */}
            {!analysisResult && !isAnalyzing && !analysisError && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('profit.states.noResults')}
                </h3>
              </div>
            )}
          </section>
        </main>

        {/* Help content moved to InfoPopover in header */}
      </div>
    </div>
  );
});

ProfitAnalysisPage.displayName = 'ProfitAnalysisPage';

export default ProfitAnalysisPage;