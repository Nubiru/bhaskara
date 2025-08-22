/**
 * @fileoverview Componente de gráfico con lazy loading para Chart.js
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Componente de gráfico que implementa lazy loading de Chart.js para optimizar
 * el rendimiento de la aplicación. Solo carga Chart.js cuando es necesario.
 * 
 * @dependencies
 * - React 19 con Suspense
 * - Chart.js (lazy loaded)
 * - Sistema de temas unificado
 * 
 * @usage
 * <LazyChart 
 *   type="line"
 *   data={chartData}
 *   options={chartOptions}
 *   fallback={<ChartSkeleton />}
 * />
 * 
 * @state
 * ✅ Funcional - Lazy loading de Chart.js implementado
 * 
 * @performance
 * - Chart.js solo se carga cuando es necesario
 * - Suspense para manejo de estado de carga
 * - Memoización de opciones y datos
 * - Code splitting automático
 * 
 * @accessibility
 * - Fallback accesible durante carga
 * - ARIA labels para gráficos
 * - Navegación por teclado
 */

import React, { Suspense, lazy, memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import type { ChartType, ChartData, ChartOptions } from 'chart.js';

// Lazy load Chart.js components
const ChartComponent = lazy(() => import('./ChartComponent'));
const ChartSkeleton = lazy(() => import('./ChartSkeleton'));

/**
 * Props del componente LazyChart
 */
export interface LazyChartProps {
  /** Tipo de gráfico */
  type: ChartType;
  /** Datos del gráfico */
  data: ChartData;
  /** Opciones de configuración */
  options?: ChartOptions;
  /** Componente de fallback durante carga */
  fallback?: React.ReactNode;
  /** Clases CSS adicionales */
  className?: string;
  /** ID único para el gráfico */
  id?: string;
  /** Callback cuando el gráfico está listo */
  onChartReady?: (chart: any) => void;
  /** Callback para errores */
  onError?: (error: Error) => void;
  /** Ancho del gráfico */
  width?: number | string;
  /** Alto del gráfico */
  height?: number | string;
  /** Si el gráfico debe ser responsive */
  responsive?: boolean;
  /** Si el gráfico debe mantener aspect ratio */
  maintainAspectRatio?: boolean;
}

/**
 * Componente de gráfico con lazy loading
 * Implementa Suspense para carga diferida de Chart.js
 */
export const LazyChart = memo<LazyChartProps>(({
  type,
  data,
  options = {},
  fallback = <ChartSkeleton />,
  className = '',
  id,
  onChartReady,
  onError,
  width,
  height,
  responsive = true,
  maintainAspectRatio = true,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Memoizar opciones para evitar re-renders innecesarios
  const memoizedOptions = useMemo(() => ({
    responsive,
    maintainAspectRatio,
    ...options,
  }), [responsive, maintainAspectRatio, options]);

  // Memoizar datos para evitar re-renders innecesarios
  const memoizedData = useMemo(() => data, [data]);

  // Manejar errores de carga
  const handleError = useCallback((error: Error) => {
    setHasError(true);
    setError(error);
    onError?.(error);
  }, [onError]);

  // Limpiar gráfico al desmontar
  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  // Manejar cuando el gráfico está listo
  const handleChartReady = useCallback((chart: any) => {
    setChartInstance(chart);
    onChartReady?.(chart);
  }, [onChartReady]);

  // Si hay error, mostrar mensaje de error
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center p-8 border-2 border-dashed rounded-lg ${className}`}
        style={{ 
          backgroundColor: 'var(--color-surface-elevated)',
          borderColor: 'var(--color-error)',
          color: 'var(--color-error)'
        }}
        role="alert"
        aria-live="polite"
      >
        <div className="text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <h3 className="font-semibold mb-2">Error al cargar el gráfico</h3>
          <p className="text-sm opacity-75">
            {error?.message || 'No se pudo cargar Chart.js'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 text-sm rounded-md transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`chart-container ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={`Gráfico de tipo ${type}`}
    >
      <Suspense fallback={fallback}>
        <ChartComponent
          ref={chartRef}
          type={type}
          data={memoizedData}
          options={memoizedOptions}
          id={id}
          onChartReady={handleChartReady}
          onError={handleError}
        />
      </Suspense>
    </div>
  );
});

// Display name para debugging
LazyChart.displayName = 'LazyChart';

export default LazyChart;
