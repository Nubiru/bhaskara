/**
 * @fileoverview Componente de gráfica para visualizar el análisis de costos totales.
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Muestra una gráfica de barras apiladas y líneas para visualizar la estructura
 * de costos totales (fijos + variables) en función de la cantidad.
 * Utiliza Chart.js y react-chartjs-2 para la visualización interactiva.
 *
 * @dependencies
 * - react-chartjs-2
 * - chart.js
 * - react-i18next
 *
 * @usage
 * <CostChart 
 *   costosFijos={5000} 
 *   costosVariables={2.5} 
 *   cantidad={1000} 
 *   analysisResult={result} 
 * />
 *
 * @state
 * ✅ Funcional - Gráfica interactiva con datos de costos
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: MEDIUM] Mejorar la interactividad (zoom, pan)
 * - [PRIORITY: LOW] Añadir opciones de exportación de gráfica
 * - [PRIORITY: LOW] Integrar más opciones de personalización
 * - [PRIORITY: MEDIUM] Agregar gráfica de pastel para desglose
 *
 * @performance
 * - Memoización de datos y opciones para evitar re-renders innecesarios.
 * - Uso eficiente de Chart.js con registro selectivo de componentes.
 * - Cálculos optimizados para grandes datasets.
 *
 * @accessibility
 * - `aria-label` descriptivo para la gráfica.
 * - Colores con buen contraste y patterns diferenciados.
 * - Tooltips informativos y descriptivos.
 */

import { memo, useMemo } from 'react';
import { chartTheme, transparent } from './utils/chartColors';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useTranslation } from 'react-i18next';
import type { CostAnalysisResult } from '../../types/business';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CostChartProps {
  costosFijos: number;
  costosVariables: number;
  cantidad: number;
  analysisResult: CostAnalysisResult;
  height?: number;
  showKeyPoints?: boolean;
  showArea?: boolean;
  className?: string;
}

const CostChart = memo<CostChartProps>(({
  costosFijos,
  costosVariables,
  cantidad,
  analysisResult,
  height = 400,
  showKeyPoints = true,
  showArea = true,
  className = '',
}) => {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    // Generate quantity range for visualization
    const maxQuantity = Math.max(cantidad * 1.5, 100);
    const step = Math.max(Math.floor(maxQuantity / 10), 1);
    const quantities = Array.from({ length: 11 }, (_, i) => i * step);
    
    // Ensure current quantity is included
    if (!quantities.includes(cantidad)) {
      quantities.push(cantidad);
      quantities.sort((a, b) => a - b);
    }

    // Calculate costs for each quantity
    const fixedCostsData = quantities.map(() => costosFijos);
    const variableCostsData = quantities.map(q => costosVariables * q);
    const totalCostsData = quantities.map(q => costosFijos + (costosVariables * q));

    const theme = chartTheme();
    return {
      labels: quantities.map(q => `${q} ${t('costs.form.cantidadUnit')}`),
      datasets: [
        {
          label: t('costs.chart.fixedCostsLabel'),
          data: fixedCostsData,
          backgroundColor: transparent(theme.secondary, 0.8),
          borderColor: theme.secondary,
          borderWidth: 1,
          type: 'bar' as const,
          stack: 'costs',
          order: 3,
        },
        {
          label: t('costs.chart.variableCostsLabel'),
          data: variableCostsData,
          backgroundColor: transparent(theme.success, 0.8),
          borderColor: theme.success,
          borderWidth: 1,
          type: 'bar' as const,
          stack: 'costs',
          order: 2,
        },
        {
          label: t('costs.chart.totalCostsLabel'),
          data: totalCostsData,
          borderColor: theme.error,
          backgroundColor: showArea ? transparent(theme.error, 0.12) : 'transparent',
          fill: showArea,
          tension: 0.1,
          type: 'line' as const,
          pointRadius: showKeyPoints ? 4 : 2,
          pointBackgroundColor: theme.error,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          borderWidth: 3,
          order: 1,
        },
      ],
    };
  }, [costosFijos, costosVariables, cantidad, showArea, showKeyPoints, t]);

  const chartOptions = useMemo(() => {
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
          color: theme.text,
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: t('costs.chart.title'),
        color: theme.text,
        font: {
          size: 18,
          weight: 'bold' as const,
        },
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
        callbacks: {
          title: (context: any) => {
            const quantity = context[0].label;
            return `${t('costs.results.quantity')}: ${quantity}`;
          },
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value.toFixed(2)}€`;
          },
          afterBody: (context: any) => {
            if (context.length > 0) {
              const quantity = parseInt(context[0].label);
              const totalCost = costosFijos + (costosVariables * quantity);
              const unitCost = totalCost / quantity;
              return [
                '',
                `${t('costs.results.unitCost')}: ${unitCost.toFixed(2)}€`,
                `${t('costs.form.formula')}`,
              ];
            }
            return [];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t('costs.chart.quantityAxis'),
          color: theme.textSecondary,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        ticks: {
          color: theme.textSecondary,
        },
        grid: {
          color: theme.divider,
          drawBorder: false,
        },
      },
      y: {
        title: {
          display: true,
          text: t('costs.chart.costAxis'),
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
    elements: {
      point: {
        radius: showKeyPoints ? 4 : 2,
        hoverRadius: 6,
      },
      line: {
        borderWidth: 3,
      },
    },
  });
  }, [t, costosFijos, costosVariables, showKeyPoints]);

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        aria-label={`${t('costs.chart.title')} - ${t('costs.results.fixedCosts')}: ${costosFijos}€, ${t('costs.results.variableCosts')}: ${costosVariables}€/unidad`}
      />
    </div>
  );
});

CostChart.displayName = 'CostChart';

export default CostChart;
