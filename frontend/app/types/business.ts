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
// COMPOUND INTEREST TYPES
// ========================================

/**
 * Schema para validación de análisis de interés compuesto
 */
export const compoundInterestRequestSchema = z.object({
  principal: z.number()
    .min(0, 'El capital inicial debe ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'El capital inicial debe ser un número válido'),
  tasaAnual: z.number()
    .min(0, 'La tasa anual debe ser mayor o igual a 0')
    .max(1, 'La tasa anual debe ser menor o igual a 1 (100%)')
    .refine(val => !isNaN(val) && isFinite(val), 'La tasa anual debe ser un número válido'),
  frecuenciaAnual: z.number()
    .int('La frecuencia anual debe ser un número entero')
    .min(1, 'La frecuencia anual debe ser mayor a 0')
    .refine(val => [1, 2, 4, 12, 365].includes(val), 'La frecuencia debe ser 1, 2, 4, 12 o 365'),
  años: z.number()
    .min(0.01, 'Los años deben ser mayor a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'Los años deben ser un número válido'),
  contribuciones: z.number()
    .min(0, 'Las contribuciones deben ser mayor o igual a 0')
    .optional(),
  frecuenciaContribucion: z.enum(['mensual', 'anual']).optional(),
  description: z.string().optional()
});

export type CompoundInterestRequest = z.infer<typeof compoundInterestRequestSchema>;

/**
 * Entrada individual del schedule de crecimiento
 */
export interface CompoundInterestScheduleEntry {
  año: number;
  monto: number;
  contribuciones: number;
  interes: number;
}

/**
 * Desglose detallado del cálculo
 */
export interface CompoundInterestBreakdown {
  montoPrincipal: number;
  montoContribuciones: number;
  periodosTotales: number;
  tasaPeriodo: number;
}

/**
 * Resultado del análisis de interés compuesto
 */
export interface CompoundInterestResult {
  montoFinal: number;
  capitalInicial: number;
  totalContribuciones: number;
  interesGanado: number;
  tasaAnual: number;
  frecuenciaAnual: number;
  años: number;
  contribuciones: number;
  frecuenciaContribucion: string;
  schedule: CompoundInterestScheduleEntry[];
  desglose: CompoundInterestBreakdown;
}

// ========================================
// CURRENCY CONVERTER TYPES
// ========================================

/**
 * Schema para validación de conversión de divisas
 */
export const currencyConversionRequestSchema = z.object({
  amount: z.number()
    .min(0, 'El monto debe ser mayor o igual a 0')
    .refine(val => !isNaN(val) && isFinite(val), 'El monto debe ser un número válido'),
  fromCurrency: z.string()
    .min(3, 'Debe seleccionar una moneda de origen')
    .max(3, 'Código de moneda inválido'),
  toCurrency: z.string()
    .min(3, 'Debe seleccionar una moneda de destino')
    .max(3, 'Código de moneda inválido'),
  description: z.string().optional()
});

export type CurrencyConversionRequest = z.infer<typeof currencyConversionRequestSchema>;

/**
 * Resultado de la conversión de divisas
 */
export interface CurrencyConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  conversion: {
    rate: number;
    convertedAmount: number;
    lastUpdated: string;
    source: string;
  };
  metadata: {
    timestamp: string;
    analysisId: string;
  };
}

/**
 * Monedas disponibles para conversión
 */
export const AVAILABLE_CURRENCIES = [
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' }
] as const;

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

// ========================================
// EXPORT ALL TYPES
// ========================================

// All types are exported inline above
