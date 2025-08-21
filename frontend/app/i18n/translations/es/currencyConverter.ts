/**
 * @fileoverview Traducciones en español para el módulo de conversor de divisas
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de conversor de divisas. Incluye formularios, resultados, 
 * validaciones y descripciones.
 * 
 * @state
 * 🔄 EN DESARROLLO - Traducciones para Conversor de Divisas
 */

const currencyConverter = {
  // Títulos y navegación
  'currencyConverter.title': 'Conversor de Divisas',
  'currencyConverter.subtitle': 'Convierte entre más de 20 monedas con tasas de cambio en tiempo real',
  'currencyConverter.description': 'Herramienta avanzada para conversión de divisas y análisis de tasas de cambio',

  // Formulario
  'currencyConverter.form.title': 'Conversión de Divisas',
  'currencyConverter.form.subtitle': 'Selecciona las monedas e ingresa el monto a convertir',
  'currencyConverter.form.fromLabel': 'Moneda de Origen',
  'currencyConverter.form.fromPlaceholder': 'Selecciona moneda',
  'currencyConverter.form.fromDescription': 'Moneda de origen para convertir',
  'currencyConverter.form.toLabel': 'Moneda de Destino',
  'currencyConverter.form.toPlaceholder': 'Selecciona moneda',
  'currencyConverter.form.toDescription': 'Moneda de destino para convertir',
  'currencyConverter.form.amountLabel': 'Monto',
  'currencyConverter.form.amountPlaceholder': 'Ej: 100',
  'currencyConverter.form.amountDescription': 'Monto a convertir',
  'currencyConverter.form.amountUnit': '',
  'currencyConverter.form.convert': 'Convertir Divisas',
  'currencyConverter.form.converting': 'Convirtiendo...',
  'currencyConverter.form.calculation': 'Conversión en Tiempo Real',

  // Resultados
  'currencyConverter.results.title': 'Resultados de Conversión',
  'currencyConverter.results.summary': 'Resumen de Conversión',
  'currencyConverter.results.originalAmount': 'Monto Original',
  'currencyConverter.results.convertedAmount': 'Monto Convertido',
  'currencyConverter.results.exchangeRate': 'Tasa de Cambio',
  'currencyConverter.results.lastUpdated': 'Última Actualización',
  'currencyConverter.results.source': 'Fuente',

  // Estados
  'currencyConverter.states.noResults': 'Ingresa la moneda y monto para ver los resultados de conversión',
  'currencyConverter.states.converting': 'Convirtiendo divisas...',
  'currencyConverter.states.error': 'Error en la conversión de divisas',

  // Validación
  'currencyConverter.validation.fromCurrencyRequired': 'La moneda de origen es requerida',
  'currencyConverter.validation.toCurrencyRequired': 'La moneda de destino es requerida',
  'currencyConverter.validation.amountRequired': 'El monto es requerido',
  'currencyConverter.validation.amountMin': 'El monto debe ser mayor a 0',
  'currencyConverter.validation.amountNumber': 'El monto debe ser un número válido',

  // Ayuda y ejemplos
  'currencyConverter.help.title': '¿Cómo funciona la conversión de divisas?',
  'currencyConverter.help.step1': '1. Selecciona la moneda de origen',
  'currencyConverter.help.step2': '2. Elige la moneda de destino',
  'currencyConverter.help.step3': '3. Ingresa el monto a convertir',
  'currencyConverter.help.step4': '4. Obtén resultados de conversión en tiempo real',
  'currencyConverter.help.examples': 'Ejemplos comunes',
  'currencyConverter.help.travel': 'Viajes: Convierte tu moneda local a la moneda del destino',
  'currencyConverter.help.business': 'Negocios: Convierte facturas y pagos',
  'currencyConverter.help.investment': 'Inversión: Rastrea portafolios multi-moneda'
} as const;

export default currencyConverter;
