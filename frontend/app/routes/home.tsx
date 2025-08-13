/**
 * @fileoverview Página principal de análisis cuadrático
 * @version 1.0.1
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Página principal que contiene el formulario de análisis cuadrático
 * y la visualización de resultados. Punto de entrada principal de la aplicación.
 * Implementa patrones de diseño responsivo y accesibilidad completa.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * - Componentes de formulario (pendiente)
 * - Componentes de gráficos (pendiente)
 * 
 * @usage
 * Ruta principal accesible en "/"
 * 
 * @state
 * ✅ FUNCIONAL - Integración completa con backend, formulario, resultados, gráfica e historial
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de transición
 * - [PRIORITY: LOW] Implementar análisis económico como opción alternativa
 * - [PRIORITY: LOW] Agregar progress indicators durante análisis
 * 
 * @performance
 * - Lazy loading de componentes pesados (pendiente)
 * - Memoización de cálculos (pendiente)
 * - Optimización de re-renders (pendiente)
 * 
 * @accessibility
 * - Estructura semántica correcta
 * - Navegación por teclado implementada
 * - ARIA labels y roles apropiados
 * - Contraste de colores optimizado
 * 
 * @security
 * - Validación de entrada (pendiente)
 * - Sanitización de datos (pendiente)
 * - Protección contra XSS (pendiente)
 */

import { memo, useState, useCallback } from 'react';
import InfoPopover from '../components/ui/InfoPopover';
import { useTranslation } from 'react-i18next';
import type { AnalysisRequest, FullAnalysisResult } from '../types/quadratic';
import type { AnalysisApiRequest } from '../types/api';
import BhaskaraForm from '../components/forms/BhaskaraForm';
import BhaskaraChart from '../components/charts/BhaskaraChart';
import { useLocalHistory } from '../hooks/useLocalHistory';
import { apiService } from '../services/api';
import type { ApiServiceError, NetworkServiceError } from '../services/api';
import { withRetry, getErrorMessage, validateAnalysisRequest } from '../utils/api-helpers';
import { ANALYSIS_MODES } from '../constants/api';

/**
 * Configuración de meta tags para SEO y accesibilidad
 */
export function meta() {
  return [
    { title: "MutualMetrics - Quadratic Function Analysis" },
    { name: "description", content: "Free web tool for quadratic function analysis. Calculate roots, vertices, economic optima and visualize parabolas interactively." },
    { name: "keywords", content: "quadratic analysis, mathematical functions, parabolas, roots, vertex, mathematics, education" },
    { name: "author", content: "MutualMetrics Team" },
    { property: "og:title", content: "MutualMetrics - Quadratic Function Analysis" },
    { property: "og:description", content: "Free web tool for quadratic function analysis" },
    { property: "og:type", content: "website" },
  ];
}

/**
 * Props del componente HomePage
 */
interface HomePageProps {
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Página principal de análisis cuadrático
 * Contiene el formulario principal y la visualización de resultados
 * Implementa patrones de diseño responsivo y accesibilidad completa
 */
const HomePage = memo<HomePageProps>(({ className = '' }) => {
  const { t } = useTranslation();
  
  // Estado para manejo del análisis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FullAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const { addToHistory } = useLocalHistory();

  /**
   * Handler para envío del formulario de análisis
   */
  const handleAnalysisSubmit = useCallback(async (data: AnalysisRequest) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      // Validación previa
      const validationError = validateAnalysisRequest(data);
      if (validationError) {
        throw new Error(validationError);
      }

      console.log('Iniciando análisis:', data);
      
      // Construir request completo para API
      const apiRequest: AnalysisApiRequest = {
        ...data,
        timestamp: new Date().toISOString(),
        clientVersion: '1.0.0',
        sessionId: crypto.randomUUID?.() || Math.random().toString(36)
      };

      // Llamada real al backend con retry automático
      const result = await withRetry(
        () => apiService.analyzeBhaskara(apiRequest),
        { maxAttempts: 3, baseDelay: 1000 }
      );
      
      console.log('Análisis completado:', result);
      setAnalysisResult(result);
      
      // Guardar en historial local
      addToHistory(data, result);
    } catch (error) {
      console.error('Error durante análisis:', error);
      const userFriendlyMessage = getErrorMessage(error);
      setAnalysisError(userFriendlyMessage);
    } finally {
      setIsAnalyzing(false);
    }
  }, [addToHistory]);

  return (
    <div className={`min-h-screen py-6 ${className}`} style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la página */}
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            {/* Title removed per instruction; keep only info icon */}
            <InfoPopover trigger="hover" title="Cómo usar esta herramienta">
              <ol className="list-decimal list-inside space-y-1">
                <li>Ingresa los coeficientes A, B y C</li>
                <li>Selecciona el modo de análisis: Raíces, Vértice, Optimal o Completo</li>
                <li>Agrega una descripción opcional (si lo deseas)</li>
                <li>Presiona “Analizar” para ver resultados y la gráfica</li>
              </ol>
            </InfoPopover>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel de formulario */}
          <section className="rounded-lg shadow-lg p-5" aria-labelledby="form-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="form-title" className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              {t('home.formTitle')}
            </h2>
            <p className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              {t('home.formDescription')}
            </p>
            
            {/* Formulario de análisis Bhaskara */}
            <BhaskaraForm
              onSubmit={handleAnalysisSubmit}
              isLoading={isAnalyzing}
              className="space-y-6"
            />
          </section>

          {/* Panel de resultados */}
          <section className="rounded-lg shadow-lg p-5" aria-labelledby="results-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="results-title" className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              {t('home.resultsTitle')}
            </h2>
            
            {/* Visualización de resultados */}
            {isAnalyzing && (
                <div className="rounded-lg p-3 text-center" role="status" aria-live="polite" style={{ background: 'var(--color-info)', color: 'var(--on-info-text)' }}>
                <p className="font-medium">
                  🔄 {t('home.analyzing')}
                </p>
                  <p className="text-sm mt-1">
                  {t('home.analyzingDescription')}
                </p>
              </div>
            )}

            {analysisError && (
              <div className="rounded-lg p-4" role="alert" aria-live="assertive" style={{ background: 'var(--color-error)', color: 'var(--on-error-text)' }}>
                <p className="font-medium">
                  ❌ {t('home.analysisError')}
                </p>
                <p className="text-sm mt-1">
                  {analysisError}
                </p>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="space-y-4">
                {/* Resultados numéricos */}
                <div className="rounded-lg p-3" style={{ background: 'var(--color-success)', color: 'var(--on-success-text)' }}>
                  <h3 className="font-medium mb-2">✅ {t('home.analysisCompleted')}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>{t('home.equation')}:</strong> {analysisResult.equation}</p>
                    <p><strong>Discriminante:</strong> {analysisResult.discriminant.toFixed(4)}</p>
                    <p><strong>Raíces:</strong> x₁ = {analysisResult.roots.x1?.toFixed(4) || 'N/A'}, x₂ = {analysisResult.roots.x2?.toFixed(4) || 'N/A'}</p>
                    <p><strong>Vértice:</strong> ({analysisResult.vertex.x.toFixed(4)}, {analysisResult.vertex.y.toFixed(4)})</p>
                    <p><strong>Análisis ID:</strong> {analysisResult.analysisId}</p>
                  </div>
                </div>
                
                {/* Gráfica interactiva */}
                <div className="rounded-lg border p-3" style={{ background: 'var(--color-surface-elevated)', borderColor: 'var(--color-divider)' }}>
                  <h4 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text)' }}>Visualización Gráfica</h4>
                  <BhaskaraChart
                    coefficients={analysisResult.coefficients}
                    analysisResult={analysisResult}
                    height={340}
                    showKeyPoints={true}
                    showArea={true}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {!analysisResult && !isAnalyzing && !analysisError && (
              <div className="rounded-lg p-4 text-center" role="status" aria-live="polite" style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-divider)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  📊 {t('home.noResults')}
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('home.analyzeButton')}
                </p>
              </div>
            )}
          </section>
        </main>

        {/* Información adicional: movida a un popover en el header con icono */}
      </div>
    </div>
  );
});

export default HomePage;
