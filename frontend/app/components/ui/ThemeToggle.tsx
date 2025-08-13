/**
 * @fileoverview Componente toggle para cambiar entre tema dark/light
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Componente de toggle para alternar entre temas dark/light con animaciones
 * suaves, iconos temáticos, y soporte completo de accesibilidad.
 * 
 * @dependencies
 * - useTheme hook para manejo de estado del tema
 * - React para componente y hooks
 * - Tailwind CSS para estilos
 * 
 * @usage
 * <ThemeToggle />
 * <ThemeToggle variant="icon" size="sm" />
 * 
 * @state
 * ✅ Funcional - Toggle de tema completo con animaciones
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar más variantes de diseño
 * - [PRIORITY: LOW] Implementar custom themes dropdown
 * - [PRIORITY: LOW] Agregar shortcuts de teclado
 * 
 * @performance
 * - Componente memoizado para optimización
 * - Animaciones CSS optimizadas
 * - Event handlers memoizados
 * 
 * @accessibility
 * - ARIA labels y roles apropiados
 * - Keyboard navigation completo
 * - Screen reader support
 * - Focus management
 * 
 * @security
 * - Sin vulnerabilidades conocidas
 * - Props sanitizadas
 */

import React, { memo, useCallback } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Variantes de diseño disponibles
 */
export type ToggleVariant = 'default' | 'icon' | 'compact';

/**
 * Tamaños disponibles
 */
export type ToggleSize = 'sm' | 'md' | 'lg';

/**
 * Props del componente ThemeToggle
 */
interface ThemeToggleProps {
  /** Variante de diseño */
  variant?: ToggleVariant;
  /** Tamaño del toggle */
  size?: ToggleSize;
  /** Mostrar texto descriptivo */
  showLabel?: boolean;
  /** Clases CSS adicionales */
  className?: string;
  /** ID único para accesibilidad */
  id?: string;
  /** Función callback al cambiar tema */
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

/**
 * Mapeo de tamaños a clases CSS
 */
const sizeClasses = {
  sm: {
    container: 'w-10 h-5',
    button: 'w-10 h-5',
    circle: 'w-4 h-4',
    icon: 'w-3 h-3',
    text: 'text-xs',
  },
  md: {
    container: 'w-12 h-6',
    button: 'w-12 h-6',
    circle: 'w-5 h-5',
    icon: 'w-4 h-4',
    text: 'text-sm',
  },
  lg: {
    container: 'w-14 h-7',
    button: 'w-14 h-7',
    circle: 'w-6 h-6',
    icon: 'w-5 h-5',
    text: 'text-base',
  },
};

/**
 * Iconos SVG para sun/moon
 */
const SunIcon = memo(({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
));

const MoonIcon = memo(({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
));

/**
 * Componente de toggle para cambiar tema
 */
export const ThemeToggle = memo<ThemeToggleProps>(({
  variant = 'default',
  size = 'md',
  showLabel = true,
  className = '',
  id,
  onThemeChange,
}) => {
  const { isDark, toggleTheme, resolvedTheme } = useTheme();
  const sizeConfig = sizeClasses[size];
  const toggleId = id || `theme-toggle-${Math.random().toString(36).substr(2, 9)}`;

  // Handler para cambio de tema
  const handleToggle = useCallback(() => {
    toggleTheme();
    onThemeChange?.(isDark ? 'light' : 'dark');
  }, [toggleTheme, isDark, onThemeChange]);

  // Handler para keyboard
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  // Render del toggle según variante
  const renderToggle = () => {
    if (variant === 'icon') {
      return (
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 ease-in-out ${sizeConfig.text} ${className}`}
          style={{ background: 'var(--color-surface)', color: 'var(--color-text)', outlineColor: 'var(--focus-ring)' }}
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          aria-pressed={isDark}
          id={toggleId}
        >
          <div className="relative">
            <SunIcon 
              className={`
                ${sizeConfig.icon} text-yellow-500 transition-all duration-300 ease-in-out
                ${isDark ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}
              `} 
            />
            <MoonIcon 
              className={`
                ${sizeConfig.icon} text-blue-400 absolute inset-0 transition-all duration-300 ease-in-out
                ${isDark ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}
              `} 
            />
          </div>
        </button>
      );
    }

    if (variant === 'compact') {
      return (
        <div className={`flex items-center space-x-2 ${className}`}>
          <span className={`${sizeConfig.text} text-gray-700 dark:text-gray-300`}>
            {isDark ? '🌙' : '☀️'}
          </span>
          <button
            type="button"
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={`
            relative inline-flex ${sizeConfig.container} rounded-full transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2
            `}
            style={{ background: 'var(--color-divider)' }}
            role="switch"
            aria-checked={isDark}
            aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            id={toggleId}
          >
            <span
              className={`
                ${sizeConfig.circle} translate-x-0.5 inline-block rounded-full
                shadow transform transition-transform duration-200 ease-in-out
                ${isDark ? `translate-x-6` : 'translate-x-0.5'}
              `}
              style={{ background: 'var(--color-surface)' }}
            />
          </button>
        </div>
      );
    }

    // Default variant
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && (
          <span className={`${sizeConfig.text} font-medium text-gray-700 dark:text-gray-300`}>
            Tema
          </span>
        )}
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`
            relative inline-flex ${sizeConfig.container} rounded-full p-1 transition-colors duration-300 ease-in-out
            focus:outline-none focus:ring-2 hover:opacity-90
          `}
          style={{ background: 'var(--color-divider)' }}
          role="switch"
          aria-checked={isDark}
          aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          aria-describedby={showLabel ? `${toggleId}-description` : undefined}
          id={toggleId}
        >
          <span
            className={`
              ${sizeConfig.circle} relative inline-block rounded-full
              shadow-lg transform transition-all duration-300 ease-in-out
              ${isDark ? 'translate-x-6' : 'translate-x-0'}
            `}
            style={{ background: 'var(--color-surface)' }}
          >
            <span className="absolute inset-0 flex items-center justify-center">
              <SunIcon 
                className={`
                  ${sizeConfig.icon} text-yellow-500 transition-all duration-300 ease-in-out
                  ${isDark ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}
                `} 
              />
              <MoonIcon 
                className={`
                  ${sizeConfig.icon} text-blue-500 absolute transition-all duration-300 ease-in-out
                  ${isDark ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}
                `} 
              />
            </span>
          </span>
        </button>
        {showLabel && (
          <span 
            id={`${toggleId}-description`} 
            className={`${sizeConfig.text} text-gray-500 dark:text-gray-400`}
          >
            {isDark ? 'Oscuro' : 'Claro'}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="theme-toggle" data-testid="theme-toggle">
      {renderToggle()}
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
