/**
 * @fileoverview Tipos TypeScript para el dominio de análisis cuadrático
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Definiciones de tipos estrictos para coeficientes, resultados de análisis
 * y estados de la aplicación. Incluye branded types para type safety
 * y discriminated unions para manejo de estados.
 * 
 * @dependencies
 * - TypeScript 5.8.3+
 * - Zod para validación de esquemas
 * 
 * @usage
 * import type { Coefficients, AnalysisResult, AnalysisState } from './types/quadratic';
 * 
 * @state
 * ✅ Funcional - Tipos base implementados
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar tipos para análisis avanzado
 * - [PRIORITY: LOW] Implementar tipos para exportación
 * 
 * @performance
 * - Tipos optimizados para inferencia TypeScript
 * - Branded types para type safety sin overhead runtime
 * 
 * @security
 * - Validación de entrada con Zod
 * - Tipos estrictos para prevenir inyección
 */

import { z } from 'zod';

// ============================================================================
// BRANDED TYPES PARA TYPE SAFETY
// ============================================================================

/**
 * Coeficiente válido (número que no es NaN)
 */
export type ValidCoefficient = number & { readonly __brand: 'ValidCoefficient' };

/**
 * Coeficiente 'a' que no puede ser cero
 */
export type NonZeroCoefficient = number & { readonly __brand: 'NonZeroCoefficient' };

/**
 * ID único para análisis
 */
export type AnalysisId = string & { readonly __brand: 'AnalysisId' };

// ============================================================================
// ESQUEMAS DE VALIDACIÓN ZOD
// ============================================================================

/**
 * Esquema de validación para coeficientes
 */
export const coefficientsSchema = z.object({
  a: z.number()
    .refine((val) => val !== 0, "El coeficiente 'a' no puede ser cero")
    .refine((val) => !isNaN(val), "El coeficiente 'a' debe ser un número válido"),
  b: z.number()
    .refine((val) => !isNaN(val), "El coeficiente 'b' debe ser un número válido"),
  c: z.number()
    .refine((val) => !isNaN(val), "El coeficiente 'c' debe ser un número válido"),
});

/**
 * Esquema de validación para modo de análisis
 */
export const analysisModeSchema = z.enum(['roots', 'vertex', 'optimal', 'full']);

/**
 * Esquema de validación para solicitud de análisis
 */
export const analysisRequestSchema = z.object({
  coefficients: coefficientsSchema,
  mode: analysisModeSchema,
  description: z.string().optional(),
});

// ============================================================================
// TIPOS INFERIDOS DE ESQUEMAS
// ============================================================================

/**
 * Coeficientes de la ecuación cuadrática ax² + bx + c
 */
export type Coefficients = z.infer<typeof coefficientsSchema>;

/**
 * Modos de análisis disponibles
 */
export type AnalysisMode = z.infer<typeof analysisModeSchema>;

/**
 * Solicitud de análisis
 */
export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;

// ============================================================================
// RESULTADOS DE ANÁLISIS
// ============================================================================

/**
 * Resultado del cálculo de raíces
 */
export interface RootsResult {
  type: 'roots';
  discriminant: number;
  roots: {
    x1: number | null;
    x2: number | null;
    nature: 'real_distinct' | 'real_equal' | 'complex';
  };
  equation: string;
}

/**
 * Resultado del cálculo del vértice
 */
export interface VertexResult {
  type: 'vertex';
  vertex: {
    x: number;
    y: number;
  };
  axisOfSymmetry: number;
  direction: 'upward' | 'downward';
  equation: string;
}

/**
 * Resultado del análisis óptimo económico
 */
export interface OptimalResult {
  type: 'optimal';
  optimalPoint: {
    x: number;
    y: number;
  };
  breakEvenPoints: {
    x1: number;
    x2: number;
  } | null;
  profitZone: {
    min: number;
    max: number;
  } | null;
  equation: string;
}

/**
 * Resultado completo del análisis
 */
export interface FullAnalysisResult {
  type: 'full';
  coefficients: Coefficients;
  discriminant: number;
  roots: RootsResult['roots'];
  vertex: VertexResult['vertex'];
  axisOfSymmetry: number;
  direction: 'upward' | 'downward';
  optimalPoint?: OptimalResult['optimalPoint'];
  breakEvenPoints?: OptimalResult['breakEvenPoints'];
  profitZone?: OptimalResult['profitZone'];
  equation: string;
  analysisDate: string;
  analysisId: AnalysisId;
}

// ============================================================================
// DISCRIMINATED UNIONS
// ============================================================================

/**
 * Resultado de análisis específico por modo
 */
export type AnalysisResult<T extends AnalysisMode = AnalysisMode> = 
  T extends 'roots' ? RootsResult :
  T extends 'vertex' ? VertexResult :
  T extends 'optimal' ? OptimalResult :
  FullAnalysisResult;

/**
 * Estado de la aplicación
 */
export type AnalysisState = 
  | { status: 'idle' }
  | { status: 'loading'; progress: number }
  | { status: 'success'; result: FullAnalysisResult }
  | { status: 'error'; error: Error; retryCount: number };

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Parcial de coeficientes para formularios
 */
export type PartialCoefficients = Partial<Coefficients>;

/**
 * Coeficientes requeridos
 */
export type RequiredCoefficients = Required<Coefficients>;

/**
 * Eventos de análisis
 */
export type AnalysisEvent = 
  | `analysis:${AnalysisMode}:started`
  | `analysis:${AnalysisMode}:completed`
  | `analysis:${AnalysisMode}:failed`;

/**
 * Endpoints de API
 */
export type ApiEndpoint = `/api/${AnalysisMode}`;

// ============================================================================
// VALIDACIÓN DE TIPOS
// ============================================================================

/**
 * Valida que un número sea un coeficiente válido
 */
export const isValidCoefficient = (value: unknown): value is ValidCoefficient => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Valida que un número sea un coeficiente no cero
 */
export const isNonZeroCoefficient = (value: unknown): value is NonZeroCoefficient => {
  return typeof value === 'number' && !isNaN(value) && value !== 0;
};

/**
 * Crea un ID único para análisis
 */
export const createAnalysisId = (): AnalysisId => {
  return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as AnalysisId;
};
