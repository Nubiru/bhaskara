/**
 * @fileoverview English translations for break-even analysis module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contains all English translations specific to the break-even analysis module.
 * Includes forms, results, validations, interpretations, and scenario analysis.
 * 
 * @state
 * ✅ Functional - Complete translations for Break-even Analysis
 * 
 * @performance
 * - Modular structure for better tree-shaking
 * - Keys organized by business functionality
 */

const breakeven = {
  // Titles and navigation
  'breakeven.title': 'Break-even Analysis',
  'breakeven.subtitle': 'Calculate the exact point where revenue equals total costs to achieve profitability',
  'breakeven.description': 'Strategic tool to determine minimum sales volumes and optimize pricing',

  // Form
  'breakeven.form.title': 'Break-even Data',
  'breakeven.form.subtitle': 'Enter fixed costs, variable costs, and selling price to calculate break-even point',
  'breakeven.form.costosFijosLabel': 'Fixed Costs',
  'breakeven.form.costosFijosPlaceholder': 'Ex: 10000',
  'breakeven.form.costosFijosDescription': 'Costs that do not change regardless of sales volume (rent, salaries, insurance)',
  'breakeven.form.costosFijosUnit': '€',
  'breakeven.form.costoVariableLabel': 'Variable Cost per Unit',
  'breakeven.form.costoVariablePlaceholder': 'Ex: 5.50',
  'breakeven.form.costoVariableDescription': 'Variable cost for each unit produced or sold (materials, commissions)',
  'breakeven.form.costoVariableUnit': '€/unit',
  'breakeven.form.precioVentaLabel': 'Selling Price',
  'breakeven.form.precioVentaPlaceholder': 'Ex: 15.00',
  'breakeven.form.precioVentaDescription': 'Price at which each unit of the product or service is sold',
  'breakeven.form.precioVentaUnit': '€/unit',
  'breakeven.form.analyze': 'Calculate Break-even Point',
  'breakeven.form.analyzing': 'Calculating...',
  'breakeven.form.calculation': 'Real-time Calculation',
  'breakeven.form.formula': 'Break-even Point = Fixed Costs ÷ (Selling Price - Variable Cost)',
  'breakeven.form.marginFormula': 'Contribution Margin = Selling Price - Variable Cost',

  // Results
  'breakeven.results.title': 'Break-even Analysis Results',
  'breakeven.results.summary': 'Break-even Summary',
  'breakeven.results.breakevenPoint': 'Break-even Point',
  'breakeven.results.breakevenUnits': 'Break-even Units',
  'breakeven.results.breakevenRevenue': 'Break-even Revenue',
  'breakeven.results.contributionMargin': 'Contribution Margin',
  'breakeven.results.contributionRatio': 'Contribution Ratio',
  'breakeven.results.fixedCosts': 'Fixed Costs',
  'breakeven.results.variableCostUnit': 'Variable Cost per Unit',
  'breakeven.results.sellingPrice': 'Selling Price',
  'breakeven.results.safetyMargin': 'Safety Margin',
  'breakeven.results.operatingLeverage': 'Operating Leverage',

  // Interpretations and states
  'breakeven.interpretation.title': 'Break-even Interpretation',
  'breakeven.interpretation.belowBreakeven': 'Below break-even point - Losses',
  'breakeven.interpretation.atBreakeven': 'At break-even point - No profit or loss',
  'breakeven.interpretation.aboveBreakeven': 'Above break-even point - Profits',
  'breakeven.interpretation.negative': 'Analysis not viable - Price lower than variable cost',

  // Analysis states
  'breakeven.states.noResults': 'Enter cost and pricing data to calculate break-even point',
  'breakeven.states.calculating': 'Calculating break-even point...',
  'breakeven.states.error': 'Error in break-even calculation',
  'breakeven.states.invalid': 'Entered data does not allow valid break-even calculation',

  // Chart
  'breakeven.chart.title': 'Break-even Point Visualization',
  'breakeven.chart.revenueLabel': 'Revenue Line',
  'breakeven.chart.totalCostsLabel': 'Total Costs Line',
  'breakeven.chart.fixedCostsLabel': 'Fixed Costs',
  'breakeven.chart.variableCostsLabel': 'Variable Costs',
  'breakeven.chart.breakevenPointLabel': 'Break-even Point',
  'breakeven.chart.profitZoneLabel': 'Profit Zone',
  'breakeven.chart.lossZoneLabel': 'Loss Zone',
  'breakeven.chart.quantityAxis': 'Quantity (units)',
  'breakeven.chart.valueAxis': 'Value (€)',
  'breakeven.chart.analysisTitle': 'Sensitivity Analysis',

  // Scenarios and advanced analysis
  'breakeven.scenarios.title': 'Scenario Analysis',
  'breakeven.scenarios.optimistic': 'Optimistic Scenario',
  'breakeven.scenarios.realistic': 'Realistic Scenario',
  'breakeven.scenarios.pessimistic': 'Pessimistic Scenario',
  'breakeven.scenarios.priceIncrease': 'Price Increase',
  'breakeven.scenarios.costReduction': 'Cost Reduction',
  'breakeven.scenarios.volumeIncrease': 'Volume Increase',

  // Validation
  'breakeven.validation.costosFijosRequired': 'Fixed costs are required',
  'breakeven.validation.costosFijosMin': 'Fixed costs must be greater than 0',
  'breakeven.validation.costoVariableRequired': 'Variable cost per unit is required',
  'breakeven.validation.costoVariableMin': 'Variable cost must be greater than or equal to 0',
  'breakeven.validation.precioVentaRequired': 'Selling price is required',
  'breakeven.validation.precioVentaMin': 'Selling price must be greater than 0',
  'breakeven.validation.priceMustExceedVariable': 'Selling price must be greater than variable cost',
  'breakeven.validation.marginTooLow': 'Contribution margin too low to be viable',

  // Advanced metrics
  'breakeven.metrics.title': 'Break-even Metrics',
  'breakeven.metrics.daysToBreakeven': 'Days to Break-even',
  'breakeven.metrics.monthsToBreakeven': 'Months to Break-even',
  'breakeven.metrics.cashBreakeven': 'Cash Break-even Point',
  'breakeven.metrics.paybackPeriod': 'Payback Period',
  'breakeven.metrics.scalabilityIndex': 'Scalability Index',

  // Strategic recommendations
  'breakeven.recommendations.title': 'Strategic Recommendations',
  'breakeven.recommendations.increasePrice': 'Consider increasing selling price to reduce break-even point',
  'breakeven.recommendations.reduceCosts': 'Look for opportunities to reduce fixed or variable costs',
  'breakeven.recommendations.improveEfficiency': 'Improve operational efficiency to optimize variable costs',
  'breakeven.recommendations.marketExpansion': 'With this break-even point, evaluate expansion strategies',
  'breakeven.recommendations.priceOptimization': 'Current margin allows for price optimization',
  'breakeven.recommendations.riskAssessment': 'High break-even point - assess market risks',

  // Sensitivity analysis
  'breakeven.sensitivity.title': 'Sensitivity Analysis',
  'breakeven.sensitivity.priceChange': 'Price Change',
  'breakeven.sensitivity.costChange': 'Cost Change',
  'breakeven.sensitivity.volumeImpact': 'Volume Impact',
  'breakeven.sensitivity.breakevenImpact': 'Break-even Impact',
  'breakeven.sensitivity.profitImpact': 'Profit Impact',

  // Alerts and notifications
  'breakeven.alerts.viableAnalysis': '✅ Viable analysis - Positive contribution margin',
  'breakeven.alerts.lowMargin': '⚠️ Low contribution margin - Review pricing strategy',
  'breakeven.alerts.highBreakeven': '🚨 High break-even point - Evaluate cost reduction',
  'breakeven.alerts.negativeMargin': '❌ Negative margin - Price does not cover variable costs',
  'breakeven.alerts.excellentMargin': '🎉 Excellent contribution margin - Scalable business',

  // Help and examples
  'breakeven.help.title': 'How to use break-even analysis',
  'breakeven.help.step1': '1. Identify and sum all monthly or annual fixed costs',
  'breakeven.help.step2': '2. Calculate average variable cost per unit',
  'breakeven.help.step3': '3. Define optimal selling price per unit',
  'breakeven.help.step4': '4. Analyze break-even point and plan strategies',
  'breakeven.help.examples': 'Examples by industry',
  'breakeven.help.retail': 'Retail: Store costs + inventory vs margin per product',
  'breakeven.help.services': 'Services: Salaries + infrastructure vs hourly rate',
  'breakeven.help.manufacturing': 'Manufacturing: Equipment + materials vs unit price',
  'breakeven.help.restaurant': 'Restaurant: Rent + staff vs margin per dish',

  // Actions
  'breakeven.actions.download': 'Download Analysis',
  'breakeven.actions.reset': 'Reset',
  'breakeven.actions.export': 'Export Data',
  'breakeven.actions.print': 'Print Report',
  'breakeven.actions.compare': 'Compare Scenarios',
  'breakeven.actions.sensitivity': 'Sensitivity Analysis',
  'breakeven.actions.forecast': 'Forecast',
};

export default breakeven;
