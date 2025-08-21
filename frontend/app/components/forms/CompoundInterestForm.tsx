/**
 * @fileoverview Formulario para el análisis de interés compuesto
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 *
 * @description
 * Componente de formulario compacto para análisis de interés compuesto.
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
 * <CompoundInterestForm onSubmit={handleCompoundInterestSubmit} isLoading={isSubmitting} />
 *
 * @state
 * 🔄 EN DESARROLLO - Implementación inicial con sistema de temas
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: HIGH] Implementar cálculos en tiempo real
 * - [PRIORITY: MEDIUM] Añadir gráficos de proyección
 * - [PRIORITY: LOW] Agregar comparación de escenarios
 * - [PRIORITY: MEDIUM] Integrar con API backend
 *
 * @performance
 * - Optimizado con `memo` y `useCallback` para evitar re-renders innecesarios
 * - Validación eficiente con Zod y validaciones de negocio
 * - Cálculo en tiempo real con debouncing implícito
 *
 * @accessibility
 * - Etiquetas y descripciones claras para cada campo
 * - Mensajes de error accesibles
 * - Navegación por teclado completa
 * - ARIA labels y descriptions apropiadas
 */

import { memo, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { compoundInterestRequestSchema, type CompoundInterestRequest } from '../../types/business';

interface CompoundInterestFormProps {
  onSubmit: (data: CompoundInterestRequest) => void;
  isLoading: boolean;
  className?: string;
}

const CompoundInterestForm = memo<CompoundInterestFormProps>(({ onSubmit, isLoading, className = '' }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<CompoundInterestRequest>({
    resolver: zodResolver(compoundInterestRequestSchema),
    mode: 'onChange',
    defaultValues: {
      principal: 0,
      tasaAnual: 0,
      años: 0,
      frecuenciaAnual: 12,
      contribuciones: 0,
      frecuenciaContribucion: 'mensual',
      description: '',
    },
  });

  const watchedFields = watch();
  const principal = watchedFields.principal || 0;
  const tasaAnual = watchedFields.tasaAnual || 0;
  const años = watchedFields.años || 0;
  const contribuciones = watchedFields.contribuciones ?? 0;

  // Calculate compound interest in real-time
  const calculateCompoundInterest = useCallback((p: number, r: number, t: number, freq: number, contrib: number, contribFreq: string) => {
    if (p <= 0 || r <= 0 || t <= 0) return { finalAmount: 0, totalInterest: 0, totalContributions: 0 };

    const contribFrequencyMap = {
      'mensual': 12,
      'anual': 1
    };

    const compoundFreq = freq || 12;
    const contribFreqValue = contribFrequencyMap[contribFreq as keyof typeof contribFrequencyMap] || 12;

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const ratePerPeriod = r / compoundFreq;
    const periods = t * compoundFreq;
    const finalAmount = p * Math.pow(1 + ratePerPeriod, periods);

    // Additional contributions
    const totalContributions = contrib * contribFreqValue * t;
    const totalAmount = finalAmount + totalContributions;
    const totalInterest = totalAmount - p - totalContributions;

    return {
      finalAmount: totalAmount,
      totalInterest,
      totalContributions
    };
  }, []);

  const calculation = useMemo(() => 
    calculateCompoundInterest(principal, tasaAnual, años, watchedFields.frecuenciaAnual, contribuciones, watchedFields.frecuenciaContribucion || 'mensual'),
    [principal, tasaAnual, años, watchedFields.frecuenciaAnual, contribuciones, watchedFields.frecuenciaContribucion, calculateCompoundInterest]
  );

  const handleClear = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <form
      onSubmit={handleSubmit((data: CompoundInterestRequest) => onSubmit(data))}
      className={`space-y-4 ${className}`}
      aria-label="Análisis de Interés Compuesto"
    >
      {/* Capital Inicial */}
      <div className="space-y-2">
        <label
          htmlFor="principal"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Capital Inicial (€)
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <input
          id="principal"
          type="text"
          inputMode="decimal"
          placeholder="10000"
          {...register('principal', { valueAsNumber: true })}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: errors.principal ? 'var(--color-error)' : 'var(--color-divider)',
            color: 'var(--color-text)',
            boxShadow: errors.principal ? '0 0 0 1px var(--color-error)' : 'none'
          }}
          aria-describedby="principal-error"
          aria-invalid={!!errors.principal}
          aria-required="true"
        />
        {errors.principal && (
          <p id="principal-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.principal.message}
          </p>
        )}
      </div>

      {/* Tasa Anual */}
      <div className="space-y-2">
        <label
          htmlFor="tasaAnual"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Tasa Anual (%)
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <input
          id="tasaAnual"
          type="text"
          inputMode="decimal"
          placeholder="0.05"
          {...register('tasaAnual', { valueAsNumber: true })}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: errors.tasaAnual ? 'var(--color-error)' : 'var(--color-divider)',
            color: 'var(--color-text)',
            boxShadow: errors.tasaAnual ? '0 0 0 1px var(--color-error)' : 'none'
          }}
          aria-describedby="tasaAnual-error"
          aria-invalid={!!errors.tasaAnual}
          aria-required="true"
        />
        {errors.tasaAnual && (
          <p id="tasaAnual-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.tasaAnual.message}
          </p>
        )}
      </div>

      {/* Años */}
      <div className="space-y-2">
        <label
          htmlFor="años"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Años
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <input
          id="años"
          type="text"
          inputMode="decimal"
          placeholder="10"
          {...register('años', { valueAsNumber: true })}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: errors.años ? 'var(--color-error)' : 'var(--color-divider)',
            color: 'var(--color-text)',
            boxShadow: errors.años ? '0 0 0 1px var(--color-error)' : 'none'
          }}
          aria-describedby="años-error"
          aria-invalid={!!errors.años}
          aria-required="true"
        />
        {errors.años && (
          <p id="años-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.años.message}
          </p>
        )}
      </div>

      {/* Frecuencia Anual */}
      <div className="space-y-2">
        <label
          htmlFor="frecuenciaAnual"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Frecuencia de Capitalización
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <select
          id="frecuenciaAnual"
          {...register('frecuenciaAnual')}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-divider)',
            color: 'var(--color-text)'
          }}
        >
          <option value="12">Mensualmente</option>
          <option value="6">Semestralmente</option>
          <option value="4">Trimestralmente</option>
          <option value="1">Anualmente</option>
        </select>
      </div>

      {/* Contribuciones */}
      <div className="space-y-2">
        <label
          htmlFor="contribuciones"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Contribuciones Adicionales (€)
        </label>
        <input
          id="contribuciones"
          type="text"
          inputMode="decimal"
          placeholder="100"
          {...register('contribuciones', { valueAsNumber: true })}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: errors.contribuciones ? 'var(--color-error)' : 'var(--color-divider)',
            color: 'var(--color-text)',
            boxShadow: errors.contribuciones ? '0 0 0 1px var(--color-error)' : 'none'
          }}
          aria-describedby="contribuciones-error"
          aria-invalid={!!errors.contribuciones}
        />
        {errors.contribuciones && (
          <p id="contribuciones-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.contribuciones.message}
          </p>
        )}
      </div>

      {/* Frecuencia de Contribución */}
      <div className="space-y-2">
        <label
          htmlFor="frecuenciaContribucion"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Frecuencia de Contribuciones
        </label>
        <select
          id="frecuenciaContribucion"
          {...register('frecuenciaContribucion')}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-divider)',
            color: 'var(--color-text)'
          }}
        >
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          rows={2}
          maxLength={200}
          placeholder="Descripción del análisis..."
          {...register('description')}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-divider)',
            color: 'var(--color-text)'
          }}
          aria-describedby="description-help"
        />
        <p id="description-help" className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Opcional - Máximo 200 caracteres
        </p>
      </div>

      {/* Cálculo en Tiempo Real */}
      <div className="rounded-lg p-4 space-y-3 border-2" style={{
        background: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-success)'
      }}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            Proyección de Inversión:
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Monto Final:</span>
            <span style={{ color: 'var(--color-success)' }}>
              {calculation.finalAmount.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Interés Total:</span>
            <span style={{ color: 'var(--color-success)' }}>
              {calculation.totalInterest.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Contribuciones:</span>
            <span style={{ color: 'var(--color-info)' }}>
              {calculation.totalContributions.toFixed(2)}€
            </span>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="flex-1 sm:flex-none px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-divider)',
            color: 'var(--color-text)'
          }}
          aria-label="Limpiar formulario"
        >
          Limpiar
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading || isSubmitting}
          className="flex-1 sm:flex-none px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: !isValid || isLoading || isSubmitting
              ? 'var(--color-divider)'
              : 'var(--color-primary)',
            color: 'white'
          }}
          aria-describedby="submit-status"
          aria-label="Analizar interés compuesto"
        >
          {isLoading || isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analizando...
            </>
          ) : (
            'Analizar Interés Compuesto'
          )}
        </button>
      </div>
      <p id="submit-status" className="sr-only">
        {isLoading ? 'Calculando...' : 'Formulario listo para enviar'}
      </p>
    </form>
  );
});

CompoundInterestForm.displayName = 'CompoundInterestForm';

export default CompoundInterestForm;
