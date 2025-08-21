/**
 * @fileoverview Formulario avanzado para conversión de sistemas numéricos
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 *
 * @description
 * Componente avanzado para conversión entre sistemas numéricos posicionales.
 * Soporta Decimal, Binario, Octal, Hexadecimal con validación y cálculos en tiempo real.
 * Utiliza sistema de temas unificado con tokens CSS y estados visuales consistentes.
 *
 * @dependencies
 * - React Hook Form
 * - Zod
 * - react-i18next
 * - @hookform/resolvers/zod
 * - Sistema de temas unificado
 *
 * @usage
 * <AdvancedNumberSystemForm onSubmit={handleNumberSystemSubmit} isLoading={isSubmitting} />
 *
 * @state
 * 🔄 EN DESARROLLO - Implementación inicial con sistema de temas
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: HIGH] Implementar validación de entrada según sistema
 * - [PRIORITY: MEDIUM] Añadir operaciones aritméticas entre sistemas
 * - [PRIORITY: LOW] Agregar representación visual de bits
 * - [PRIORITY: MEDIUM] Integrar con API backend para cálculos complejos
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
import { z } from 'zod';

// Schema para validación de conversión de sistemas numéricos
const numberSystemConversionSchema = z.object({
  inputValue: z.string()
    .min(1, 'Debe ingresar un valor')
    .refine(val => val.trim().length > 0, 'El valor no puede estar vacío'),
  fromSystem: z.enum(['decimal', 'binary', 'octal', 'hexadecimal']),
  toSystem: z.enum(['decimal', 'binary', 'octal', 'hexadecimal']),
  description: z.string().optional()
});

type NumberSystemConversionRequest = z.infer<typeof numberSystemConversionSchema>;

interface AdvancedNumberSystemFormProps {
  onSubmit: (data: NumberSystemConversionRequest) => void;
  isLoading: boolean;
  className?: string;
}

const AdvancedNumberSystemForm = memo<AdvancedNumberSystemFormProps>(({ onSubmit, isLoading, className = '' }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<NumberSystemConversionRequest>({
    resolver: zodResolver(numberSystemConversionSchema),
    mode: 'onChange',
    defaultValues: {
      inputValue: '',
      fromSystem: 'decimal',
      toSystem: 'binary',
      description: '',
    },
  });

  const watchedFields = watch();
  const fromSystem = watchedFields.fromSystem;
  const toSystem = watchedFields.toSystem;

  // Number system configurations
  const numberSystems = useMemo(() => ({
    decimal: { name: 'Decimal', prefix: '', base: 10, digits: '0-9', example: '255' },
    binary: { name: 'Binario', prefix: '0b', base: 2, digits: '0-1', example: '11111111' },
    octal: { name: 'Octal', prefix: '0o', base: 8, digits: '0-7', example: '377' },
    hexadecimal: { name: 'Hexadecimal', prefix: '0x', base: 16, digits: '0-9, A-F', example: 'FF' }
  }), []);

  // Validate input based on selected system
  const validateInput = useCallback((value: string, system: string) => {
    if (!value) return { isValid: false, error: '', decimalValue: 0 };

    const systemConfig = numberSystems[system as keyof typeof numberSystems];
    const cleanValue = value.replace(new RegExp(`^${systemConfig.prefix}`, 'i'), '');

    try {
      let decimalValue: number;
      
      switch (system) {
        case 'decimal':
          decimalValue = parseInt(cleanValue, 10);
          if (isNaN(decimalValue)) throw new Error('Valor decimal inválido');
          break;
        case 'binary':
          if (!/^[01]+$/.test(cleanValue)) throw new Error('Solo se permiten dígitos 0 y 1');
          decimalValue = parseInt(cleanValue, 2);
          break;
        case 'octal':
          if (!/^[0-7]+$/.test(cleanValue)) throw new Error('Solo se permiten dígitos 0-7');
          decimalValue = parseInt(cleanValue, 8);
          break;
        case 'hexadecimal':
          if (!/^[0-9A-Fa-f]+$/.test(cleanValue)) throw new Error('Solo se permiten dígitos 0-9 y A-F');
          decimalValue = parseInt(cleanValue, 16);
          break;
        default:
          throw new Error('Sistema numérico no soportado');
      }

      return { isValid: true, error: '', decimalValue };
    } catch (error) {
      return { isValid: false, error: (error as Error).message, decimalValue: 0 };
    }
  }, [numberSystems]);

  // Convert between number systems
  const convertNumber = useCallback((decimalValue: number, targetSystem: string) => {
    if (targetSystem === 'decimal') return decimalValue.toString();
    
    const systemConfig = numberSystems[targetSystem as keyof typeof numberSystems];
    let result: string;
    
    switch (targetSystem) {
      case 'binary':
        result = decimalValue.toString(2);
        break;
      case 'octal':
        result = decimalValue.toString(8);
        break;
      case 'hexadecimal':
        result = decimalValue.toString(16).toUpperCase();
        break;
      default:
        result = decimalValue.toString();
    }
    
    return systemConfig.prefix + result;
  }, [numberSystems]);

  // Real-time conversion
  const conversion = useMemo(() => {
    const validation = validateInput(inputValue, fromSystem);
    
    if (!validation.isValid) {
      return {
        isValid: false,
        error: validation.error,
        fromValue: inputValue,
        toValue: '',
        decimalValue: 0,
        binaryRepresentation: '',
        bitCount: 0
      };
    }

    const decimalValue = validation.decimalValue;
    const toValue = convertNumber(decimalValue, toSystem);
    const binaryRepresentation = decimalValue.toString(2);
    const bitCount = binaryRepresentation.length;

    return {
      isValid: true,
      error: '',
      fromValue: inputValue,
      toValue,
      decimalValue,
      binaryRepresentation,
      bitCount
    };
  }, [inputValue, fromSystem, toSystem, validateInput, convertNumber]);

  const handleClear = useCallback(() => {
    reset();
    setInputValue('');
  }, [reset]);

  const handleSwapSystems = useCallback(() => {
    setValue('fromSystem', toSystem);
    setValue('toSystem', fromSystem);
  }, [fromSystem, toSystem, setValue]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValue('inputValue', value);
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
      aria-label="Conversor Avanzado de Sistemas Numéricos"
    >
      {/* Valor de entrada */}
      <div className="space-y-2">
        <label
          htmlFor="inputValue"
          className="block text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Valor a convertir
          <span style={{ color: 'var(--color-error)' }} className="ml-1">*</span>
        </label>
        <input
          id="inputValue"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={numberSystems[fromSystem].example}
          disabled={isLoading}
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-mono text-lg"
          style={{
            background: 'var(--color-surface-elevated)',
            borderColor: conversion.error ? 'var(--color-error)' : 'var(--color-divider)',
            color: 'var(--color-text)',
            boxShadow: conversion.error ? '0 0 0 1px var(--color-error)' : 'none'
          }}
          aria-describedby="inputValue-error inputValue-help"
          aria-invalid={!!conversion.error}
          aria-required="true"
        />
        <p id="inputValue-help" className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Sistema actual: {numberSystems[fromSystem].name} - Dígitos válidos: {numberSystems[fromSystem].digits}
        </p>
        {conversion.error && (
          <p id="inputValue-error" className="text-sm" style={{ color: 'var(--color-error)' }} role="alert">
            ❌ {conversion.error}
          </p>
        )}
      </div>

      {/* Sistemas de origen y destino */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sistema de origen */}
        <div className="space-y-2">
          <label
            htmlFor="fromSystem"
            className="block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Sistema de origen
          </label>
          <select
            id="fromSystem"
            {...register('fromSystem')}
            disabled={isLoading}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-divider)',
              color: 'var(--color-text)'
            }}
          >
            {Object.entries(numberSystems).map(([key, system]) => (
              <option key={key} value={key}>
                {system.name} ({system.prefix})
              </option>
            ))}
          </select>
        </div>

        {/* Botón de intercambio */}
        <div className="flex items-end justify-center">
          <button
            type="button"
            onClick={handleSwapSystems}
            disabled={isLoading}
            className="px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-divider)',
              color: 'var(--color-text)'
            }}
            aria-label="Intercambiar sistemas numéricos"
          >
            🔄
          </button>
        </div>

        {/* Sistema de destino */}
        <div className="space-y-2">
          <label
            htmlFor="toSystem"
            className="block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Sistema de destino
          </label>
          <select
            id="toSystem"
            {...register('toSystem')}
            disabled={isLoading}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{
              background: 'var(--color-surface-elevated)',
              borderColor: 'var(--color-divider)',
              color: 'var(--color-text)'
            }}
          >
            {Object.entries(numberSystems).map(([key, system]) => (
              <option key={key} value={key}>
                {system.name} ({system.prefix})
              </option>
            ))}
          </select>
        </div>
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
      {conversion.isValid && (
        <div className="rounded-lg p-4 space-y-3 border-2" style={{
          background: 'var(--color-surface-elevated)',
          borderColor: 'var(--color-success)'
        }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              Resultado de la conversión:
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium" style={{ color: 'var(--color-text)' }}>Valor original:</span>
              <span style={{ color: 'var(--color-text)' }} className="font-mono">
                {conversion.fromValue} ({fromSystem})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium" style={{ color: 'var(--color-text)' }}>Valor convertido:</span>
              <span style={{ color: 'var(--color-success)' }} className="font-mono text-lg">
                {conversion.toValue} ({toSystem})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium" style={{ color: 'var(--color-text)' }}>Valor decimal:</span>
              <span style={{ color: 'var(--color-info)' }} className="font-mono">
                {conversion.decimalValue}
              </span>
            </div>
            <hr style={{ borderColor: 'var(--color-divider)', opacity: 0.3 }} />
            <div className="flex justify-between">
              <span className="font-medium" style={{ color: 'var(--color-text)' }}>Representación binaria:</span>
              <span style={{ color: 'var(--color-primary)' }} className="font-mono">
                {conversion.binaryRepresentation}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium" style={{ color: 'var(--color-text)' }}>Número de bits:</span>
              <span style={{ color: 'var(--color-primary)' }}>
                {conversion.bitCount} bits
              </span>
            </div>
          </div>
        </div>
      )}

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
          disabled={!conversion.isValid || isLoading || isSubmitting}
          className="flex-1 sm:flex-none px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: !conversion.isValid || isLoading || isSubmitting
              ? 'var(--color-divider)'
              : 'var(--color-primary)',
            color: 'white'
          }}
          aria-describedby="submit-status"
          aria-label="Convertir sistema numérico"
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
            'Convertir Sistema Numérico'
          )}
        </button>
      </div>
      <p id="submit-status" className="sr-only">
        {isLoading ? 'Convirtiendo...' : 'Formulario listo para enviar'}
      </p>
    </form>
  );
});

AdvancedNumberSystemForm.displayName = 'AdvancedNumberSystemForm';

export default AdvancedNumberSystemForm;
