/**
 * @fileoverview Tipos TypeScript para análisis de negocio
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Definición completa de tipos para todos los módulos de análisis de negocio:
 * Revenue, Costs, Profit, Break-even. Incluye validación con Zod.
 * 
 * @dependencies
 * - Zod para validación de esquemas
 * 
 * @usage
 * import type { RevenueAnalysisRequest, CostAnalysisRequest } from '../types/business';
 * 
 * @state
 * ✅ Funcional - Tipos completos para business analysis
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar tipos para análisis comparativo
 * - [PRIORITY: LOW] Implementar tipos para forecasting
 * 
 * @performance
 * - Tipos optimizados para tree-shaking
 * - Schemas reutilizables
 * 
 * @accessibility
 * - Error messages accesibles para validación
 */

import { z } from 'zod';

// ========================================
// REVENUE ANALYSIS TYPES
// ========================================

/**
 * Schema para validación de análisis de ingresos
 */
export const revenueAnalysisRequestSchema = z.object({
  precio: z.number()
    .min(0, 'El precio debe ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'El precio debe ser un número válido'),
  cantidad: z.number()
    .min(0, 'La cantidad debe ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'La cantidad debe ser un número válido'),
  description: z.string().optional()
});

export type RevenueAnalysisRequest = z.infer<typeof revenueAnalysisRequestSchema>;

/**
 * Resultado del análisis de ingresos
 */
export interface RevenueAnalysisResult {
  ingresoTotal: number;
  precio: number;
  cantidad: number;
  detalles: {
    formula: string;
    calculo: string;
  };
  metadata: {
    timestamp: string;
    analysisId: string;
  };
}

// ========================================
// COST ANALYSIS TYPES
// ========================================

/**
 * Schema para validación de análisis de costos
 */
export const costAnalysisRequestSchema = z.object({
  costosFijos: z.number()
    .min(0, 'Los costos fijos deben ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'Los costos fijos deben ser un número válido'),
  costosVariables: z.number()
    .min(0, 'Los costos variables deben ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'Los costos variables deben ser un número válido'),
  cantidad: z.number()
    .min(1, 'La cantidad debe ser mayor a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'La cantidad debe ser un número válido'),
  description: z.string().optional()
});

export type CostAnalysisRequest = z.infer<typeof costAnalysisRequestSchema>;

/**
 * Resultado del análisis de costos
 */
export interface CostAnalysisResult {
  costoTotal: number;
  costosFijos: number;
  costosVariables: number;
  costoVariableUnitario?: number;
  detalles: {
    formula: string;
    calculo: string;
    breakdown: {
      fijos: number;
      variables: number;
    };
  };
  metadata: {
    timestamp: string;
    analysisId: string;
  };
}

// ========================================
// PROFIT ANALYSIS TYPES
// ========================================

/**
 * Schema para validación de análisis de beneficio
 */
export const profitAnalysisRequestSchema = z.object({
  ingresoTotal: z.number()
    .min(0, 'El ingreso total debe ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'El ingreso total debe ser un número válido'),
  costoTotal: z.number()
    .min(0, 'El costo total debe ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'El costo total debe ser un número válido'),
  description: z.string().optional()
});

export type ProfitAnalysisRequest = z.infer<typeof profitAnalysisRequestSchema>;

/**
 * Resultado del análisis de beneficio
 */
export interface ProfitAnalysisResult {
  beneficio: number;
  ingresoTotal: number;
  costoTotal: number;
  margenBeneficio: number; // (beneficio / ingresoTotal) * 100
  detalles: {
    formula: string;
    calculo: string;
    interpretacion: 'ganancia' | 'perdida' | 'equilibrio';
  };
  metadata: {
    timestamp: string;
    analysisId: string;
  };
}

// ========================================
// BREAK-EVEN ANALYSIS TYPES
// ========================================

/**
 * Schema para validación de análisis de punto de equilibrio
 */
export const breakEvenAnalysisRequestSchema = z.object({
  costosFijos: z.number()
    .min(0, 'Los costos fijos deben ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'Los costos fijos deben ser un número válido'),
  precio: z.number()
    .min(0, 'El precio debe ser mayor que 0')
    .refine(val => !isNaN(val) && isFinite(val) && val > 0, 'El precio debe ser un número válido mayor que 0'),
  costoVariableUnitario: z.number()
    .min(0, 'El costo variable unitario debe ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'El costo variable unitario debe ser un número válido'),
  description: z.string().optional()
}).refine(
  (data) => data.precio > data.costoVariableUnitario,
  {
    message: 'El precio debe ser mayor que el costo variable unitario',
    path: ['precio']
  }
);

export type BreakEvenAnalysisRequest = z.infer<typeof breakEvenAnalysisRequestSchema>;

/**
 * Resultado del análisis de punto de equilibrio
 */
export interface BreakEvenAnalysisResult {
  puntoEquilibrio: number; // Cantidad en unidades
  costosFijos: number;
  precio: number;
  costoVariableUnitario: number;
  margenContribucion: number; // precio - costoVariableUnitario
  detalles: {
    formula: string;
    calculo: string;
    interpretacion: string;
    sensibilidad: {
      incrementoPrecio10: number;
      reduccionCostoFijo10: number;
      reduccionCostoVariable10: number;
    };
  };
  metadata: {
    timestamp: string;
    analysisId: string;
  };
}

// ========================================
// UNIFIED TYPES
// ========================================

/**
 * Tipos unificados para todos los análisis de negocio
 */
export type BusinessAnalysisType = 'revenue' | 'cost' | 'profit' | 'breakeven';

export type BusinessAnalysisRequest = 
  | RevenueAnalysisRequest
  | CostAnalysisRequest  
  | ProfitAnalysisRequest
  | BreakEvenAnalysisRequest;

export type BusinessAnalysisResult = 
  | RevenueAnalysisResult
  | CostAnalysisResult
  | ProfitAnalysisResult
  | BreakEvenAnalysisResult;

// Download-related types
export interface DownloadOptions {
  format: 'csv' | 'excel' | 'pdf';
  analysisIds: string[];
  includeCharts?: boolean;
  includeMetadata?: boolean;
  customFilename?: string;
  compressionLevel?: 'none' | 'low' | 'high';
}

export interface DownloadProgress {
  percentage: number;
  status: DownloadStatus;
  bytesReceived: number;
  totalBytes: number;
  speed?: number; // bytes per second
  eta?: number; // estimated time remaining in seconds
}

export type DownloadStatus = 
  | 'idle'
  | 'preparing'
  | 'downloading'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'paused';

export interface DownloadState {
  isDownloading: boolean;
  hasError: boolean;
  isCompleted: boolean;
  totalProgress: number;
  activeDownloads: string[];
  completedDownloads: string[];
  failedDownloads: string[];
  lastError?: string;
}

export interface DownloadResult {
  success: boolean;
  filename: string;
  fileSize: number;
  downloadUrl?: string;
  error?: string;
  metadata?: {
    format: string;
    analysisType: string;
    timestamp: string;
    checksum?: string;
  };
}

// Enhanced analysis metadata
export interface AnalysisMetadata {
  id: string;
  type: BusinessAnalysisType;
  name: string;
  description?: string;
  timestamp: string;
  version: string;
  author?: string;
  tags?: string[];
  parameters?: Record<string, any>;
  status: 'draft' | 'published' | 'archived';
  lastModified: string;
  fileSize?: number;
  checksum?: string;
}

/**
 * Historial de análisis de negocio
 */
export interface BusinessAnalysisHistory {
  id: string;
  type: BusinessAnalysisType;
  request: BusinessAnalysisRequest;
  result: BusinessAnalysisResult;
  metadata: AnalysisMetadata;
  createdAt: string;
}

/**
 * Error específico de análisis de negocio
 */
export interface BusinessAnalysisError {
  code: string;
  message: string;
  field?: string;
  value?: any;
  suggestion?: string;
}

// ========================================
// EXPORT SCHEMAS FOR VALIDATION
// ========================================

export const businessAnalysisSchemas = {
  revenue: revenueAnalysisRequestSchema,
  cost: costAnalysisRequestSchema,
  profit: profitAnalysisRequestSchema,
  breakeven: breakEvenAnalysisRequestSchema
} as const;

/**
 * Helper para validar requests de análisis de negocio
 */
export const validateBusinessAnalysisRequest = (
  type: BusinessAnalysisType,
  data: unknown
): BusinessAnalysisRequest => {
  const schema = businessAnalysisSchemas[type];
  if (!schema) {
    throw new Error(`Tipo de análisis no soportado: ${type}`);
  }
  
  return schema.parse(data);
};

/**
 * Type guards para análisis de negocio
 */
export const isRevenueAnalysis = (result: BusinessAnalysisResult): result is RevenueAnalysisResult => {
  return 'ingresoTotal' in result && 'precio' in result && 'cantidad' in result;
};

export const isCostAnalysis = (result: BusinessAnalysisResult): result is CostAnalysisResult => {
  return 'costoTotal' in result && 'costosFijos' in result && 'costosVariables' in result;
};

export const isProfitAnalysis = (result: BusinessAnalysisResult): result is ProfitAnalysisResult => {
  return 'beneficio' in result && 'margenBeneficio' in result;
};

export const isBreakEvenAnalysis = (result: BusinessAnalysisResult): result is BreakEvenAnalysisResult => {
  return 'puntoEquilibrio' in result && 'margenContribucion' in result;
};
