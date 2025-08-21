/**
 * @fileoverview English translations for number system converter module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Contains all English translations specific to the number system converter module.
 * Includes forms, results, validations, and descriptions.
 * 
 * @state
 * 🔄 EN DESARROLLO - Traducciones para Conversor de Sistemas Numéricos
 */

const numberConverter = {
  // Titles and navigation
  'numberConverter.title': 'Number System Converter',
  'numberConverter.subtitle': 'Convert numbers between positional systems: Decimal, Binary, Octal and Hexadecimal',
  'numberConverter.description': 'Advanced tool for number system conversion and analysis',

  // Form
  'numberConverter.form.title': 'Number Conversion',
  'numberConverter.form.subtitle': 'Enter a number and select the target system',
  'numberConverter.form.inputLabel': 'Input Number',
  'numberConverter.form.inputPlaceholder': 'Ex: 42, 0b101010, 0o52, 0x2A',
  'numberConverter.form.inputDescription': 'Number to convert (supports decimal, binary, octal, hex)',
  'numberConverter.form.inputUnit': '',
  'numberConverter.form.targetSystemLabel': 'Target System',
  'numberConverter.form.targetSystemPlaceholder': 'Select system',
  'numberConverter.form.targetSystemDescription': 'Number system to convert to',
  'numberConverter.form.convert': 'Convert Number',
  'numberConverter.form.converting': 'Converting...',
  'numberConverter.form.calculation': 'Real-time Conversion',

  // Results
  'numberConverter.results.title': 'Conversion Results',
  'numberConverter.results.summary': 'Conversion Summary',
  'numberConverter.results.originalNumber': 'Original Number',
  'numberConverter.results.originalSystem': 'Original System',
  'numberConverter.results.convertedNumber': 'Converted Number',
  'numberConverter.results.targetSystem': 'Target System',
  'numberConverter.results.binary': 'Binary',
  'numberConverter.results.octal': 'Octal',
  'numberConverter.results.decimal': 'Decimal',
  'numberConverter.results.hexadecimal': 'Hexadecimal',

  // States
  'numberConverter.states.noResults': 'Enter a number to see conversion results',
  'numberConverter.states.converting': 'Converting number...',
  'numberConverter.states.error': 'Error in number conversion',

  // Validation
  'numberConverter.validation.inputRequired': 'Input number is required',
  'numberConverter.validation.inputValid': 'Input must be a valid number',
  'numberConverter.validation.targetSystemRequired': 'Target system is required',
  'numberConverter.validation.binaryFormat': 'Binary numbers must start with 0b',
  'numberConverter.validation.octalFormat': 'Octal numbers must start with 0o',
  'numberConverter.validation.hexFormat': 'Hexadecimal numbers must start with 0x',

  // Help and examples
  'numberConverter.help.title': 'How does number system conversion work?',
  'numberConverter.help.step1': '1. Enter a number in any supported system',
  'numberConverter.help.step2': '2. Select the target number system',
  'numberConverter.help.step3': '3. Get instant conversion results',
  'numberConverter.help.step4': '4. View all system representations',
  'numberConverter.help.examples': 'Common examples',
  'numberConverter.help.binary': 'Binary: 0b101010 = 42 in decimal',
  'numberConverter.help.octal': 'Octal: 0o52 = 42 in decimal',
  'numberConverter.help.hex': 'Hexadecimal: 0x2A = 42 in decimal'
} as const;

export default numberConverter;
