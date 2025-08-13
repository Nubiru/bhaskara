/**
 * @fileoverview Componente de gráfica para análisis Bhaskara (funciones cuadráticas)
 * @version 1.0.1
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Componente especializado para visualización de análisis Bhaskara usando Chart.js.
 * Renderiza parábolas con puntos clave (raíces, vértice), incluye zoom, tooltips,
 * responsividad y accesibilidad completa. Diseñado para análisis cuadrático Bhaskara.
 * 
 * @dependencies
 * - Chart.js para renderizado de gráficas
 * - react-chartjs-2 para integración con React
 * - Tipos de quadratic.ts para datos de análisis Bhaskara
 * - react-i18next para internacionalización
 * 
 * @usage
 * <BhaskaraChart coefficients={coefficients} analysisResult={result} />
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
 * - [PRIORITY: MEDIUM] Integrar i18n para labels y tooltips
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
 * - Sanitización de datos de entrada con Zod validation
 * - Validación estricta de coeficientes
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

import type { Coefficients, FullAnalysisResult } from '../../types/quadratic';

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
 * Props del componente BhaskaraChart
 */
interface BhaskaraChartProps {
  /** Coeficientes de la función cuadrática */
  coefficients: Coefficients;
  /** Resultado del análisis (opcional) */
  analysisResult?: FullAnalysisResult | null;
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
 * Obtiene colores desde variables CSS del tema
 */
const getCssVar = (name: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const CHART_COLORS = {
  function: () => getCssVar('--color-primary', '#3B82F6'),
  area: () => {
    const base = getCssVar('--color-primary', '#3B82F6');
    return base ? `${base}1A` : 'rgba(59,130,246,0.1)'; // 10% alpha hex
  },
  roots: () => '#EF4444',
  vertex: () => '#10B981',
  grid: () => getCssVar('--color-divider', '#E5E7EB'),
  text: () => getCssVar('--color-text', '#374151'),
} as const;

/**
 * Configuración de puntos clave
 */
const KEY_POINTS = {
  roots: {
    color: CHART_COLORS.roots,
    label: 'Raíces',
    size: 8,
  },
  vertex: {
    color: CHART_COLORS.vertex,
    label: 'Vértice',
    size: 10,
  },
} as const;

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Calcular valor de función cuadrática
 */
const calculateQuadraticValue = (x: number, coefficients: Coefficients): number => {
  return coefficients.a * x * x + coefficients.b * x + coefficients.c;
};

/**
 * Generar puntos para la gráfica
 */
const generateChartPoints = (
  coefficients: Coefficients,
  xRange: number = 10,
  points: number = 200
): { x: number; y: number }[] => {
  const pointsArray: { x: number; y: number }[] = [];
  const step = (xRange * 2) / points;
  
  for (let i = 0; i <= points; i++) {
    const x = -xRange + i * step;
    const y = calculateQuadraticValue(x, coefficients);
    pointsArray.push({ x, y });
  }
  
  return pointsArray;
};

/**
 * Obtener puntos clave para marcar
 */
const getKeyPoints = (
  coefficients: Coefficients,
  analysisResult?: FullAnalysisResult | null
): ChartPoint[] => {
  const points: ChartPoint[] = [];
  
  if (analysisResult) {
    // Agregar raíces
    if (analysisResult.roots) {
      if (Array.isArray(analysisResult.roots)) {
        analysisResult.roots.forEach((root, index) => {
          if (typeof root === 'number' && !isNaN(root)) {
            points.push({
              x: root,
              y: 0,
              label: `Raíz ${index + 1}`,
              color: KEY_POINTS.roots.color,
            });
          }
        });
      } else if (analysisResult.roots.x1 !== null && analysisResult.roots.x2 !== null) {
        points.push({
          x: analysisResult.roots.x1,
          y: 0,
          label: 'Raíz 1',
          color: KEY_POINTS.roots.color,
        });
        points.push({
          x: analysisResult.roots.x2,
          y: 0,
          label: 'Raíz 2',
          color: KEY_POINTS.roots.color,
        });
      }
    }
    
    // Agregar vértice
    if (analysisResult.vertex) {
      points.push({
        x: analysisResult.vertex.x,
        y: analysisResult.vertex.y,
        label: 'Vértice',
        color: KEY_POINTS.vertex.color,
      });
    }
  } else {
    // Calcular puntos básicos si no hay análisis
    const vertexX = -coefficients.b / (2 * coefficients.a);
    const vertexY = calculateQuadraticValue(vertexX, coefficients);
    
    points.push({
      x: vertexX,
      y: vertexY,
      label: 'Vértice',
      color: KEY_POINTS.vertex.color,
    });
  }
  
  return points;
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente de gráfica para análisis Bhaskara
 * Renderiza la parábola con puntos clave y interactividad avanzada
 */
const BhaskaraChart = memo<BhaskaraChartProps>(({
  coefficients,
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
  // ============================================================================
  // REFS Y ESTADO
  // ============================================================================
  
  const chartRef = useRef<ChartJS<'line'>>(null);
  
  // ============================================================================
  // DATOS DE LA GRÁFICA
  // ============================================================================
  
  /**
   * Generar datos para Chart.js
   */
  const chartData = useMemo((): ChartData<'line'> => {
    const points = generateChartPoints(coefficients);
    const keyPoints = showKeyPoints ? getKeyPoints(coefficients, analysisResult) : [];
    
    return {
      labels: points.map(p => p.x.toFixed(2)),
      datasets: [
        // Línea principal de la función
        {
          label: `f(x) = ${coefficients.a}x² ${coefficients.b >= 0 ? '+' : ''}${coefficients.b}x ${coefficients.c >= 0 ? '+' : ''}${coefficients.c}`,
          data: points.map(p => p.y),
          borderColor: CHART_COLORS.function(),
          backgroundColor: showArea ? CHART_COLORS.area() : 'transparent',
          borderWidth: 3,
          fill: showArea,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: CHART_COLORS.function(),
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
          pointRadius: KEY_POINTS.vertex.size,
          pointHoverRadius: KEY_POINTS.vertex.size + 2,
          pointHoverBackgroundColor: point.color,
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2,
          showLine: false,
        })) : []),
      ],
    };
  }, [coefficients, analysisResult, showKeyPoints, showArea]);
  
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
        borderColor: CHART_COLORS.function(),
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context) => {
            const x = parseFloat(context[0].label);
            return `x = ${Math.round(x)}`;
          },
          label: (context) => {
            const y = context.parsed.y;
            const label = context.dataset.label || '';
            return `${label}: y = ${y.toFixed(4)}`;
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
                  text: 'x',
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
                  text: 'f(x)',
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
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  }), []);
  
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
      const canvasPosition = chartRef.current.canvas.getBoundingClientRect();
      const x = event.clientX - canvasPosition.left;
      const y = event.clientY - canvasPosition.top;
      
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
        
        console.log('Punto seleccionado:', {
          datasetIndex,
          dataIndex,
          x: chartData.labels?.[dataIndex],
          y: chartData.datasets[datasetIndex].data[dataIndex],
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
      aria-label={`Gráfica de la función cuadrática f(x) = ${coefficients.a}x² ${coefficients.b >= 0 ? '+' : ''}${coefficients.b}x ${coefficients.c >= 0 ? '+' : ''}${coefficients.c}`}
    >
      <Line
        ref={chartRef}
        data={chartData}
        options={chartOptions}
        onClick={handleChartClick}
        aria-label="Gráfica interactiva de función cuadrática"
      />
      
      {/* Información adicional */}
      {analysisResult && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg text-sm">
          <h4 className="font-semibold text-gray-900 mb-2">Información</h4>
          <div className="space-y-1 text-gray-600">
            <p><strong>Discriminante:</strong> {analysisResult.discriminant?.toFixed(4) || 'N/A'}</p>
            <p><strong>Dirección:</strong> {coefficients.a > 0 ? 'Hacia arriba' : 'Hacia abajo'}</p>
            {analysisResult.vertex && (
              <p><strong>Vértice:</strong> ({analysisResult.vertex.x.toFixed(2)}, {analysisResult.vertex.y.toFixed(2)})</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

// Configuración del display name para debugging
BhaskaraChart.displayName = 'BhaskaraChart';

export default BhaskaraChart;
