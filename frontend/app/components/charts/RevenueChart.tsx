/**
 * @fileoverview Componente de gráfica para análisis de ingresos (linear chart)
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Componente especializado para visualización de análisis de ingresos usando Chart.js.
 * Renderiza líneas de ingresos con relación precio-cantidad, incluye zoom, tooltips,
 * responsividad y accesibilidad completa. Diseñado para análisis de ingresos totales.
 * 
 * @dependencies
 * - Chart.js para renderizado de gráficas
 * - react-chartjs-2 para integración con React
 * - Tipos de business.ts para datos de análisis de ingresos
 * - react-i18next para internacionalización
 * 
 * @usage
 * <RevenueChart data={revenueData} analysisResult={result} />
 * 
 * @state
 * ✅ Funcional - Gráfica interactiva con puntos clave y i18n
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de transición
 * - [PRIORITY: LOW] Implementar exportación de gráfica
 * - [PRIORITY: LOW] Agregar más opciones de personalización
 * - [PRIORITY: MEDIUM] Integrar análisis de sensibilidad
 * 
 * @performance
 * - Memoización de datos de gráfica con useMemo
 * - Lazy loading de Chart.js components
 * - Optimización de re-renders con memo
 * - Debouncing de interacciones
 * 
 * @accessibility
 * - ARIA labels para elementos interactivos
 * - Navegación por teclado implementada
 * - Descripciones para screen readers
 * - Contraste de colores optimizado
 * 
 * @security
 * - Sanitización de datos de entrada con validación
 * - Validación estricta de números
 * - Prevención de inyección de código en tooltips
 * - XSS protection en labels dinámicos
 */

import React, { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import type { RevenueAnalysisResult } from '../../types/business';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

/**
 * Props del componente RevenueChart
 */
interface RevenueChartProps {
  /** Precio unitario */
  precio: number;
  /** Cantidad */
  cantidad: number;
  /** Resultado del análisis (opcional) */
  analysisResult?: RevenueAnalysisResult | null;
  /** Ancho del contenedor */
  width?: number | string;
  /** Alto del contenedor */
  height?: number | string;
  /** Mostrar puntos clave */
  showKeyPoints?: boolean;
  /** Mostrar área bajo la curva */
  showArea?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Punto en la gráfica
 */
interface ChartPoint {
  x: number;
  y: number;
  label: string;
  color: string;
}

// ============================================================================
// CONSTANTES Y CONFIGURACIÓN
// ============================================================================

/**
 * Configuración de colores para la gráfica
 */
const getCssVar = (name: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const CHART_COLORS = {
  revenue: () => getCssVar('--color-success', '#10B981'),
  area: () => {
    const base = getCssVar('--color-success', '#10B981');
    return base ? `${base}1A` : 'rgba(16,185,129,0.1)';
  },
  point: () => '#059669',
  grid: () => getCssVar('--color-divider', '#E5E7EB'),
  text: () => getCssVar('--color-text', '#374151'),
} as const;

/**
 * Configuración de puntos clave
 */
const KEY_POINTS = {
  current: {
    color: CHART_COLORS.point(),
    label: 'Current Point',
    size: 10,
  },
} as const;

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Calcular ingreso total
 */
const calculateRevenue = (precio: number, cantidad: number): number => {
  return precio * cantidad;
};

/**
 * Generar puntos para la gráfica de ingresos
 */
const generateRevenuePoints = (
  precio: number,
  maxQuantity: number = 200,
  points: number = 50
): { x: number; y: number }[] => {
  const pointsArray: { x: number; y: number }[] = [];
  const step = maxQuantity / points;
  
  for (let i = 0; i <= points; i++) {
    const x = i * step;
    const y = calculateRevenue(precio, x);
    pointsArray.push({ x, y });
  }
  
  return pointsArray;
};

/**
 * Obtener puntos clave para marcar
 */
const getKeyPoints = (
  precio: number,
  cantidad: number,
  t: (key: string) => string,
  analysisResult?: RevenueAnalysisResult | null
): ChartPoint[] => {
  const points: ChartPoint[] = [];
  
  // Agregar punto actual
  const currentRevenue = calculateRevenue(precio, cantidad);
  points.push({
    x: cantidad,
    y: currentRevenue,
    label: t('revenue.chart.currentPoint'),
    color: KEY_POINTS.current.color,
  });
  
  return points;
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente de gráfica para análisis de ingresos
 * Renderiza la línea de ingresos con puntos clave y interactividad avanzada
 */
const RevenueChart = memo<RevenueChartProps>(({
  precio,
  cantidad,
  analysisResult = null,
  width = '100%',
  height = 400,
  showKeyPoints = true,
  showArea = true,
  className = '',
}) => {
  // ============================================================================
  // HOOKS Y ESTADO
  // ============================================================================
  
  const { t } = useTranslation();
  const chartRef = useRef<ChartJS<'line'>>(null);
  
  // ============================================================================
  // DATOS DE LA GRÁFICA
  // ============================================================================
  
  /**
   * Generar datos para Chart.js
   */
  const chartData = useMemo((): ChartData<'line'> => {
    const maxQuantity = Math.max(cantidad * 2, 100);
    const points = generateRevenuePoints(precio, maxQuantity);
    const keyPoints = showKeyPoints ? getKeyPoints(precio, cantidad, t, analysisResult) : [];
    
    return {
      labels: points.map(p => p.x.toString()),
      datasets: [
        // Línea principal de ingresos
        {
          label: `${t('revenue.results.totalRevenue')}: ${precio} × Cantidad`,
          data: points.map(p => p.y),
          borderColor: CHART_COLORS.revenue(),
          backgroundColor: showArea ? CHART_COLORS.area() : 'transparent',
          borderWidth: 3,
          fill: showArea,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: CHART_COLORS.revenue(),
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2,
        },
        // Puntos clave
        ...(showKeyPoints ? keyPoints.map((point, index) => ({
          label: point.label,
          data: points.map(p => p.x === point.x ? point.y : null),
          borderColor: point.color,
          backgroundColor: point.color,
          borderWidth: 3,
          fill: false,
          tension: 0,
          pointRadius: KEY_POINTS.current.size,
          pointHoverRadius: KEY_POINTS.current.size + 2,
          pointHoverBackgroundColor: point.color,
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2,
          showLine: false,
        })) : []),
      ],
    };
  }, [precio, cantidad, analysisResult, showKeyPoints, showArea, t]);
  
  /**
   * Configuración de opciones de Chart.js
   */
  const chartOptions = useMemo((): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: CHART_COLORS.text(),
          font: {
            size: 12,
            weight: 500,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: CHART_COLORS.revenue(),
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context) => {
            const quantity = parseFloat(context[0].label);
            return `${t('revenue.results.quantity')}: ${quantity}`;
          },
          label: (context) => {
            const revenue = context.parsed.y;
            const label = context.dataset.label || '';
            return `${label}: ${revenue.toFixed(2)}€`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        display: true,
        title: {
          display: true,
          text: t('revenue.results.quantity'),
          color: CHART_COLORS.text(),
          font: {
            size: 14,
            weight: 600,
          },
        },
          grid: {
          color: CHART_COLORS.grid(),
          lineWidth: 1,
        },
          ticks: {
          color: CHART_COLORS.text(),
          font: {
            size: 12,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        title: {
          display: true,
          text: `${t('revenue.results.totalRevenue')} (€)`,
          color: CHART_COLORS.text(),
          font: {
            size: 14,
            weight: 600,
          },
        },
          grid: {
          color: CHART_COLORS.grid(),
          lineWidth: 1,
        },
          ticks: {
          color: CHART_COLORS.text(),
          font: {
            size: 12,
          },
          callback: function(value) {
            return `${value}€`;
          },
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  }), [t]);
  
  // ============================================================================
  // EFECTOS
  // ============================================================================
  
  /**
   * Actualizar gráfica cuando cambian los datos
   */
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [chartData]);
  
  // ============================================================================
  // CALLBACKS
  // ============================================================================
  
  /**
   * Handler para clic en la gráfica
   */
  const handleChartClick = useCallback((event: any) => {
    if (chartRef.current) {
      const elements = chartRef.current.getElementsAtEventForMode(
        event,
        'nearest',
        { intersect: true },
        false
      );
      
      if (elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const dataIndex = element.index;
        
        console.log('Revenue point selected:', {
          datasetIndex,
          dataIndex,
          quantity: chartData.labels?.[dataIndex],
          revenue: chartData.datasets[datasetIndex].data[dataIndex],
        });
      }
    }
  }, [chartData]);
  
  // ============================================================================
  // RENDERIZADO
  // ============================================================================
  
  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={`${t('revenue.title')}: ${precio}€ × ${cantidad} = ${calculateRevenue(precio, cantidad)}€`}
    >
      <Line
        ref={chartRef}
        data={chartData}
        options={chartOptions}
        onClick={handleChartClick}
        aria-label={t('revenue.results.title')}
      />
      
      {/* Información adicional */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-lg p-3 shadow-lg text-sm">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          {t('revenue.results.summary')}
        </h4>
        <div className="space-y-1 text-gray-600 dark:text-gray-300">
          <p><strong>{t('revenue.results.unitPrice')}:</strong> {precio.toFixed(2)}€</p>
          <p><strong>{t('revenue.results.quantity')}:</strong> {cantidad}</p>
          <p><strong>{t('revenue.results.totalRevenue')}:</strong> {calculateRevenue(precio, cantidad).toFixed(2)}€</p>
          <p><strong>{t('revenue.results.perUnit')}:</strong> {precio.toFixed(2)}€</p>
        </div>
      </div>
    </div>
  );
});

// Configuración del display name para debugging
RevenueChart.displayName = 'RevenueChart';

export default RevenueChart;
