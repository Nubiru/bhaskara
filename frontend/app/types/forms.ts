/**
 * @fileoverview Tipos TypeScript para formularios y validación
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Definiciones de tipos para formularios, validación con React Hook Form,
 * y manejo de estados de formulario. Incluye tipos para campos de entrada,
 * validación en tiempo real y feedback de usuario.
 * 
 * @dependencies
 * - TypeScript 5.8.3+
 * - React Hook Form
 * - Zod para validación
 * - Tipos de quadratic.ts
 * 
 * @usage
 * import type { FormData, FormErrors, FormState } from './types/forms';
 * 
 * @state
 * ✅ Funcional - Tipos base implementados
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar tipos para formularios dinámicos
 * - [PRIORITY: LOW] Implementar tipos para wizard forms
 * 
 * @performance
 * - Tipos optimizados para React Hook Form
 * - Validación eficiente con Zod
 * 
 * @security
 * - Sanitización de entrada de usuario
 * - Validación estricta de tipos
 */

import type { 
  Coefficients, 
  AnalysisMode, 
  AnalysisRequest,
  PartialCoefficients 
} from './quadratic';

// ============================================================================
// TIPOS DE DATOS DE FORMULARIO
// ============================================================================

/**
 * Datos del formulario de análisis cuadrático
 */
export interface QuadraticFormData {
  coefficients: Coefficients;
  mode: AnalysisMode;
  description?: string;
  tags?: string[];
}

/**
 * Datos parciales del formulario (para edición)
 */
export interface PartialQuadraticFormData {
  coefficients?: PartialCoefficients;
  mode?: AnalysisMode;
  description?: string;
  tags?: string[];
}

/**
 * Datos del formulario de historial
 */
export interface HistoryFormData {
  limit: number;
  mode?: AnalysisMode;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

/**
 * Datos del formulario de exportación
 */
export interface ExportFormData {
  format: 'pdf' | 'csv' | 'json';
  includeGraph: boolean;
  includeMetadata: boolean;
  filename?: string;
}

// ============================================================================
// TIPOS DE VALIDACIÓN
// ============================================================================

/**
 * Error de validación de campo
 */
export interface FieldError {
  type: string;
  message: string;
  field: string;
  value?: unknown;
}

/**
 * Errores de validación del formulario
 */
export interface FormErrors {
  [key: string]: FieldError | undefined;
}

/**
 * Estado de validación de campo
 */
export interface FieldValidationState {
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError;
  warning?: string;
}

/**
 * Estado de validación del formulario
 */
export interface FormValidationState {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  errors: FormErrors;
  warnings: Record<string, string>;
}

// ============================================================================
// TIPOS DE ESTADO DE FORMULARIO
// ============================================================================

/**
 * Estado del formulario de análisis
 */
export interface QuadraticFormState {
  data: QuadraticFormData;
  validation: FormValidationState;
  submission: {
    isSubmitting: boolean;
    isSubmitted: boolean;
    submitCount: number;
    lastSubmitTime?: string;
  };
  history: {
    canUndo: boolean;
    canRedo: boolean;
    historyLength: number;
  };
}

/**
 * Estado del formulario de historial
 */
export interface HistoryFormState {
  data: HistoryFormData;
  validation: FormValidationState;
  results: {
    isLoading: boolean;
    data: unknown[];
    total: number;
    hasMore: boolean;
  };
}

/**
 * Estado del formulario de exportación
 */
export interface ExportFormState {
  data: ExportFormData;
  validation: FormValidationState;
  export: {
    isExporting: boolean;
    progress: number;
    downloadUrl?: string;
    error?: string;
  };
}

// ============================================================================
// TIPOS DE CAMPOS DE ENTRADA
// ============================================================================

/**
 * Configuración de campo de entrada
 */
export interface InputFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  options?: SelectOption[];
  validation?: FieldValidationRules;
}

/**
 * Opción para campos select
 */
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Reglas de validación de campo
 */
export interface FieldValidationRules {
  required?: boolean | string;
  min?: number | string;
  max?: number | string;
  minLength?: number | string;
  maxLength?: number | string;
  pattern?: RegExp | string;
  validate?: (value: unknown) => boolean | string;
  custom?: (value: unknown, formData: unknown) => boolean | string;
}

/**
 * Configuración específica para coeficientes
 */
export interface CoefficientFieldConfig extends InputFieldConfig {
  coefficient: 'a' | 'b' | 'c';
  description: string;
  unit?: string;
  examples?: string[];
  constraints?: {
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
  };
}

// ============================================================================
// TIPOS DE EVENTOS DE FORMULARIO
// ============================================================================

/**
 * Evento de cambio de campo
 */
export interface FieldChangeEvent {
  field: string;
  value: unknown;
  previousValue: unknown;
  timestamp: string;
  source: 'user' | 'programmatic' | 'validation';
}

/**
 * Evento de validación de campo
 */
export interface FieldValidationEvent {
  field: string;
  isValid: boolean;
  errors: FieldError[];
  warnings: string[];
  timestamp: string;
}

/**
 * Evento de envío de formulario
 */
export interface FormSubmitEvent {
  data: QuadraticFormData;
  isValid: boolean;
  errors: FormErrors;
  timestamp: string;
  submitCount: number;
}

/**
 * Evento de reset de formulario
 */
export interface FormResetEvent {
  previousData: QuadraticFormData;
  newData: QuadraticFormData;
  timestamp: string;
  source: 'user' | 'programmatic' | 'validation';
}

// ============================================================================
// TIPOS DE FEEDBACK DE USUARIO
// ============================================================================

/**
 * Mensaje de feedback
 */
export interface FeedbackMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  field?: string;
  timestamp: string;
  duration?: number;
  dismissible?: boolean;
}

/**
 * Estado de feedback del formulario
 */
export interface FormFeedbackState {
  messages: FeedbackMessage[];
  hasErrors: boolean;
  hasWarnings: boolean;
  hasSuccess: boolean;
}

/**
 * Configuración de feedback
 */
export interface FeedbackConfig {
  showSuccess: boolean;
  showWarnings: boolean;
  autoDismiss: boolean;
  dismissDelay: number;
  maxMessages: number;
}

// ============================================================================
// TIPOS DE ACCESIBILIDAD
// ============================================================================

/**
 * Configuración de accesibilidad para campos
 */
export interface AccessibilityConfig {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  role?: string;
  tabIndex?: number;
}

/**
 * Configuración de accesibilidad para formularios
 */
export interface FormAccessibilityConfig {
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  novalidate?: boolean;
  autoComplete?: string;
}

// ============================================================================
// TIPOS DE PERFORMANCE
// ============================================================================

/**
 * Métricas de performance del formulario
 */
export interface FormPerformanceMetrics {
  renderTime: number;
  validationTime: number;
  submissionTime: number;
  fieldCount: number;
  validationRulesCount: number;
  lastInteractionTime: string;
}

/**
 * Configuración de performance
 */
export interface FormPerformanceConfig {
  debounceValidation: boolean;
  debounceDelay: number;
  lazyValidation: boolean;
  batchUpdates: boolean;
  memoizeValidation: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Función de transformación de datos de formulario
 */
export type FormDataTransformer<T, U> = (data: T) => U;

/**
 * Función de validación personalizada
 */
export type CustomValidator<T> = (value: T, formData: unknown) => boolean | string;

/**
 * Función de callback de formulario
 */
export type FormCallback<T = unknown> = (data: T, state: FormValidationState) => void | Promise<void>;

/**
 * Función de middleware de formulario
 */
export type FormMiddleware<T = unknown> = (data: T, next: (data: T) => void) => void;

// ============================================================================
// CONSTANTES
// ============================================================================

/**
 * Configuración por defecto de formularios
 */
export const DEFAULT_FORM_CONFIG = {
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_DELAY: 5000,
  MAX_HISTORY_LENGTH: 50,
  VALIDATION_DELAY: 500,
  SUBMISSION_TIMEOUT: 30000,
} as const;

/**
 * Tipos de campo por defecto
 */
export const FIELD_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password',
  TEXTAREA: 'textarea',
  SELECT: 'select',
} as const;

/**
 * Tipos de validación
 */
export const VALIDATION_TYPES = {
  REQUIRED: 'required',
  MIN: 'min',
  MAX: 'max',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  CUSTOM: 'custom',
} as const;

/**
 * Tipos de feedback
 */
export const FEEDBACK_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;
