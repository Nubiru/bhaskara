/**
 * @fileoverview Formulario para el análisis de costos totales.
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Componente de formulario para la entrada de datos de costos fijos,
 * costos variables y cantidad para el cálculo de costos totales.
 * Utiliza React Hook Form y Zod para la validación, y react-i18next
 * para la internacionalización.
 *
 * @dependencies
 * - React Hook Form
 * - Zod
 * - react-i18next
 * - @hookform/resolvers/zod
 *
 * @usage
 * <CostForm onSubmit={handleCostSubmit} isLoading={isSubmitting} />
 *
 * @state
 * ✅ Funcional - Formulario completo con validación e i18n
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Implementar autocompletado de campos
 * - [PRIORITY: LOW] Añadir ejemplos dinámicos de industrias
 * - [PRIORITY: MEDIUM] Agregar calculadora de desglose avanzado
 *
 * @performance
 * - Optimizado con `memo` y `useCallback` para evitar re-renders innecesarios.
 * - Validación eficiente con Zod.
 * - Cálculo en tiempo real con debouncing implícito.
 *
 * @accessibility
 * - Etiquetas y descripciones claras para cada campo.
 * - Mensajes de error accesibles.
 * - Navegación por teclado completa.
 * - ARIA labels y descriptions apropiadas.
 */

import { memo, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { costAnalysisRequestSchema, type CostAnalysisRequest } from '../../types/business';

interface CostFormProps {
  onSubmit: (data: CostAnalysisRequest) => void;
  isLoading: boolean;
  className?: string;
}

const CostForm = memo<CostFormProps>(({ onSubmit, isLoading, className = '' }) => {
  const { t } = useTranslation();

  const formSchema = useMemo(() => costAnalysisRequestSchema.refine(
    (data) => data.costosFijos >= 0 && data.costosVariables >= 0 && data.cantidad > 0,
    {
      message: t('costs.validation.costosFijosMin'),
      path: ['costosFijos'],
    }
  ), [t]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<CostAnalysisRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      costosFijos: 0,
      costosVariables: 0,
      cantidad: 1,
      description: '',
    },
  });

  const watchedFields = watch();
  const costosFijos = watchedFields.costosFijos || 0;
  const costosVariables = watchedFields.costosVariables || 0;
  const cantidad = watchedFields.cantidad || 1;
  const totalVariableCosts = costosVariables * cantidad;
  const totalCosts = costosFijos + totalVariableCosts;

  const handleClear = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`space-y-4 ${className}`} 
      aria-label={t('costs.form.title')}
    >
      {/* Costos Fijos Field */}
      <div className="space-y-2">
        <label 
          htmlFor="costosFijos" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('costs.form.costosFijosLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="costosFijos"
            type="number"
            step="0.01"
            min="0"
            max="999999"
            placeholder={t('costs.form.costosFijosPlaceholder')}
            {...register('costosFijos', { valueAsNumber: true })}
            disabled={isLoading}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            style={{
              borderColor: errors.costosFijos ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)'
            }}
            aria-describedby="costosFijos-description costosFijos-error"
            aria-invalid={!!errors.costosFijos}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('costs.form.costosFijosUnit')}
            </span>
          </div>
        </div>
        <p id="costosFijos-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('costs.form.costosFijosDescription')}
        </p>
        {errors.costosFijos && (
          <p id="costosFijos-error" className="text-sm text-red-600" role="alert">
            {errors.costosFijos.message}
          </p>
        )}
      </div>

      {/* Costos Variables Field */}
      <div className="space-y-2">
        <label 
          htmlFor="costosVariables" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('costs.form.costosVariablesLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="costosVariables"
            type="number"
            step="0.01"
            min="0"
            max="999999"
            placeholder={t('costs.form.costosVariablesPlaceholder')}
            {...register('costosVariables', { valueAsNumber: true })}
            disabled={isLoading}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            style={{
              borderColor: errors.costosVariables ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)'
            }}
            aria-describedby="costosVariables-description costosVariables-error"
            aria-invalid={!!errors.costosVariables}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('costs.form.costosVariablesUnit')}
            </span>
          </div>
        </div>
        <p id="costosVariables-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('costs.form.costosVariablesDescription')}
        </p>
        {errors.costosVariables && (
          <p id="costosVariables-error" className="text-sm text-red-600" role="alert">
            {errors.costosVariables.message}
          </p>
        )}
      </div>

      {/* Cantidad Field */}
      <div className="space-y-2">
        <label 
          htmlFor="cantidad" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('costs.form.cantidadLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="cantidad"
            type="number"
            step="1"
            min="1"
            max="999999"
            placeholder={t('costs.form.cantidadPlaceholder')}
            {...register('cantidad', { valueAsNumber: true })}
            disabled={isLoading}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            style={{
              borderColor: errors.cantidad ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)'
            }}
            aria-describedby="cantidad-description cantidad-error"
            aria-invalid={!!errors.cantidad}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('costs.form.cantidadUnit')}
            </span>
          </div>
        </div>
        <p id="cantidad-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('costs.form.cantidadDescription')}
        </p>
        {errors.cantidad && (
          <p id="cantidad-error" className="text-sm text-red-600" role="alert">
            {errors.cantidad.message}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('form.descriptionLabel')}
        </label>
        <textarea
          id="description"
          rows={3}
          maxLength={500}
          placeholder={t('form.placeholders.description')}
          {...register('description')}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
          style={{ borderColor: 'var(--color-divider)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
          aria-describedby="description-help"
        />
        <p id="description-help" className="text-sm text-gray-500">
          {t('form.optional')} - {t('form.maxCharacters', { count: 500 })}
        </p>
      </div>

      {/* Real-time Calculation Display */}
      <div className="rounded-lg p-3 space-y-2 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-divider)' }}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            {t('costs.form.calculation')}:
          </span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-text-secondary)' }}>{t('costs.results.fixedCosts')}:</span>
            <span className="font-medium">{costosFijos.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-text-secondary)' }}>{t('costs.results.totalVariableCosts')}:</span>
            <span className="font-medium">{totalVariableCosts.toFixed(2)}€</span>
          </div>
          <hr style={{ borderColor: 'var(--color-divider)' }} />
          <div className="flex justify-between text-base font-bold">
            <span style={{ color: 'var(--color-text)' }}>{t('costs.results.totalCosts')}:</span>
            <span style={{ color: 'var(--color-primary)' }}>{totalCosts.toFixed(2)}€</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('costs.form.formula')}
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="flex-1 sm:flex-none px-5 py-2.5 border rounded-md shadow-sm text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-divider)' }}
          aria-label={t('form.clear')}
        >
          {t('form.clear')}
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading || isSubmitting}
          className={`flex-1 sm:flex-none px-5 py-2.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          style={{ background: (!isValid || isSubmitting) ? 'var(--color-secondary)' : 'var(--color-primary)' }}
          aria-describedby="submit-status"
          aria-label={t('costs.form.analyze')}
        >
          {isLoading || isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('costs.form.analyzing')}
            </>
          ) : (
            t('costs.form.analyze')
          )}
        </button>
      </div>
      <p id="submit-status" className="sr-only">
        {isLoading ? t('costs.states.calculating') : t('costs.states.noResults')}
      </p>
    </form>
  );
});

CostForm.displayName = 'CostForm';

export default CostForm;
