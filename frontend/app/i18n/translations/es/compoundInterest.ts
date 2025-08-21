/**
 * @fileoverview Traducciones en español para el módulo de calculadora de interés compuesto
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de calculadora de interés compuesto. Incluye formularios, resultados, 
 * validaciones y descripciones.
 * 
 * @state
 * ✅ Funcional - Traducciones completas para Calculadora de Interés Compuesto
 */

const compoundInterest = {
  // Títulos y navegación
  'compoundInterest.title': 'Calculadora de Interés Compuesto',
  'compoundInterest.subtitle': 'Calcula el crecimiento de inversiones con interés compuesto y contribuciones regulares',
  'compoundInterest.description': 'Herramienta avanzada para cálculos de interés compuesto y planificación de inversiones',

  // Formulario
  'compoundInterest.form.title': 'Datos de Inversión',
  'compoundInterest.form.subtitle': 'Ingresa el capital inicial, tasa de interés, período de tiempo y contribuciones',
  'compoundInterest.form.principalLabel': 'Capital Inicial',
  'compoundInterest.form.principalPlaceholder': 'Ej: 10000',
  'compoundInterest.form.principalDescription': 'Monto inicial de la inversión',
  'compoundInterest.form.principalUnit': '€',
  'compoundInterest.form.rateLabel': 'Tasa de Interés Anual',
  'compoundInterest.form.ratePlaceholder': 'Ej: 5.5',
  'compoundInterest.form.rateDescription': 'Tasa de interés anual como porcentaje',
  'compoundInterest.form.rateUnit': '%',
  'compoundInterest.form.timeLabel': 'Período de Tiempo',
  'compoundInterest.form.timePlaceholder': 'Ej: 10',
  'compoundInterest.form.timeDescription': 'Período de inversión en años',
  'compoundInterest.form.timeUnit': 'años',
  'compoundInterest.form.contributionsLabel': 'Contribuciones Regulares',
  'compoundInterest.form.contributionsPlaceholder': 'Ej: 500',
  'compoundInterest.form.contributionsDescription': 'Monto de contribución regular (opcional)',
  'compoundInterest.form.contributionsUnit': '€',
  'compoundInterest.form.frequencyLabel': 'Frecuencia de Contribución',
  'compoundInterest.form.frequencyPlaceholder': 'Mensual',
  'compoundInterest.form.frequencyDescription': 'Con qué frecuencia se realizan las contribuciones',
  'compoundInterest.form.frequencyUnit': '',
  'compoundInterest.form.analyze': 'Calcular Crecimiento',
  'compoundInterest.form.analyzing': 'Calculando...',
  'compoundInterest.form.calculation': 'Cálculo en Tiempo Real',

  // Resultados
  'compoundInterest.results.title': 'Análisis de Crecimiento de Inversión',
  'compoundInterest.results.summary': 'Resumen de Crecimiento',
  'compoundInterest.results.principal': 'Capital Inicial',
  'compoundInterest.results.finalAmount': 'Monto Final',
  'compoundInterest.results.interestEarned': 'Interés Ganado',
  'compoundInterest.results.totalContributions': 'Total de Contribuciones',
  'compoundInterest.results.growthRate': 'Tasa de Crecimiento',
  'compoundInterest.results.effectiveRate': 'Tasa Efectiva Anual',

  // Gráfica
  'compoundInterest.chart.title': 'Proyección de Crecimiento',
  'compoundInterest.chart.year': 'Año',
  'compoundInterest.chart.amount': 'Monto',
  'compoundInterest.chart.contributions': 'Contribuciones',
  'compoundInterest.chart.interest': 'Interés',
  'compoundInterest.chart.morePeriods': 'períodos más',

  // Estados
  'compoundInterest.states.noResults': 'Ingresa los datos de inversión para ver el análisis de crecimiento',
  'compoundInterest.states.calculating': 'Calculando crecimiento de inversión...',
  'compoundInterest.states.error': 'Error en el cálculo de interés compuesto',

  // Validación
  'compoundInterest.validation.principalRequired': 'El capital inicial es requerido',
  'compoundInterest.validation.principalMin': 'El capital inicial debe ser mayor a 0',
  'compoundInterest.validation.rateRequired': 'La tasa de interés es requerida',
  'compoundInterest.validation.rateMin': 'La tasa de interés debe ser mayor a 0',
  'compoundInterest.validation.rateMax': 'La tasa de interés debe ser menor a 100',
  'compoundInterest.validation.timeRequired': 'El período de tiempo es requerido',
  'compoundInterest.validation.timeMin': 'El período de tiempo debe ser mayor a 0',
  'compoundInterest.validation.contributionsMin': 'Las contribuciones deben ser mayores o iguales a 0',

  // Ayuda y ejemplos
  'compoundInterest.help.title': '¿Cómo funciona el interés compuesto?',
  'compoundInterest.help.step1': '1. Ingresa tu monto inicial de inversión',
  'compoundInterest.help.step2': '2. Establece la tasa de interés anual',
  'compoundInterest.help.step3': '3. Elige el período de tiempo de inversión',
  'compoundInterest.help.step4': '4. Agrega contribuciones regulares opcionales',
  'compoundInterest.help.examples': 'Ejemplos comunes',
  'compoundInterest.help.savings': 'Cuenta de ahorros: Depósitos regulares con crecimiento compuesto',
  'compoundInterest.help.investment': 'Portafolio de inversión: Capital inicial con retornos del mercado',
  'compoundInterest.help.retirement': 'Planificación de jubilación: Crecimiento compuesto a largo plazo'
} as const;

export default compoundInterest;
