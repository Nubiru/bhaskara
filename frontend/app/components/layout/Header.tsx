/**
 * @fileoverview Componente Header con navegación principal
 * @version 1.0.1
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Componente de navegación principal que incluye el logo, menú de navegación
 * y funcionalidades de usuario. Responsive, accesible y optimizado para performance.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * 
 * @usage
 * Se renderiza automáticamente en el layout principal de la aplicación.
 * 
 * @state
 * ✅ Funcional - Navegación básica implementada con accesibilidad
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: MEDIUM] Agregar menú de usuario con dropdown
 * - [PRIORITY: LOW] Implementar búsqueda global
 * - [PRIORITY: LOW] Agregar notificaciones
 * 
 * @performance
 * - Componente memoizado para optimización
 * - Navegación optimizada con React Router
 * - Lazy loading de menús (pendiente)
 * 
 * @accessibility
 * - Navegación por teclado implementada
 * - ARIA labels y roles apropiados
 * - Indicadores de página actual
 * 
 * @security
 * - Navegación segura implementada
 * - Enlaces internos validados
 */

import { memo, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';

/**
 * Props del componente Header
 */
interface HeaderProps {
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Tipo para elementos de navegación
 */
interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  description?: string;
}

/**
 * Componente Header con navegación principal
 * Incluye logo, menú de navegación y funcionalidades de usuario
 */
export const Header = memo<HeaderProps>(({ className = '' }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navegación principal con traducciones
  const navigation: NavigationItem[] = [
    { 
      name: t('nav.home'), 
      href: '/', 
      current: location.pathname === '/',
      description: 'Analizar funciones cuadráticas'
    },
    { 
      name: t('nav.history'), 
      href: '/history', 
      current: location.pathname === '/history',
      description: 'Ver análisis previos'
    },
    { 
      name: t('nav.about'), 
      href: '/about', 
      current: location.pathname === '/about',
      description: 'Información del proyecto'
    },
  ];

  // Handlers para accesibilidad
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={`shadow-sm transition-colors duration-200 ${className}`} role="banner" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-divider)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y marca */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
              aria-label="Ir al inicio de MutualMetrics"
            >
              <img
                src="/favicon.png"
                alt="MutualMetrics logo"
                className="w-8 h-8 rounded-lg"
                width={32}
                height={32}
                loading="eager"
                decoding="async"
              />
              <span className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                MutualMetrics
              </span>
            </Link>
          </div>

          {/* Navegación principal - Desktop */}
           <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Navegación principal">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 hover:underline hover:underline-offset-4 ${item.current ? 'underline underline-offset-4' : ''}`}
                style={{
                  color: item.current ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  background: 'transparent',
                  outlineColor: 'var(--focus-ring)'
                }}
                aria-current={item.current ? 'page' : undefined}
                aria-describedby={item.description ? `${item.name}-description` : undefined}
              >
                {item.name}
                {item.description && (
                  <span id={`${item.name}-description`} className="sr-only">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Acciones de usuario */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle variant="icon" size="sm" showLabel={false} />
            
            {/* Theme Toggle */}
            <ThemeToggle variant="icon" size="sm" showLabel={false} />
            
            {/* TODO: Agregar menú de usuario */}
            <button
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md"
              aria-label="Menú de usuario"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* Menú móvil - Botón */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md"
              aria-label="Abrir menú móvil"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={handleMobileMenuToggle}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil expandido */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu" 
          className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
          role="navigation"
          aria-label="Navegación móvil"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  item.current
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-current={item.current ? 'page' : undefined}
                onClick={handleMobileMenuClose}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language and Theme Toggles en mobile */}
            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4 space-y-3">
              <LanguageToggle variant="default" size="sm" showLabel={true} />
              <ThemeToggle variant="default" size="sm" showLabel={true} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
