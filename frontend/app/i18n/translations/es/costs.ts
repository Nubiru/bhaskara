/**
 * @fileoverview Traducciones en español para el módulo de análisis de costos
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de análisis de costos totales. Incluye formularios, resultados, 
 * validaciones y descripciones.
 * 
 * @state
 * ✅ Funcional - Traducciones completas para Cost Analysis
 */

const costs = {
  // Títulos y navegación
  'costs.title': 'Análisis de Costos Totales',
  'costs.subtitle': 'Calcula y analiza la estructura de costos fijos y variables para optimizar la gestión empresarial',
  'costs.description': 'Herramienta avanzada para el análisis detallado de costos empresariales',

  // Formulario
  'costs.form.title': 'Datos de Costos',
  'costs.form.subtitle': 'Introduce los costos fijos y variables para realizar el análisis',
  'costs.form.costosFijosLabel': 'Costos Fijos',
  'costs.form.costosFijosPlaceholder': 'Ej: 5000',
  'costs.form.costosFijosDescription': 'Costos que no varían con el nivel de producción (alquiler, salarios base, seguros)',
  'costs.form.costosFijosUnit': '€',
  'costs.form.costosVariablesLabel': 'Costos Variables',
  'costs.form.costosVariablesPlaceholder': 'Ej: 2.50',
  'costs.form.costosVariablesDescription': 'Costo por unidad producida (materiales, mano de obra directa)',
  'costs.form.costosVariablesUnit': '€/unidad',
  'costs.form.cantidadLabel': 'Cantidad de Unidades',
  'costs.form.cantidadPlaceholder': 'Ej: 1000',
  'costs.form.cantidadDescription': 'Número de unidades a producir para el análisis',
  'costs.form.cantidadUnit': 'unidades',
  'costs.form.analyze': 'Analizar Costos',
  'costs.form.analyzing': 'Analizando...',
  'costs.form.calculation': 'Cálculo en Tiempo Real',
  'costs.form.formula': 'Costo Total = Costos Fijos + (Costos Variables × Cantidad)',

  // Resultados
  'costs.results.title': 'Resultados del Análisis',
  'costs.results.summary': 'Resumen de Costos',
  'costs.results.fixedCosts': 'Costos Fijos',
  'costs.results.variableCosts': 'Costos Variables',
  'costs.results.totalVariableCosts': 'Costos Variables Totales',
  'costs.results.totalCosts': 'Costo Total',
  'costs.results.quantity': 'Cantidad',
  'costs.results.unitCost': 'Costo por Unidad',
  'costs.results.breakdown': 'Desglose de Costos',
  'costs.results.fixedPercentage': 'Porcentaje Fijo',
  'costs.results.variablePercentage': 'Porcentaje Variable',

  // Estados
  'costs.states.noResults': 'Ingresa los datos de costos para ver el análisis detallado',
  'costs.states.calculating': 'Calculando estructura de costos...',
  'costs.states.error': 'Error en el análisis de costos',

  // Gráfica
  'costs.chart.title': 'Visualización de Estructura de Costos',
  'costs.chart.fixedCostsLabel': 'Costos Fijos',
  'costs.chart.variableCostsLabel': 'Costos Variables',
  'costs.chart.totalCostsLabel': 'Costos Totales',
  'costs.chart.quantityAxis': 'Cantidad (unidades)',
  'costs.chart.costAxis': 'Costo (€)',

  // Validación
  'costs.validation.costosFijosRequired': 'Los costos fijos son requeridos',
  'costs.validation.costosFijosMin': 'Los costos fijos deben ser mayores o iguales a 0',
  'costs.validation.costosVariablesRequired': 'Los costos variables son requeridos',
  'costs.validation.costosVariablesMin': 'Los costos variables deben ser mayores o iguales a 0',
  'costs.validation.cantidadRequired': 'La cantidad es requerida',
  'costs.validation.cantidadMin': 'La cantidad debe ser mayor a 0',

  // Ayuda y ejemplos
  'costs.help.title': 'Cómo usar el análisis de costos',
  'costs.help.stepsTitle': 'Pasos para el análisis',
  'costs.help.step1': '1. Ingresa costos fijos mensuales o anuales',
  'costs.help.step2': '2. Define el costo variable por unidad',
  'costs.help.step3': '3. Especifica la cantidad a producir',
  'costs.help.step4': '4. Analiza la estructura y distribución de costos',
  'costs.help.examples': 'Ejemplos típicos',
  'costs.help.manufacturing': 'Manufactura: Costos fijos (renta, equipo) + Variables (materiales)',
  'costs.help.services': 'Servicios: Costos fijos (salarios, oficina) + Variables (consumibles)',

  // Acciones
  'costs.actions.download': 'Descargar Análisis',
  'costs.actions.reset': 'Reiniciar',
  'costs.actions.export': 'Exportar Datos',
  'costs.actions.print': 'Imprimir Reporte',

  // Meta tags
  'costs.meta.title': 'Análisis de Costos Totales - MutualMetrics',
  'costs.meta.description': 'Herramienta avanzada para análisis de costos fijos y variables empresariales',
  'costs.meta.keywords': 'costos, análisis empresarial, costos fijos, costos variables, gestión empresarial',
  'costs.meta.ogTitle': 'Análisis de Costos Totales - MutualMetrics',
  'costs.meta.ogDescription': 'Analiza la estructura de costos de tu empresa',
};

export default costs;
