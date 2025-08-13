/**
 * @fileoverview Form translations in English
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 */

export const form = {
  // General actions
  submit: 'Submit',
  cancel: 'Cancel',
  reset: 'Clear',
  save: 'Save',
  analyze: 'Analyze',
  clear: 'Clear',
  analyzing: 'Analyzing...',
  loading: 'Processing...',
  
  // Form states
  formValid: 'Form is valid',
  formWithErrors: 'Form has errors',
  required: 'Required field',
  optional: 'Optional',
  examples: 'Examples',
  maxCharacters: 'Maximum {max} characters',
  submitting: 'Submitting form...',
  
  // Coefficients
  coefficientA: 'Coefficient a',
  coefficientB: 'Coefficient b',
  coefficientC: 'Coefficient c',
  coefficients: {
    aLabel: 'Coefficient A',
    bLabel: 'Coefficient B',
    cLabel: 'Coefficient C',
    aDescription: 'Quadratic term coefficient (x²)',
    bDescription: 'Linear term coefficient (x)',
    cDescription: 'Independent term',
    aPlaceholder: 'e.g: 1, -2, 0.5',
    bPlaceholder: 'e.g: 0, -4, 2.5',
    cPlaceholder: 'e.g: 0, 4, -1.2',
    aUnit: 'unit²',
    bUnit: 'unit',
    cUnit: 'unit'
  },
  
  // Analysis mode
  analysisMode: 'Analysis Mode',
  modeDescription: 'Select the type of analysis to perform',
  modes: {
    roots: 'Roots Only',
    vertex: 'Vertex',
    optimal: 'Optimal Point',
    full: 'Complete Analysis',
    bhaskara: 'Complete Analysis (Bhaskara)',
    economia: 'Economic Analysis',
    rootsDesc: 'Calculate only the equation roots',
    vertexDesc: 'Find the parabola vertex',
    optimalDesc: 'Determine the economic optimal point',
    fullDesc: 'Complete analysis with all results'
  },
  
  // Description
  description: 'Description (optional)',
  descriptionLabel: 'Description',
  placeholders: {
    description: 'Optional analysis description...'
  },
  
  // Validation and errors
  validation: {
    required: 'This field is required',
    invalidNumber: 'Must be a valid number',
    min: 'Minimum value is {min}',
    max: 'Maximum value is {max}',
    precision: 'Maximum {precision} decimals',
    outOfRange: 'Value must be between {min} and {max}',
    generic: 'Invalid value'
  },
  errors: {
    coefficientARequired: 'Coefficient "a" is required',
    coefficientANonZero: 'Coefficient "a" cannot be zero',
    coefficientBRequired: 'Coefficient "b" is required',
    coefficientCRequired: 'Coefficient "c" is required',
    invalidNumber: 'Must be a valid number',
    maxLength: 'Cannot exceed {max} characters',
    tooManyDecimals: 'Maximum {precision} decimals allowed'
  }
} as const;
