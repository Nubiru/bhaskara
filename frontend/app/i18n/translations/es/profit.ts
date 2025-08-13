/**
 * @fileoverview Traducciones en español para el módulo de análisis de beneficios
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de análisis de beneficios/rentabilidad. Incluye formularios, resultados, 
 * validaciones, interpretaciones y métricas empresariales.
 * 
 * @state
 * ✅ Funcional - Traducciones completas para Profit Analysis
 * 
 * @performance
 * - Estructura modular para mejor tree-shaking
 * - Claves organizadas por funcionalidad
 */

const profit = {
  // Títulos y navegación
  'profit.title': 'Análisis de Beneficios',
  'profit.subtitle': 'Calcula y analiza la rentabilidad empresarial comparando ingresos totales con costos totales',
  'profit.description': 'Herramienta avanzada para el análisis detallado de rentabilidad y márgenes de beneficio',

  // Formulario
  'profit.form.title': 'Datos de Rentabilidad',
  'profit.form.subtitle': 'Introduce los ingresos y costos totales para calcular el beneficio',
  'profit.form.ingresoTotalLabel': 'Ingreso Total',
  'profit.form.ingresoTotalPlaceholder': 'Ej: 15000',
  'profit.form.ingresoTotalDescription': 'Ingresos totales obtenidos por ventas, servicios o actividades comerciales',
  'profit.form.ingresoTotalUnit': '€',
  'profit.form.costoTotalLabel': 'Costo Total',
  'profit.form.costoTotalPlaceholder': 'Ej: 12000',
  'profit.form.costoTotalDescription': 'Suma de todos los costos fijos y variables del periodo analizado',
  'profit.form.costoTotalUnit': '€',
  'profit.form.analyze': 'Analizar Beneficios',
  'profit.form.analyzing': 'Analizando...',
  'profit.form.calculation': 'Cálculo en Tiempo Real',
  'profit.form.formula': 'Beneficio = Ingreso Total - Costo Total',
  'profit.form.marginFormula': 'Margen de Beneficio = (Beneficio / Ingreso Total) × 100',

  // Resultados
  'profit.results.title': 'Resultados del Análisis de Beneficios',
  'profit.results.summary': 'Resumen de Rentabilidad',
  'profit.results.totalRevenue': 'Ingreso Total',
  'profit.results.totalCosts': 'Costo Total',
  'profit.results.profit': 'Beneficio',
  'profit.results.profitMargin': 'Margen de Beneficio',
  'profit.results.roi': 'Retorno de Inversión (ROI)',
  'profit.results.profitability': 'Rentabilidad',
  'profit.results.breakdownTitle': 'Desglose Financiero',
  'profit.results.revenuePercentage': 'Porcentaje de Ingresos',
  'profit.results.costPercentage': 'Porcentaje de Costos',
  'profit.results.profitPercentage': 'Porcentaje de Beneficio',

  // Interpretaciones de resultados
  'profit.interpretation.profit': 'Ganancia',
  'profit.interpretation.loss': 'Pérdida',
  'profit.interpretation.breakeven': 'Punto de Equilibrio',
  'profit.interpretation.profitDesc': 'La empresa genera beneficios positivos',
  'profit.interpretation.lossDesc': 'La empresa tiene pérdidas que requieren atención',
  'profit.interpretation.breakevenDesc': 'La empresa está en equilibrio financiero',

  // Clasificación de márgenes
  'profit.margin.excellent': 'Excelente',
  'profit.margin.good': 'Bueno',
  'profit.margin.average': 'Promedio',
  'profit.margin.poor': 'Deficiente',
  'profit.margin.critical': 'Crítico',

  // Estados
  'profit.states.noResults': 'Ingresa los datos financieros para ver el análisis de beneficios',
  'profit.states.calculating': 'Calculando análisis de rentabilidad...',
  'profit.states.error': 'Error en el análisis de beneficios',

  // Gráfica
  'profit.chart.title': 'Visualización de Análisis de Beneficios',
  'profit.chart.revenueLabel': 'Ingresos',
  'profit.chart.costsLabel': 'Costos',
  'profit.chart.profitLabel': 'Beneficio',
  'profit.chart.marginLabel': 'Margen (%)',
  'profit.chart.comparisonTitle': 'Comparación Financiera',
  'profit.chart.trendTitle': 'Tendencia de Beneficios',
  'profit.chart.valueAxis': 'Valor (€)',
  'profit.chart.percentageAxis': 'Porcentaje (%)',

  // Validación
  'profit.validation.ingresoTotalRequired': 'El ingreso total es requerido',
  'profit.validation.ingresoTotalMin': 'El ingreso total debe ser mayor o igual a 0',
  'profit.validation.ingresoTotalNumber': 'El ingreso total debe ser un número válido',
  'profit.validation.costoTotalRequired': 'El costo total es requerido',
  'profit.validation.costoTotalMin': 'El costo total debe ser mayor o igual a 0',
  'profit.validation.costoTotalNumber': 'El costo total debe ser un número válido',
  'profit.validation.costoExceedsRevenue': 'Advertencia: Los costos superan los ingresos',

  // Métricas avanzadas
  'profit.metrics.title': 'Métricas de Rentabilidad',
  'profit.metrics.grossMargin': 'Margen Bruto',
  'profit.metrics.netMargin': 'Margen Neto',
  'profit.metrics.operatingRatio': 'Ratio Operativo',
  'profit.metrics.efficiency': 'Eficiencia Operativa',
  'profit.metrics.profitabilityIndex': 'Índice de Rentabilidad',

  // Recomendaciones
  'profit.recommendations.title': 'Recomendaciones Estratégicas',
  'profit.recommendations.increaseRevenue': 'Considera estrategias para incrementar ingresos',
  'profit.recommendations.reduceCosts': 'Evalúa oportunidades de reducción de costos',
  'profit.recommendations.optimizeOperations': 'Optimiza las operaciones para mejorar eficiencia',
  'profit.recommendations.investGrowth': 'Considera reinvertir beneficios para crecimiento',
  'profit.recommendations.urgentAction': 'Se requiere acción inmediata para corregir pérdidas',

  // Ayuda y ejemplos
  'profit.help.title': 'Cómo usar el análisis de ganancias',
  'profit.help.stepsTitle': 'Pasos para el análisis',
  'profit.help.step1': '1. Ingresa datos de ingresos y costos',
  'profit.help.step2': '2. Calcula márgenes y ratios de ganancia',
  'profit.help.step3': '3. Analiza tendencias de rentabilidad',
  'profit.help.step4': '4. Analiza las recomendaciones estratégicas',
  'profit.help.examples': 'Ejemplos de uso',
  'profit.help.retail': 'Retail: Optimización de precios y gestión de inventario',
  'profit.help.services': 'Servicios: Estrategias de precios y control de costos',
  'profit.help.manufacturing': 'Manufactura: Eficiencia de producción y reducción de costos',

  // Alertas y notificaciones
  'profit.alerts.highProfit': '🎉 Excelente rentabilidad - considera estrategias de crecimiento',
  'profit.alerts.lowProfit': '⚠️ Margen bajo - revisa estrategias de optimización',
  'profit.alerts.loss': '🚨 Pérdidas detectadas - requiere atención inmediata',
  'profit.alerts.breakeven': 'ℹ️ En punto de equilibrio - evalúa oportunidades de mejora',

  // Acciones
  'profit.actions.download': 'Descargar Análisis',
  'profit.actions.reset': 'Reiniciar',
  'profit.actions.export': 'Exportar Datos',
  'profit.actions.print': 'Imprimir Reporte',
  'profit.actions.compare': 'Comparar Periodos',
  'profit.actions.forecast': 'Proyección',

  // Meta tags
  'profit.meta.title': 'Análisis de Beneficios - MutualMetrics',
  'profit.meta.description': 'Herramienta avanzada para análisis de rentabilidad y beneficios empresariales',
  'profit.meta.keywords': 'beneficios, análisis de rentabilidad, margen de beneficio, ROI, análisis financiero',
  'profit.meta.ogTitle': 'Análisis de Beneficios - MutualMetrics',
  'profit.meta.ogDescription': 'Analiza la rentabilidad y beneficios de tu empresa',
};

export default profit;
