/**
 * @fileoverview Configuración de herramientas para el sidebar de MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 * 
 * @description
 * Configuración centralizada de todas las herramientas disponibles en la aplicación.
 * Define iconos, etiquetas, descripciones y estado de implementación.
 * 
 * @dependencies
 * - Tipos de herramientas definidos en types/tools.ts
 * 
 * @usage
 * import { TOOLS_CONFIG } from '../constants/tools';
 * 
 * @state
 * ✅ Funcional - Configuración completa de herramientas
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar nuevas herramientas según roadmap
 * - [PRIORITY: LOW] Implementar configuración dinámica
 * 
 * @performance
 * - Configuración inmutable para optimización
 * - Lazy loading de herramientas no implementadas
 * 
 * @accessibility
 * - Descripciones claras para screen readers
 * - Iconos semánticos para navegación
 */

import type { ToolConfig } from '../types/tools';

// ========================================
// TOOLS CONFIGURATION
// ========================================

/**
 * Configuración completa de todas las herramientas disponibles
 */
export const TOOLS_CONFIG: readonly ToolConfig[] = [
  {
    id: 'landing',
    label: 'MutualMetrics',
    description: 'Página principal con presentación de la plataforma',
    icon: '🏠',
    category: 'utilities',
    isImplemented: true,
    translationKey: 'home.landing.title',
    descriptionKey: 'home.landing.subtitle'
  },
  {
    id: 'bhaskara',
    label: 'Análisis Cuadrático',
    description: 'Análisis completo de funciones cuadráticas con gráficos interactivos',
    icon: '📐',
    category: 'math',
    isImplemented: true,
    translationKey: 'home.sidebar.tools.bhaskara',
    descriptionKey: 'home.sidebar.descriptions.bhaskara'
  },
  {
    id: 'revenue',
    label: 'Análisis de Ingresos',
    description: 'Cálculo y análisis de ingresos totales por precio y cantidad',
    icon: '💰',
    category: 'business',
    isImplemented: true,
    translationKey: 'home.sidebar.tools.revenue',
    descriptionKey: 'home.sidebar.descriptions.revenue'
  },
  {
    id: 'costs',
    label: 'Análisis de Costos',
    description: 'Análisis de costos fijos, variables y totales',
    icon: '💸',
    category: 'business',
    isImplemented: false,
    translationKey: 'home.sidebar.tools.costs',
    descriptionKey: 'home.sidebar.descriptions.costs'
  },
  {
    id: 'profit',
    label: 'Análisis de Beneficios',
    description: 'Cálculo de beneficios y márgenes de rentabilidad',
    icon: '📊',
    category: 'business',
    isImplemented: false,
    translationKey: 'home.sidebar.tools.profit',
    descriptionKey: 'home.sidebar.descriptions.profit'
  },
  {
    id: 'break-even',
    label: 'Punto de Equilibrio',
    description: 'Análisis del punto de equilibrio económico',
    icon: '⚖️',
    category: 'business',
    isImplemented: true,
    translationKey: 'home.sidebar.tools.breakEven',
    descriptionKey: 'home.sidebar.descriptions.breakEven'
  },
  {
    id: 'compound-interest',
    label: 'Interés Compuesto',
    description: 'Calculadora de interés compuesto con contribuciones regulares',
    icon: '📈',
    category: 'business',
    isImplemented: true,
    translationKey: 'home.sidebar.tools.compoundInterest',
    descriptionKey: 'home.sidebar.descriptions.compoundInterest'
  },
  {
    id: 'currency-converter',
    label: 'Conversor de Divisas',
    description: 'Conversión entre más de 20 monedas con tasas actualizadas',
    icon: '💱',
    category: 'utilities',
    isImplemented: true,
    translationKey: 'home.sidebar.tools.currencyConverter',
    descriptionKey: 'home.sidebar.descriptions.currencyConverter'
  },
  {
    id: 'number-converter',
    label: 'Conversor Numérico',
    description: 'Conversión entre sistemas decimal, binario, octal y hexadecimal',
    icon: '🔢',
    category: 'utilities',
    isImplemented: true,
    translationKey: 'home.sidebar.tools.numberConverter',
    descriptionKey: 'home.sidebar.descriptions.numberConverter'
  }
] as const;

// ========================================
// TOOL CATEGORIES
// ========================================

/**
 * Configuración de categorías de herramientas
 */
export const TOOL_CATEGORIES = {
  math: {
    name: 'Matemáticas',
    icon: '📐',
    description: 'Herramientas de análisis matemático'
  },
  business: {
    name: 'Business Analytics',
    icon: '💼',
    description: 'Análisis económico y financiero'
  },
  utilities: {
    name: 'Utilidades',
    icon: '🛠️',
    description: 'Herramientas de conversión y utilidades'
  }
} as const;

// ========================================
// TOOL FILTERING HELPERS
// ========================================

/**
 * Obtiene herramientas por categoría
 */
export const getToolsByCategory = (category: keyof typeof TOOL_CATEGORIES): readonly ToolConfig[] => {
  return TOOLS_CONFIG.filter(tool => tool.category === category);
};

/**
 * Obtiene herramientas implementadas
 */
export const getImplementedTools = (): readonly ToolConfig[] => {
  return TOOLS_CONFIG.filter(tool => tool.isImplemented);
};

/**
 * Obtiene herramientas en desarrollo
 */
export const getDevelopmentTools = (): readonly ToolConfig[] => {
  return TOOLS_CONFIG.filter(tool => !tool.isImplemented);
};

/**
 * Obtiene una herramienta específica por ID
 */
export const getToolById = (id: string): ToolConfig | undefined => {
  return TOOLS_CONFIG.find(tool => tool.id === id);
};

// ========================================
// TOOL ORDERING
// ========================================

/**
 * Orden de prioridad para herramientas (para futuras implementaciones)
 */
export const TOOL_PRIORITY_ORDER = [
  'landing',
  'bhaskara',
  'revenue',
  'break-even',
  'compound-interest',
  'currency-converter',
  'number-converter',
  'costs',
  'profit'
] as const;

/**
 * Obtiene herramientas ordenadas por prioridad
 */
export const getToolsByPriority = (): readonly ToolConfig[] => {
  const priorityMap = new Map(TOOL_PRIORITY_ORDER.map((id, index) => [id, index]));
  
  return [...TOOLS_CONFIG].sort((a, b) => {
    const priorityA = priorityMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const priorityB = priorityMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return priorityA - priorityB;
  });
};
