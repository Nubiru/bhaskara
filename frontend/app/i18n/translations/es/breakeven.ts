/**
 * @fileoverview Traducciones en español para el módulo de análisis de punto de equilibrio
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de análisis de punto de equilibrio empresarial. Incluye formularios, 
 * resultados, validaciones, interpretaciones y escenarios de análisis.
 * 
 * @state
 * ✅ Funcional - Traducciones completas para Break-even Analysis
 * 
 * @performance
 * - Estructura modular para mejor tree-shaking
 * - Claves organizadas por funcionalidad empresarial
 */

const breakeven = {
  // Títulos y navegación
  'breakeven.title': 'Análisis de Punto de Equilibrio',
  'breakeven.subtitle': 'Calcula el punto exacto donde los ingresos igualan los costos totales para alcanzar rentabilidad',
  'breakeven.description': 'Herramienta estratégica para determinar volúmenes mínimos de ventas y optimizar precios',

  // Formulario
  'breakeven.form.title': 'Datos de Punto de Equilibrio',
  'breakeven.form.subtitle': 'Introduce costos fijos, costos variables y precio de venta para calcular el punto de equilibrio',
  'breakeven.form.costosFijosLabel': 'Costos Fijos',
  'breakeven.form.costosFijosPlaceholder': 'Ej: 10000',
  'breakeven.form.costosFijosDescription': 'Costos que no cambian independiente del volumen de ventas (alquiler, salarios, seguros)',
  'breakeven.form.costosFijosUnit': '€',
  'breakeven.form.costoVariableLabel': 'Costo Variable Unitario',
  'breakeven.form.costoVariablePlaceholder': 'Ej: 5.50',
  'breakeven.form.costoVariableDescription': 'Costo variable por cada unidad producida o vendida (materiales, comisiones)',
  'breakeven.form.costoVariableUnit': '€/unidad',
  'breakeven.form.precioVentaLabel': 'Precio de Venta',
  'breakeven.form.precioVentaPlaceholder': 'Ej: 15.00',
  'breakeven.form.precioVentaDescription': 'Precio al cual se vende cada unidad del producto o servicio',
  'breakeven.form.precioVentaUnit': '€/unidad',
  'breakeven.form.analyze': 'Calcular Punto de Equilibrio',
  'breakeven.form.analyzing': 'Calculando...',
  'breakeven.form.calculation': 'Cálculo en Tiempo Real',
  'breakeven.form.formula': 'Punto de Equilibrio = Costos Fijos ÷ (Precio de Venta - Costo Variable)',
  'breakeven.form.marginFormula': 'Margen Contribución = Precio de Venta - Costo Variable',

  // Resultados
  'breakeven.results.title': 'Resultados del Análisis de Punto de Equilibrio',
  'breakeven.results.summary': 'Resumen del Punto de Equilibrio',
  'breakeven.results.breakevenPoint': 'Punto de Equilibrio',
  'breakeven.results.breakevenUnits': 'Unidades de Equilibrio',
  'breakeven.results.breakevenRevenue': 'Ingresos de Equilibrio',
  'breakeven.results.contributionMargin': 'Margen de Contribución',
  'breakeven.results.contributionRatio': 'Ratio de Contribución',
  'breakeven.results.fixedCosts': 'Costos Fijos',
  'breakeven.results.variableCostUnit': 'Costo Variable Unitario',
  'breakeven.results.sellingPrice': 'Precio de Venta',
  'breakeven.results.safetyMargin': 'Margen de Seguridad',
  'breakeven.results.operatingLeverage': 'Apalancamiento Operativo',

  // Interpretaciones y estados
  'breakeven.interpretation.title': 'Interpretación del Punto de Equilibrio',
  'breakeven.interpretation.belowBreakeven': 'Por debajo del punto de equilibrio - Pérdidas',
  'breakeven.interpretation.atBreakeven': 'En el punto de equilibrio - Sin ganancia ni pérdida',
  'breakeven.interpretation.aboveBreakeven': 'Por encima del punto de equilibrio - Beneficios',
  'breakeven.interpretation.negative': 'Análisis no viable - Precio menor que costo variable',

  // Estados del análisis
  'breakeven.states.noResults': 'Ingresa los datos de costos y precios para calcular el punto de equilibrio',
  'breakeven.states.calculating': 'Calculando punto de equilibrio...',
  'breakeven.states.error': 'Error en el cálculo del punto de equilibrio',
  'breakeven.states.invalid': 'Datos ingresados no permiten calcular punto de equilibrio válido',

  // Gráfica
  'breakeven.chart.title': 'Visualización del Punto de Equilibrio',
  'breakeven.chart.revenueLabel': 'Línea de Ingresos',
  'breakeven.chart.totalCostsLabel': 'Línea de Costos Totales',
  'breakeven.chart.fixedCostsLabel': 'Costos Fijos',
  'breakeven.chart.variableCostsLabel': 'Costos Variables',
  'breakeven.chart.breakevenPointLabel': 'Punto de Equilibrio',
  'breakeven.chart.profitZoneLabel': 'Zona de Beneficios',
  'breakeven.chart.lossZoneLabel': 'Zona de Pérdidas',
  'breakeven.chart.quantityAxis': 'Cantidad (unidades)',
  'breakeven.chart.valueAxis': 'Valor (€)',
  'breakeven.chart.analysisTitle': 'Análisis de Sensibilidad',

  // Escenarios y análisis avanzado
  'breakeven.scenarios.title': 'Análisis de Escenarios',
  'breakeven.scenarios.optimistic': 'Escenario Optimista',
  'breakeven.scenarios.realistic': 'Escenario Realista',
  'breakeven.scenarios.pessimistic': 'Escenario Pesimista',
  'breakeven.scenarios.priceIncrease': 'Aumento de Precio',
  'breakeven.scenarios.costReduction': 'Reducción de Costos',
  'breakeven.scenarios.volumeIncrease': 'Aumento de Volumen',

  // Validación
  'breakeven.validation.costosFijosRequired': 'Los costos fijos son requeridos',
  'breakeven.validation.costosFijosMin': 'Los costos fijos deben ser mayores a 0',
  'breakeven.validation.costoVariableRequired': 'El costo variable unitario es requerido',
  'breakeven.validation.costoVariableMin': 'El costo variable debe ser mayor o igual a 0',
  'breakeven.validation.precioVentaRequired': 'El precio de venta es requerido',
  'breakeven.validation.precioVentaMin': 'El precio de venta debe ser mayor a 0',
  'breakeven.validation.priceMustExceedVariable': 'El precio de venta debe ser mayor que el costo variable',
  'breakeven.validation.marginTooLow': 'Margen de contribución muy bajo para ser viable',

  // Métricas avanzadas
  'breakeven.metrics.title': 'Métricas de Punto de Equilibrio',
  'breakeven.metrics.daysToBreakeven': 'Días para Equilibrio',
  'breakeven.metrics.monthsToBreakeven': 'Meses para Equilibrio',
  'breakeven.metrics.cashBreakeven': 'Punto de Equilibrio de Efectivo',
  'breakeven.metrics.paybackPeriod': 'Periodo de Recuperación',
  'breakeven.metrics.scalabilityIndex': 'Índice de Escalabilidad',

  // Recomendaciones estratégicas
  'breakeven.recommendations.title': 'Recomendaciones Estratégicas',
  'breakeven.recommendations.increasePrice': 'Considera aumentar el precio de venta para reducir el punto de equilibrio',
  'breakeven.recommendations.reduceCosts': 'Busca oportunidades para reducir costos fijos o variables',
  'breakeven.recommendations.improveEfficiency': 'Mejora la eficiencia operativa para optimizar costos variables',
  'breakeven.recommendations.marketExpansion': 'Con este punto de equilibrio, evalúa estrategias de expansión',
  'breakeven.recommendations.priceOptimization': 'El margen actual permite optimización de precios',
  'breakeven.recommendations.riskAssessment': 'Punto de equilibrio alto - evalúa riesgos de mercado',

  // Análisis de sensibilidad
  'breakeven.sensitivity.title': 'Análisis de Sensibilidad',
  'breakeven.sensitivity.priceChange': 'Cambio en Precio',
  'breakeven.sensitivity.costChange': 'Cambio en Costos',
  'breakeven.sensitivity.volumeImpact': 'Impacto en Volumen',
  'breakeven.sensitivity.breakevenImpact': 'Impacto en Punto Equilibrio',
  'breakeven.sensitivity.profitImpact': 'Impacto en Beneficios',

  // Alertas y notificaciones
  'breakeven.alerts.viableAnalysis': '✅ Análisis viable - Margen de contribución positivo',
  'breakeven.alerts.lowMargin': '⚠️ Margen de contribución bajo - Revisar estrategia de precios',
  'breakeven.alerts.highBreakeven': '🚨 Punto de equilibrio alto - Evaluar reducción de costos',
  'breakeven.alerts.negativeMargin': '❌ Margen negativo - Precio no cubre costos variables',
  'breakeven.alerts.excellentMargin': '🎉 Excelente margen de contribución - Negocio escalable',

  // Ayuda y ejemplos
  'breakeven.help.title': 'Cómo usar el análisis de punto de equilibrio',
  'breakeven.help.step1': '1. Identifica y suma todos los costos fijos mensuales o anuales',
  'breakeven.help.step2': '2. Calcula el costo variable promedio por unidad',
  'breakeven.help.step3': '3. Define el precio de venta óptimo por unidad',
  'breakeven.help.step4': '4. Analiza el punto de equilibrio y planifica estrategias',
  'breakeven.help.examples': 'Ejemplos por industria',
  'breakeven.help.retail': 'Retail: Costos de tienda + inventario vs margen por producto',
  'breakeven.help.services': 'Servicios: Salarios + infraestructura vs tarifa por hora',
  'breakeven.help.manufacturing': 'Manufactura: Equipos + materiales vs precio unitario',
  'breakeven.help.restaurant': 'Restaurante: Alquiler + personal vs margen por plato',

  // Acciones
  'breakeven.actions.download': 'Descargar Análisis',
  'breakeven.actions.reset': 'Reiniciar',
  'breakeven.actions.export': 'Exportar Datos',
  'breakeven.actions.print': 'Imprimir Reporte',
  'breakeven.actions.compare': 'Comparar Escenarios',
  'breakeven.actions.sensitivity': 'Análisis de Sensibilidad',
  'breakeven.actions.forecast': 'Proyección',
};

export default breakeven;
