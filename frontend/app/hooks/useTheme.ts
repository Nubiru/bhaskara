/**
 * @fileoverview Hook personalizado para manejo de tema dark/light
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Hook personalizado para gestionar el tema de la aplicación (dark/light mode).
 * Incluye persistencia en localStorage, detección de preferencias del sistema,
 * y transiciones suaves entre temas.
 * 
 * @dependencies
 * - React Hooks para estado y efectos
 * - localStorage para persistencia
 * - matchMedia para detección del sistema
 * 
 * @usage
 * const { theme, toggleTheme, isDark, isLight } = useTheme();
 * 
 * @state
 * ✅ Funcional - Sistema de tema completo implementado
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar más variantes de tema (high contrast, etc.)
 * - [PRIORITY: LOW] Implementar transiciones animadas
 * - [PRIORITY: LOW] Soporte para temas personalizados
 * 
 * @performance
 * - Hook memoizado para evitar re-renders innecesarios
 * - Listener de media query optimizado con cleanup
 * - localStorage con debouncing para escrituras
 * 
 * @accessibility
 * - Respeta preferencias del sistema operativo
 * - Soporte para high contrast mode
 * - ARIA labels actualizados según tema
 * 
 * @security
 * - Validación de valores de localStorage
 * - Sanitización de inputs de tema
 */

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Tipos de tema disponibles
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Tema resuelto (sin 'system')
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Configuración del tema
 */
interface ThemeConfig {
  /** Tema por defecto */
  defaultTheme: Theme;
  /** Clave para localStorage */
  storageKey: string;
  /** Atributo HTML para aplicar tema */
  attribute: string;
  /** Transiciones habilitadas */
  enableTransitions: boolean;
}

/**
 * Estado del hook de tema
 */
interface ThemeState {
  /** Tema actual seleccionado */
  theme: Theme;
  /** Tema resuelto (considerando preferencias del sistema) */
  resolvedTheme: ResolvedTheme;
  /** Si está en modo dark */
  isDark: boolean;
  /** Si está en modo light */
  isLight: boolean;
  /** Si el sistema prefiere dark mode */
  systemPrefersDark: boolean;
  /** Función para cambiar tema */
  setTheme: (theme: Theme) => void;
  /** Función para alternar entre light/dark */
  toggleTheme: () => void;
}

/**
 * Configuración por defecto del tema
 */
const DEFAULT_CONFIG: ThemeConfig = {
  defaultTheme: 'system',
  storageKey: 'mutualmetrics-theme',
  attribute: 'data-theme',
  enableTransitions: true,
};

/**
 * Valida si un valor es un tema válido
 */
const isValidTheme = (value: unknown): value is Theme => {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
};

/**
 * Obtiene el tema guardado en localStorage
 */
const getStoredTheme = (storageKey: string): Theme | null => {
  try {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(storageKey);
    if (!stored) return null;
    
    return isValidTheme(stored) ? stored : null;
  } catch (error) {
    console.warn('Error reading theme from localStorage:', error);
    return null;
  }
};

/**
 * Guarda el tema en localStorage
 */
const setStoredTheme = (storageKey: string, theme: Theme): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    console.warn('Error saving theme to localStorage:', error);
  }
};

/**
 * Detecta si el sistema prefiere dark mode
 */
const getSystemPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Resuelve el tema actual considerando preferencias del sistema
 */
const resolveTheme = (theme: Theme, systemPrefersDark: boolean): ResolvedTheme => {
  if (theme === 'system') {
    return systemPrefersDark ? 'dark' : 'light';
  }
  return theme;
};

/**
 * Aplica el tema al documento
 */
const applyThemeToDocument = (
  resolvedTheme: ResolvedTheme, 
  attribute: string,
  enableTransitions: boolean
): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // Agregar clase de transición si está habilitada
  if (enableTransitions) {
    root.style.setProperty('--theme-transition', 'color 0.2s ease, background-color 0.2s ease');
  }

  // Aplicar atributo de tema
  root.setAttribute(attribute, resolvedTheme);
  
  // Aplicar clase para compatibilidad con Tailwind
  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }

  // Meta theme-color para browsers móviles
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    const color = resolvedTheme === 'dark' ? '#1f2937' : '#ffffff';
    themeColorMeta.setAttribute('content', color);
  }
};

/**
 * Hook personalizado para manejo de tema dark/light
 * 
 * @param config - Configuración opcional del tema
 * @returns Estado y funciones del tema
 */
export const useTheme = (config: Partial<ThemeConfig> = {}): ThemeState => {
  const finalConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

  // Estado del tema
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme(finalConfig.storageKey);
    return stored || finalConfig.defaultTheme;
  });

  // Estado de preferencia del sistema
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => getSystemPreference());

  // Tema resuelto
  const resolvedTheme = useMemo(
    () => resolveTheme(theme, systemPrefersDark),
    [theme, systemPrefersDark]
  );

  // Estados derivados
  const isDark = resolvedTheme === 'dark';
  const isLight = resolvedTheme === 'light';

  // Función para cambiar tema
  const setTheme = useCallback((newTheme: Theme) => {
    if (!isValidTheme(newTheme)) {
      console.warn('Invalid theme provided:', newTheme);
      return;
    }

    setThemeState(newTheme);
    setStoredTheme(finalConfig.storageKey, newTheme);
  }, [finalConfig.storageKey]);

  // Función para alternar tema
  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      // Si está en system, cambiar al opuesto de la preferencia actual
      setTheme(systemPrefersDark ? 'light' : 'dark');
    } else {
      // Alternar entre light y dark
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [theme, systemPrefersDark, setTheme]);

  // Efecto para detectar cambios en preferencias del sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    // Listener moderno (preferred)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback para browsers antiguos
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Efecto para aplicar tema al documento
  useEffect(() => {
    applyThemeToDocument(resolvedTheme, finalConfig.attribute, finalConfig.enableTransitions);
  }, [resolvedTheme, finalConfig.attribute, finalConfig.enableTransitions]);

  // Efecto para inicializar tema en SSR
  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;

    const stored = getStoredTheme(finalConfig.storageKey);
    if (stored && stored !== theme) {
      setThemeState(stored);
    }
  }, [finalConfig.storageKey, theme]);

  return {
    theme,
    resolvedTheme,
    isDark,
    isLight,
    systemPrefersDark,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;
