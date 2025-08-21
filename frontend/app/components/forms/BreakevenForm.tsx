/**
 * @fileoverview Formulario para el análisis de punto de equilibrio empresarial
 * @version 2.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-21
 *
 * @description
 * Componente de formulario compacto para análisis de punto de equilibrio.
 * Utiliza sistema de temas unificado con tokens CSS y estados visuales consistentes.
 * Implementa validación en tiempo real y cálculo automático de métricas.
 *
 * @dependencies
 * - React Hook Form
 * - Zod
 * - react-i18next
 * - @hookform/resolvers/zod
 * - Sistema de temas unificado
 *
 * @usage
 * <BreakevenForm onSubmit={handleBreakevenSubmit} isLoading={isSubmitting} />
 *
 * @state
 * ✅ COMPLETADO - Tokens de tema y estados visuales implementados
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: HIGH] Implementar análisis de sensibilidad interactivo
 * - [PRIORITY: MEDIUM] Añadir calculadora de escenarios múltiples
 * - [PRIORITY: LOW] Agregar simulador de cambios de mercado
 * - [PRIORITY: MEDIUM] Integrar recomendaciones de precios dinámicas
 *
 * @performance
 * - Optimizado con `memo` y `useCallback` para evitar re-renders innecesarios
 * - Validación eficiente con Zod y validaciones de negocio
 * - Cálculo en tiempo real con debouncing implícito
 * - Alertas condicionales para rendimiento óptimo
 *
 * @accessibility
 * - Etiquetas y descripciones claras para cada campo
 * - Mensajes de error y alerta accesibles
 * - Navegación por teclado completa
 * - ARIA labels y descriptions apropiadas
 * - Indicadores visuales para viabilidad del negocio
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
      className={`space-y-4 ${className}`} 
      aria-label={t('breakeven.form.title')}
    >
      {/* Costos Fijos Field */}
      <div className="space-y-2">
        <label 
          htmlFor="costosFijos" 
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {t('breakeven.form.costosFijosLabel')}
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="costosFijos"
            type="text"
            inputMode="decimal"
            placeholder={t('breakeven.form.costosFijosPlaceholder')}
            {...register('costosFijos', { valueAsNumber: true })}
            disabled={isLoading}
            className="
              block w-full px-3 py-2 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: errors.costosFijos ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              boxShadow: errors.costosFijos ? '0 0 0 1px var(--color-error)' : 'none',
              '--tw-ring-color': 'var(--focus-ring)',
              '--tw-ring-offset-color': 'var(--color-background)'
            } as React.CSSProperties}
            aria-describedby="costosFijos-description costosFijos-error"
            aria-invalid={!!errors.costosFijos}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('breakeven.form.costosFijosUnit')}
            </span>
          </div>
        </div>
        {errors.costosFijos && (
          <p id="costosFijos-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.costosFijos.message}
          </p>
        )}
      </div>

      {/* Costo Variable Unitario Field */}
      <div className="space-y-2">
        <label 
          htmlFor="costoVariableUnitario" 
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {t('breakeven.form.costoVariableLabel')}
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="costoVariableUnitario"
            type="text"
            inputMode="decimal"
            placeholder={t('breakeven.form.costoVariablePlaceholder')}
            {...register('costoVariableUnitario', { valueAsNumber: true })}
            disabled={isLoading}
            className="
              block w-full px-3 py-2 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: errors.costoVariableUnitario ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              boxShadow: errors.costoVariableUnitario ? '0 0 0 1px var(--color-error)' : 'none',
              '--tw-ring-color': 'var(--focus-ring)',
              '--tw-ring-offset-color': 'var(--color-background)'
            } as React.CSSProperties}
            aria-describedby="costoVariableUnitario-description costoVariableUnitario-error"
            aria-invalid={!!errors.costoVariableUnitario}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('breakeven.form.costoVariableUnit')}
            </span>
          </div>
        </div>
        {errors.costoVariableUnitario && (
          <p id="costoVariableUnitario-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.costoVariableUnitario.message}
          </p>
        )}
      </div>

      {/* Precio de Venta Field */}
      <div className="space-y-2">
        <label 
          htmlFor="precio" 
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {t('breakeven.form.precioVentaLabel')}
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <div className="relative">
          <input
            id="precio"
            type="text"
            inputMode="decimal"
            placeholder={t('breakeven.form.precioVentaPlaceholder')}
            {...register('precio', { valueAsNumber: true })}
            disabled={isLoading}
            className="
              block w-full px-3 py-2 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: errors.precio ? 'var(--color-error)' : 'var(--color-divider)',
              color: 'var(--color-text)',
              boxShadow: errors.precio ? '0 0 0 1px var(--color-error)' : 'none',
              '--tw-ring-color': 'var(--focus-ring)',
              '--tw-ring-offset-color': 'var(--color-background)'
            } as React.CSSProperties}
            aria-describedby="precio-description precio-error"
            aria-invalid={!!errors.precio}
            aria-required="true"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('breakeven.form.precioVentaUnit')}
            </span>
          </div>
        </div>
        {errors.precio && (
          <p id="precio-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.precio.message}
          </p>
        )}
        {precio <= costoVariableUnitario && precio > 0 && costoVariableUnitario > 0 && (
          <p className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            ⚠️ {t('breakeven.validation.priceMustExceedVariable')}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label 
          htmlFor="description" 
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {t('form.descriptionLabel')}
        </label>
        <textarea
          id="description"
          rows={2}
          maxLength={200}
          placeholder={t('form.placeholders.description')}
          {...register('description')}
          disabled={isLoading}
          className="
            block w-full px-3 py-2 border rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-vertical transition-all duration-200
          "
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-divider)',
            color: 'var(--color-text)',
            '--tw-ring-color': 'var(--focus-ring)',
            '--tw-ring-offset-color': 'var(--color-background)'
          } as React.CSSProperties}
          aria-describedby="description-help"
        />
        <p id="description-help" className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {t('form.optional')} - {t('form.maxCharacters', { count: 200 })}
        </p>
      </div>

      {/* Real-time Break-even Calculation Display */}
      <div className="rounded-lg p-4 space-y-3 border-2" style={{
        background: 'var(--color-surface-elevated)',
        borderColor: viabilityStatus === 'negative' ? 'var(--color-error)' : 
                     viabilityStatus === 'critical' ? 'var(--color-warning)' :
                     viabilityStatus === 'low' ? 'var(--color-warning)' :
                     viabilityStatus === 'good' ? 'var(--color-info)' : 'var(--color-success)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            {t('breakeven.form.calculation')}:
          </span>
                    <div className="text-xs px-2 py-1 rounded-full font-medium" style={{
            background: viabilityStatus === 'negative' ? 'var(--color-error)' : 
                       viabilityStatus === 'critical' ? 'var(--color-warning)' : 
                       viabilityStatus === 'low' ? 'var(--color-warning)' : 
                       viabilityStatus === 'good' ? 'var(--color-info)' : 'var(--color-success)',
            color: 'white',
            opacity: 0.9
          }}>
            {viabilityStatus === 'negative' ? '⚠️ No viable' :
             viabilityStatus === 'critical' ? '🔴 Crítico' :
             viabilityStatus === 'low' ? '🟡 Bajo' :
             viabilityStatus === 'good' ? '🟢 Bueno' : '✅ Excelente'}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center py-1">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>{t('breakeven.results.contributionMargin')}:</span>
            <span className="font-mono text-base" style={{ 
              color: contributionMargin >= 0 ? 'var(--color-success)' : 'var(--color-error)' 
            }}>
              {contributionMargin.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>{t('breakeven.results.contributionRatio')}:</span>
            <span className="font-mono text-base" style={{ 
              color: contributionRatio >= 0 ? 'var(--color-success)' : 'var(--color-error)' 
            }}>
              {contributionRatio.toFixed(1)}%
            </span>
          </div>
          <hr style={{ borderColor: 'var(--color-divider)', opacity: 0.3 }} />
          <div className="flex justify-between text-base font-bold py-1">
            <span style={{ color: 'var(--color-text)' }}>{t('breakeven.results.breakevenUnits')}:</span>
            <span className="font-mono" style={{ 
              color: contributionMargin > 0 ? 'var(--color-primary)' : 'var(--color-error)' 
            }}>
              {contributionMargin > 0 ? Math.ceil(breakevenUnits).toLocaleString() : 'N/A'} {contributionMargin > 0 ? 'unidades' : ''}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>{t('breakeven.results.breakevenRevenue')}:</span>
            <span className="font-mono text-base" style={{ 
              color: contributionMargin > 0 ? 'var(--color-primary)' : 'var(--color-error)' 
            }}>
              {contributionMargin > 0 ? breakevenRevenue.toFixed(2) + '€' : 'N/A'}
            </span>
          </div>
          <div className="text-xs opacity-75 mt-3 space-y-1 p-2 rounded" style={{ 
            color: 'var(--color-text-secondary)',
            background: 'var(--color-surface)'
          }}>
            <div className="font-mono">{t('breakeven.form.formula')}</div>
            <div className="font-mono">{t('breakeven.form.marginFormula')}</div>
          </div>
          {getAlertMessage(viabilityStatus) && (
                        <div className="text-xs font-medium mt-2 p-2 rounded border" style={{
              color: viabilityStatus === 'negative' ? 'var(--color-error)' : 
                     viabilityStatus === 'critical' ? 'var(--color-warning)' : 
                     viabilityStatus === 'low' ? 'var(--color-warning)' : 
                     viabilityStatus === 'good' ? 'var(--color-info)' : 'var(--color-success)',
              borderColor: viabilityStatus === 'negative' ? 'var(--color-error)' : 
                          viabilityStatus === 'critical' ? 'var(--color-warning)' : 
                          viabilityStatus === 'low' ? 'var(--color-warning)' : 
                          viabilityStatus === 'good' ? 'var(--color-info)' : 'var(--color-success)',
              background: 'var(--color-surface)',
              opacity: 0.3
            }}>
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
            flex-1 sm:flex-none px-4 py-2 border rounded-lg shadow-sm
            text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
            hover:enabled:shadow-md hover:enabled:scale-[1.01]
          "
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-divider)',
            color: 'var(--color-text)',
            '--tw-ring-color': 'var(--focus-ring)',
            '--tw-ring-offset-color': 'var(--color-background)'
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = 'var(--color-surface)';
              e.currentTarget.style.borderColor = 'var(--color-text-secondary)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = 'var(--color-surface-elevated)';
              e.currentTarget.style.borderColor = 'var(--color-divider)';
            }
          }}
          aria-label={t('form.clear')}
        >
          {t('form.clear')}
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading || isSubmitting || contributionMargin <= 0}
          className="
            flex-1 sm:flex-none px-4 py-2 border border-transparent rounded-lg shadow-sm
            text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
            hover:enabled:shadow-lg hover:enabled:scale-[1.02]
          "
          style={{
            background: !isValid || isLoading || isSubmitting || contributionMargin <= 0
              ? 'var(--color-secondary)'
              : 'var(--color-primary)',
            color: 'white',
            '--tw-ring-color': 'var(--focus-ring)',
            '--tw-ring-offset-color': 'var(--color-background)'
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            if (!(!isValid || isLoading || isSubmitting || contributionMargin <= 0)) {
              e.currentTarget.style.background = 'var(--color-primary-dark)';
            }
          }}
          onMouseLeave={(e) => {
            if (!(!isValid || isLoading || isSubmitting || contributionMargin <= 0)) {
              e.currentTarget.style.background = 'var(--color-primary)';
            }
          }}
          aria-describedby="submit-status"
          aria-label={t('breakeven.form.analyze')}
        >
          {isLoading || isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
