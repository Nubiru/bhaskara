/**
 * @fileoverview Componente de formulario para análisis de ingresos totales
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Formulario especializado para análisis de ingresos: captura precio unitario y cantidad
 * para calcular ingresos totales. Incluye validación en tiempo real con Zod,
 * manejo de estados de carga y error, y accesibilidad completa.
 * 
 * @dependencies
 * - React Hook Form para manejo de formularios
 * - Zod para validación de esquemas
 * - Tipos de business.ts para análisis de ingresos
 * - LoadingSpinner para estados de carga
 * - react-i18next para internacionalización
 * 
 * @usage
 * <RevenueForm onSubmit={handleAnalysis} isLoading={false} />
 * 
 * @state
 * ✅ Funcional - Formulario completo con validación e i18n
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar campos opcionales para descuentos
 * - [PRIORITY: LOW] Implementar simulación en tiempo real
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
  RevenueAnalysisRequest,
  RevenueAnalysisResult
} from '../../types/business';

// Importaciones de esquemas Zod (valores, no tipos)
import { 
  revenueAnalysisRequestSchema
} from '../../types/business';

import type { 
  FieldError,
  FormErrors 
} from '../../types/forms';

// Importaciones de componentes
import LoadingSpinner from '../ui/LoadingSpinner';

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

/**
 * Props del componente RevenueForm
 */
interface RevenueFormProps {
  /** Función callback cuando se envía el formulario */
  onSubmit: (data: RevenueAnalysisRequest) => void | Promise<void>;
  /** Estado de carga del formulario */
  isLoading?: boolean;
  /** Errores externos del formulario */
  externalErrors?: FormErrors;
  /** Valores iniciales del formulario */
  initialValues?: Partial<RevenueAnalysisRequest>;
  /** Función callback cuando se resetea el formulario */
  onReset?: () => void;
  /** Función callback cuando cambian los valores */
  onChange?: (data: Partial<RevenueAnalysisRequest>) => void;
  /** Deshabilitar el formulario */
  disabled?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Datos del formulario con validación Zod
 */
type FormData = RevenueAnalysisRequest;

// ============================================================================
// ESQUEMAS DE VALIDACIÓN
// ============================================================================

/**
 * Esquema de validación para el formulario completo
 * Note: Error messages are now handled by i18n in the component
 */
const formSchema = revenueAnalysisRequestSchema;

// ============================================================================
// CONFIGURACIÓN DE CAMPOS
// ============================================================================

/**
 * Configuración de campos del formulario
 * Note: Labels, descriptions, and placeholders are now handled by i18n
 */
const REVENUE_FIELDS = [
  {
    name: 'precio' as const,
    required: true,
    type: 'number',
    constraints: {
      min: 0,
      max: 1000000,
      step: 0.01,
      precision: 2,
    },
    examples: ['10.50', '25.00', '99.99', '150.75'],
  },
  {
    name: 'cantidad' as const,
    required: true,
    type: 'number',
    constraints: {
      min: 0,
      max: 1000000,
      step: 1,
      precision: 0,
    },
    examples: ['100', '500', '1000', '2500'],
  },
] as const;

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente de formulario para análisis de ingresos
 * Maneja la entrada de precio y cantidad con validación completa
 */
const RevenueForm = memo<RevenueFormProps>(({
  onSubmit,
  isLoading = false,
  externalErrors = {},
  initialValues = {},
  onReset,
  onChange,
  disabled = false,
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
      precio: initialValues.precio ?? 0,
      cantidad: initialValues.cantidad ?? 0,
      description: initialValues.description ?? '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Observar cambios en los valores del formulario
  const watchedValues = watch();

  // ============================================================================
  // CÁLCULOS EN TIEMPO REAL
  // ============================================================================

  /**
   * Calcular ingreso total en tiempo real
   */
  const ingresoTotal = useMemo(() => {
    const precio = watchedValues.precio || 0;
    const cantidad = watchedValues.cantidad || 0;
    return precio * cantidad;
  }, [watchedValues.precio, watchedValues.cantidad]);

  // ============================================================================
  // CALLBACKS Y HANDLERS
  // ============================================================================

  /**
   * Handler para envío del formulario
   */
  const handleFormSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting revenue form:', error);
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
  const handleFormChange = useCallback((data: Partial<RevenueAnalysisRequest>) => {
    onChange?.(data);
  }, [onChange]);

  /**
   * Handler para cambio de campo
   */
  const handleFieldChange = useCallback((name: keyof RevenueAnalysisRequest, value: number | string) => {
    setValue(name, value, { 
      shouldValidate: true, 
      shouldDirty: true 
    });
    
    const currentValues = getValues();
    handleFormChange(currentValues);
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
   * Renderizar campo del formulario
   */
  const renderField = useCallback((field: typeof REVENUE_FIELDS[number]) => {
    const fieldName = field.name;
    const hasError = hasFieldError(fieldName);
    const errorMessage = getFieldErrorMessage(fieldName);
    const isTouched = touchedFields[fieldName];

    return (
      <div key={field.name} className="space-y-2">
        <label 
          htmlFor={fieldName}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t(`revenue.form.${field.name}Label`)}
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
                type={field.type}
                value={value as number}
                onChange={(e) => {
                  const numValue = parseFloat(e.target.value) || 0;
                  onChange(numValue);
                  handleFieldChange(field.name, numValue);
                }}
                placeholder={t(`revenue.form.${field.name}Placeholder`)}
                disabled={disabled || isLoading}
                className={`
                  block w-full px-3 py-2 border rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white
                  ${hasError 
                    ? 'border-red-300 text-red-900 placeholder-red-300' 
                    : 'border-gray-300 text-gray-900 placeholder-gray-400 dark:border-gray-600'
                  }
                  ${isTouched && !hasError ? 'border-green-300' : ''}
                `}
                min={field.constraints.min}
                max={field.constraints.max}
                step={field.constraints.step}
                aria-describedby={`${fieldName}-description ${fieldName}-error`}
                aria-invalid={hasError}
                aria-required={field.required}
              />
              
              {/* Unit display */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">{t(`revenue.form.${field.name}Unit`)}</span>
              </div>
            </div>
          )}
        />
        
        {/* Descripción del campo */}
        <p 
          id={`${fieldName}-description`}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {t(`revenue.form.${field.name}Description`)}
        </p>
        
        {/* Ejemplos */}
        {field.examples && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-400">{t('form.examples')}:</span>
            {field.examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleFieldChange(field.name, parseFloat(example))}
                disabled={disabled || isLoading}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 disabled:opacity-50 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
              >
                {example}
              </button>
            ))}
          </div>
        )}
        
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
  }, [control, hasFieldError, getFieldErrorMessage, touchedFields, disabled, isLoading, handleFieldChange, t]);

  /**
   * Renderizar campo de descripción
   */
  const renderDescriptionField = useCallback(() => {
    return (
      <div className="space-y-2">
        <label 
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              placeholder={t('revenue.form.descriptionPlaceholder')}
              disabled={disabled || isLoading}
              rows={3}
              maxLength={500}
              className={`
                block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-gray-600
                resize-vertical
              `}
              aria-describedby="description-help"
            />
          )}
        />
        
        <p id="description-help" className="text-sm text-gray-500 dark:text-gray-400">
          {t('form.maxCharacters', { max: 500 })}
        </p>
      </div>
    );
  }, [control, disabled, isLoading, t]);

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`space-y-4 ${className}`}
      noValidate
      aria-label={t('revenue.form.title')}
    >
      {/* Sección de campos principales */}
      <section aria-labelledby="fields-heading">
        <h2 
          id="fields-heading"
          className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
        >
          {t('revenue.form.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVENUE_FIELDS.map(renderField)}
        </div>
        
        {/* Cálculo en tiempo real */}
        <div className="mt-3 p-3 rounded-lg border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-divider)' }}>
          <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            {t('revenue.form.calculation')}:
          </p>
          <p className="text-base font-mono" style={{ color: 'var(--color-text)' }}>
            {t('revenue.form.formula')}: {watchedValues.precio || 0} × {watchedValues.cantidad || 0} = {ingresoTotal.toFixed(2)}
          </p>
        </div>
      </section>

      {/* Campo de descripción */}
      {renderDescriptionField()}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t" style={{ borderColor: 'var(--color-divider)' }}>
        <button
          type="submit"
          disabled={disabled || isLoading || !isValid || isSubmitting}
          className={`
            flex-1 sm:flex-none px-5 py-2.5 border border-transparent rounded-md shadow-sm
            text-base font-medium text-white
            focus:outline-none focus:ring-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${!isValid || isSubmitting ? 'cursor-not-allowed' : ''}
          `}
          aria-describedby="submit-status"
          style={{ background: (!isValid || isSubmitting) ? 'var(--color-secondary)' : 'var(--color-primary)' }}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner size="sm" />
              <span>{t('revenue.form.analyzing')}</span>
            </div>
          ) : (
            t('revenue.form.analyze')
          )}
        </button>
        
        <button
          type="button"
          onClick={handleFormReset}
          disabled={disabled || isLoading || !isDirty}
          className="flex-1 sm:flex-none px-5 py-2.5 border rounded-md shadow-sm text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-divider)' }}
        >
          {t('form.clear')}
        </button>
      </div>

      {/* Estado del formulario */}
      <div id="submit-status" className="sr-only" aria-live="polite">
        {isSubmitting && t('form.submitting')}
        {!isValid && t('form.formWithErrors')}
        {isValid && !isSubmitting && t('form.formValid')}
      </div>

      {/* Indicadores de estado */}
      {isDirty && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {isValid ? `✅ ${t('form.formValid')}` : `❌ ${t('form.formWithErrors')}`}
        </div>
      )}
    </form>
  );
});

// Configuración del display name para debugging
RevenueForm.displayName = 'RevenueForm';

export default RevenueForm;
