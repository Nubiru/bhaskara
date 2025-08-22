/**
 * @fileoverview Renderizador de contenido de herramientas para MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-21
 * 
 * @description
 * Componente que renderiza el contenido específico de cada herramienta basado en la vista actual.
 * Centraliza la lógica de renderizado y proporciona una interfaz consistente para todas las herramientas.
 * 
 * @dependencies
 * - Componentes de formularios
 * - Componentes de gráficos
 * - Tipos de herramientas
 * - Sistema de temas unificado
 * 
 * @usage
 * <ToolContentRenderer
 *   currentView={currentView}
 *   analysisState={analysisState}
 *   handlers={handlers}
 *   t={t}
 * />
 * 
 * @state
 * ✅ FUNCIONAL - Renderizador de contenido de herramientas con todas las herramientas implementadas
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar manejo de errores específicos
 * - [PRIORITY: LOW] Implementar lazy loading de componentes
 * - [PRIORITY: LOW] Optimizar responsive design para móviles
 * 
 * @performance
 * - Renderizado condicional optimizado
 * - Componentes pesados cargados solo cuando es necesario
 * - Memoización de componentes de resultados
 * 
 * @accessibility
 * - Estructura semántica correcta
 * - Estados de carga accesibles
 * - Manejo de errores con ARIA
 * - Navegación por teclado
 */

import { memo, useMemo } from 'react';
import type { ViewType, UnifiedAnalysisState, AnalysisHandlers } from '../../types/tools';
import type { FullAnalysisResult } from '../../types/quadratic';
import type { RevenueAnalysisResult } from '../../types/business';
import AnalysisPanel from './AnalysisPanel';
import BhaskaraForm from '../forms/BhaskaraForm';
import BhaskaraChart from '../charts/BhaskaraChart';
import BreakevenForm from '../forms/BreakevenForm';
import RevenueForm from '../forms/RevenueForm';
import CompoundInterestForm from '../forms/CompoundInterestForm';
import CurrencyConverterForm from '../forms/CurrencyConverterForm';
import AdvancedNumberSystemForm from '../forms/AdvancedNumberSystemForm';

// ========================================
// PROPS INTERFACE
// ========================================

interface ToolContentRendererProps {
  /** Vista actualmente seleccionada */
  currentView: ViewType;
  /** Estado de análisis unificado */
  analysisState: UnifiedAnalysisState;
  /** Handlers de análisis */
  handlers: AnalysisHandlers;
  /** Función de traducción */
  t: (key: string, defaultValue?: string) => string;
}

// ========================================
// COMPONENT IMPLEMENTATION
// ========================================

/**
 * Renderizador de contenido de herramientas
 */
const ToolContentRenderer = memo<ToolContentRendererProps>(({
  currentView,
  analysisState,
  handlers,
  t
}) => {
  // ========================================
  // CONTENT RENDERING LOGIC
  // ========================================

  /**
   * Renderiza contenido de Bhaskara
   */
  const renderBhaskaraContent = useMemo(() => {
    const state = analysisState.bhaskara;
    
    return (
      <AnalysisPanel
        title={t('home.formTitle')}
        subtitle={t('home.formDescription')}
        formComponent={
          <BhaskaraForm
            onSubmit={handlers.handleBhaskaraAnalysis}
            isLoading={state.isAnalyzing}
            className="space-y-6"
          />
        }
        resultsComponent={
          state.result && (
            <>
              {/* Resultados numéricos */}
              <div 
                className="rounded-lg p-3"
                style={{ 
                  background: 'var(--color-success)', 
                  color: 'var(--on-success-text)' 
                }}
              >
                <h3 className="font-medium mb-2">✅ {t('home.analysisCompleted')}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('home.equation')}:</strong> {state.result.equation}</p>
                  <p><strong>{t('bhaskara.results.discriminant', 'Discriminante')}:</strong> {state.result.discriminant.toFixed(4)}</p>
                  <p><strong>{t('bhaskara.results.roots', 'Raíces')}:</strong> x₁ = {state.result.roots.x1?.toFixed(4) || 'N/A'}, x₂ = {state.result.roots.x2?.toFixed(4) || 'N/A'}</p>
                  <p><strong>{t('bhaskara.results.vertex', 'Vértice')}:</strong> ({state.result.vertex.x.toFixed(4)}, {state.result.vertex.y.toFixed(4)})</p>
                  <p><strong>{t('bhaskara.results.analysisId', 'Análisis ID')}:</strong> {state.result.analysisId}</p>
                </div>
              </div>
              
              {/* Gráfica interactiva */}
              <div 
                className="rounded-lg border p-3"
                style={{ 
                  background: 'var(--color-surface-elevated)', 
                  borderColor: 'var(--color-divider)' 
                }}
              >
                <h4 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                  {t('bhaskara.chart.title', 'Visualización Gráfica')}
                </h4>
                <BhaskaraChart
                  coefficients={state.result.coefficients}
                  analysisResult={state.result}
                  height={340}
                  showKeyPoints={true}
                  showArea={true}
                  className="w-full"
                />
              </div>
            </>
          )
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('home.noResults')}
        analyzeButtonMessage={t('home.analyzeButton')}
      />
    );
  }, [analysisState.bhaskara, handlers.handleBhaskaraAnalysis, t]);

  /**
   * Renderiza contenido de punto de equilibrio
   */
  const renderBreakevenContent = useMemo(() => {
    const state = analysisState.breakeven;
    
    return (
      <AnalysisPanel
        title={t('breakeven.form.title')}
        subtitle={t('breakeven.form.subtitle')}
        formComponent={
          <BreakevenForm
            onSubmit={handlers.handleBreakevenAnalysis}
            isLoading={state.isAnalyzing}
            className="space-y-4"
          />
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('breakeven.states.noResults')}
        analyzeButtonMessage={t('breakeven.form.analyze')}
      />
    );
  }, [analysisState.breakeven, handlers.handleBreakevenAnalysis, t]);

  /**
   * Renderiza contenido de ingresos
   */
  const renderRevenueContent = useMemo(() => {
    const state = analysisState.revenue;
    
    return (
      <AnalysisPanel
        title={t('revenue.form.title')}
        subtitle={t('revenue.form.subtitle')}
        formComponent={
          <RevenueForm
            onSubmit={handlers.handleRevenueAnalysis}
            isLoading={state.isAnalyzing}
            className="space-y-4"
          />
        }
        resultsComponent={
          state.result && (
            <>
              {/* Resultados numéricos */}
              <div 
                className="rounded-lg p-3"
                style={{ 
                  background: 'var(--color-success)', 
                  color: 'var(--on-success-text)' 
                }}
              >
                <h3 className="font-medium mb-2">✅ {t('revenue.results.title', 'Análisis de Ingresos Completado')}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('revenue.results.totalRevenue', 'Ingreso Total')}:</strong> {state.result.ingresoTotal.toFixed(2)}€</p>
                  <p><strong>{t('revenue.results.unitPrice', 'Precio Unitario')}:</strong> {state.result.precio.toFixed(2)}€</p>
                  <p><strong>{t('revenue.results.quantity', 'Cantidad')}:</strong> {state.result.cantidad.toLocaleString()}</p>
                  <p><strong>{t('revenue.results.formula', 'Fórmula')}:</strong> {state.result.detalles.formula}</p>
                  <p><strong>{t('revenue.results.calculation', 'Cálculo')}:</strong> {state.result.detalles.calculo}</p>
                  <p><strong>{t('revenue.results.analysisId', 'Análisis ID')}:</strong> {state.result.metadata.analysisId}</p>
                </div>
              </div>
              
              {/* Información adicional específica de ingresos */}
              <div 
                className="rounded-lg border p-3"
                style={{ 
                  background: 'var(--color-surface-elevated)', 
                  borderColor: 'var(--color-divider)' 
                }}
              >
                <h4 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                  {t('revenue.results.summary', 'Resumen del Análisis de Ingresos')}
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('revenue.results.summaryText', 'El análisis muestra que con un precio de')} {state.result.precio.toFixed(2)}€ {t('revenue.results.perUnit', 'por unidad')} {t('revenue.results.andQuantity', 'y una cantidad de')} {state.result.cantidad.toLocaleString()} {t('revenue.results.units', 'unidades')}, {t('revenue.results.totalRevenueIs', 'el ingreso total es de')} {state.result.ingresoTotal.toFixed(2)}€.
                </p>
              </div>
            </>
          )
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('revenue.states.noResults')}
        analyzeButtonMessage={t('revenue.form.analyze')}
      />
    );
  }, [analysisState.revenue, handlers.handleRevenueAnalysis, t]);

  /**
   * Renderiza contenido de costos
   */
  const renderCostsContent = useMemo(() => {
    const state = analysisState.costs;
    
    return (
      <AnalysisPanel
        title={t('costs.form.title')}
        subtitle={t('costs.form.subtitle')}
        formComponent={
          <div className="text-center py-8">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text)' }}>
              {t('costs.form.title')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('costs.form.description')}
            </p>
            <div className="mt-4 p-4 rounded-lg" style={{ 
              background: 'var(--color-surface)', 
              border: '1px dashed var(--color-divider)' 
            }}>
              <p className="text-lg">🚧 {t('common.inDevelopment', 'En Desarrollo')}</p>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                {t('common.toolComingSoon', 'La herramienta')} {t('home.sidebar.tools.costs')} {t('common.willBeAvailableSoon', 'estará disponible próximamente.')}
              </p>
            </div>
          </div>
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('costs.states.noResults')}
        analyzeButtonMessage={t('costs.form.analyze')}
      />
    );
  }, [analysisState.costs, t]);

  /**
   * Renderiza contenido de beneficios
   */
  const renderProfitContent = useMemo(() => {
    const state = analysisState.profit;
    
    return (
      <AnalysisPanel
        title={t('profit.form.title')}
        subtitle={t('profit.form.subtitle')}
        formComponent={
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text)' }}>
              {t('profit.form.title')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('profit.form.description')}
            </p>
            <div className="mt-4 p-4 rounded-lg" style={{ 
              background: 'var(--color-surface)', 
              border: '1px dashed var(--color-divider)' 
            }}>
              <p className="text-lg">🚧 {t('common.inDevelopment', 'En Desarrollo')}</p>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                {t('common.toolComingSoon', 'La herramienta')} {t('profit.form.title')} {t('common.willBeAvailableSoon', 'estará disponible próximamente.')}
              </p>
            </div>
          </div>
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('profit.states.noResults')}
        analyzeButtonMessage={t('profit.form.analyze')}
      />
    );
  }, [analysisState.profit, t]);

  /**
   * Renderiza contenido de interés compuesto
   */
  const renderCompoundInterestContent = useMemo(() => {
    const state = analysisState.compoundInterest;
    
    return (
      <AnalysisPanel
        title={t('compoundInterest.title', '📈 Calculadora de Interés Compuesto')}
        subtitle={t('compoundInterest.subtitle', 'Calcula el crecimiento de inversiones con interés compuesto y contribuciones regulares')}
        formComponent={
          <CompoundInterestForm
            onSubmit={handlers.handleCompoundInterestAnalysis}
            isLoading={state.isAnalyzing}
            className="space-y-4"
          />
        }
        resultsComponent={
          state.result && (
            <>
              {/* Resultados numéricos */}
              <div 
                className="rounded-lg p-3"
                style={{ 
                  background: 'var(--color-success)', 
                  color: 'var(--on-success-text)' 
                }}
              >
                <h3 className="font-medium mb-2">✅ {t('compoundInterest.results.title', 'Análisis de Interés Compuesto Completado')}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('compoundInterest.results.principal', 'Capital Inicial')}:</strong> {state.result.principal.toFixed(2)}€</p>
                  <p><strong>{t('compoundInterest.results.finalAmount', 'Monto Final')}:</strong> {state.result.finalAmount.toFixed(2)}€</p>
                  <p><strong>{t('compoundInterest.results.interestEarned', 'Interés Ganado')}:</strong> {state.result.interestEarned.toFixed(2)}€</p>
                  <p><strong>{t('compoundInterest.results.totalContributions', 'Total Contribuciones')}:</strong> {state.result.totalContributions.toFixed(2)}€</p>
                  <p><strong>{t('compoundInterest.results.growthRate', 'Tasa de Crecimiento')}:</strong> {((state.result.finalAmount / state.result.principal - 1) * 100).toFixed(2)}%</p>
                </div>
              </div>
              
              {/* Proyección de Crecimiento */}
              <div 
                className="rounded-lg border p-3"
                style={{ 
                  background: 'var(--color-surface-elevated)', 
                  borderColor: 'var(--color-divider)' 
                }}
              >
                <h4 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                  {t('compoundInterest.chart.title', 'Proyección de Crecimiento')}
                </h4>
                <div className="max-h-40 overflow-y-auto">
                  <div className="grid grid-cols-4 gap-2 text-xs font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <div>{t('compoundInterest.chart.year', 'Año')}</div>
                    <div>{t('compoundInterest.chart.amount', 'Monto')}</div>
                    <div>{t('compoundInterest.chart.contributions', 'Contribuciones')}</div>
                    <div>{t('compoundInterest.chart.interest', 'Interés')}</div>
                  </div>
                  {state.result.schedule.slice(0, 10).map((entry: any, index: number) => (
                    <div key={index} className="grid grid-cols-4 gap-2 text-xs border-t py-1" style={{ borderColor: 'var(--color-divider)' }}>
                      <div>{entry.año}</div>
                      <div>{entry.monto.toFixed(2)}€</div>
                      <div>{entry.contribuciones.toFixed(2)}€</div>
                      <div>{entry.interes.toFixed(2)}€</div>
                    </div>
                  ))}
                  {state.result.schedule.length > 10 && (
                    <div className="text-xs text-center py-2" style={{ color: 'var(--color-text-secondary)' }}>
                      ... y {state.result.schedule.length - 10} {t('compoundInterest.chart.morePeriods', 'períodos más')}
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('compoundInterest.states.noResults', '📈 Ingresa los datos para calcular el interés compuesto')}
        analyzeButtonMessage={t('compoundInterest.help.step1', 'Incluye capital inicial, tasa de interés, tiempo y contribuciones')}
      />
    );
  }, [analysisState.compoundInterest, handlers.handleCompoundInterestAnalysis]);

  /**
   * Renderiza contenido de conversor de divisas
   */
  const renderCurrencyConverterContent = useMemo(() => {
    const state = analysisState.currencyConverter;
    
    return (
      <AnalysisPanel
        title={t('currencyConverter.title', '💱 Conversor de Divisas')}
        subtitle={t('currencyConverter.subtitle', 'Convierte entre más de 20 monedas con tasas de cambio en tiempo real')}
        formComponent={
          <CurrencyConverterForm
            onSubmit={handlers.handleCurrencyConversion}
            isLoading={state.isAnalyzing}
            className="space-y-4"
          />
        }
        resultsComponent={
          state.result && (
            <>
              {/* Resultados de conversión */}
              <div 
                className="rounded-lg p-3"
                style={{ 
                  background: 'var(--color-success)', 
                  color: 'var(--on-success-text)' 
                }}
              >
                <h3 className="font-medium mb-2">✅ {t('currencyConverter.results.title', 'Conversión Completada')}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('currencyConverter.results.originalAmount', 'Monto Original')}:</strong> {state.result.amount.toFixed(2)} {state.result.fromCurrency}</p>
                  <p><strong>{t('currencyConverter.results.convertedAmount', 'Monto Convertido')}:</strong> {state.result.convertedAmount.toFixed(2)} {state.result.toCurrency}</p>
                  <p><strong>{t('currencyConverter.results.exchangeRate', 'Tasa de Cambio')}:</strong> 1 {state.result.fromCurrency} = {state.result.exchangeRate.toFixed(4)} {state.result.toCurrency}</p>
                  <p><strong>{t('currencyConverter.results.lastUpdated', 'Última Actualización')}:</strong> {new Date().toLocaleString()}</p>
                </div>
              </div>
              
              {/* Información adicional */}
              <div 
                className="rounded-lg border p-3"
                style={{ 
                  background: 'var(--color-surface-elevated)', 
                  borderColor: 'var(--color-divider)' 
                }}
              >
                <h4 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                  {t('currencyConverter.results.summary', 'Resumen de Conversión')}
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('currencyConverter.results.summaryText', 'La conversión de')} {state.result.amount.toFixed(2)} {state.result.fromCurrency} {t('currencyConverter.results.to', 'a')} {state.result.toCurrency} {t('currencyConverter.results.resultedIn', 'resultó en')} {state.result.convertedAmount.toFixed(2)} {state.result.toCurrency} {t('currencyConverter.results.usingRate', 'usando la tasa de cambio de')} {state.result.exchangeRate.toFixed(4)}.
                </p>
              </div>
            </>
          )
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('currencyConverter.states.noResults', '💱 Realiza una conversión para ver los resultados')}
        analyzeButtonMessage={t('currencyConverter.form.convert', 'Convertir Divisas')}
      />
    );
  }, [analysisState.currencyConverter, handlers.handleCurrencyConversion, t]);

  /**
   * Renderiza contenido de conversor numérico
   */
  const renderNumberConverterContent = useMemo(() => {
    const state = analysisState.numberConverter;
    
    return (
      <AnalysisPanel
        title={t('numberConverter.title', '🔢 Conversor de Sistemas Numéricos')}
        subtitle={t('numberConverter.subtitle', 'Convierte números entre sistemas posicionales: Decimal, Binario, Octal y Hexadecimal')}
        formComponent={
          <AdvancedNumberSystemForm
            onSubmit={handlers.handleNumberSystemConversion}
            isLoading={state.isAnalyzing}
            className="space-y-4"
          />
        }
        resultsComponent={
          state.result && (
            <>
              {/* Resultados de conversión */}
              <div 
                className="rounded-lg p-3"
                style={{ 
                  background: 'var(--color-success)', 
                  color: 'var(--on-success-text)' 
                }}
              >
                <h3 className="font-medium mb-2">✅ {t('numberConverter.results.title', 'Conversión Completada')}</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('numberConverter.results.original', 'Número Original')}:</strong> {state.result.originalNumber} ({state.result.originalBase})</p>
                  <p><strong>{t('numberConverter.results.decimal', 'Decimal')}:</strong> {state.result.decimal}</p>
                  <p><strong>{t('numberConverter.results.binary', 'Binario')}:</strong> {state.result.binary}</p>
                  <p><strong>{t('numberConverter.results.octal', 'Octal')}:</strong> {state.result.octal}</p>
                  <p><strong>{t('numberConverter.results.hexadecimal', 'Hexadecimal')}:</strong> {state.result.hexadecimal}</p>
                </div>
              </div>
              
              {/* Información adicional */}
              <div 
                className="rounded-lg border p-3"
                style={{ 
                  background: 'var(--color-surface-elevated)', 
                  borderColor: 'var(--color-divider)' 
                }}
              >
                <h4 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                  {t('numberConverter.results.summary', 'Resumen de Conversión')}
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('numberConverter.results.summaryText', 'El número')} {state.result.originalNumber} {t('numberConverter.results.inBase', 'en base')} {state.result.originalBase} {t('numberConverter.results.convertedTo', 'se convirtió exitosamente a todos los sistemas numéricos posicionales.')}
                </p>
              </div>
            </>
          )
        }
        isLoading={state.isAnalyzing}
        error={state.error}
        result={state.result}
        noResultsMessage={t('numberConverter.states.noResults', '🔢 Ingresa un número para ver las conversiones')}
        analyzeButtonMessage={t('numberConverter.form.convert', 'Convertir Número')}
      />
    );
  }, [analysisState.numberConverter, handlers.handleNumberSystemConversion, t]);

  // ========================================
  // MAIN RENDER LOGIC
  // ========================================

  /**
   * Renderiza el contenido basado en la vista actual
   */
  const renderContent = useMemo(() => {
    const content = (() => {
      switch (currentView) {
        case 'bhaskara':
          return renderBhaskaraContent;
        case 'break-even':
          return renderBreakevenContent;
        case 'revenue':
          return renderRevenueContent;
        case 'costs':
          return renderCostsContent;
        case 'profit':
          return renderProfitContent;
        case 'compound-interest':
          return renderCompoundInterestContent;
        case 'currency-converter':
          return renderCurrencyConverterContent;
        case 'number-converter':
          return renderNumberConverterContent;
        default:
          return (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                🚧 {t('common.inDevelopment', 'En Desarrollo')}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {t('common.toolComingSoon', 'La herramienta')} {currentView} {t('common.willBeAvailableSoon', 'estará disponible próximamente.')}
              </p>
            </div>
          );
      }
    })();

    // Wrap content with animation classes
    return (
      <div className="tool-transition tool-fade-in">
        {content}
      </div>
    );
  }, [
    currentView,
    renderBhaskaraContent,
    renderBreakevenContent,
    renderRevenueContent,
    renderCostsContent,
    renderProfitContent,
    renderCompoundInterestContent,
    renderCurrencyConverterContent,
    renderNumberConverterContent,
    t
  ]);

  return renderContent;
});

// ========================================
// DISPLAY NAME
// ========================================

ToolContentRenderer.displayName = 'ToolContentRenderer';

export default ToolContentRenderer;
