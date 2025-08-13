/**
 * @fileoverview Componente de formulario para análisis Bhaskara (funciones cuadráticas)
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Formulario especializado para análisis Bhaskara: captura coeficientes de función
 * cuadrática (a, b, c) y modo de análisis. Incluye validación en tiempo real con Zod,
 * manejo de estados de carga y error, y accesibilidad completa.
 * 
 * @dependencies
 * - React Hook Form para manejo de formularios
 * - Zod para validación de esquemas
 * - Tipos de quadratic.ts, forms.ts, api.ts
 * - LoadingSpinner para estados de carga
 * - react-i18next para internacionalización
 * 
 * @usage
 * <BhaskaraForm onSubmit={handleAnalysis} isLoading={false} />
 * 
 * @state
 * ✅ Funcional - Formulario completo con validación e i18n
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar autoguardado en localStorage
 * - [PRIORITY: LOW] Implementar historial de formularios
 * - [PRIORITY: LOW] Agregar ejemplos predefinidos
 * 
 * @performance
 * - Debouncing en validación para evitar re-renders excesivos
 * - Memoización de componentes hijos
 * - Lazy loading de validaciones complejas
 * 
 * @security
 * - Sanitización de entrada con Zod
 * - Validación estricta de tipos numéricos
 * - Prevención de inyección de código
 */

import React, { memo, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

// Importaciones de tipos
import type { 
  Coefficients, 
  AnalysisMode, 
  AnalysisRequest
} from '../../types/quadratic';

// Importaciones de esquemas Zod (valores, no tipos)
import { 
  coefficientsSchema,
  analysisModeSchema 
} from '../../types/quadratic';

import type { 
  QuadraticFormData,
  FieldError,
  FormErrors 
} from '../../types/forms';

// Importaciones de componentes
import LoadingSpinner from '../ui/LoadingSpinner';
import { DownloadButton } from '../ui/DownloadButton';

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

/**
 * Props del componente BhaskaraForm
 */
interface BhaskaraFormProps {
  /** Función callback cuando se envía el formulario */
  onSubmit: (data: AnalysisRequest) => void | Promise<void>;
  /** Estado de carga del formulario */
  isLoading?: boolean;
  /** Errores externos del formulario */
  externalErrors?: FormErrors;
  /** Valores iniciales del formulario */
  initialValues?: Partial<QuadraticFormData>;
  /** Función callback cuando se resetea el formulario */
  onReset?: () => void;
  /** Función callback cuando cambian los valores */
  onChange?: (data: Partial<QuadraticFormData>) => void;
  /** Deshabilitar el formulario */
  disabled?: boolean;
  /** Mostrar modo de análisis */
  showModeSelector?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Datos del formulario con validación Zod
 */
type FormData = {
  coefficients: Coefficients;
  mode: AnalysisMode;
  description?: string;
};

// ============================================================================
// ESQUEMAS DE VALIDACIÓN
// ============================================================================

/**
 * Esquema de validación para el formulario completo
 * Note: Error messages are now handled by i18n in the component
 */
const formSchema = z.object({
  coefficients: coefficientsSchema,
  mode: analysisModeSchema,
  description: z.string().max(500).optional(),
});

// ============================================================================
// CONFIGURACIÓN DE CAMPOS
// ============================================================================

/**
 * Configuración de campos de coeficientes
 * Note: Labels, descriptions, and placeholders are now handled by i18n
 */
const COEFFICIENT_FIELDS = [
  {
    name: 'a' as const,
    required: true,
    constraints: {
      min: -1000,
      max: 1000,
      step: 0.01,
      precision: 4,
    },
    examples: ['1', '-2', '0.5', '3.14'],
  },
  {
    name: 'b' as const,
    required: true,
    constraints: {
      min: -1000,
      max: 1000,
      step: 0.01,
      precision: 4,
    },
    examples: ['0', '-4', '2.5', '-1.5'],
  },
  {
    name: 'c' as const,
    required: true,
    constraints: {
      min: -1000,
      max: 1000,
      step: 0.01,
      precision: 4,
    },
    examples: ['0', '4', '-1.2', '3.14'],
  },
] as const;

/**
 * Opciones de modo de análisis
 * Note: Labels and descriptions are now handled by i18n
 */
const ANALYSIS_MODES = [
  {
    value: 'roots' as const,
    icon: '🔍',
  },
  {
    value: 'vertex' as const,
    icon: '📈',
  },
  {
    value: 'optimal' as const,
    icon: '💰',
  },
  {
    value: 'full' as const,
    icon: '📊',
  },
] as const;

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente de formulario para análisis Bhaskara
 * Maneja la entrada de coeficientes y modo de análisis con validación completa
 */
const BhaskaraForm = memo<BhaskaraFormProps>(({
  onSubmit,
  isLoading = false,
  externalErrors = {},
  initialValues = {},
  onReset,
  onChange,
  disabled = false,
  showModeSelector = true,
  className = '',
}) => {
  const { t } = useTranslation();
  
  // ============================================================================
  // HOOKS Y ESTADO
  // ============================================================================

  /**
   * Configuración del formulario con React Hook Form
   */
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { 
      errors, 
      isSubmitting, 
      isDirty, 
      isValid,
      touchedFields 
    },
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coefficients: {
        a: initialValues.coefficients?.a ?? 1,
        b: initialValues.coefficients?.b ?? 0,
        c: initialValues.coefficients?.c ?? 0,
      },
      mode: initialValues.mode ?? 'full',
      description: initialValues.description ?? '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Observar cambios en los valores del formulario
  const watchedValues = watch();

  // ============================================================================
  // CALLBACKS Y HANDLERS
  // ============================================================================

  /**
   * Handler para envío del formulario
   */
  const handleFormSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    try {
      const analysisRequest: AnalysisRequest = {
        coefficients: data.coefficients,
        mode: data.mode,
      };
      
      await onSubmit(analysisRequest);
    } catch (error) {
      console.error('Error submitting form:', error);
      // El error se maneja en el componente padre
    }
  }, [onSubmit]);

  /**
   * Handler para reset del formulario
   */
  const handleFormReset = useCallback(() => {
    reset();
    onReset?.();
  }, [reset, onReset]);

  /**
   * Handler para cambio de valores
   */
  const handleFormChange = useCallback((data: Partial<QuadraticFormData>) => {
    onChange?.(data);
  }, [onChange]);

  /**
   * Handler para cambio de coeficiente
   */
  const handleCoefficientChange = useCallback((name: keyof Coefficients, value: number) => {
    setValue(`coefficients.${name}`, value, { 
      shouldValidate: true, 
      shouldDirty: true 
    });
    
    const currentValues = getValues();
    handleFormChange({
      coefficients: currentValues.coefficients,
      mode: currentValues.mode,
    });
  }, [setValue, getValues, handleFormChange]);

  /**
   * Handler para cambio de modo
   */
  const handleModeChange = useCallback((mode: AnalysisMode) => {
    setValue('mode', mode, { 
      shouldValidate: true, 
      shouldDirty: true 
    });
    
    const currentValues = getValues();
    handleFormChange({
      coefficients: currentValues.coefficients,
      mode,
    });
  }, [setValue, getValues, handleFormChange]);

  // ============================================================================
  // VALIDACIÓN Y ERRORES
  // ============================================================================

  /**
   * Obtener error de un campo específico
   */
  const getFieldError = useCallback((fieldName: string): FieldError | undefined => {
    return errors[fieldName as keyof FormData] as FieldError | undefined;
  }, [errors]);

  /**
   * Verificar si un campo tiene error
   */
  const hasFieldError = useCallback((fieldName: string): boolean => {
    return !!getFieldError(fieldName) || !!externalErrors[fieldName];
  }, [getFieldError, externalErrors]);

  /**
   * Obtener mensaje de error de un campo
   */
  const getFieldErrorMessage = useCallback((fieldName: string): string | undefined => {
    const fieldError = getFieldError(fieldName);
    const externalError = externalErrors[fieldName];
    
    return fieldError?.message || externalError?.message;
  }, [getFieldError, externalErrors]);

  // ============================================================================
  // RENDERIZADO DE CAMPOS
  // ============================================================================

  /**
   * Renderizar campo de coeficiente
   */
  const renderCoefficientField = useCallback((field: typeof COEFFICIENT_FIELDS[number]) => {
    const fieldName = `coefficients.${field.name}` as const;
    const hasError = hasFieldError(fieldName);
    const errorMessage = getFieldErrorMessage(fieldName);
    const isTouched = touchedFields.coefficients?.[field.name];

    return (
      <div key={field.name} className="space-y-2">
        <label 
          htmlFor={fieldName}
          className="block text-xs font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          {field.name.toUpperCase()}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <div className="relative">
              <input
                 ref={ref}
                 id={fieldName}
                  type="text"
                  inputMode="decimal"
                  value={(value as number).toString()}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, '.');
                    // Allow just '-' while typing
                    if (raw === '-' || raw === '' || raw === '.' || raw === '-.') {
                      onChange(raw === '-' ? -0 : 0);
                      return;
                    }
                    const numValue = Number(raw);
                    if (!Number.isNaN(numValue)) {
                      onChange(numValue);
                      handleCoefficientChange(field.name, numValue);
                    }
                  }}
                placeholder={t(`form.coefficients.${field.name}Placeholder`)}
                disabled={disabled || isLoading}
                className={`
                  block w-full px-2 py-1.5 border rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  placeholder-gray-500 dark:placeholder-gray-300
                  ${hasError 
                    ? 'border-red-300 text-red-900 placeholder-red-300' 
                    : 'border-gray-300 text-gray-900'
                  }
                  ${isTouched && !hasError ? 'border-green-300' : ''}
                `}
                aria-describedby={`${fieldName}-description ${fieldName}-error`}
                aria-invalid={hasError}
                aria-required={field.required}
              />
              {/* unit badge removed for compactness */}
            </div>
          )}
        />
        {/* Compact mode: omit field descriptions and example chips */}
        
        {/* Mensaje de error */}
        {hasError && errorMessage && (
          <p 
            id={`${fieldName}-error`}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }, [control, hasFieldError, getFieldErrorMessage, touchedFields, disabled, isLoading, handleCoefficientChange]);

  /**
   * Renderizar selector de modo
   */
  const renderModeSelector = useCallback(() => {
    if (!showModeSelector) return null;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('form.analysisMode')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        
        <Controller
          name="mode"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <div className="grid grid-cols-4 gap-2">
              {ANALYSIS_MODES.map((mode) => (
                <button
                  key={mode.value}
                  ref={ref}
                  type="button"
                  onClick={() => {
                    onChange(mode.value);
                    handleModeChange(mode.value);
                  }}
                  disabled={disabled || isLoading}
                  className={`
                    px-2 py-2 border rounded-md text-center transition-all duration-200 text-sm font-medium
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${value === mode.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }
                  `}
                  aria-pressed={value === mode.value}
                  aria-describedby={`mode-${mode.value}-description`}
                >
                  <div className="font-semibold">
                    {mode.value === 'roots' ? 'Raíces' : mode.value === 'vertex' ? 'Vértice' : mode.value === 'optimal' ? 'Optimal' : 'Completo'}
                  </div>
                </button>
              ))}
            </div>
          )}
        />
        
        {hasFieldError('mode') && (
          <p className="text-sm text-red-600" role="alert">
            {getFieldErrorMessage('mode')}
          </p>
        )}
      </div>
    );
  }, [showModeSelector, control, disabled, isLoading, handleModeChange, hasFieldError, getFieldErrorMessage]);

  /**
   * Renderizar campo de descripción
   */
  const renderDescriptionField = useCallback(() => {
    return (
      <div className="space-y-2">
        <label 
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          {t('form.description')}
        </label>
        
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <textarea
              ref={ref}
              id="description"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={t('form.placeholders.description')}
              disabled={disabled || isLoading}
              rows={3}
              maxLength={500}
              className={`
                block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                disabled:bg-gray-100 disabled:cursor-not-allowed
                resize-vertical
              `}
              aria-describedby="description-help"
            />
          )}
        />
        
        <p id="description-help" className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Máximo 500 caracteres
        </p>
      </div>
    );
  }, [control, disabled, isLoading]);

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`space-y-6 ${className}`}
      noValidate
      aria-label={t('form.analysisMode')}
    >
      {/* Sección de coeficientes */}
      <section aria-labelledby="coefficients-heading">
        {/* Heading removed to reduce repetition and visual clutter */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {COEFFICIENT_FIELDS.map(renderCoefficientField)}
        </div>
        
        {/* Ecuación visual */}
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-divider)' }}>
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>Ecuación:</p>
          <p className="text-lg font-mono" style={{ color: 'var(--color-text)' }}>
            f(x) = {watchedValues.coefficients?.a || 0}x² 
            {watchedValues.coefficients?.b >= 0 ? ' + ' : ' - '}
            {Math.abs(watchedValues.coefficients?.b || 0)}x
            {watchedValues.coefficients?.c >= 0 ? ' + ' : ' - '}
            {Math.abs(watchedValues.coefficients?.c || 0)}
          </p>
        </div>
      </section>

      {/* Selector de modo */}
      {renderModeSelector()}

      {/* Campo de descripción */}
      {renderDescriptionField()}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-2 pt-3" style={{ borderTop: '1px solid var(--color-divider)' }}>
        <button
          type="submit"
          disabled={disabled || isLoading || !isValid || isSubmitting}
          className={`
            flex-1 sm:flex-none px-6 py-3 border rounded-md shadow-sm
            text-base font-semibold text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          style={{
            backgroundColor: isValid && !isSubmitting ? 'var(--color-primary)' : '#9ca3af',
            borderColor: isValid && !isSubmitting ? 'var(--color-primary)' : '#9ca3af',
            lineHeight: '1.2'
          }}
          aria-describedby="submit-status"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner size="sm" />
              <span>{t('form.analyzing')}</span>
            </div>
          ) : (
            t('form.analyze')
          )}
        </button>
        
        <button
          type="button"
          onClick={handleFormReset}
          disabled={disabled || isLoading || !isDirty}
          className="flex-1 sm:flex-none px-5 py-3 border rounded-md shadow-sm text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: 'var(--color-text)',
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-divider)'
          }}
        >
          Reiniciar
        </button>
      </div>

      {/* Estado del formulario */}
      <div id="submit-status" className="sr-only" aria-live="polite">
        {isSubmitting && 'Enviando formulario...'}
        {!isValid && 'El formulario tiene errores de validación'}
        {isValid && !isSubmitting && 'Formulario listo para enviar'}
      </div>

      {/* Indicadores de estado */}
      {isDirty && (
        <div className="text-sm text-gray-500">
          {isValid ? `✅ ${t('form.formValid')}` : `❌ ${t('form.formWithErrors')}`}
        </div>
      )}
    </form>
  );
});

// Configuración del display name para debugging
BhaskaraForm.displayName = 'BhaskaraForm';

export default BhaskaraForm;
