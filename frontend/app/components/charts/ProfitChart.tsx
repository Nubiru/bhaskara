/**
 * @fileoverview Componente de gráfica para visualizar el análisis de beneficios/rentabilidad.
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Muestra una gráfica de barras comparativa y gráfica de dona para visualizar
 * la estructura financiera (ingresos vs costos) y el beneficio resultante.
 * Utiliza Chart.js y react-chartjs-2 para la visualización interactiva.
 *
 * @dependencies
 * - react-chartjs-2
 * - chart.js
 * - react-i18next
 *
 * @usage
 * <ProfitChart 
 *   ingresoTotal={15000} 
 *   costoTotal={12000} 
 *   analysisResult={result}
 *   showDonutChart={true}
 * />
 *
 * @state
 * ✅ Funcional - Gráfica interactiva con comparación financiera
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: MEDIUM] Agregar animaciones de transición
 * - [PRIORITY: LOW] Implementar modo de comparación histórica
 * - [PRIORITY: LOW] Añadir opciones de exportación de gráfica
 * - [PRIORITY: MEDIUM] Integrar proyecciones de tendencias
 *
 * @performance
 * - Memoización de datos y opciones para evitar re-renders innecesarios.
 * - Uso eficiente de Chart.js con registro selectivo de componentes.
 * - Cálculos optimizados para datasets complejos.
 * - Renderizado condicional de elementos costosos.
 *
 * @accessibility
 * - `aria-label` descriptivo para la gráfica.
 * - Colores con buen contraste y patterns diferenciados.
 * - Tooltips informativos y descriptivos.
 * - Indicadores visuales para diferentes estados de rentabilidad.
 */

import { memo, useMemo } from 'react';
import { chartTheme, transparent } from './utils/chartColors';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from 'react-i18next';
import type { ProfitAnalysisResult } from '../../types/business';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ProfitChartProps {
  ingresoTotal: number;
  costoTotal: number;
  analysisResult: ProfitAnalysisResult;
  height?: number;
  showDonutChart?: boolean;
  showComparison?: boolean;
  className?: string;
}

const ProfitChart = memo<ProfitChartProps>(({
  ingresoTotal,
  costoTotal,
  analysisResult,
  height = 400,
  showDonutChart = true,
  showComparison = true,
  className = '',
}) => {
  const { t } = useTranslation();

  // Calculate derived values
  const profit = ingresoTotal - costoTotal;
  const profitMargin = ingresoTotal > 0 ? (profit / ingresoTotal) * 100 : 0;

  // Bar chart data for comparison
  const barChartData = useMemo(() => {
    const theme = chartTheme();
    const revenueColor = transparent(theme.success, 0.8);
    const costColor = transparent(theme.error, 0.8);
    const profitColor = profit >= 0 ? transparent(theme.info, 0.8) : transparent(theme.error, 0.8);

    return {
      labels: [
        t('profit.chart.revenueLabel'),
        t('profit.chart.costsLabel'),
        t('profit.chart.profitLabel')
      ],
      datasets: [
        {
          label: t('profit.chart.comparisonTitle'),
          data: [ingresoTotal, costoTotal, Math.abs(profit)],
          backgroundColor: [revenueColor, costColor, profitColor],
          borderColor: [theme.success, theme.error, profit >= 0 ? theme.info : theme.error],
          borderWidth: 2,
        },
      ],
    };
  }, [ingresoTotal, costoTotal, profit, t]);

  // Donut chart data for breakdown
  const donutChartData = useMemo(() => {
    if (ingresoTotal === 0) return null;

    const theme = chartTheme();
    const costPercentage = (costoTotal / ingresoTotal) * 100;
    const profitPercentage = (profit / ingresoTotal) * 100;

    return {
      labels: [
        t('profit.chart.costsLabel'),
        profit >= 0 ? t('profit.chart.profitLabel') : t('profit.interpretation.loss')
      ],
      datasets: [
        {
          label: t('profit.results.breakdownTitle'),
          data: [costPercentage, Math.abs(profitPercentage)],
          backgroundColor: [transparent(theme.error, 0.8), profit >= 0 ? transparent(theme.success, 0.8) : transparent(theme.error, 0.8)],
          borderColor: [theme.error, profit >= 0 ? theme.success : theme.error],
          borderWidth: 2,
        },
      ],
    };
  }, [ingresoTotal, costoTotal, profit, t]);

  // Bar chart options
  const barChartOptions = useMemo(() => {
    const theme = chartTheme();
    return ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t('profit.chart.comparisonTitle'),
        color: theme.text,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: transparent(theme.text, 0.12),
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            const percentage = ingresoTotal > 0 ? ((value / ingresoTotal) * 100).toFixed(1) : '0';
            return `${context.label}: ${value.toFixed(2)}€ (${percentage}%)`;
          },
          afterBody: () => [
            '',
            `${t('profit.results.profitMargin')}: ${profitMargin.toFixed(2)}%`,
            profit >= 0 ? t('profit.interpretation.profitDesc') : t('profit.interpretation.lossDesc'),
          ],
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.textSecondary,
          maxRotation: 45,
        },
        grid: {
          color: theme.divider,
          drawBorder: false,
        },
      },
      y: {
        title: {
          display: true,
          text: t('profit.chart.valueAxis'),
          color: theme.textSecondary,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        ticks: {
          color: theme.textSecondary,
          callback: function(value: any) {
            return `${value.toFixed(0)}€`;
          },
        },
        grid: {
          color: theme.divider,
          drawBorder: false,
        },
        beginAtZero: true,
      },
    },
  });
  }, [t, ingresoTotal, profitMargin, profit]);

  // Donut chart options
  const donutChartOptions = useMemo(() => {
    const theme = chartTheme();
    return ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme.text,
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: t('profit.results.breakdownTitle'),
        color: theme.text,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: transparent(theme.text, 0.12),
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw;
            const absoluteValue = ingresoTotal * (value / 100);
            return `${label}: ${value.toFixed(1)}% (${absoluteValue.toFixed(2)}€)`;
          },
          afterLabel: (context: any) => {
            if (context.label === t('profit.chart.profitLabel')) {
              return profit >= 0 ? t('profit.interpretation.profitDesc') : t('profit.interpretation.lossDesc');
            }
            return '';
          },
        },
      },
    },
    cutout: '50%',
  });
  }, [t, ingresoTotal, profit]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Bar Chart - Financial Comparison */}
      {showComparison && (
        <div className="relative" style={{ height: `${height}px` }}>
          <Bar
            data={barChartData}
            options={barChartOptions}
            aria-label={`${t('profit.chart.comparisonTitle')} - ${t('profit.results.totalRevenue')}: ${ingresoTotal}€, ${t('profit.results.totalCosts')}: ${costoTotal}€, ${t('profit.results.profit')}: ${profit}€`}
          />
        </div>
      )}

      {/* Donut Chart - Percentage Breakdown */}
      {showDonutChart && donutChartData && ingresoTotal > 0 && (
        <div className="relative" style={{ height: `${height * 0.8}px` }}>
          <Doughnut
            data={donutChartData}
            options={donutChartOptions}
            aria-label={`${t('profit.results.breakdownTitle')} - ${t('profit.results.profitMargin')}: ${profitMargin.toFixed(2)}%`}
          />
        </div>
      )}

      {/* Key Metrics Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
          <div className="text-sm font-medium text-green-800 dark:text-green-200">
            {t('profit.results.totalRevenue')}
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {ingresoTotal.toFixed(2)}€
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
          <div className="text-sm font-medium text-red-800 dark:text-red-200">
            {t('profit.results.totalCosts')}
          </div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">
            {costoTotal.toFixed(2)}€
          </div>
        </div>
        <div className={`rounded-lg p-3 ${profit >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20'}`}>
          <div className={`text-sm font-medium ${profit >= 0 ? 'text-blue-800 dark:text-blue-200' : 'text-orange-800 dark:text-orange-200'}`}>
            {t('profit.results.profit')}
          </div>
          <div className={`text-lg font-bold ${profit >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
            {profit >= 0 ? '+' : ''}{profit.toFixed(2)}€
          </div>
        </div>
        <div className={`rounded-lg p-3 ${profitMargin >= 0 ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-900/20'}`}>
          <div className={`text-sm font-medium ${profitMargin >= 0 ? 'text-purple-800 dark:text-purple-200' : 'text-gray-800 dark:text-gray-200'}`}>
            {t('profit.results.profitMargin')}
          </div>
          <div className={`text-lg font-bold ${profitMargin >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {profitMargin.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
});

ProfitChart.displayName = 'ProfitChart';

export default ProfitChart;
