/**
 * @fileoverview English translations for revenue analysis module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contains all English translations specific to the revenue analysis module.
 * Includes forms, results, validations, and descriptions.
 * 
 * @state
 * ✅ Functional - Complete translations for Revenue Analysis
 */

const revenue = {
  // Titles and navigation
  'revenue.title': 'Total Revenue Analysis',
  'revenue.subtitle': 'Calculate and analyze total revenue based on price and quantity',
  'revenue.description': 'Advanced tool for detailed revenue analysis',

  // Form
  'revenue.form.title': 'Revenue Data',
  'revenue.form.subtitle': 'Enter unit price and quantity to calculate total revenue',
  'revenue.form.precioLabel': 'Unit Price',
  'revenue.form.precioPlaceholder': 'Ex: 25.50',
  'revenue.form.precioDescription': 'Price per unit of the product or service',
  'revenue.form.precioUnit': '€/unit',
  'revenue.form.cantidadLabel': 'Quantity',
  'revenue.form.cantidadPlaceholder': 'Ex: 100',
  'revenue.form.cantidadDescription': 'Total quantity of units sold',
  'revenue.form.cantidadUnit': 'units',
  'revenue.form.descriptionPlaceholder': 'Optional revenue analysis description...',
  'revenue.form.analyze': 'Analyze Revenue',
  'revenue.form.analyzing': 'Analyzing revenue...',
  'revenue.form.calculation': 'Real-time Calculation',
  'revenue.form.formula': 'Total Revenue = Unit Price × Quantity',

  // Results
  'revenue.results.title': 'Revenue Analysis Results',
  'revenue.results.summary': 'Revenue Summary',
  'revenue.results.totalRevenue': 'Total Revenue',
  'revenue.results.unitPrice': 'Unit Price',
  'revenue.results.quantity': 'Quantity',
  'revenue.results.perUnit': 'Per Unit',
  'revenue.results.total': 'Total',
  'revenue.results.formula': 'Formula',
  'revenue.results.calculation': 'Calculation',
  'revenue.results.analysisId': 'Analysis ID',
  'revenue.results.summaryText': 'The analysis shows that with a price of',
  'revenue.results.perUnit': 'per unit',
  'revenue.results.andQuantity': 'and a quantity of',
  'revenue.results.units': 'units',
  'revenue.results.totalRevenueIs': 'the total revenue is',

  // States
  'revenue.states.noResults': 'Enter price and quantity data to see revenue analysis',
  'revenue.states.calculating': 'Calculating revenue analysis...',
  'revenue.states.error': 'Error in revenue analysis',

  // Chart
  'revenue.chart.title': 'Revenue Visualization',
  'revenue.chart.revenueLabel': 'Revenue',
  'revenue.chart.priceLabel': 'Price',
  'revenue.chart.quantityLabel': 'Quantity',
  'revenue.chart.valueAxis': 'Value (€)',
  'revenue.chart.quantityAxis': 'Quantity (units)',
  'revenue.chart.revenueAxis': 'Revenue (€)',
  'revenue.chart.currentPoint': 'Current Point',

  // Validation
  'revenue.validation.precioRequired': 'Unit price is required',
  'revenue.validation.precioMin': 'Unit price must be greater than 0',
  'revenue.validation.cantidadRequired': 'Quantity is required',
  'revenue.validation.cantidadMin': 'Quantity must be greater than 0',

  // Help and examples
  'revenue.help.title': 'How does revenue analysis work?',
  'revenue.help.step1Title': 'Unit Price',
  'revenue.help.step1Description': 'Set the price per unit of your product or service',
  'revenue.help.step2Title': 'Quantity Sold',
  'revenue.help.step2Description': 'Enter the total quantity of units sold',
  'revenue.help.step3Title': 'Total Revenue',
  'revenue.help.step3Description': 'Get automatic calculation and graphical visualization',
  'revenue.help.examples': 'Typical examples',
  'revenue.help.retail': 'Retail: Price × Quantity sold',
  'revenue.help.services': 'Services: Hourly rate × Hours worked',
  'revenue.help.manufacturing': 'Manufacturing: Product price × Units produced',

  // Actions
  'revenue.actions.download': 'Download Analysis',
  'revenue.actions.reset': 'Reset',
  'revenue.actions.export': 'Export Data',
  'revenue.actions.print': 'Print Report',

  // Meta tags
  'revenue.meta.title': 'Revenue Analysis - MutualMetrics',
  'revenue.meta.description': 'Analyze total revenue based on unit price and quantity sold',
  'revenue.meta.keywords': 'revenue analysis, income calculation, business metrics, sales analysis',
  'revenue.meta.ogTitle': 'Revenue Analysis - MutualMetrics',
  'revenue.meta.ogDescription': 'Analyze total revenue based on unit price and quantity',
};

export default revenue;
