/**
 * @fileoverview Utilidades de Accesibilidad (WCAG) para contraste de colores
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-11
 * @lastModified 2025-08-11
 *
 * @description
 * Proporciona helpers para calcular luminancia relativa, ratio de contraste,
 * validación contra WCAG 2.1 AA/AAA, y selección de colores accesibles
 * utilizando variables CSS del sistema de temas.
 */

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

export function getCssVar(varName: string, fallback: string): string {
  if (!isBrowser) return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

function normalizeColorToRgb(color: string): { r: number; g: number; b: number } | null {
  const hex = color.startsWith('#') ? color.substring(1) : null;
  if (hex) {
    const clean = hex.length === 3
      ? `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
      : hex;
    if (clean.length === 6) {
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);
      return { r, g, b };
    }
  }
  if (color.startsWith('rgb')) {
    const parts = color.replace(/rgba?\(|\)|\s/g, '').split(',').map(Number);
    const [r, g, b] = parts;
    if ([r, g, b].every((n) => typeof n === 'number' && !Number.isNaN(n))) {
      return { r, g, b };
    }
  }
  return null;
}

export function relativeLuminance(color: string): number {
  const rgb = normalizeColorToRgb(color);
  if (!rgb) return 0;
  const srgb = [rgb.r, rgb.g, rgb.b].map((v) => v / 255);
  const linear = srgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  // Rec. 709 coefficients
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function contrastRatio(foreground: string, background: string): number {
  const L1 = relativeLuminance(foreground);
  const L2 = relativeLuminance(background);
  const [lighter, darker] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (lighter + 0.05) / (darker + 0.05);
}

export function passesAA(foreground: string, background: string, largeText = false): boolean {
  const ratio = contrastRatio(foreground, background);
  return largeText ? ratio >= 3.0 : ratio >= 4.5;
}

export function passesAAA(foreground: string, background: string, largeText = false): boolean {
  const ratio = contrastRatio(foreground, background);
  return largeText ? ratio >= 4.5 : ratio >= 7.0;
}

/**
 * Elige un color accesible dado un `foregroundVar` y `backgroundVar`.
 * Si no pasa AA, intenta con `fallbackForegroundVar` y por último negro/blanco.
 */
export function chooseAccessibleColor(
  foregroundVar: string,
  backgroundVar: string,
  fallbackForegroundVar = '--color-text'
): string {
  const bg = getCssVar(backgroundVar, '#ffffff');
  const fg = getCssVar(foregroundVar, '#000000');
  if (passesAA(fg, bg)) return fg;
  const fallback = getCssVar(fallbackForegroundVar, '#111111');
  if (passesAA(fallback, bg)) return fallback;
  // Último recurso: elegir negro o blanco según luminancia
  const black = '#000000';
  const white = '#ffffff';
  return passesAA(black, bg) ? black : white;
}

/**
 * Valida el contraste de pares clave del tema y hace console.warn si no cumplen AA.
 * Uso: invocar una vez en el arranque del cliente (opcional).
 */
export function validateThemeContrast(minRatio = 4.5): void {
  if (!isBrowser) return;
  const pairs: Array<[string, string, string]> = [
    ['--color-text', '--color-background', 'text on background'],
    ['--color-text-secondary', '--color-background', 'text-secondary on background'],
    ['--color-primary', '--color-surface', 'primary on surface'],
    ['--color-success', '--color-surface-elevated', 'success on elevated surface'],
    ['--color-warning', '--color-surface-elevated', 'warning on elevated surface'],
    ['--color-error', '--color-surface-elevated', 'error on elevated surface'],
    ['--color-info', '--color-surface-elevated', 'info on elevated surface'],
  ];
  for (const [fgVar, bgVar, label] of pairs) {
    const fg = getCssVar(fgVar, '#000000');
    const bg = getCssVar(bgVar, '#ffffff');
    const ratio = contrastRatio(fg, bg);
    if (ratio < minRatio) {
      // eslint-disable-next-line no-console
      console.warn(`[A11Y] Low contrast (${ratio.toFixed(2)}:1) for ${label} using ${fgVar} on ${bgVar}. Consider adjusting tokens or using chooseAccessibleColor.`);
    }
  }
}

export default {
  getCssVar,
  relativeLuminance,
  contrastRatio,
  passesAA,
  passesAAA,
  chooseAccessibleColor,
  validateThemeContrast,
};


