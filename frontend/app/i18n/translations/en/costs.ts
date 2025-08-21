/**
 * @fileoverview English translations for cost analysis module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contains all English translations specific to the total cost analysis module.
 * Includes forms, results, validations, and descriptions.
 * 
 * @state
 * ✅ Functional - Complete translations for Cost Analysis
 */

const costs = {
  // Titles and navigation
  'costs.title': 'Total Cost Analysis',
  'costs.subtitle': 'Calculate and analyze fixed and variable cost structure to optimize business management',
  'costs.description': 'Advanced tool for detailed business cost analysis',

  // Form
  'costs.form.title': 'Cost Data',
  'costs.form.subtitle': 'Enter fixed and variable costs to perform the analysis',
  'costs.form.description': 'Breakdown of fixed and variable costs for business optimization',
  'costs.form.costosFijosLabel': 'Fixed Costs',
  'costs.form.costosFijosPlaceholder': 'Ex: 5000',
  'costs.form.costosFijosDescription': 'Costs that do not vary with production level (rent, base salaries, insurance)',
  'costs.form.costosFijosUnit': '€',
  'costs.form.costosVariablesLabel': 'Variable Costs',
  'costs.form.costosVariablesPlaceholder': 'Ex: 2.50',
  'costs.form.costosVariablesDescription': 'Cost per unit produced (materials, direct labor)',
  'costs.form.costosVariablesUnit': '€/unit',
  'costs.form.cantidadLabel': 'Quantity of Units',
  'costs.form.cantidadPlaceholder': 'Ex: 1000',
  'costs.form.cantidadDescription': 'Number of units to produce for analysis',
  'costs.form.cantidadUnit': 'units',
  'costs.form.analyze': 'Analyze Costs',
  'costs.form.analyzing': 'Analyzing...',
  'costs.form.calculation': 'Real-time Calculation',
  'costs.form.formula': 'Total Cost = Fixed Costs + (Variable Costs × Quantity)',

  // Results
  'costs.results.title': 'Analysis Results',
  'costs.results.summary': 'Cost Summary',
  'costs.results.fixedCosts': 'Fixed Costs',
  'costs.results.variableCosts': 'Variable Costs',
  'costs.results.totalVariableCosts': 'Total Variable Costs',
  'costs.results.totalCosts': 'Total Cost',
  'costs.results.quantity': 'Quantity',
  'costs.results.unitCost': 'Cost per Unit',
  'costs.results.breakdown': 'Cost Breakdown',
  'costs.results.fixedPercentage': 'Fixed Percentage',
  'costs.results.variablePercentage': 'Variable Percentage',

  // States
  'costs.states.noResults': 'Enter cost data to see detailed analysis',
  'costs.states.calculating': 'Calculating cost structure...',
  'costs.states.error': 'Error in cost analysis',

  // Chart
  'costs.chart.title': 'Cost Structure Visualization',
  'costs.chart.fixedCostsLabel': 'Fixed Costs',
  'costs.chart.variableCostsLabel': 'Variable Costs',
  'costs.chart.totalCostsLabel': 'Total Costs',
  'costs.chart.quantityAxis': 'Quantity (units)',
  'costs.chart.costAxis': 'Cost (€)',

  // Validation
  'costs.validation.costosFijosRequired': 'Fixed costs are required',
  'costs.validation.costosFijosMin': 'Fixed costs must be greater than or equal to 0',
  'costs.validation.costosVariablesRequired': 'Variable costs are required',
  'costs.validation.costosVariablesMin': 'Variable costs must be greater than or equal to 0',
  'costs.validation.cantidadRequired': 'Quantity is required',
  'costs.validation.cantidadMin': 'Quantity must be greater than 0',

  // Help and examples
  'costs.help.title': 'How to use cost analysis',
  'costs.help.stepsTitle': 'Steps for analysis',
  'costs.help.step1': '1. Enter monthly or annual fixed costs',
  'costs.help.step2': '2. Define variable cost per unit',
  'costs.help.step3': '3. Specify quantity to produce',
  'costs.help.step4': '4. Analyze structure and cost distribution',
  'costs.help.examples': 'Typical examples',
  'costs.help.manufacturing': 'Manufacturing: Fixed costs (rent, equipment) + Variable (materials)',
  'costs.help.services': 'Services: Fixed costs (salaries, office) + Variable (consumables)',

  // Actions
  'costs.actions.download': 'Download Analysis',
  'costs.actions.reset': 'Reset',
  'costs.actions.export': 'Export Data',
  'costs.actions.print': 'Print Report',

  // Meta tags
  'costs.meta.title': 'Total Cost Analysis - MutualMetrics',
  'costs.meta.description': 'Advanced tool for analysis of fixed and variable business costs',
  'costs.meta.keywords': 'costs, business analysis, fixed costs, variable costs, business management',
  'costs.meta.ogTitle': 'Total Cost Analysis - MutualMetrics',
  'costs.meta.ogDescription': 'Analyze your company\'s cost structure',
};

export default costs;
