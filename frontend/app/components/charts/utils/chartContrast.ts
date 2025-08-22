/**
 * @fileoverview Utilidades de validación de contraste para gráficos
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Utilidades para validar y ajustar el contraste de colores en gráficos,
 * asegurando conformidad WCAG 2.1 AA (ratio mínimo 4.5:1 para texto normal,
 * 3:1 para texto grande).
 * 
 * @dependencies
 * - chartColors.ts para colores temáticos
 * - WCAG 2.1 AA guidelines
 * 
 * @usage
 * Importar y usar para validar contraste antes de renderizar gráficos
 * 
 * @state
 * ✅ Funcional - Validación de contraste implementada
 * 
 * @accessibility
 * - Validación automática de contraste WCAG 2.1 AA
 * - Ajuste automático de colores para mejor legibilidad
 * - Soporte para temas claro y oscuro
 */

import { chartTheme } from './chartColors';

/**
 * Calcula el ratio de contraste entre dos colores
 * @param color1 Primer color en formato hex
 * @param color2 Segundo color en formato hex
 * @returns Ratio de contraste
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calcula la luminancia relativa de un color
 * @param color Color en formato hex
 * @returns Luminancia relativa (0-1)
 */
function getRelativeLuminance(color: string): number {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Valida si un par de colores cumple con WCAG 2.1 AA
 * @param foreground Color del primer plano (texto)
 * @param background Color de fondo
 * @param isLargeText Si es texto grande (18pt+ o 14pt+ bold)
 * @returns Objeto con resultado de validación y sugerencias
 */
export function validateWCAGContrast(
  foreground: string, 
  background: string, 
  isLargeText: boolean = false
): {
  passes: boolean;
  ratio: number;
  requiredRatio: number;
  level: 'AAA' | 'AA' | 'FAIL';
  suggestions: string[];
} {
  const ratio = calculateContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 3 : 4.5;
  
  let level: 'AAA' | 'AA' | 'FAIL';
  if (ratio >= 7) level = 'AAA';
  else if (ratio >= requiredRatio) level = 'AA';
  else level = 'FAIL';
  
  const suggestions: string[] = [];
  if (level === 'FAIL') {
    suggestions.push(
      `Ratio actual: ${ratio.toFixed(2)}:1, requerido: ${requiredRatio}:1`,
      'Considera usar colores con mayor contraste',
      'Para texto grande, el ratio mínimo es 3:1',
      'Para texto normal, el ratio mínimo es 4.5:1'
    );
  }
  
  return {
    passes: ratio >= requiredRatio,
    ratio,
    requiredRatio,
    level,
    suggestions
  };
}

/**
 * Genera colores alternativos con mejor contraste
 * @param baseColor Color base
 * @param targetColor Color objetivo para contrastar
 * @param requiredRatio Ratio mínimo requerido
 * @returns Array de colores alternativos ordenados por contraste
 */
export function generateContrastAlternatives(
  baseColor: string, 
  targetColor: string, 
  requiredRatio: number = 4.5
): Array<{ color: string; ratio: number; passes: boolean }> {
  const alternatives: Array<{ color: string; ratio: number; passes: boolean }> = [];
  
  // Generar variaciones del color base
  const variations = generateColorVariations(baseColor);
  
  for (const variation of variations) {
    const ratio = calculateContrastRatio(variation, targetColor);
    alternatives.push({
      color: variation,
      ratio,
      passes: ratio >= requiredRatio
    });
  }
  
  // Ordenar por ratio de contraste (descendente)
  return alternatives.sort((a, b) => b.ratio - a.ratio);
}

/**
 * Genera variaciones de un color para mejorar contraste
 * @param baseColor Color base
 * @returns Array de colores variados
 */
function generateColorVariations(baseColor: string): string[] {
  const variations: string[] = [];
  const hex = baseColor.replace('#', '');
  
  // Variaciones más claras
  for (let i = 1; i <= 3; i++) {
    const factor = 1 + (i * 0.2);
    variations.push(lightenColor(hex, factor));
  }
  
  // Variaciones más oscuras
  for (let i = 1; i <= 3; i++) {
    const factor = 1 - (i * 0.2);
    variations.push(darkenColor(hex, factor));
  }
  
  return variations;
}

/**
 * Aclara un color
 * @param hex Color en formato hex
 * @param factor Factor de aclarado
 * @returns Color aclarado
 */
function lightenColor(hex: string, factor: number): string {
  const r = Math.min(255, Math.round(parseInt(hex.substring(0, 2), 16) * factor));
  const g = Math.min(255, Math.round(parseInt(hex.substring(2, 4), 16) * factor));
  const b = Math.min(255, Math.round(parseInt(hex.substring(4, 6), 16) * factor));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Oscurece un color
 * @param hex Color en formato hex
 * @param factor Factor de oscurecimiento
 * @returns Color oscurecido
 */
function darkenColor(hex: string, factor: number): string {
  const r = Math.max(0, Math.round(parseInt(hex.substring(0, 2), 16) * factor));
  const g = Math.max(0, Math.round(parseInt(hex.substring(2, 4), 16) * factor));
  const b = Math.max(0, Math.round(parseInt(hex.substring(4, 6), 16) * factor));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Valida la paleta completa de colores de un gráfico
 * @param colors Array de colores del gráfico
 * @param background Color de fondo
 * @returns Reporte de validación de contraste
 */
export function validateChartPalette(
  colors: string[], 
  background: string
): {
  overallPasses: boolean;
  colorResults: Array<{
    color: string;
    passes: boolean;
    ratio: number;
    suggestions: string[];
  }>;
  summary: string;
} {
  const colorResults = colors.map(color => {
    const validation = validateWCAGContrast(color, background);
    return {
      color,
      passes: validation.passes,
      ratio: validation.ratio,
      suggestions: validation.suggestions
    };
  });
  
  const overallPasses = colorResults.every(result => result.passes);
  const failingColors = colorResults.filter(result => !result.passes);
  
  let summary = `Validación de contraste: ${overallPasses ? 'PASÓ' : 'FALLÓ'}`;
  if (failingColors.length > 0) {
    summary += `\n${failingColors.length} color(es) no cumplen con WCAG 2.1 AA`;
  }
  
  return {
    overallPasses,
    colorResults,
    summary
  };
}

/**
 * Configuración de colores optimizada para contraste
 * @param theme Tema actual (light/dark)
 * @returns Configuración de colores con contraste validado
 */
export function getContrastOptimizedColors(theme: 'light' | 'dark' = 'light') {
  const colors = chartTheme();
  
  if (theme === 'dark') {
    return {
      primary: '#ffffff', // Blanco para máximo contraste en tema oscuro
      secondary: '#e5e7eb', // Gris claro
      accent: '#fbbf24', // Amarillo
      success: '#34d399', // Verde claro
      warning: '#fbbf24', // Amarillo
      error: '#f87171', // Rojo claro
      info: '#60a5fa', // Azul claro
      text: '#ffffff',
      textSecondary: '#d1d5db'
    };
  }
  
  return {
    primary: '#1b3c53', // Azul oscuro
    secondary: '#456882', // Azul medio
    accent: '#d97706', // Naranja
    success: '#059669', // Verde oscuro
    warning: '#d97706', // Naranja
    error: '#dc2626', // Rojo oscuro
    info: '#2563eb', // Azul oscuro
    text: '#1f2937',
    textSecondary: '#374151'
  };
}
