/**
 * @fileoverview Traducciones en español para el módulo de conversor de sistemas numéricos
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de conversor de sistemas numéricos. Incluye formularios, resultados, 
 * validaciones y descripciones.
 * 
 * @state
 * 🔄 EN DESARROLLO - Traducciones para Conversor de Sistemas Numéricos
 */

const numberConverter = {
  // Títulos y navegación
  'numberConverter.title': 'Conversor de Sistemas Numéricos',
  'numberConverter.subtitle': 'Convierte números entre sistemas posicionales: Decimal, Binario, Octal y Hexadecimal',
  'numberConverter.description': 'Herramienta avanzada para conversión de sistemas numéricos y análisis',

  // Formulario
  'numberConverter.form.title': 'Conversión de Números',
  'numberConverter.form.subtitle': 'Ingresa un número y selecciona el sistema objetivo',
  'numberConverter.form.inputLabel': 'Número de Entrada',
  'numberConverter.form.inputPlaceholder': 'Ej: 42, 0b101010, 0o52, 0x2A',
  'numberConverter.form.inputDescription': 'Número a convertir (soporta decimal, binario, octal, hex)',
  'numberConverter.form.inputUnit': '',
  'numberConverter.form.targetSystemLabel': 'Sistema Objetivo',
  'numberConverter.form.targetSystemPlaceholder': 'Selecciona sistema',
  'numberConverter.form.targetSystemDescription': 'Sistema numérico al que convertir',
  'numberConverter.form.convert': 'Convertir Número',
  'numberConverter.form.converting': 'Convirtiendo...',
  'numberConverter.form.calculation': 'Conversión en Tiempo Real',

  // Resultados
  'numberConverter.results.title': 'Resultados de Conversión',
  'numberConverter.results.summary': 'Resumen de Conversión',
  'numberConverter.results.originalNumber': 'Número Original',
  'numberConverter.results.originalSystem': 'Sistema Original',
  'numberConverter.results.convertedNumber': 'Número Convertido',
  'numberConverter.results.targetSystem': 'Sistema Objetivo',
  'numberConverter.results.binary': 'Binario',
  'numberConverter.results.octal': 'Octal',
  'numberConverter.results.decimal': 'Decimal',
  'numberConverter.results.hexadecimal': 'Hexadecimal',

  // Estados
  'numberConverter.states.noResults': 'Ingresa un número para ver los resultados de conversión',
  'numberConverter.states.converting': 'Convirtiendo número...',
  'numberConverter.states.error': 'Error en la conversión de números',

  // Validación
  'numberConverter.validation.inputRequired': 'El número de entrada es requerido',
  'numberConverter.validation.inputValid': 'La entrada debe ser un número válido',
  'numberConverter.validation.targetSystemRequired': 'El sistema objetivo es requerido',
  'numberConverter.validation.binaryFormat': 'Los números binarios deben comenzar con 0b',
  'numberConverter.validation.octalFormat': 'Los números octales deben comenzar con 0o',
  'numberConverter.validation.hexFormat': 'Los números hexadecimales deben comenzar con 0x',

  // Ayuda y ejemplos
  'numberConverter.help.title': '¿Cómo funciona la conversión de sistemas numéricos?',
  'numberConverter.help.step1': '1. Ingresa un número en cualquier sistema soportado',
  'numberConverter.help.step2': '2. Selecciona el sistema numérico objetivo',
  'numberConverter.help.step3': '3. Obtén resultados de conversión instantáneos',
  'numberConverter.help.step4': '4. Visualiza todas las representaciones del sistema',
  'numberConverter.help.examples': 'Ejemplos comunes',
  'numberConverter.help.binary': 'Binario: 0b101010 = 42 en decimal',
  'numberConverter.help.octal': 'Octal: 0o52 = 42 en decimal',
  'numberConverter.help.hex': 'Hexadecimal: 0x2A = 42 en decimal'
} as const;

export default numberConverter;
