/**
 * @fileoverview English translations for currency converter module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-26
 * 
 * @description
 * Contains all English translations specific to the currency converter module.
 * Includes forms, results, validations, and descriptions.
 * 
 * @state
 * 🔄 EN DESARROLLO - Traducciones para Conversor de Divisas
 */

const currencyConverter = {
  // Titles and navigation
  'currencyConverter.title': 'Currency Converter',
  'currencyConverter.subtitle': 'Convert between more than 20 currencies with real-time exchange rates',
  'currencyConverter.description': 'Advanced tool for currency conversion and exchange rate analysis',

  // Form
  'currencyConverter.form.title': 'Currency Conversion',
  'currencyConverter.form.subtitle': 'Select currencies and enter amount to convert',
  'currencyConverter.form.fromLabel': 'From Currency',
  'currencyConverter.form.fromPlaceholder': 'Select currency',
  'currencyConverter.form.fromDescription': 'Source currency to convert from',
  'currencyConverter.form.toLabel': 'To Currency',
  'currencyConverter.form.toPlaceholder': 'Select currency',
  'currencyConverter.form.toDescription': 'Target currency to convert to',
  'currencyConverter.form.amountLabel': 'Amount',
  'currencyConverter.form.amountPlaceholder': 'Ex: 100',
  'currencyConverter.form.amountDescription': 'Amount to convert',
  'currencyConverter.form.amountUnit': '',
  'currencyConverter.form.convert': 'Convert Currency',
  'currencyConverter.form.converting': 'Converting...',
  'currencyConverter.form.calculation': 'Real-time Conversion',

  // Results
  'currencyConverter.results.title': 'Conversion Results',
  'currencyConverter.results.summary': 'Conversion Summary',
  'currencyConverter.results.originalAmount': 'Original Amount',
  'currencyConverter.results.convertedAmount': 'Converted Amount',
  'currencyConverter.results.exchangeRate': 'Exchange Rate',
  'currencyConverter.results.lastUpdated': 'Last Updated',
  'currencyConverter.results.source': 'Source',

  // States
  'currencyConverter.states.noResults': 'Enter currency and amount to see conversion results',
  'currencyConverter.states.converting': 'Converting currency...',
  'currencyConverter.states.error': 'Error in currency conversion',

  // Validation
  'currencyConverter.validation.fromCurrencyRequired': 'Source currency is required',
  'currencyConverter.validation.toCurrencyRequired': 'Target currency is required',
  'currencyConverter.validation.amountRequired': 'Amount is required',
  'currencyConverter.validation.amountMin': 'Amount must be greater than 0',
  'currencyConverter.validation.amountNumber': 'Amount must be a valid number',

  // Help and examples
  'currencyConverter.help.title': 'How does currency conversion work?',
  'currencyConverter.help.step1': '1. Select the source currency',
  'currencyConverter.help.step2': '2. Choose the target currency',
  'currencyConverter.help.step3': '3. Enter the amount to convert',
  'currencyConverter.help.step4': '4. Get real-time conversion results',
  'currencyConverter.help.examples': 'Common examples',
  'currencyConverter.help.travel': 'Travel: Convert your local currency to destination currency',
  'currencyConverter.help.business': 'Business: Convert invoices and payments',
  'currencyConverter.help.investment': 'Investment: Track multi-currency portfolios'
} as const;

export default currencyConverter;
