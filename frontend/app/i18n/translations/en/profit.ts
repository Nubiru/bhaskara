/**
 * @fileoverview English translations for profit analysis module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contains all English translations specific to the profit/profitability analysis module.
 * Includes forms, results, validations, interpretations, and business metrics.
 * 
 * @state
 * ✅ Functional - Complete translations for Profit Analysis
 * 
 * @performance
 * - Modular structure for better tree-shaking
 * - Keys organized by functionality
 */

const profit = {
  // Titles and navigation
  'profit.title': 'Profit Analysis',
  'profit.subtitle': 'Calculate and analyze business profitability by comparing total revenue with total costs',
  'profit.description': 'Advanced tool for detailed profitability and profit margin analysis',

  // Form
  'profit.form.title': 'Profitability Data',
  'profit.form.subtitle': 'Enter total revenue and costs to calculate profit',
  'profit.form.ingresoTotalLabel': 'Total Revenue',
  'profit.form.ingresoTotalPlaceholder': 'Ex: 15000',
  'profit.form.ingresoTotalDescription': 'Total income from sales, services, or commercial activities',
  'profit.form.ingresoTotalUnit': '€',
  'profit.form.costoTotalLabel': 'Total Cost',
  'profit.form.costoTotalPlaceholder': 'Ex: 12000',
  'profit.form.costoTotalDescription': 'Sum of all fixed and variable costs for the analyzed period',
  'profit.form.costoTotalUnit': '€',
  'profit.form.analyze': 'Analyze Profit',
  'profit.form.analyzing': 'Analyzing...',
  'profit.form.calculation': 'Real-time Calculation',
  'profit.form.formula': 'Profit = Total Revenue - Total Cost',
  'profit.form.marginFormula': 'Profit Margin = (Profit / Total Revenue) × 100',

  // Results
  'profit.results.title': 'Profit Analysis Results',
  'profit.results.summary': 'Profitability Summary',
  'profit.results.totalRevenue': 'Total Revenue',
  'profit.results.totalCosts': 'Total Costs',
  'profit.results.profit': 'Profit',
  'profit.results.profitMargin': 'Profit Margin',
  'profit.results.roi': 'Return on Investment (ROI)',
  'profit.results.profitability': 'Profitability',
  'profit.results.breakdownTitle': 'Financial Breakdown',
  'profit.results.revenuePercentage': 'Revenue Percentage',
  'profit.results.costPercentage': 'Cost Percentage',
  'profit.results.profitPercentage': 'Profit Percentage',

  // Result interpretations
  'profit.interpretation.profit': 'Profit',
  'profit.interpretation.loss': 'Loss',
  'profit.interpretation.breakeven': 'Break-even',
  'profit.interpretation.profitDesc': 'The company generates positive profits',
  'profit.interpretation.lossDesc': 'The company has losses requiring attention',
  'profit.interpretation.breakevenDesc': 'The company is at financial equilibrium',

  // Margin classifications
  'profit.margin.excellent': 'Excellent',
  'profit.margin.good': 'Good',
  'profit.margin.average': 'Average',
  'profit.margin.poor': 'Poor',
  'profit.margin.critical': 'Critical',

  // States
  'profit.states.noResults': 'Enter financial data to see profit analysis',
  'profit.states.calculating': 'Calculating profitability analysis...',
  'profit.states.error': 'Error in profit analysis',

  // Chart
  'profit.chart.title': 'Profit Analysis Visualization',
  'profit.chart.revenueLabel': 'Revenue',
  'profit.chart.costsLabel': 'Costs',
  'profit.chart.profitLabel': 'Profit',
  'profit.chart.marginLabel': 'Margin (%)',
  'profit.chart.comparisonTitle': 'Financial Comparison',
  'profit.chart.trendTitle': 'Profit Trend',
  'profit.chart.valueAxis': 'Value (€)',
  'profit.chart.percentageAxis': 'Percentage (%)',

  // Validation
  'profit.validation.ingresoTotalRequired': 'Total revenue is required',
  'profit.validation.ingresoTotalMin': 'Total revenue must be greater than or equal to 0',
  'profit.validation.ingresoTotalNumber': 'Total revenue must be a valid number',
  'profit.validation.costoTotalRequired': 'Total cost is required',
  'profit.validation.costoTotalMin': 'Total cost must be greater than or equal to 0',
  'profit.validation.costoTotalNumber': 'Total cost must be a valid number',
  'profit.validation.costoExceedsRevenue': 'Warning: Costs exceed revenue',

  // Advanced metrics
  'profit.metrics.title': 'Profitability Metrics',
  'profit.metrics.grossMargin': 'Gross Margin',
  'profit.metrics.netMargin': 'Net Margin',
  'profit.metrics.operatingRatio': 'Operating Ratio',
  'profit.metrics.efficiency': 'Operating Efficiency',
  'profit.metrics.profitabilityIndex': 'Profitability Index',

  // Recommendations
  'profit.recommendations.title': 'Strategic Recommendations',
  'profit.recommendations.increaseRevenue': 'Consider strategies to increase revenue',
  'profit.recommendations.reduceCosts': 'Evaluate cost reduction opportunities',
  'profit.recommendations.optimizeOperations': 'Optimize operations to improve efficiency',
  'profit.recommendations.investGrowth': 'Consider reinvesting profits for growth',
  'profit.recommendations.urgentAction': 'Immediate action required to correct losses',

  // Help and examples
  'profit.help.title': 'How to use profit analysis',
  'profit.help.stepsTitle': 'Steps for analysis',
  'profit.help.step1': '1. Enter revenue and cost data',
  'profit.help.step2': '2. Calculate profit margins and ratios',
  'profit.help.step3': '3. Analyze profitability trends',
  'profit.help.step4': '4. Analyze strategic recommendations',
  'profit.help.examples': 'Usage examples',
  'profit.help.retail': 'Retail: Price optimization and inventory management',
  'profit.help.services': 'Services: Pricing strategies and cost control',
  'profit.help.manufacturing': 'Manufacturing: Production efficiency and cost reduction',

  // Alerts and notifications
  'profit.alerts.highProfit': '🎉 Excellent profitability - consider growth strategies',
  'profit.alerts.lowProfit': '⚠️ Low margin - review optimization strategies',
  'profit.alerts.loss': '🚨 Losses detected - requires immediate attention',
  'profit.alerts.breakeven': 'ℹ️ At break-even point - evaluate improvement opportunities',

  // Actions
  'profit.actions.download': 'Download Analysis',
  'profit.actions.reset': 'Reset',
  'profit.actions.export': 'Export Data',
  'profit.actions.print': 'Print Report',
  'profit.actions.compare': 'Compare Periods',
  'profit.actions.forecast': 'Forecast',

  // Meta tags
  'profit.meta.title': 'Profit Analysis - MutualMetrics',
  'profit.meta.description': 'Advanced tool for profitability and business profit analysis',
  'profit.meta.keywords': 'profits, profitability analysis, profit margin, ROI, financial analysis',
  'profit.meta.ogTitle': 'Profit Analysis - MutualMetrics',
  'profit.meta.ogDescription': 'Analyze your company\'s profitability and profits',
};

export default profit;
