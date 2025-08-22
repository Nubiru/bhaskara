/**
 * @fileoverview Componente skeleton para gráficos durante carga
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Componente skeleton que se muestra mientras Chart.js se carga,
 * proporcionando una experiencia de usuario fluida y accesible.
 * 
 * @dependencies
 * - Tailwind CSS v4.1.4
 * - Sistema de temas unificado
 * 
 * @usage
 * <ChartSkeleton width={400} height={300} />
 * 
 * @state
 * ✅ Funcional - Skeleton de gráfico implementado
 * 
 * @accessibility
 * - ARIA labels apropiados
 * - Indicadores de carga claros
 * - Contraste optimizado
 * 
 * @performance
 * - Componente ligero sin dependencias externas
 * - Animaciones CSS optimizadas
 */

import React, { memo } from 'react';

/**
 * Props del componente ChartSkeleton
 */
export interface ChartSkeletonProps {
  /** Ancho del skeleton */
  width?: number | string;
  /** Alto del skeleton */
  height?: number | string;
  /** Clases CSS adicionales */
  className?: string;
  /** Tipo de gráfico para el skeleton */
  chartType?: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  /** Si mostrar texto descriptivo */
  showDescription?: boolean;
}

/**
 * Componente skeleton para gráficos
 * Muestra una representación visual del gráfico mientras se carga
 */
export const ChartSkeleton = memo<ChartSkeletonProps>(({
  width = '100%',
  height = 300,
  className = '',
  chartType = 'line',
  showDescription = true,
}) => {
  // Configuración específica por tipo de gráfico
  const chartConfig = {
    line: {
      icon: '📈',
      description: 'Gráfico de líneas',
      bars: 8,
      pattern: 'horizontal'
    },
    bar: {
      icon: '📊',
      description: 'Gráfico de barras',
      bars: 6,
      pattern: 'vertical'
    },
    pie: {
      icon: '🥧',
      description: 'Gráfico circular',
      bars: 4,
      pattern: 'circular'
    },
    doughnut: {
      icon: '🍩',
      description: 'Gráfico de anillo',
      bars: 4,
      pattern: 'circular'
    },
    area: {
      icon: '📊',
      description: 'Gráfico de área',
      bars: 8,
      pattern: 'horizontal'
    }
  };

  const config = chartConfig[chartType];

  // Renderizar skeleton según el tipo de gráfico
  const renderSkeletonContent = () => {
    if (config.pattern === 'circular') {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-full border-4 animate-pulse"
              style={{ 
                borderColor: 'var(--color-divider)',
                backgroundColor: 'var(--color-surface)'
              }}
            />
            <div 
              className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent"
              style={{ 
                borderTopColor: 'var(--color-primary)',
                transform: 'rotate(45deg)'
              }}
            />
          </div>
        </div>
      );
    }

    if (config.pattern === 'vertical') {
      return (
        <div className="flex items-end justify-center space-x-2 h-full px-4">
          {Array.from({ length: config.bars }).map((_, index) => (
            <div
              key={index}
              className="w-8 animate-pulse rounded-t"
              style={{
                height: `${Math.random() * 60 + 20}%`,
                backgroundColor: 'var(--color-divider)'
              }}
            />
          ))}
        </div>
      );
    }

    // Horizontal pattern (default)
    return (
      <div className="flex flex-col justify-center space-y-2 h-full px-4">
        {Array.from({ length: config.bars }).map((_, index) => (
          <div
            key={index}
            className="h-3 animate-pulse rounded"
            style={{
              width: `${Math.random() * 60 + 20}%`,
              backgroundColor: 'var(--color-divider)'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`chart-skeleton ${className}`}
      style={{ width, height }}
      role="status"
      aria-label={`Cargando ${config.description}`}
      aria-live="polite"
    >
      <div 
        className="w-full h-full rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center"
        style={{ 
          backgroundColor: 'var(--color-surface-elevated)',
          borderColor: 'var(--color-divider)'
        }}
      >
        {/* Icono del tipo de gráfico */}
        <div className="text-4xl mb-3 animate-bounce">
          {config.icon}
        </div>

        {/* Contenido del skeleton */}
        <div className="flex-1 w-full">
          {renderSkeletonContent()}
        </div>

        {/* Descripción */}
        {showDescription && (
          <div className="text-center mt-3">
            <p 
              className="text-sm font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              {config.description}
            </p>
            <p 
              className="text-xs opacity-75 mt-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Cargando...
            </p>
          </div>
        )}

        {/* Indicador de progreso */}
        <div className="w-full mt-3">
          <div 
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--color-divider)' }}
          >
            <div 
              className="h-full rounded-full animate-pulse"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                width: '60%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// Display name para debugging
ChartSkeleton.displayName = 'ChartSkeleton';

export default ChartSkeleton;
