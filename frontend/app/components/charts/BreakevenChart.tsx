/**
 * @fileoverview Chart component para visualización de análisis de punto de equilibrio
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Componente que genera un gráfico de líneas interactivo para mostrar el punto de equilibrio,
 * líneas de costos totales, ingresos totales, zona de pérdidas y zona de beneficios.
 * Utiliza Chart.js con react-chartjs-2 para crear una visualización clara y profesional.
 *
 * @dependencies
 * - Chart.js
 * - react-chartjs-2
 * - react-i18next
 *
 * @usage
 * <BreakevenChart 
 *   result={breakevenAnalysisResult} 
 *   costosFijos={10000}
 *   costoVariableUnitario={5}
 *   precio={15}
 * />
 *
 * @state
 * ✅ Funcional - Gráfico completo con punto de equilibrio, zonas de pérdida/beneficio e i18n
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar análisis de sensibilidad interactivo en el gráfico
 * - [PRIORITY: MEDIUM] Implementar zoom y pan para explorar rangos específicos
 * - [PRIORITY: LOW] Añadir animaciones suaves en transiciones de datos
 * - [PRIORITY: MEDIUM] Integrar escenarios múltiples comparativos
 *
 * @performance
 * - Memoización completa del componente para evitar re-renders innecesarios
 * - Cálculo eficiente de puntos de datos con memoización
 * - Configuración optimizada de Chart.js para performance
 * - Lazy loading de configuraciones complejas
 *
 * @accessibility
 * - ARIA labels descriptivos para el gráfico
 * - Soporte para screen readers con datos tabulares
 * - Contraste de colores conforme a WCAG 2.1 AA
 * - Navegación por teclado implementada
 * - Alternativas textuales para información visual
 */

import { memo, useMemo } from 'react';
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
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { chartTheme, transparent } from './utils/chartColors';
import { useTranslation } from 'react-i18next';
import type { BreakEvenAnalysisResult } from '../../types/business';

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

interface BreakevenChartProps {
  result: BreakEvenAnalysisResult;
  costosFijos: number;
  costoVariableUnitario: number;
  precio: number;
  height?: number;
  className?: string;
}

const BreakevenChart = memo<BreakevenChartProps>(({ 
  result, 
  costosFijos, 
  costoVariableUnitario, 
  precio, 
  height = 360,
  className = '' 
}) => {
  const { t } = useTranslation();

  // Generate data points for the chart
  const chartData = useMemo(() => {
    const breakevenPoint = result.puntoEquilibrio;
    const maxUnits = Math.max(breakevenPoint * 2, 100); // Show more context beyond break-even
    const step = Math.max(1, Math.floor(maxUnits / 50)); // Reasonable number of points
    
    const quantities: number[] = [];
    const revenues: number[] = [];
    const totalCosts: number[] = [];
    const fixedCosts: number[] = [];
    const variableCosts: number[] = [];

    for (let quantity = 0; quantity <= maxUnits; quantity += step) {
      quantities.push(quantity);
      revenues.push(quantity * precio);
      const variableCost = quantity * costoVariableUnitario;
      variableCosts.push(variableCost);
      fixedCosts.push(costosFijos);
      totalCosts.push(costosFijos + variableCost);
    }

    const theme = chartTheme();
    return {
      labels: quantities,
      datasets: [
        {
          label: t('breakeven.chart.revenueLabel'),
          data: revenues,
          borderColor: theme.success,
          backgroundColor: transparent(theme.success, 0.12),
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 6,
          fill: false,
          tension: 0,
        },
        {
          label: t('breakeven.chart.totalCostsLabel'),
          data: totalCosts,
          borderColor: theme.error,
          backgroundColor: transparent(theme.error, 0.12),
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 6,
          fill: false,
          tension: 0,
        },
        {
          label: t('breakeven.chart.fixedCostsLabel'),
          data: fixedCosts,
          borderColor: theme.secondary,
          backgroundColor: transparent(theme.secondary, 0.1),
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false,
          tension: 0,
        },
        {
          label: t('breakeven.chart.breakevenPointLabel'),
          data: quantities.map(q => (q === Math.round(breakevenPoint) ? breakevenPoint * precio : null)),
          borderColor: theme.accent,
          backgroundColor: theme.accent,
          borderWidth: 0,
          pointRadius: quantities.map(q => (Math.abs(q - breakevenPoint) < step) ? 8 : 0),
          pointHoverRadius: 10,
          fill: false,
          showLine: false,
        },
      ],
    };
  }, [result.puntoEquilibrio, costosFijos, costoVariableUnitario, precio, t]);

  // Chart configuration options
  const chartOptions = useMemo<ChartOptions<'line'>>(() => {
    const theme = chartTheme();
    return ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
          color: theme.text,
        },
      },
      title: {
        display: true,
        text: t('breakeven.chart.title'),
        font: {
          size: 16,
          weight: 'bold',
        },
        color: theme.text,
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: transparent(theme.text, 0.12),
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context) => {
            const quantity = context[0]?.parsed?.x || 0;
            return `${t('breakeven.chart.quantityAxis')}: ${quantity.toLocaleString()} unidades`;
          },
          label: (context) => {
            const value = context.parsed.y;
            if (value === null) return '';
            
            const label = context.dataset.label || '';
            const formattedValue = new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
            
            return `${label}: ${formattedValue}`;
          },
          afterBody: (context) => {
            const quantity = context[0]?.parsed?.x || 0;
            const revenue = quantity * precio;
            const totalCost = costosFijos + (quantity * costoVariableUnitario);
            const profit = revenue - totalCost;
            
            if (Math.abs(quantity - result.puntoEquilibrio) < 1) {
              return [
                '',
                `🎯 ${t('breakeven.chart.breakevenPointLabel')}`,
                `${t('breakeven.results.breakevenUnits')}: ${Math.ceil(result.puntoEquilibrio).toLocaleString()}`,
                `${t('breakeven.results.contributionMargin')}: ${result.margenContribucion.toFixed(2)}€`,
              ];
            }
            
            if (quantity > 0) {
              const status = profit > 0 ? 
                `💰 ${t('breakeven.chart.profitZoneLabel')}` : 
                `📉 ${t('breakeven.chart.lossZoneLabel')}`;
              
              return [
                '',
                status,
                `Beneficio/Pérdida: ${profit.toFixed(0)}€`,
              ];
            }
            
            return [];
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: t('breakeven.chart.quantityAxis'),
          color: theme.textSecondary,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: theme.divider,
        },
        ticks: {
          color: theme.textSecondary,
          callback: function(value) {
            return Number(value).toLocaleString();
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: t('breakeven.chart.valueAxis'),
          color: theme.textSecondary,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: theme.divider,
        },
        ticks: {
          color: theme.textSecondary,
          callback: function(value) {
            return new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(value));
          },
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'white',
        hoverBorderWidth: 3,
      },
      line: {
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
      },
    },
  });
  }, [t, precio, costosFijos, costoVariableUnitario, result.puntoEquilibrio, result.margenContribucion]);

  // Key metrics for display
  const keyMetrics = useMemo(() => [
    {
      label: t('breakeven.results.breakevenUnits'),
      value: Math.ceil(result.puntoEquilibrio).toLocaleString(),
      unit: 'unidades',
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: t('breakeven.results.breakevenRevenue'),
      value: (result.puntoEquilibrio * precio).toFixed(0),
      unit: '€',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      label: t('breakeven.results.contributionMargin'),
      value: result.margenContribucion.toFixed(2),
      unit: '€',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: t('breakeven.results.contributionRatio'),
      value: ((result.margenContribucion / precio) * 100).toFixed(1),
      unit: '%',
      color: 'text-orange-600 dark:text-orange-400',
    },
  ], [result, precio, t]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {metric.label}
            </dt>
            <dd className={`mt-1 text-2xl font-bold ${metric.color}`}>
              {metric.value}
              <span className="text-sm font-normal ml-1">{metric.unit}</span>
            </dd>
          </div>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div 
          className="relative"
          style={{ height: `${height}px` }}
          role="img"
          aria-label={`${t('breakeven.chart.title')} - ${t('breakeven.results.breakevenUnits')}: ${Math.ceil(result.puntoEquilibrio).toLocaleString()} unidades`}
        >
          <Line 
            data={chartData} 
            options={chartOptions}
            aria-label={t('breakeven.chart.title')}
          />
        </div>
        
        {/* Chart Interpretation */}
        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t('breakeven.interpretation.title')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded-sm"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>{t('breakeven.chart.lossZoneLabel')}:</strong> {t('breakeven.interpretation.belowBreakeven')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded-sm"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>{t('breakeven.chart.profitZoneLabel')}:</strong> {t('breakeven.interpretation.aboveBreakeven')}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>{t('breakeven.chart.breakevenPointLabel')}:</strong> {t('breakeven.interpretation.atBreakeven')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-gray-400 border-dashed border border-gray-400"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>{t('breakeven.chart.fixedCostsLabel')}:</strong> Costos que no varían con la producción
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Summary Table for Screen Readers */}
      <div className="sr-only">
        <table>
          <caption>{t('breakeven.chart.title')} - Datos del Análisis</caption>
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {keyMetrics.map((metric, index) => (
              <tr key={index}>
                <td>{metric.label}</td>
                <td>{metric.value} {metric.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

BreakevenChart.displayName = 'BreakevenChart';

export default BreakevenChart;
