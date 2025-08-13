/**
 * @fileoverview English translations for bhaskara (quadratic equation) analysis module
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contains all English translations specific to the bhaskara (quadratic equation) analysis module.
 * Includes forms, results, validations, interpretations, and mathematical explanations.
 * 
 * @state
 * ✅ Functional - Complete translations for Bhaskara Analysis
 */

const bhaskara = {
  // Titles and navigation
  'bhaskara.title': 'Bhaskara Analysis',
  'bhaskara.subtitle': 'Analyze quadratic functions and find roots using the Bhaskara formula',
  'bhaskara.description': 'Advanced mathematical tool for quadratic equation analysis',

  // Form
  'bhaskara.form.title': 'Quadratic Function Coefficients',
  'bhaskara.form.subtitle': 'Enter the coefficients of your quadratic function: f(x) = ax² + bx + c',
  'bhaskara.form.coefficientALabel': 'Coefficient A',
  'bhaskara.form.coefficientAPlaceholder': 'Ex: 1',
  'bhaskara.form.coefficientADescription': 'Coefficient of x² (must be non-zero)',
  'bhaskara.form.coefficientAUnit': '',
  'bhaskara.form.coefficientBLabel': 'Coefficient B',
  'bhaskara.form.coefficientBPlaceholder': 'Ex: -5',
  'bhaskara.form.coefficientBDescription': 'Coefficient of x',
  'bhaskara.form.coefficientBUnit': '',
  'bhaskara.form.coefficientCLabel': 'Coefficient C',
  'bhaskara.form.coefficientCPlaceholder': 'Ex: 6',
  'bhaskara.form.coefficientCDescription': 'Constant term',
  'bhaskara.form.coefficientCUnit': '',
  'bhaskara.form.analyze': 'Analyze Function',
  'bhaskara.form.analyzing': 'Analyzing...',
  'bhaskara.form.calculation': 'Real-time Calculation',
  'bhaskara.form.formula': 'Bhaskara Formula: x = (-b ± √(b² - 4ac)) / 2a',

  // Results
  'bhaskara.results.title': 'Quadratic Function Analysis Results',
  'bhaskara.results.summary': 'Function Summary',
  'bhaskara.results.function': 'Function',
  'bhaskara.results.roots': 'Roots',
  'bhaskara.results.root1': 'Root 1',
  'bhaskara.results.root2': 'Root 2',
  'bhaskara.results.vertex': 'Vertex',
  'bhaskara.results.vertexX': 'Vertex X',
  'bhaskara.results.vertexY': 'Vertex Y',
  'bhaskara.results.discriminant': 'Discriminant',
  'bhaskara.results.discriminantValue': 'Discriminant Value',
  'bhaskara.results.axisOfSymmetry': 'Axis of Symmetry',
  'bhaskara.results.direction': 'Direction',
  'bhaskara.results.opensUp': 'Opens Upward',
  'bhaskara.results.opensDown': 'Opens Downward',

  // Mathematical interpretations
  'bhaskara.interpretation.title': 'Mathematical Interpretation',
  'bhaskara.interpretation.twoRealRoots': 'Two distinct real roots',
  'bhaskara.interpretation.oneRealRoot': 'One real root (double root)',
  'bhaskara.interpretation.noRealRoots': 'No real roots (complex roots)',
  'bhaskara.interpretation.positiveDiscriminant': 'Positive discriminant - Two real roots',
  'bhaskara.interpretation.zeroDiscriminant': 'Zero discriminant - One real root',
  'bhaskara.interpretation.negativeDiscriminant': 'Negative discriminant - No real roots',

  // Analysis states
  'bhaskara.states.noResults': 'Enter function coefficients to see analysis results',
  'bhaskara.states.calculating': 'Calculating quadratic function analysis...',
  'bhaskara.states.error': 'Error in quadratic function analysis',
  'bhaskara.states.invalid': 'Invalid coefficients for quadratic function',

  // Chart
  'bhaskara.chart.title': 'Quadratic Function Visualization',
  'bhaskara.chart.functionLabel': 'Function f(x)',
  'bhaskara.chart.rootsLabel': 'Roots',
  'bhaskara.chart.vertexLabel': 'Vertex',
  'bhaskara.chart.axisLabel': 'Axis of Symmetry',
  'bhaskara.chart.xAxis': 'X-axis',
  'bhaskara.chart.yAxis': 'Y-axis',
  'bhaskara.chart.gridLabel': 'Grid',

  // Validation
  'bhaskara.validation.coefficientARequired': 'Coefficient A is required',
  'bhaskara.validation.coefficientANonZero': 'Coefficient A must be non-zero',
  'bhaskara.validation.coefficientBRequired': 'Coefficient B is required',
  'bhaskara.validation.coefficientCRequired': 'Coefficient C is required',
  'bhaskara.validation.validNumbers': 'All coefficients must be valid numbers',

  // Help and examples
  'bhaskara.help.title': 'How to use Bhaskara analysis',
  'bhaskara.help.step1': '1. Enter the coefficient A (must be non-zero)',
  'bhaskara.help.step2': '2. Enter the coefficient B',
  'bhaskara.help.step3': '3. Enter the constant term C',
  'bhaskara.help.step4': '4. Analyze the function properties and roots',
  'bhaskara.help.examples': 'Common examples',
  'bhaskara.help.standardForm': 'Standard form: f(x) = x² - 5x + 6',
  'bhaskara.help.factoredForm': 'Factored form: f(x) = (x - 2)(x - 3)',

  // Mathematical concepts
  'bhaskara.concepts.title': 'Mathematical Concepts',
  'bhaskara.concepts.quadraticFunction': 'A quadratic function is a polynomial function of degree 2',
  'bhaskara.concepts.roots': 'Roots are the x-values where f(x) = 0',
  'bhaskara.concepts.vertex': 'The vertex is the maximum or minimum point of the parabola',
  'bhaskara.concepts.discriminant': 'The discriminant determines the nature of the roots',

  // Actions
  'bhaskara.actions.download': 'Download Analysis',
  'bhaskara.actions.reset': 'Reset',
  'bhaskara.actions.export': 'Export Data',
  'bhaskara.actions.print': 'Print Report',
};

export default bhaskara;
