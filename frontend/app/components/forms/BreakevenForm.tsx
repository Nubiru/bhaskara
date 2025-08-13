/**
 * @fileoverview Formulario para el análisis de punto de equilibrio empresarial.
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Componente de formulario para la entrada de datos de costos fijos,
 * costos variables unitarios y precio de venta para el cálculo del
 * punto de equilibrio. Utiliza React Hook Form y Zod para la validación,
 * y react-i18next para la internacionalización.
 *
 * @dependencies
 * - React Hook Form
 * - Zod
 * - react-i18next
 * - @hookform/resolvers/zod
 *
 * @usage
 * <BreakevenForm onSubmit={handleBreakevenSubmit} isLoading={isSubmitting} />
 *
 * @state
 * ✅ Funcional - Formulario completo con validación avanzada, alertas e i18n
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Implementar análisis de sensibilidad interactivo
 * - [PRIORITY: MEDIUM] Añadir calculadora de escenarios múltiples
 * - [PRIORITY: LOW] Agregar simulador de cambios de mercado
 * - [PRIORITY: MEDIUM] Integrar recomendaciones de precios dinámicas
 *
 * @performance
 * - Optimizado con `memo` y `useCallback` para evitar re-renders innecesarios.
 * - Validación eficiente con Zod y validaciones de negocio.
 * - Cálculo en tiempo real con debouncing implícito.
 * - Alertas condicionales para rendimiento óptimo.
 *
 * @accessibility
 * - Etiquetas y descripciones claras para cada campo.
 * - Mensajes de error y alerta accesibles.
 * - Navegación por teclado completa.
 * - ARIA labels y descriptions apropiadas.
 * - Indicadores visuales para viabilidad del negocio.
 */

import { memo, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { breakEvenAnalysisRequestSchema, type BreakEvenAnalysisRequest } from '../../types/business';

interface BreakevenFormProps {
  onSubmit: (data: BreakEvenAnalysisRequest) => void;
  isLoading: boolean;
  className?: string;
}

const BreakevenForm = memo<BreakevenFormProps>(({ onSubmit, isLoading, className = '' }) => {
  const { t } = useTranslation();

  const formSchema = useMemo(() => breakEvenAnalysisRequestSchema.refine(
    (data) => data.precio > data.costoVariableUnitario,
    {
      message: t('breakeven.validation.priceMustExceedVariable'),
      path: ['precio'],
    }
  ), [t]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<BreakEvenAnalysisRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      costosFijos: 0,
      costoVariableUnitario: 0,
      precio: 0,
      description: '',
    },
  });

  const watchedFields = watch();
  const costosFijos = watchedFields.costosFijos || 0;
  const costoVariableUnitario = watchedFields.costoVariableUnitario || 0;
  const precio = watchedFields.precio || 0;
  
  // Calculate break-even metrics
  const contributionMargin = precio - costoVariableUnitario;
  const breakevenUnits = contributionMargin > 0 ? costosFijos / contributionMargin : 0;
  const breakevenRevenue = breakevenUnits * precio;
  const contributionRatio = precio > 0 ? (contributionMargin / precio) * 100 : 0;

  // Determine business viability status
  const viabilityStatus = useMemo(() => {
    if (contributionMargin <= 0) return 'negative';
    if (contributionRatio < 10) return 'critical';
    if (contributionRatio < 20) return 'low';
    if (contributionRatio < 40) return 'good';
    return 'excellent';
  }, [contributionMargin, contributionRatio]);

  const getStatusColor = useCallback((status: string) => {
    const colors: Record<string, string> = {
      excellent: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      good: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      low: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      critical: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      negative: 'text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
    };
    return colors[status] || colors.good;
  }, []);

  const getAlertMessage = useCallback((status: string) => {
    const messages: Record<string, string> = {
      excellent: t('breakeven.alerts.excellentMargin'),
      good: t('breakeven.alerts.viableAnalysis'),
      low: t('breakeven.alerts.lowMargin'),
      critical: t('breakeven.alerts.highBreakeven'),
      negative: t('breakeven.alerts.negativeMargin'),
    };
    return messages[status] || '';
  }, [t]);

  const handleClear = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`space-y-6 ${className}`} 
      aria-label={t('breakeven.form.title')}
    >
      {/* Costos Fijos Field */}
      <div className="space-y-2">
        <label 
          htmlFor="costosFijos" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('breakeven.form.costosFijosLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="costosFijos"
            type="number"
            step="0.01"
            min="0.01"
            max="999999999"
            placeholder={t('breakeven.form.costosFijosPlaceholder')}
            {...register('costosFijos', { valueAsNumber: true })}
            disabled={isLoading}
            className={`
              block w-full px-3 py-2 border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${errors.costosFijos 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 text-gray-900 placeholder-gray-400'
              }
            `}
            aria-describedby="costosFijos-description costosFijos-error"
            aria-invalid={!!errors.costosFijos}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('breakeven.form.costosFijosUnit')}
            </span>
          </div>
        </div>
        <p id="costosFijos-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('breakeven.form.costosFijosDescription')}
        </p>
        {errors.costosFijos && (
          <p id="costosFijos-error" className="text-sm text-red-600" role="alert">
            {errors.costosFijos.message}
          </p>
        )}
      </div>

      {/* Costo Variable Unitario Field */}
      <div className="space-y-2">
        <label 
          htmlFor="costoVariableUnitario" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('breakeven.form.costoVariableLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="costoVariableUnitario"
            type="number"
            step="0.01"
            min="0"
            max="999999"
            placeholder={t('breakeven.form.costoVariablePlaceholder')}
            {...register('costoVariableUnitario', { valueAsNumber: true })}
            disabled={isLoading}
            className={`
              block w-full px-3 py-2 border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${errors.costoVariableUnitario 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 text-gray-900 placeholder-gray-400'
              }
            `}
            aria-describedby="costoVariableUnitario-description costoVariableUnitario-error"
            aria-invalid={!!errors.costoVariableUnitario}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('breakeven.form.costoVariableUnit')}
            </span>
          </div>
        </div>
        <p id="costoVariableUnitario-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('breakeven.form.costoVariableDescription')}
        </p>
        {errors.costoVariableUnitario && (
          <p id="costoVariableUnitario-error" className="text-sm text-red-600" role="alert">
            {errors.costoVariableUnitario.message}
          </p>
        )}
      </div>

      {/* Precio de Venta Field */}
      <div className="space-y-2">
        <label 
          htmlFor="precio" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('breakeven.form.precioVentaLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="precio"
            type="number"
            step="0.01"
            min="0.01"
            max="999999"
            placeholder={t('breakeven.form.precioVentaPlaceholder')}
            {...register('precio', { valueAsNumber: true })}
            disabled={isLoading}
            className={`
              block w-full px-3 py-2 border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${errors.precio 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 text-gray-900 placeholder-gray-400'
              }
            `}
            aria-describedby="precio-description precio-error"
            aria-invalid={!!errors.precio}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('breakeven.form.precioVentaUnit')}
            </span>
          </div>
        </div>
        <p id="precio-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('breakeven.form.precioVentaDescription')}
        </p>
        {errors.precio && (
          <p id="precio-error" className="text-sm text-red-600" role="alert">
            {errors.precio.message}
          </p>
        )}
        {precio <= costoVariableUnitario && precio > 0 && costoVariableUnitario > 0 && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            ⚠️ {t('breakeven.validation.priceMustExceedVariable')}
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
          className="
            block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-vertical
          "
          aria-describedby="description-help"
        />
        <p id="description-help" className="text-sm text-gray-500">
          {t('form.optional')} - {t('form.maxCharacters', { count: 500 })}
        </p>
      </div>

      {/* Real-time Break-even Calculation Display */}
      <div className={`rounded-lg p-4 space-y-3 border-2 ${getStatusColor(viabilityStatus)}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {t('breakeven.form.calculation')}:
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">{t('breakeven.results.contributionMargin')}:</span>
            <span className={contributionMargin >= 0 ? 'text-green-600' : 'text-red-600'}>
              {contributionMargin.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t('breakeven.results.contributionRatio')}:</span>
            <span className={contributionRatio >= 0 ? 'text-green-600' : 'text-red-600'}>
              {contributionRatio.toFixed(1)}%
            </span>
          </div>
          <hr className="border-current opacity-30" />
          <div className="flex justify-between text-base font-bold">
            <span>{t('breakeven.results.breakevenUnits')}:</span>
            <span className={contributionMargin > 0 ? 'text-blue-700 dark:text-blue-300' : 'text-red-700 dark:text-red-300'}>
              {contributionMargin > 0 ? Math.ceil(breakevenUnits).toLocaleString() : 'N/A'} {contributionMargin > 0 ? 'unidades' : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t('breakeven.results.breakevenRevenue')}:</span>
            <span className={contributionMargin > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}>
              {contributionMargin > 0 ? breakevenRevenue.toFixed(2) + '€' : 'N/A'}
            </span>
          </div>
          <div className="text-xs opacity-75 mt-3 space-y-1">
            <div>{t('breakeven.form.formula')}</div>
            <div>{t('breakeven.form.marginFormula')}</div>
          </div>
          {getAlertMessage(viabilityStatus) && (
            <div className="text-xs font-medium mt-2 p-2 rounded border border-current border-opacity-30">
              {getAlertMessage(viabilityStatus)}
            </div>
          )}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="
            flex-1 sm:flex-none px-6 py-3 border border-gray-300 rounded-md shadow-sm
            text-base font-medium text-gray-700 bg-white hover:bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label={t('form.clear')}
        >
          {t('form.clear')}
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading || isSubmitting || contributionMargin <= 0}
          className={`
            flex-1 sm:flex-none px-6 py-3 border border-transparent rounded-md shadow-sm
            text-base font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${!isValid || isLoading || isSubmitting || contributionMargin <= 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
            }
          `}
          aria-describedby="submit-status"
          aria-label={t('breakeven.form.analyze')}
        >
          {isLoading || isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('breakeven.form.analyzing')}
            </>
          ) : (
            t('breakeven.form.analyze')
          )}
        </button>
      </div>
      <p id="submit-status" className="sr-only">
        {isLoading ? t('breakeven.states.calculating') : t('breakeven.states.noResults')}
      </p>
    </form>
  );
});

BreakevenForm.displayName = 'BreakevenForm';

export default BreakevenForm;
