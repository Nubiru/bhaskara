/**
 * @fileoverview Formulario para el análisis de beneficios/rentabilidad.
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Componente de formulario para la entrada de datos de ingresos totales
 * y costos totales para el cálculo de beneficios y análisis de rentabilidad.
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
 * <ProfitForm onSubmit={handleProfitSubmit} isLoading={isSubmitting} />
 *
 * @state
 * ✅ Funcional - Formulario completo con validación, alertas e i18n
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Implementar comparación de periodos históricos
 * - [PRIORITY: MEDIUM] Añadir calculadora de escenarios what-if
 * - [PRIORITY: LOW] Agregar sugerencias de optimización inteligente
 *
 * @performance
 * - Optimizado con `memo` y `useCallback` para evitar re-renders innecesarios.
 * - Validación eficiente con Zod.
 * - Cálculo en tiempo real con debouncing implícito.
 * - Alertas condicionales para rendimiento óptimo.
 *
 * @accessibility
 * - Etiquetas y descripciones claras para cada campo.
 * - Mensajes de error y alerta accesibles.
 * - Navegación por teclado completa.
 * - ARIA labels y descriptions apropiadas.
 * - Indicadores visuales para diferentes estados de rentabilidad.
 */

import { memo, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { profitAnalysisRequestSchema, type ProfitAnalysisRequest } from '../../types/business';

interface ProfitFormProps {
  onSubmit: (data: ProfitAnalysisRequest) => void;
  isLoading: boolean;
  className?: string;
}

const ProfitForm = memo<ProfitFormProps>(({ onSubmit, isLoading, className = '' }) => {
  const { t } = useTranslation();

  const formSchema = useMemo(() => profitAnalysisRequestSchema.refine(
    (data) => data.ingresoTotal >= 0 && data.costoTotal >= 0,
    {
      message: t('profit.validation.ingresoTotalMin'),
      path: ['ingresoTotal'],
    }
  ), [t]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ProfitAnalysisRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      ingresoTotal: 0,
      costoTotal: 0,
      description: '',
    },
  });

  const watchedFields = watch();
  const ingresoTotal = watchedFields.ingresoTotal || 0;
  const costoTotal = watchedFields.costoTotal || 0;
  const profit = ingresoTotal - costoTotal;
  const profitMargin = ingresoTotal > 0 ? (profit / ingresoTotal) * 100 : 0;

  // Determine profit status for alerts and styling
  const profitStatus = useMemo(() => {
    if (profit > 0) {
      if (profitMargin >= 20) return 'excellent';
      if (profitMargin >= 10) return 'good';
      if (profitMargin >= 5) return 'average';
      return 'low';
    } else if (profit < 0) {
      return 'loss';
    }
    return 'breakeven';
  }, [profit, profitMargin]);

  const getStatusColor = useCallback((status: string) => {
    const colors: Record<string, string> = {
      excellent: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      good: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      average: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      low: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      loss: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      breakeven: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800',
    };
    return colors[status] || colors.breakeven;
  }, []);

  const getAlertMessage = useCallback((status: string) => {
    const messages: Record<string, string> = {
      excellent: t('profit.alerts.highProfit'),
      good: t('profit.alerts.highProfit'),
      average: '',
      low: t('profit.alerts.lowProfit'),
      loss: t('profit.alerts.loss'),
      breakeven: t('profit.alerts.breakeven'),
    };
    return messages[status] || '';
  }, [t]);

  const handleClear = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`space-y-4 ${className}`} 
      aria-label={t('profit.form.title')}
    >
      {/* Ingreso Total Field */}
      <div className="space-y-2">
        <label 
          htmlFor="ingresoTotal" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('profit.form.ingresoTotalLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="ingresoTotal"
            type="number"
            step="0.01"
            min="0"
            max="999999999"
            placeholder={t('profit.form.ingresoTotalPlaceholder')}
            {...register('ingresoTotal', { valueAsNumber: true })}
            disabled={isLoading}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            style={{
              borderColor: errors.ingresoTotal ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)'
            }}
            aria-describedby="ingresoTotal-description ingresoTotal-error"
            aria-invalid={!!errors.ingresoTotal}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('profit.form.ingresoTotalUnit')}
            </span>
          </div>
        </div>
        <p id="ingresoTotal-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('profit.form.ingresoTotalDescription')}
        </p>
        {errors.ingresoTotal && (
          <p id="ingresoTotal-error" className="text-sm text-red-600" role="alert">
            {errors.ingresoTotal.message}
          </p>
        )}
      </div>

      {/* Costo Total Field */}
      <div className="space-y-2">
        <label 
          htmlFor="costoTotal" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('profit.form.costoTotalLabel')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="costoTotal"
            type="number"
            step="0.01"
            min="0"
            max="999999999"
            placeholder={t('profit.form.costoTotalPlaceholder')}
            {...register('costoTotal', { valueAsNumber: true })}
            disabled={isLoading}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
            style={{
              borderColor: errors.costoTotal ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)'
            }}
            aria-describedby="costoTotal-description costoTotal-error"
            aria-invalid={!!errors.costoTotal}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">
              {t('profit.form.costoTotalUnit')}
            </span>
          </div>
        </div>
        <p id="costoTotal-description" className="text-sm text-gray-500 dark:text-gray-400">
          {t('profit.form.costoTotalDescription')}
        </p>
        {errors.costoTotal && (
          <p id="costoTotal-error" className="text-sm text-red-600" role="alert">
            {errors.costoTotal.message}
          </p>
        )}
        {costoTotal > ingresoTotal && ingresoTotal > 0 && (
          <p className="text-sm text-orange-600 dark:text-orange-400" role="alert">
            ⚠️ {t('profit.validation.costoExceedsRevenue')}
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
      <div className={`rounded-lg p-3 space-y-3 border-2 ${getStatusColor(profitStatus)}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {t('profit.form.calculation')}:
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">{t('profit.results.totalRevenue')}:</span>
            <span>{ingresoTotal.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t('profit.results.totalCosts')}:</span>
            <span>{costoTotal.toFixed(2)}€</span>
          </div>
          <hr className="border-current opacity-30" />
          <div className="flex justify-between text-base font-bold">
            <span>{t('profit.results.profit')}:</span>
            <span className={profit >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
              {profit >= 0 ? '+' : ''}{profit.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t('profit.results.profitMargin')}:</span>
            <span className={profitMargin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {profitMargin.toFixed(2)}%
            </span>
          </div>
          <div className="text-xs opacity-75 mt-3 space-y-1">
            <div>{t('profit.form.formula')}</div>
            <div>{t('profit.form.marginFormula')}</div>
          </div>
          {getAlertMessage(profitStatus) && (
            <div className="text-xs font-medium mt-2 p-2 rounded border border-current border-opacity-30">
              {getAlertMessage(profitStatus)}
            </div>
          )}
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
          aria-label={t('profit.form.analyze')}
        >
          {isLoading || isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('profit.form.analyzing')}
            </>
          ) : (
            t('profit.form.analyze')
          )}
        </button>
      </div>
      <p id="submit-status" className="sr-only">
        {isLoading ? t('profit.states.calculating') : t('profit.states.noResults')}
      </p>
    </form>
  );
});

ProfitForm.displayName = 'ProfitForm';

export default ProfitForm;
