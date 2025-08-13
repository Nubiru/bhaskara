/**
 * @fileoverview Utilidades de colores temáticos para componentes de gráficos
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-11
 * @lastModified 2025-08-11
 * 
 * @description
 * Provee helpers para obtener variables CSS del tema activo y generar colores
 * con transparencia para usarlos en Chart.js, garantizando consistencia con
 * el sistema de temas (light/dark) basado en CSS custom properties.
 */

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

export function getCssVar(varName: string, fallback: string): string {
  if (!isBrowser) return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

function hexToRgbaChannels(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function transparent(color: string, alpha: number): string {
  // Admite hex (#rrggbb o #rgb) y rgb/rgba
  if (color.startsWith('#')) {
    const channels = hexToRgbaChannels(color);
    if (channels) return `rgba(${channels.r}, ${channels.g}, ${channels.b}, ${alpha})`;
  }
  if (color.startsWith('rgb')) {
    // Reemplaza el alpha si ya es rgba; si es rgb, lo convierte a rgba
    const parts = color.replace(/rgba?\(|\)|\s/g, '').split(',').map(Number);
    const [r, g, b] = parts;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // Fallback a negro con alpha
  return `rgba(0, 0, 0, ${alpha})`;
}

export function chartTheme() {
  return {
    // Semánticos
    primary: getCssVar('--color-primary', '#1b3c53'),
    secondary: getCssVar('--color-secondary', '#456882'),
    accent: getCssVar('--color-accent', '#d2c1b6'),
    success: getCssVar('--color-success', '#10b981'),
    warning: getCssVar('--color-warning', '#f59e0b'),
    error: getCssVar('--color-error', '#ef4444'),
    info: getCssVar('--color-info', '#3b82f6'),

    // Superficies / texto / divisores
    text: getCssVar('--color-text', '#1f2937'),
    textSecondary: getCssVar('--color-text-secondary', '#6b7280'),
    divider: getCssVar('--color-divider', '#e5e7eb'),
    surface: getCssVar('--color-surface', '#ffffff'),
    background: getCssVar('--color-background', '#f9f3ef'),
  } as const;
}


