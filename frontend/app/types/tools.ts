/**
 * @fileoverview Tipos TypeScript para configuración de herramientas y análisis
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 * 
 * @description
 * Definición de tipos para configuración de herramientas del sidebar,
 * tipos de vista, y handlers de análisis para separar lógica del componente principal.
 * 
 * @dependencies
 * - Tipos de análisis existentes
 * 
 * @usage
 * import type { ToolConfig, ViewType, AnalysisHandlers } from '../types/tools';
 * 
 * @state
 * ✅ Funcional - Tipos completos para configuración de herramientas
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar tipos para nuevas herramientas
 * - [PRIORITY: LOW] Implementar tipos para configuración avanzada
 * 
 * @performance
 * - Tipos optimizados para tree-shaking
 * - Configuración inmutable
 * 
 * @accessibility
 * - Tipos que soportan ARIA y navegación por teclado
 */

import type { AnalysisRequest, FullAnalysisResult } from './quadratic';
import type { BreakEvenAnalysisRequest, BreakEvenAnalysisResult } from './business';
import type { RevenueAnalysisRequest, RevenueAnalysisResult } from './business';
import type { CompoundInterestRequest, CurrencyConversionRequest } from './business';

// ========================================
// VIEW TYPES
// ========================================

/**
 * Tipos de vista disponibles en la aplicación
 */
export type ViewType = 
  | 'landing' 
  | 'bhaskara' 
  | 'revenue' 
  | 'costs' 
  | 'profit' 
  | 'break-even' 
  | 'compound-interest' 
  | 'currency-converter' 
  | 'number-converter';

// ========================================
// TOOL CONFIGURATION
// ========================================

/**
 * Categorías de herramientas disponibles
 */
export type ToolCategory = 'math' | 'business' | 'utilities';

/**
 * Configuración de una herramienta individual
 */
export interface ToolConfig {
  /** Identificador único de la herramienta */
  id: ViewType;
  /** Etiqueta visible para el usuario */
  label: string;
  /** Descripción detallada de la herramienta */
  description: string;
  /** Icono emoji para representar la herramienta */
  icon: string;
  /** Categoría de la herramienta */
  category: ToolCategory;
  /** Indica si la herramienta está completamente implementada */
  isImplemented: boolean;
  /** Ruta de traducción para la etiqueta */
  translationKey: string;
  /** Ruta de traducción para la descripción */
  descriptionKey: string;
}

// ========================================
// ANALYSIS HANDLERS
// ========================================

/**
 * Handlers para diferentes tipos de análisis
 */
export interface AnalysisHandlers {
  /** Handler para análisis de Bhaskara */
  handleBhaskaraAnalysis: (data: AnalysisRequest) => Promise<void>;
  /** Handler para análisis de punto de equilibrio */
  handleBreakevenAnalysis: (data: BreakEvenAnalysisRequest) => Promise<void>;
  /** Handler para análisis de ingresos */
  handleRevenueAnalysis: (data: RevenueAnalysisRequest) => Promise<void>;
  /** Handler para análisis de costos */
  handleCostsAnalysis: (data: any) => Promise<void>;
  /** Handler para análisis de beneficios */
  handleProfitAnalysis: (data: any) => Promise<void>;
  /** Handler para análisis de interés compuesto */
  handleCompoundInterestAnalysis: (data: CompoundInterestRequest) => Promise<void>;
  /** Handler para conversión de divisas */
  handleCurrencyConversion: (data: CurrencyConversionRequest) => Promise<void>;
  /** Handler para conversión de sistemas numéricos */
  handleNumberSystemConversion: (data: any) => Promise<void>;
}

// ========================================
// ANALYSIS STATE
// ========================================

/**
 * Estado del análisis para una herramienta específica
 */
export interface AnalysisState<T = any> {
  /** Indica si el análisis está en progreso */
  isAnalyzing: boolean;
  /** Resultado del análisis */
  result: T | null;
  /** Error del análisis */
  error: string | null;
  /** Timestamp del último análisis */
  lastAnalyzed: string | null;
}

/**
 * Estado unificado para todas las herramientas
 */
export interface UnifiedAnalysisState {
  /** Estado para análisis de Bhaskara */
  bhaskara: AnalysisState<FullAnalysisResult>;
  /** Estado para análisis de punto de equilibrio */
  breakeven: AnalysisState<BreakEvenAnalysisResult>;
  /** Estado para análisis de ingresos */
  revenue: AnalysisState<RevenueAnalysisResult>;
  /** Estado para análisis de costos */
  costs: AnalysisState<any>;
  /** Estado para análisis de beneficios */
  profit: AnalysisState<any>;
  /** Estado para análisis de interés compuesto */
  compoundInterest: AnalysisState<any>;
  /** Estado para conversión de divisas */
  currencyConverter: AnalysisState<any>;
  /** Estado para conversión de sistemas numéricos */
  numberConverter: AnalysisState<any>;
}

// ========================================
// TOOL RENDERING
// ========================================

/**
 * Props para renderizar contenido de herramientas
 */
export interface ToolContentProps {
  /** Tipo de vista actual */
  currentView: ViewType;
  /** Estado de análisis unificado */
  analysisState: UnifiedAnalysisState;
  /** Handlers de análisis */
  handlers: AnalysisHandlers;
  /** Función de traducción */
  t: (key: string, defaultValue?: string) => string;
}

/**
 * Configuración para renderizar una herramienta específica
 */
export interface ToolRenderConfig {
  /** Tipo de vista */
  viewType: ViewType;
  /** Componente de formulario */
  FormComponent: React.ComponentType<any>;
  /** Componente de resultados */
  ResultsComponent?: React.ComponentType<any>;
  /** Props adicionales para el formulario */
  formProps?: Record<string, any>;
  /** Props adicionales para los resultados */
  resultsProps?: Record<string, any>;
}
