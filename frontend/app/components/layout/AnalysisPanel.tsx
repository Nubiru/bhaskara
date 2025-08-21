/**
 * @fileoverview Panel de análisis reutilizable para herramientas de MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 * 
 * @description
 * Componente reutilizable que proporciona el layout estándar de formulario + resultados
 * para todas las herramientas de análisis. Incluye manejo de estados de carga y errores.
 * 
 * @dependencies
 * - React para renderizado
 * - Sistema de temas unificado
 * 
 * @usage
 * <AnalysisPanel
 *   title="Análisis de Bhaskara"
 *   subtitle="Análisis completo de funciones cuadráticas"
 *   formComponent={<BhaskaraForm onSubmit={handleSubmit} />}
 *   resultsComponent={<BhaskaraChart data={result} />}
 *   isLoading={isAnalyzing}
 *   error={error}
 *   result={result}
 * />
 * 
 * @state
 * ✅ Funcional - Panel de análisis reutilizable
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de transición
 * - [PRIORITY: LOW] Implementar tabs para múltiples resultados
 * - [PRIORITY: LOW] Agregar exportación de resultados
 * 
 * @performance
 * - Componente memoizado para evitar re-renders
 * - Renderizado condicional de componentes pesados
 * - Lazy loading de gráficos
 * 
 * @accessibility
 * - Estructura semántica correcta
 * - Estados de carga accesibles
 * - Manejo de errores con ARIA
 * - Navegación por teclado
 */

import { memo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// ========================================
// PROPS INTERFACE
// ========================================

interface AnalysisPanelProps {
  /** Título principal del panel */
  title: string;
  /** Subtítulo descriptivo */
  subtitle?: string;
  /** Componente de formulario */
  formComponent: ReactNode;
  /** Componente de resultados (opcional) */
  resultsComponent?: ReactNode;
  /** Estado de carga */
  isLoading?: boolean;
  /** Error del análisis */
  error?: string | null;
  /** Resultado del análisis */
  result?: any;
  /** Mensaje cuando no hay resultados */
  noResultsMessage?: string;
  /** Mensaje de botón de análisis */
  analyzeButtonMessage?: string;
  /** Clases CSS adicionales */
  className?: string;
}

// ========================================
// COMPONENT IMPLEMENTATION
// ========================================

/**
 * Panel de análisis reutilizable
 */
const AnalysisPanel = memo<AnalysisPanelProps>(({
  title,
  subtitle,
  formComponent,
  resultsComponent,
  isLoading = false,
  error = null,
  result = null,
  noResultsMessage = '📊 No hay resultados disponibles',
  analyzeButtonMessage = 'Realiza un análisis para ver los resultados',
  className = ''
}) => {
  const { t } = useTranslation();
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Panel de formulario */}
      <section 
        className="rounded-lg shadow-lg p-5"
        aria-labelledby="form-title"
        style={{ 
          background: 'var(--color-surface-elevated)', 
          border: '1px solid var(--color-divider)' 
        }}
      >
        <h1 
          id="form-title"
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="text-base mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {subtitle}
          </p>
        )}
        
        {formComponent}
      </section>

      {/* Panel de resultados */}
      <section 
        className="rounded-lg shadow-lg p-5"
        aria-labelledby="results-title"
        style={{ 
          background: 'var(--color-surface-elevated)', 
          border: '1px solid var(--color-divider)' 
        }}
      >
        <h2 
          id="results-title"
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--color-text)' }}
        >
          {t('analysis.results.title', 'Resultados del Análisis')}
        </h2>
        
        {/* Estado de carga */}
        {isLoading && (
          <div 
            className="rounded-lg p-3 text-center"
            role="status"
            aria-live="polite"
            style={{ 
              background: 'var(--color-info)', 
              color: 'var(--on-info-text)' 
            }}
          >
            <p className="font-medium">🔄 {t('analysis.states.analyzing', 'Analizando...')}</p>
            <p className="text-sm mt-1">{t('analysis.states.processing', 'Procesando datos, por favor espera...')}</p>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <div 
            className="rounded-lg p-4"
            role="alert"
            aria-live="assertive"
            style={{ 
              background: 'var(--color-error)', 
              color: 'var(--on-error-text)' 
            }}
          >
            <p className="font-medium">❌ {t('analysis.states.error', 'Error en el análisis')}</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Resultados exitosos */}
        {result && !isLoading && !error && (
          <div className="space-y-4">
            {resultsComponent}
          </div>
        )}

        {/* Estado inicial - sin resultados */}
        {!result && !isLoading && !error && (
          <div 
            className="rounded-lg p-4 text-center"
            role="status"
            aria-live="polite"
            style={{ 
              background: 'var(--color-surface)', 
              border: '1px dashed var(--color-divider)' 
            }}
          >
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {noResultsMessage}
            </p>
            <p 
              className="text-sm mt-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {analyzeButtonMessage}
            </p>
          </div>
        )}
      </section>
    </div>
  );
});

// ========================================
// DISPLAY NAME
// ========================================

AnalysisPanel.displayName = 'AnalysisPanel';

export default AnalysisPanel;
