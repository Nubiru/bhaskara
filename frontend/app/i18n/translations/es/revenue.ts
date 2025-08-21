/**
 * @fileoverview Traducciones en español para el módulo de análisis de ingresos
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de análisis de ingresos. Incluye formularios, resultados, validaciones y descripciones.
 * 
 * @state
 * ✅ Funcional - Traducciones completas para Análisis de Ingresos
 */

const revenue = {
  // Títulos y navegación
  'revenue.title': 'Análisis de Ingresos Totales',
  'revenue.subtitle': 'Calcula y analiza los ingresos totales basados en precio y cantidad',
  'revenue.description': 'Herramienta avanzada para análisis detallado de ingresos',

  // Formulario
  'revenue.form.title': 'Datos de Ingresos',
  'revenue.form.subtitle': 'Introduce precio unitario y cantidad para calcular ingresos totales',
  'revenue.form.precioLabel': 'Precio Unitario',
  'revenue.form.precioPlaceholder': 'Ej: 25.50',
  'revenue.form.precioDescription': 'Precio por unidad del producto o servicio',
  'revenue.form.precioUnit': '€/unidad',
  'revenue.form.cantidadLabel': 'Cantidad',
  'revenue.form.cantidadPlaceholder': 'Ej: 100',
  'revenue.form.cantidadDescription': 'Cantidad total de unidades vendidas',
  'revenue.form.cantidadUnit': 'unidades',
  'revenue.form.descriptionPlaceholder': 'Descripción opcional del análisis de ingresos...',
  'revenue.form.analyze': 'Analizar Ingresos',
  'revenue.form.analyzing': 'Analizando ingresos...',
  'revenue.form.calculation': 'Cálculo en Tiempo Real',
  'revenue.form.formula': 'Ingreso Total = Precio Unitario × Cantidad',

  // Resultados
  'revenue.results.title': 'Resultados del Análisis de Ingresos',
  'revenue.results.summary': 'Resumen de Ingresos',
  'revenue.results.totalRevenue': 'Ingreso Total',
  'revenue.results.unitPrice': 'Precio Unitario',
  'revenue.results.quantity': 'Cantidad',
  'revenue.results.perUnit': 'Por Unidad',
  'revenue.results.total': 'Total',
  'revenue.results.formula': 'Fórmula',
  'revenue.results.calculation': 'Cálculo',
  'revenue.results.analysisId': 'ID del Análisis',
  'revenue.results.summaryText': 'El análisis muestra que con un precio de',
  'revenue.results.perUnit': 'por unidad',
  'revenue.results.andQuantity': 'y una cantidad de',
  'revenue.results.units': 'unidades',
  'revenue.results.totalRevenueIs': 'el ingreso total es',

  // Estados
  'revenue.states.noResults': 'Ingresa datos de precio y cantidad para ver el análisis de ingresos',
  'revenue.states.calculating': 'Calculando análisis de ingresos...',
  'revenue.states.error': 'Error en el análisis de ingresos',

  // Gráfica
  'revenue.chart.title': 'Visualización de Ingresos',
  'revenue.chart.revenueLabel': 'Ingresos',
  'revenue.chart.priceLabel': 'Precio',
  'revenue.chart.quantityLabel': 'Cantidad',
  'revenue.chart.valueAxis': 'Valor (€)',
  'revenue.chart.quantityAxis': 'Cantidad (unidades)',
  'revenue.chart.currentPoint': 'Punto Actual',

  // Validación
  'revenue.validation.precioRequired': 'El precio unitario es requerido',
  'revenue.validation.precioMin': 'El precio unitario debe ser mayor a 0',
  'revenue.validation.cantidadRequired': 'La cantidad es requerida',
  'revenue.validation.cantidadMin': 'La cantidad debe ser mayor a 0',

  // Ayuda y ejemplos
  'revenue.help.title': '¿Cómo funciona el análisis de ingresos?',
  'revenue.help.step1Title': 'Precio Unitario',
  'revenue.help.step1Description': 'Establece el precio por unidad de tu producto o servicio',
  'revenue.help.step2Title': 'Cantidad Vendida',
  'revenue.help.step2Description': 'Introduce la cantidad total de unidades vendidas',
  'revenue.help.step3Title': 'Ingresos Totales',
  'revenue.help.step3Description': 'Obtén el cálculo automático y visualización gráfica',
  'revenue.help.examples': 'Ejemplos típicos',
  'revenue.help.retail': 'Retail: Precio × Cantidad vendida',
  'revenue.help.services': 'Servicios: Tarifa por hora × Horas trabajadas',
  'revenue.help.manufacturing': 'Manufactura: Precio del producto × Unidades producidas',

  // Acciones
  'revenue.actions.download': 'Descargar Análisis',
  'revenue.actions.reset': 'Reiniciar',
  'revenue.actions.export': 'Exportar Datos',
  'revenue.actions.print': 'Imprimir Reporte',

  // Meta tags
  'revenue.meta.title': 'Análisis de Ingresos - MutualMetrics',
  'revenue.meta.description': 'Analiza los ingresos totales basados en precio unitario y cantidad vendida',
  'revenue.meta.keywords': 'análisis de ingresos, cálculo de ingresos, métricas de negocio, análisis de ventas',
  'revenue.meta.ogTitle': 'Análisis de Ingresos - MutualMetrics',
  'revenue.meta.ogDescription': 'Analiza los ingresos totales basados en precio unitario y cantidad',
};

export default revenue;
