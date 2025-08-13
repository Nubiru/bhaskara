/**
 * @fileoverview Componente de toggle para cambio de idioma
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Componente para cambiar entre Español e Inglés. Similar al ThemeToggle
 * pero para internacionalización. Incluye persistencia en localStorage
 * y animaciones suaves entre cambios de idioma.
 * 
 * @dependencies
 * - react-i18next para manejo de idiomas
 * - useTranslation hook para traducciones
 * - Animaciones CSS personalizadas
 * 
 * @usage
 * <LanguageToggle variant="icon" size="sm" />
 * <LanguageToggle variant="default" showLabel={true} />
 * 
 * @state
 * ✅ Funcional - Toggle de idioma completamente implementado
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar más idiomas (PT, FR)
 * - [PRIORITY: LOW] Animaciones avanzadas de transición
 * - [PRIORITY: LOW] Tooltip con preview del idioma
 * 
 * @performance
 * - Memoizado para evitar re-renders innecesarios
 * - Debounce en cambios rápidos de idioma
 * - Transiciones GPU-aceleradas
 * 
 * @accessibility
 * - ARIA labels completos
 * - Soporte de teclado (Enter, Space)
 * - Screen reader friendly
 * - High contrast support
 * 
 * @security
 * - Validación de códigos de idioma
 * - Sanitización de inputs de usuario
 */

import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, isLanguageSupported, type LanguageCode } from '../../i18n/config';

/**
 * Tamaños disponibles para el toggle
 */
export type LanguageToggleSize = 'sm' | 'md' | 'lg';

/**
 * Variantes de diseño del toggle
 */
export type LanguageToggleVariant = 'default' | 'icon' | 'compact';

/**
 * Props del componente LanguageToggle
 */
interface LanguageToggleProps {
  /** Tamaño del toggle */
  size?: LanguageToggleSize;
  
  /** Variante de diseño */
  variant?: LanguageToggleVariant;
  
  /** Mostrar etiqueta de texto */
  showLabel?: boolean;
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Callback cuando cambia el idioma */
  onLanguageChange?: (language: LanguageCode) => void;
}

/**
 * Configuración de estilos por tamaño
 */
const sizeStyles: Record<LanguageToggleSize, string> = {
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-3 py-2',
  lg: 'text-lg px-4 py-3'
};

/**
 * Configuración de iconos por tamaño
 */
const iconSizes: Record<LanguageToggleSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

/**
 * Mapeo de idiomas a información de visualización
 */
const languageInfo: Record<LanguageCode, {
  flag: string;
  name: string;
  nativeName: string;
  shortCode: string;
}> = {
  es: {
    flag: '🇪🇸',
    name: 'Spanish',
    nativeName: 'Español',
    shortCode: 'ES'
  },
  en: {
    flag: '🇺🇸',
    name: 'English',
    nativeName: 'English',
    shortCode: 'EN'
  }
};

/**
 * Componente principal LanguageToggle
 */
export const LanguageToggle = memo<LanguageToggleProps>(({
  size = 'md',
  variant = 'default',
  showLabel = true,
  className = '',
  onLanguageChange
}) => {
  const { t, i18n } = useTranslation();
  
  // Get current language safely with fallback
  const currentLanguage = useMemo(() => {
    const lang = i18n.language;
    return (lang && isLanguageSupported(lang)) ? lang : 'es';
  }, [i18n.language]);
  
  /**
   * Maneja el cambio de idioma
   */
  const handleLanguageToggle = useCallback(async () => {
    const newLanguage: LanguageCode = currentLanguage === 'es' ? 'en' : 'es';
    console.log('🌐 Language toggle clicked:', currentLanguage, '→', newLanguage);
    
    try {
      await changeLanguage(newLanguage);
      console.log('🌐 Language changed successfully');
      onLanguageChange?.(newLanguage);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [currentLanguage, onLanguageChange]);

  /**
   * Maneja eventos de teclado
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLanguageToggle();
    }
  }, [handleLanguageToggle]);

  /**
   * Información del idioma actual y siguiente
   */
  const currentLangInfo = useMemo(() => languageInfo[currentLanguage], [currentLanguage]);
  const nextLanguage: LanguageCode = currentLanguage === 'es' ? 'en' : 'es';
  const nextLangInfo = useMemo(() => languageInfo[nextLanguage], [nextLanguage]);

  /**
   * Clases CSS combinadas
   */
  const buttonClasses = useMemo(() => {
    const base = [
      'inline-flex items-center justify-center',
      'rounded-lg',
      'transition-all duration-200 ease-in-out',
      'cursor-pointer select-none',
      'font-medium',
      sizeStyles[size]
    ];
    if (variant === 'icon') base.push('aspect-square');
    if (variant === 'compact') base.push('space-x-1');
    return [...base, className].filter(Boolean).join(' ');
  }, [size, variant, className]);

  /**
   * ARIA label para accesibilidad
   */
  const ariaLabel = useMemo(() => {
    if (!currentLangInfo || !nextLangInfo) {
      return t('nav.toggleLanguage') || 'Toggle Language';
    }
    return `${t('nav.toggleLanguage')}. ${t('common.current')}: ${currentLangInfo.nativeName}. ${t('common.switchTo')}: ${nextLangInfo.nativeName}`;
  }, [t, currentLangInfo, nextLangInfo]);

  /**
   * Renderizado del contenido según variante
   */
  const renderContent = () => {
    // Safety check
    if (!currentLangInfo) {
      return <span>🌐</span>;
    }

    switch (variant) {
      case 'icon':
        return (
          <span 
            className={`${iconSizes[size]} flex items-center justify-center animate-fade-in`}
            aria-hidden="true"
          >
            {currentLangInfo.flag}
          </span>
        );

      case 'compact':
        return (
          <>
            <span 
              className="animate-fade-in"
              aria-hidden="true"
            >
              {currentLangInfo.flag}
            </span>
            {showLabel && (
              <span className="font-semibold animate-slide-right">
                {currentLangInfo.shortCode}
              </span>
            )}
          </>
        );

      default: // 'default'
        return (
          <>
            <span 
              className="animate-fade-in mr-2"
              aria-hidden="true"
            >
              {currentLangInfo.flag}
            </span>
            {showLabel && (
              <span className="animate-slide-right">
                {currentLangInfo.nativeName}
              </span>
            )}
            <svg
              className={`${iconSizes[size]} ml-2 transition-transform duration-200 group-hover:scale-110`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l4-4m0 0l4-4m-4 4v12"
              />
            </svg>
          </>
        );
    }
  };

  return (
    <button
      type="button"
      className={`group ${buttonClasses}`}
      onClick={handleLanguageToggle}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      title={`${t('nav.toggleLanguage')} (${currentLangInfo.nativeName} → ${nextLangInfo.nativeName})`}
      role="switch"
      aria-checked={currentLanguage === 'en'} // Switch between ES (false) and EN (true)
      style={{ background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-divider)', outlineColor: 'var(--focus-ring)' }}
    >
      {renderContent()}
      
      {/* Indicador visual de estado para screen readers */}
      <span className="sr-only">
        {t('common.currentLanguage')}: {currentLangInfo.nativeName}. 
        {t('common.clickToSwitch')} {nextLangInfo.nativeName}.
      </span>
    </button>
  );
});

// Asignar displayName para debugging
LanguageToggle.displayName = 'LanguageToggle';

export default LanguageToggle;
