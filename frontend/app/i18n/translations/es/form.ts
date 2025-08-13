/**
 * @fileoverview Traducciones de formularios en español
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 */

export const form = {
  // Acciones generales
  submit: 'Enviar',
  cancel: 'Cancelar',
  reset: 'Limpiar',
  save: 'Guardar',
  analyze: 'Analizar',
  clear: 'Limpiar',
  analyzing: 'Analizando...',
  loading: 'Procesando...',
  
  // Estados del formulario
  formValid: 'Formulario válido',
  formWithErrors: 'Formulario con errores',
  required: 'Campo requerido',
  optional: 'Opcional',
  examples: 'Ejemplos',
  maxCharacters: 'Máximo {max} caracteres',
  submitting: 'Enviando formulario...',
  
  // Coeficientes
  coefficientA: 'Coeficiente a',
  coefficientB: 'Coeficiente b', 
  coefficientC: 'Coeficiente c',
  coefficients: {
    aLabel: 'Coeficiente A',
    bLabel: 'Coeficiente B',
    cLabel: 'Coeficiente C',
    aDescription: 'Coeficiente del término cuadrático (x²)',
    bDescription: 'Coeficiente del término lineal (x)',
    cDescription: 'Término independiente',
    aPlaceholder: 'Ej: 1, -2, 0.5',
    bPlaceholder: 'Ej: 0, -4, 2.5', 
    cPlaceholder: 'Ej: 0, 4, -1.2',
    aUnit: 'unidad²',
    bUnit: 'unidad',
    cUnit: 'unidad'
  },
  
  // Modo de análisis
  analysisMode: 'Modo de Análisis',
  modeDescription: 'Selecciona el tipo de análisis a realizar',
  modes: {
    roots: 'Solo Raíces',
    vertex: 'Vértice',
    optimal: 'Punto Óptimo',
    full: 'Análisis Completo',
    bhaskara: 'Análisis Completo (Bhaskara)',
    economia: 'Análisis Económico',
    rootsDesc: 'Calcular únicamente las raíces de la ecuación',
    vertexDesc: 'Encontrar el vértice de la parábola',
    optimalDesc: 'Determinar el punto óptimo económico',
    fullDesc: 'Análisis completo con todos los resultados'
  },
  
  // Descripción
  description: 'Descripción (opcional)',
  descriptionLabel: 'Descripción',
  placeholders: {
    description: 'Descripción opcional del análisis...'
  },
  
  // Validación y errores
  validation: {
    required: 'Este campo es requerido',
    invalidNumber: 'Debe ser un número válido',
    min: 'El valor mínimo es {min}',
    max: 'El valor máximo es {max}',
    precision: 'Máximo {precision} decimales',
    outOfRange: 'El valor debe estar entre {min} y {max}',
    generic: 'Valor inválido'
  },
  errors: {
    coefficientARequired: 'El coeficiente "a" es requerido',
    coefficientANonZero: 'El coeficiente "a" no puede ser cero',
    coefficientBRequired: 'El coeficiente "b" es requerido',
    coefficientCRequired: 'El coeficiente "c" es requerido',
    invalidNumber: 'Debe ser un número válido',
    maxLength: 'No puede exceder {max} caracteres',
    tooManyDecimals: 'Máximo {precision} decimales permitidos'
  }
} as const;
