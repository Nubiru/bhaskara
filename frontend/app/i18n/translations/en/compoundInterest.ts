/**
 * @fileoverview English translations for compound interest calculator module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Contains all English translations specific to the compound interest calculator module.
 * Includes forms, results, validations, and descriptions.
 * 
 * @state
 * ✅ Functional - Complete translations for Compound Interest Calculator
 */

const compoundInterest = {
  // Titles and navigation
  'compoundInterest.title': 'Compound Interest Calculator',
  'compoundInterest.subtitle': 'Calculate investment growth with compound interest and regular contributions',
  'compoundInterest.description': 'Advanced tool for compound interest calculations and investment planning',

  // Form
  'compoundInterest.form.title': 'Investment Data',
  'compoundInterest.form.subtitle': 'Enter principal, interest rate, time period, and contributions',
  'compoundInterest.form.principalLabel': 'Initial Principal',
  'compoundInterest.form.principalPlaceholder': 'Ex: 10000',
  'compoundInterest.form.principalDescription': 'Initial investment amount',
  'compoundInterest.form.principalUnit': '€',
  'compoundInterest.form.rateLabel': 'Annual Interest Rate',
  'compoundInterest.form.ratePlaceholder': 'Ex: 5.5',
  'compoundInterest.form.rateDescription': 'Annual interest rate as a percentage',
  'compoundInterest.form.rateUnit': '%',
  'compoundInterest.form.timeLabel': 'Time Period',
  'compoundInterest.form.timePlaceholder': 'Ex: 10',
  'compoundInterest.form.timeDescription': 'Investment time period in years',
  'compoundInterest.form.timeUnit': 'years',
  'compoundInterest.form.contributionsLabel': 'Regular Contributions',
  'compoundInterest.form.contributionsPlaceholder': 'Ex: 500',
  'compoundInterest.form.contributionsDescription': 'Regular contribution amount (optional)',
  'compoundInterest.form.contributionsUnit': '€',
  'compoundInterest.form.frequencyLabel': 'Contribution Frequency',
  'compoundInterest.form.frequencyPlaceholder': 'Monthly',
  'compoundInterest.form.frequencyDescription': 'How often contributions are made',
  'compoundInterest.form.frequencyUnit': '',
  'compoundInterest.form.analyze': 'Calculate Growth',
  'compoundInterest.form.analyzing': 'Calculating...',
  'compoundInterest.form.calculation': 'Real-time Calculation',

  // Results
  'compoundInterest.results.title': 'Investment Growth Analysis',
  'compoundInterest.results.summary': 'Growth Summary',
  'compoundInterest.results.principal': 'Initial Principal',
  'compoundInterest.results.finalAmount': 'Final Amount',
  'compoundInterest.results.interestEarned': 'Interest Earned',
  'compoundInterest.results.totalContributions': 'Total Contributions',
  'compoundInterest.results.growthRate': 'Growth Rate',
  'compoundInterest.results.effectiveRate': 'Effective Annual Rate',

  // Chart
  'compoundInterest.chart.title': 'Growth Projection',
  'compoundInterest.chart.year': 'Year',
  'compoundInterest.chart.amount': 'Amount',
  'compoundInterest.chart.contributions': 'Contributions',
  'compoundInterest.chart.interest': 'Interest',
  'compoundInterest.chart.morePeriods': 'more periods',

  // States
  'compoundInterest.states.noResults': 'Enter investment data to see growth analysis',
  'compoundInterest.states.calculating': 'Calculating investment growth...',
  'compoundInterest.states.error': 'Error in compound interest calculation',

  // Validation
  'compoundInterest.validation.principalRequired': 'Initial principal is required',
  'compoundInterest.validation.principalMin': 'Initial principal must be greater than 0',
  'compoundInterest.validation.rateRequired': 'Interest rate is required',
  'compoundInterest.validation.rateMin': 'Interest rate must be greater than 0',
  'compoundInterest.validation.rateMax': 'Interest rate must be less than 100',
  'compoundInterest.validation.timeRequired': 'Time period is required',
  'compoundInterest.validation.timeMin': 'Time period must be greater than 0',
  'compoundInterest.validation.contributionsMin': 'Contributions must be greater than or equal to 0',

  // Help and examples
  'compoundInterest.help.title': 'How does compound interest work?',
  'compoundInterest.help.step1': '1. Enter your initial investment amount',
  'compoundInterest.help.step2': '2. Set the annual interest rate',
  'compoundInterest.help.step3': '3. Choose the investment time period',
  'compoundInterest.help.step4': '4. Add optional regular contributions',
  'compoundInterest.help.examples': 'Common examples',
  'compoundInterest.help.savings': 'Savings account: Regular deposits with compound growth',
  'compoundInterest.help.investment': 'Investment portfolio: Initial capital with market returns',
  'compoundInterest.help.retirement': 'Retirement planning: Long-term compound growth'
} as const;

export default compoundInterest;
