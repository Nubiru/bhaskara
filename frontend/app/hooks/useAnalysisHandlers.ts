/**
 * @fileoverview Hook personalizado para manejo de análisis de todas las herramientas
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 * 
 * @description
 * Hook centralizado que maneja todos los handlers de análisis para diferentes herramientas.
 * Proporciona estado unificado y funciones para enviar análisis al backend.
 * 
 * @dependencies
 * - useLocalHistory hook
 * - apiService
 * - Tipos de análisis
 * - Utilidades de API
 * 
 * @usage
 * const { handlers, analysisState, resetAnalysis } = useAnalysisHandlers();
 * 
 * @state
 * 🔄 EN DESARROLLO - Implementación inicial con handlers centralizados
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: HIGH] Implementar handlers para todas las herramientas
 * - [PRIORITY: MEDIUM] Agregar manejo de errores específicos por herramienta
 * - [PRIORITY: LOW] Implementar cache de resultados
 * 
 * @performance
 * - Estado unificado para evitar re-renders innecesarios
 * - Handlers memoizados con useCallback
 * - Lazy loading de resultados
 * 
 * @accessibility
 * - Manejo de errores accesible
 * - Estados de carga claros para usuarios
 * - Mensajes de error descriptivos
 */

import { useState, useCallback, useMemo } from 'react';
import { useLocalHistory } from './useLocalHistory';
import { apiService } from '../services/api';
import { withRetry, getErrorMessage, validateAnalysisRequest } from '../utils/api-helpers';
import type { 
  AnalysisHandlers, 
  UnifiedAnalysisState, 
  AnalysisState 
} from '../types/tools';
import type { AnalysisRequest, FullAnalysisResult } from '../types/quadratic';
import type { BreakEvenAnalysisRequest, BreakEvenAnalysisResult } from '../types/business';
import type { RevenueAnalysisRequest, RevenueAnalysisResult } from '../types/business';
import type { CompoundInterestRequest, CompoundInterestResult, CurrencyConversionRequest } from '../types/business';

// ========================================
// INITIAL STATE
// ========================================

/**
 * Estado inicial para análisis de Bhaskara
 */
const createInitialBhaskaraState = (): AnalysisState<FullAnalysisResult> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

/**
 * Estado inicial para análisis de punto de equilibrio
 */
const createInitialBreakevenState = (): AnalysisState<BreakEvenAnalysisResult> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

/**
 * Estado inicial para análisis de ingresos
 */
const createInitialRevenueState = (): AnalysisState<RevenueAnalysisResult> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

/**
 * Estado inicial para análisis de costos
 */
const createInitialCostsState = (): AnalysisState<any> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

/**
 * Estado inicial para análisis de interés compuesto
 */
const createInitialCompoundInterestState = (): AnalysisState<CompoundInterestResult> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

/**
 * Estado inicial para análisis de beneficios
 */
const createInitialProfitState = (): AnalysisState<any> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

/**
 * Estado inicial para conversión de divisas
 */
const createInitialCurrencyConverterState = (): AnalysisState<any> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

/**
 * Estado inicial para conversión de sistemas numéricos
 */
const createInitialNumberConverterState = (): AnalysisState<any> => ({
  isAnalyzing: false,
  result: null,
  error: null,
  lastAnalyzed: null
});

// ========================================
// HOOK IMPLEMENTATION
// ========================================

/**
 * Hook personalizado para manejo de análisis
 */
export const useAnalysisHandlers = () => {
  const { addToHistory } = useLocalHistory();

  // Estado unificado para todas las herramientas
  const [analysisState, setAnalysisState] = useState<UnifiedAnalysisState>({
    bhaskara: createInitialBhaskaraState(),
    breakeven: createInitialBreakevenState(),
    revenue: createInitialRevenueState(),
    costs: createInitialCostsState(),
    profit: createInitialProfitState(),
    compoundInterest: createInitialCompoundInterestState(),
    currencyConverter: createInitialCurrencyConverterState(),
    numberConverter: createInitialNumberConverterState()
  });

  // ========================================
  // STATE UPDATE HELPERS
  // ========================================

  /**
   * Actualiza el estado de análisis para una herramienta específica
   */
  const updateAnalysisState = useCallback(<T>(
    toolKey: keyof UnifiedAnalysisState,
    updates: Partial<AnalysisState<T>>
  ) => {
    setAnalysisState(prev => ({
      ...prev,
      [toolKey]: {
        ...prev[toolKey],
        ...updates
      }
    }));
  }, []);

  /**
   * Resetea el estado de análisis para una herramienta específica
   */
  const resetToolAnalysis = useCallback((toolKey: keyof UnifiedAnalysisState) => {
    const initialStateMap = {
      bhaskara: createInitialBhaskaraState,
      breakeven: createInitialBreakevenState,
      revenue: createInitialRevenueState,
      costs: createInitialCostsState,
      profit: createInitialProfitState,
      compoundInterest: createInitialCompoundInterestState,
      currencyConverter: createInitialCurrencyConverterState,
      numberConverter: createInitialNumberConverterState
    };

    const initialState = initialStateMap[toolKey]();
    updateAnalysisState(toolKey, initialState);
  }, [updateAnalysisState]);

  /**
   * Resetea el estado de análisis para todas las herramientas
   */
  const resetAllAnalysis = useCallback(() => {
    setAnalysisState({
      bhaskara: createInitialBhaskaraState(),
      breakeven: createInitialBreakevenState(),
      revenue: createInitialRevenueState(),
      costs: createInitialCostsState(),
      profit: createInitialProfitState(),
      compoundInterest: createInitialCompoundInterestState(),
      currencyConverter: createInitialCurrencyConverterState(),
      numberConverter: createInitialNumberConverterState()
    });
  }, []);

  // ========================================
  // ANALYSIS HANDLERS
  // ========================================

  /**
   * Handler para análisis de Bhaskara
   */
  const handleBhaskaraAnalysis = useCallback(async (data: AnalysisRequest) => {
    updateAnalysisState('bhaskara', { isAnalyzing: true, error: null });
    
    try {
      // Validación previa
      const validationError = validateAnalysisRequest(data);
      if (validationError) {
        throw new Error(validationError);
      }

      console.log('Iniciando análisis de Bhaskara:', data);
      
      // Construir request completo para API
      const apiRequest = {
        ...data,
        timestamp: new Date().toISOString(),
        clientVersion: '1.0.0',
        sessionId: crypto.randomUUID?.() || Math.random().toString(36)
      };

      // Llamada real al backend con retry automático
      const result = await withRetry(
        () => apiService.analyzeBhaskara(apiRequest),
        { maxAttempts: 3, baseDelay: 1000 }
      );
      
      console.log('Análisis de Bhaskara completado:', result);
      
      updateAnalysisState('bhaskara', {
        isAnalyzing: false,
        result,
        lastAnalyzed: new Date().toISOString()
      });
      
      // Guardar en historial local
      addToHistory(data, result);
    } catch (error) {
      console.error('Error durante análisis de Bhaskara:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('bhaskara', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [addToHistory, updateAnalysisState]);

  /**
   * Handler para análisis de punto de equilibrio
   */
  const handleBreakevenAnalysis = useCallback(async (data: BreakEvenAnalysisRequest) => {
    updateAnalysisState('breakeven', { isAnalyzing: true, error: null });

    try {
      console.log('Iniciando análisis de punto de equilibrio:', data);

      // Llamada real al backend con retry automático
      const result = await withRetry<BreakEvenAnalysisResult>(
        () => apiService.analyzeBreakEven(data),
        { maxAttempts: 3, baseDelay: 1000 }
      );
      
      console.log('Análisis de punto de equilibrio completado:', result);
      
      updateAnalysisState('breakeven', {
        isAnalyzing: false,
        result,
        lastAnalyzed: new Date().toISOString()
      });
      
      // TODO: Adaptar addToHistory para break-even
      // addToHistory(data, result);
    } catch (error) {
      console.error('Error durante análisis de punto de equilibrio:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('breakeven', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [updateAnalysisState]);

  /**
   * Handler para análisis de ingresos
   */
  const handleRevenueAnalysis = useCallback(async (data: RevenueAnalysisRequest) => {
    updateAnalysisState('revenue', { isAnalyzing: true, error: null });

    try {
      console.log('Iniciando análisis de ingresos:', data);

      // Llamada real al backend con retry automático
      const result = await withRetry<RevenueAnalysisResult>(
        () => apiService.analyzeRevenue(data),
        { maxAttempts: 3, baseDelay: 1000 }
      );
      
      console.log('Análisis de ingresos completado:', result);
      
      updateAnalysisState('revenue', {
        isAnalyzing: false,
        result,
        lastAnalyzed: new Date().toISOString()
      });
      
      // TODO: Adaptar addToHistory para revenue
      // addToHistory(data, result);
    } catch (error) {
      console.error('Error durante análisis de ingresos:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('revenue', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [updateAnalysisState]);

  /**
   * Handler para análisis de costos
   */
  const handleCostsAnalysis = useCallback(async (data: any) => {
    updateAnalysisState('costs', { isAnalyzing: true, error: null });

    try {
      console.log('Iniciando análisis de costos:', data);

      // Mock implementation - en el futuro esto se integrará con el backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      console.log('Análisis de costos completado (mock)');
      
      updateAnalysisState('costs', {
        isAnalyzing: false,
        result: { message: 'Análisis de costos en desarrollo' },
        lastAnalyzed: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error durante análisis de costos:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('costs', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [updateAnalysisState]);

  /**
   * Handler para análisis de beneficios
   */
  const handleProfitAnalysis = useCallback(async (data: any) => {
    updateAnalysisState('profit', { isAnalyzing: true, error: null });

    try {
      console.log('Iniciando análisis de beneficios:', data);

      // Mock implementation - en el futuro esto se integrará con el backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      console.log('Análisis de beneficios completado (mock)');
      
      updateAnalysisState('profit', {
        isAnalyzing: false,
        result: { message: 'Análisis de beneficios en desarrollo' },
        lastAnalyzed: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error durante análisis de beneficios:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('profit', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [updateAnalysisState]);

  /**
   * Handler para análisis de interés compuesto
   */
  const handleCompoundInterestAnalysis = useCallback(async (data: CompoundInterestRequest) => {
    updateAnalysisState('compoundInterest', { isAnalyzing: true, error: null });

    try {
      console.log('Iniciando análisis de interés compuesto:', data);

      // Llamada real al backend
      const result = await withRetry<CompoundInterestResult>(
        () => apiService.analyzeCompoundInterest(data)
      );
      
      console.log('Análisis de interés compuesto completado:', result);
      
      updateAnalysisState('compoundInterest', {
        isAnalyzing: false,
        result,
        lastAnalyzed: new Date().toISOString()
      });

      // TODO: Implementar historial unificado para todas las herramientas
      // addToHistory(data, result, `Interés compuesto: ${data.principal}€ a ${(data.tasaAnual * 100).toFixed(2)}% por ${data.años} años`);
    } catch (error) {
      console.error('Error durante análisis de interés compuesto:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('compoundInterest', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [updateAnalysisState, addToHistory]);

  /**
   * Handler para conversión de divisas
   */
  const handleCurrencyConversion = useCallback(async (data: CurrencyConversionRequest) => {
    updateAnalysisState('currencyConverter', { isAnalyzing: true, error: null });

    try {
      console.log('Iniciando conversión de divisas:', data);

      // Mock implementation - en el futuro esto se integrará con el backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      console.log('Conversión de divisas completada (mock)');
      
      updateAnalysisState('currencyConverter', {
        isAnalyzing: false,
        result: { message: 'Conversión de divisas completada' },
        lastAnalyzed: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error durante conversión de divisas:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('currencyConverter', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [updateAnalysisState]);

  /**
   * Handler para conversión de sistemas numéricos
   */
  const handleNumberSystemConversion = useCallback(async (data: any) => {
    updateAnalysisState('numberConverter', { isAnalyzing: true, error: null });

    try {
      console.log('Iniciando conversión de sistema numérico:', data);

      // Mock implementation - en el futuro esto se integrará con el backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      console.log('Conversión de sistema numérico completada (mock)');
      
      updateAnalysisState('numberConverter', {
        isAnalyzing: false,
        result: { message: 'Conversión de sistema numérico completada' },
        lastAnalyzed: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error durante conversión de sistema numérico:', error);
      const userFriendlyMessage = getErrorMessage(error);
      
      updateAnalysisState('numberConverter', {
        isAnalyzing: false,
        error: userFriendlyMessage
      });
    }
  }, [updateAnalysisState]);

  // ========================================
  // HANDLERS OBJECT
  // ========================================

  /**
   * Objeto con todos los handlers de análisis
   */
  const handlers: AnalysisHandlers = useMemo(() => ({
    handleBhaskaraAnalysis,
    handleBreakevenAnalysis,
    handleRevenueAnalysis,
    handleCostsAnalysis,
    handleProfitAnalysis,
    handleCompoundInterestAnalysis,
    handleCurrencyConversion,
    handleNumberSystemConversion
  }), [
    handleBhaskaraAnalysis,
    handleBreakevenAnalysis,
    handleRevenueAnalysis,
    handleCostsAnalysis,
    handleProfitAnalysis,
    handleCompoundInterestAnalysis,
    handleCurrencyConversion,
    handleNumberSystemConversion
  ]);

  // ========================================
  // RETURN VALUES
  // ========================================

  return {
    handlers,
    analysisState,
    updateAnalysisState,
    resetToolAnalysis,
    resetAllAnalysis
  };
};
