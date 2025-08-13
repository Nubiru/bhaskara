/**
 * @fileoverview Página de análisis de punto de equilibrio empresarial
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Componente de página completo para el análisis de punto de equilibrio.
 * Integra BreakevenForm y BreakevenChart, gestiona el estado del análisis,
 * realiza llamadas API y proporciona una experiencia de usuario completa
 * con manejo de errores, estados de carga y internacionalización.
 *
 * @dependencies
 * - BreakevenForm component
 * - BreakevenChart component
 * - apiService para llamadas al backend
 * - useTranslation para i18n
 *
 * @usage
 * Ruta: /analysis/break-even
 * Se renderiza dentro del layout de Analysis con Sidebar
 *
 * @state
 * ✅ Funcional - Página completa con formulario, gráfico, API e i18n
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar análisis de sensibilidad
 * - [PRIORITY: MEDIUM] Implementar comparación de escenarios
 * - [PRIORITY: LOW] Añadir exportación a PDF/Excel
 * - [PRIORITY: MEDIUM] Integrar recomendaciones de optimización
 *
 * @performance
 * - Componente memoizado para evitar re-renders innecesarios
 * - Estado optimizado con useState y useCallback
 * - Manejo eficiente de errores y carga
 * - Formulario con validación en tiempo real
 *
 * @accessibility
 * - Estructura semántica con regiones ARIA
 * - Navegación por teclado completa
 * - Estados de carga y error accesibles
 * - Alternativas textuales para gráficos
 */

import { useState, useCallback, memo, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';
import BreakevenForm from '../../components/forms/BreakevenForm';
import InfoPopover from '../../components/ui/InfoPopover';
const BreakevenChart = lazy(() => import('../../components/charts/BreakevenChart'));
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FileDownloader from '../../components/ui/FileDownloader';
import { apiService } from '../../services/api';
import type { BreakEvenAnalysisRequest, BreakEvenAnalysisResult } from '../../types/business';

export const meta: MetaFunction = () => {
  return [
    { title: 'Análisis de Punto de Equilibrio | MutualMetrics' },
    { 
      name: 'description', 
      content: 'Calcula el punto de equilibrio de tu negocio. Determina cuántas unidades necesitas vender para cubrir todos los costos.' 
    },
    { name: 'keywords', content: 'punto de equilibrio, break-even, análisis financiero, costos fijos, costos variables, margen contribución' },
  ];
};

interface AnalysisState {
  result: BreakEvenAnalysisResult | null;
  formData: BreakEvenAnalysisRequest | null;
  isLoading: boolean;
  error: string | null;
}

const BreakEvenAnalysisPage = memo(() => {
  const { t } = useTranslation();
  
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    result: null,
    formData: null,
    isLoading: false,
    error: null,
  });

  const handleBreakevenAnalysis = useCallback(async (formData: BreakEvenAnalysisRequest) => {
    setAnalysisState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      formData,
    }));

    try {
      const result = await apiService.analyzeBreakEven(formData);
      
      setAnalysisState(prev => ({
        ...prev,
        result,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error en análisis de punto de equilibrio:', error);
      
      setAnalysisState(prev => ({
        ...prev,
        result: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido en el análisis',
      }));
    }
  }, []);

  const handleClearAnalysis = useCallback(() => {
    setAnalysisState({
      result: null,
      formData: null,
      isLoading: false,
      error: null,
    });
  }, []);

  // Determine business viability status for enhanced UX
  const viabilityStatus = analysisState.result && analysisState.formData ? (() => {
    const contributionMargin = analysisState.formData.precio - analysisState.formData.costoVariableUnitario;
    const contributionRatio = (contributionMargin / analysisState.formData.precio) * 100;
    
    if (contributionMargin <= 0) return 'negative';
    if (contributionRatio < 10) return 'critical';
    if (contributionRatio < 20) return 'low';
    if (contributionRatio < 40) return 'good';
    return 'excellent';
  })() : null;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      excellent: '🎉 Excelente margen',
      good: '✅ Negocio viable',
      low: '⚠️ Margen bajo',
      critical: '🚨 Revisar costos',
      negative: '❌ No viable',
    };
    
    const colors: Record<string, string> = {
      excellent: 'bg-green-100 text-green-800 border-green-200',
      good: 'bg-blue-100 text-blue-800 border-blue-200',
      low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      critical: 'bg-orange-100 text-orange-800 border-orange-200',
      negative: 'bg-red-100 text-red-800 border-red-200',
    };
    
    return {
      text: badges[status] || '',
      className: colors[status] || colors.good,
    };
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('breakeven.title')}
              </h1>
              <InfoPopover title={t('breakeven.help.title')}>
                <div className="space-y-1">
                  <p>{t('breakeven.help.step1')}</p>
                  <p>{t('breakeven.help.step2')}</p>
                  <p>{t('breakeven.help.step3')}</p>
                  <p>{t('breakeven.help.step4')}</p>
                </div>
              </InfoPopover>
            </div>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {t('breakeven.subtitle')}
            </p>
            
            {/* Status Badge */}
            {viabilityStatus && (
              <div className="mt-4 sm:mt-0">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border
                  ${getStatusBadge(viabilityStatus).className}
                `}>
                  {getStatusBadge(viabilityStatus).text}
                </span>
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 {t('breakeven.description')}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-1">
            <div className="shadow-lg rounded-lg" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                  {t('breakeven.form.title')}
                </h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('breakeven.form.subtitle')}
                </p>
              </div>
              <div className="p-6">
                <BreakevenForm
                  onSubmit={handleBreakevenAnalysis}
                  isLoading={analysisState.isLoading}
                />
                
                {/* Clear Results Button */}
                {(analysisState.result || analysisState.error) && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleClearAnalysis}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      🔄 {t('form.newAnalysis')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="order-2">
            {analysisState.isLoading && (
              <div className="shadow-lg rounded-lg p-8" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <LoadingSpinner size="lg" />
                  <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
                    {t('breakeven.states.calculating')}
                  </p>
                </div>
              </div>
            )}

            {analysisState.error && (
              <div className="shadow-lg rounded-lg" style={{ background: 'var(--color-error)', color: 'var(--on-error-text)' }}>
                <div className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center">
                        <span className="text-lg">⚠️</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">
                        {t('breakeven.states.error')}
                      </h3>
                      <p className="mt-2 text-sm">
                        {analysisState.error}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {analysisState.result && analysisState.formData && !analysisState.isLoading && (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="shadow-lg rounded-lg" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                      {t('breakeven.results.title')}
                    </h2>
                    <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {t('breakeven.results.summary')}
                    </p>
                  </div>
                  <div className="p-6">
                    {/* Strategic Recommendations */}
                    <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                        {t('breakeven.recommendations.title')}
                      </h4>
                      <div className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                        {viabilityStatus === 'excellent' && (
                          <p>✨ {t('breakeven.recommendations.marketExpansion')}</p>
                        )}
                        {viabilityStatus === 'good' && (
                          <p>📈 {t('breakeven.recommendations.priceOptimization')}</p>
                        )}
                        {(viabilityStatus === 'low' || viabilityStatus === 'critical') && (
                          <>
                            <p>💰 {t('breakeven.recommendations.increasePrice')}</p>
                            <p>📉 {t('breakeven.recommendations.reduceCosts')}</p>
                          </>
                        )}
                        {viabilityStatus === 'negative' && (
                          <p>🔄 {t('breakeven.recommendations.improveEfficiency')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="shadow-lg rounded-lg" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
                  <div className="p-6">
                    <Suspense fallback={<div className="h-[360px]" />}>
                      <BreakevenChart
                        result={analysisState.result}
                        costosFijos={analysisState.formData.costosFijos}
                        costoVariableUnitario={analysisState.formData.costoVariableUnitario}
                        precio={analysisState.formData.precio}
                        height={360}
                      />
                    </Suspense>
                  </div>
                </div>

                {/* Descarga de resultados */}
                <div className="shadow-lg rounded-lg" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
                  <div className="p-6">
                                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                       📥 {t('download.title')}
                     </h4>
                    <FileDownloader
                      analysisResults={[analysisState.result]}
                      analysisType="breakeven"
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
              </div>
            )}

            {/* Empty State */}
            {!analysisState.result && !analysisState.isLoading && !analysisState.error && (
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t('breakeven.states.noResults')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Completa el formulario para ver el análisis de punto de equilibrio y visualizaciones.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help content movido al InfoPopover en el header */}
      </div>
    </div>
  );
});

BreakEvenAnalysisPage.displayName = 'BreakEvenAnalysisPage';

export default BreakEvenAnalysisPage;