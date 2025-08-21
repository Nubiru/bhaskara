/**
 * @fileoverview Formulario para conversión de divisas
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 *
 * @description
 * Componente de formulario compacto para conversión de divisas.
 * Utiliza sistema de temas unificado con tokens CSS y estados visuales consistentes.
 * Implementa validación en tiempo real y conversión automática de monedas.
 *
 * @dependencies
 * - React Hook Form
 * - Zod
 * - react-i18next
 * - @hookform/resolvers/zod
 * - Sistema de temas unificado
 *
 * @usage
 * <CurrencyConverterForm onSubmit={handleCurrencyConversionSubmit} isLoading={isSubmitting} />
 *
 * @state
 * 🔄 EN DESARROLLO - Implementación inicial con sistema de temas
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: HIGH] Integrar con API de tasas de cambio en tiempo real
 * - [PRIORITY: MEDIUM] Añadir historial de conversiones
 * - [PRIORITY: LOW] Agregar gráficos de tendencias
 * - [PRIORITY: MEDIUM] Implementar caché de tasas de cambio
 *
 * @performance
 * - Optimizado con `memo` y `useCallback` para evitar re-renders innecesarios
 * - Validación eficiente con Zod
 * - Conversión en tiempo real con debouncing implícito
 *
 * @accessibility
 * - Etiquetas y descripciones claras para cada campo
 * - Mensajes de error accesibles
 * - Navegación por teclado completa
 * - ARIA labels y descriptions apropiadas
 */

import { memo, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { currencyConversionRequestSchema, type CurrencyConversionRequest, AVAILABLE_CURRENCIES } from '../../types/business';

interface CurrencyConverterFormProps {
  onSubmit: (data: CurrencyConversionRequest) => void;
  isLoading: boolean;
  className?: string;
}

const CurrencyConverterForm = memo<CurrencyConverterFormProps>(({ onSubmit, isLoading, className = '' }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<CurrencyConversionRequest>({
    resolver: zodResolver(currencyConversionRequestSchema),
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      fromCurrency: 'EUR',
      toCurrency: 'USD',
      description: '',
    },
  });

  const watchedFields = watch();
  const amount = watchedFields.amount || 0;
  const fromCurrency = watchedFields.fromCurrency;
  const toCurrency = watchedFields.toCurrency;

  // Filter currencies based on search term
  const filteredCurrencies = useMemo(() => {
    if (!searchTerm) return AVAILABLE_CURRENCIES;
    return AVAILABLE_CURRENCIES.filter(currency =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Mock exchange rates (in real implementation, this would come from an API)
  const mockExchangeRates = useMemo(() => ({
    'EUR-USD': 1.08,
    'EUR-GBP': 0.86,
    'EUR-JPY': 160.50,
    'USD-EUR': 0.93,
    'USD-GBP': 0.80,
    'USD-JPY': 148.61,
    'GBP-EUR': 1.16,
    'GBP-USD': 1.25,
    'GBP-JPY': 185.76,
    'JPY-EUR': 0.0062,
    'JPY-USD': 0.0067,
    'JPY-GBP': 0.0054,
  }), []);

  // Calculate conversion in real-time
  const conversion = useMemo(() => {
    if (amount <= 0 || fromCurrency === toCurrency) {
      return { rate: 1, convertedAmount: amount, lastUpdated: new Date().toISOString(), source: 'Mock API' };
    }

    const rateKey = `${fromCurrency}-${toCurrency}`;
    const rate = mockExchangeRates[rateKey as keyof typeof mockExchangeRates] || 1;
    const convertedAmount = amount * rate;

    return {
      rate,
      convertedAmount,
      lastUpdated: new Date().toISOString(),
      source: 'Mock API'
    };
  }, [amount, fromCurrency, toCurrency, mockExchangeRates]);

  const handleClear = useCallback(() => {
    reset();
    setSearchTerm('');
  }, [reset]);

  const handleSwapCurrencies = useCallback(() => {
    setValue('fromCurrency', toCurrency);
    setValue('toCurrency', fromCurrency);
  }, [fromCurrency, toCurrency, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
      aria-label="Conversor de Divisas"
    >
      {/* Monto a convertir */}
      <div className="space-y-2">
        <label
          htmlFor="amount"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Monto a convertir
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          placeholder="100"
          {...register('amount', { valueAsNumber: true })}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: errors.amount ? 'var(--color-error)' : 'var(--color-divider)',
            color: 'var(--color-text)',
            boxShadow: errors.amount ? '0 0 0 1px var(--color-error)' : 'none'
          }}
          aria-describedby="amount-error"
          aria-invalid={!!errors.amount}
          aria-required="true"
        />
        {errors.amount && (
          <p id="amount-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* Monedas de origen y destino */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Moneda de origen */}
        <div className="space-y-2">
          <label
            htmlFor="fromCurrency"
            className="block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Moneda de origen
          </label>
          <select
            id="fromCurrency"
            {...register('fromCurrency')}
            disabled={isLoading}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-divider)',
              color: 'var(--color-text)'
            }}
          >
            {filteredCurrencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de intercambio */}
        <div className="flex items-end justify-center">
          <button
            type="button"
            onClick={handleSwapCurrencies}
            disabled={isLoading}
            className="px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-divider)',
              color: 'var(--color-text)'
            }}
            aria-label="Intercambiar monedas"
          >
            🔄
          </button>
        </div>

        {/* Moneda de destino */}
        <div className="space-y-2">
          <label
            htmlFor="toCurrency"
            className="block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Moneda de destino
          </label>
          <select
            id="toCurrency"
            {...register('toCurrency')}
            disabled={isLoading}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-divider)',
              color: 'var(--color-text)'
            }}
          >
            {filteredCurrencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Búsqueda de monedas */}
      <div className="space-y-2">
        <label
          htmlFor="currencySearch"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Buscar moneda
        </label>
        <input
          id="currencySearch"
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-divider)',
            color: 'var(--color-text)'
          }}
        />
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
          placeholder="Descripción de la conversión..."
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

      {/* Conversión en tiempo real */}
      <div className="rounded-lg p-4 space-y-3 border-2" style={{
        background: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-info)'
      }}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            Conversión en tiempo real:
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Tasa de cambio:</span>
            <span style={{ color: 'var(--color-info)' }}>
              1 {fromCurrency} = {conversion.rate.toFixed(4)} {toCurrency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Monto convertido:</span>
            <span style={{ color: 'var(--color-success)' }}>
              {conversion.convertedAmount.toFixed(2)} {toCurrency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Última actualización:</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {new Date(conversion.lastUpdated).toLocaleString()}
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
          aria-label="Convertir divisas"
        >
          {isLoading || isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Convirtiendo...
            </>
          ) : (
            'Convertir Divisas'
          )}
        </button>
      </div>
      <p id="submit-status" className="sr-only">
        {isLoading ? 'Convirtiendo...' : 'Formulario listo para enviar'}
      </p>
    </form>
  );
});

CurrencyConverterForm.displayName = 'CurrencyConverterForm';

export default CurrencyConverterForm;
