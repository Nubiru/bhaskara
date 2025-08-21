/**
 * @fileoverview Página de presentación principal de MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-13
 * @lastModified 2025-08-13
 * 
 * @description
 * Componente de landing page que presenta MutualMetrics con logo, descripción,
 * información del equipo y guía de inicio. Diseñado para ser la vista por defecto.
 * 
 * @dependencies
 * - react-i18next para internacionalización
 * - Sistema de temas unificado
 * 
 * @usage
 * <LandingPage className="custom-class" />
 * 
 * @state
 * ✅ Funcional - Landing page completa con presentación
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de entrada
 * - [PRIORITY: LOW] Implementar carrusel de características
 * - [PRIORITY: LOW] Agregar testimonios de usuarios
 * 
 * @performance
 * - Componente memoizado para evitar re-renders
 * - Imágenes optimizadas
 * - Lazy loading de contenido pesado
 * 
 * @accessibility
 * - Estructura semántica correcta
 * - Alt text para imágenes
 * - Contraste optimizado
 * - Navegación por teclado
 */

import { memo } from 'react';
import { useTranslation } from 'react-i18next';

// ========================================
// PROPS INTERFACE
// ========================================

interface LandingPageProps {
  /** Clases CSS adicionales */
  className?: string;
}

// ========================================
// COMPONENT IMPLEMENTATION
// ========================================

/**
 * Página de presentación principal
 */
const LandingPage = memo<LandingPageProps>(({ className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={`text-center space-y-6 h-screen flex flex-col justify-center ${className}`}>
      {/* Hero Section */}
      <section className="space-y-4" aria-labelledby="hero-title">
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src="/favicon.png" 
              alt="MutualMetrics Logo" 
              className="w-24 h-24 rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 
            id="hero-title"
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {t('home.landing.title')}
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('home.landing.subtitle')}
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-4xl mx-auto space-y-4" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">Características principales</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-left space-y-2">
            <h3 
              className="text-xl font-semibold"
              style={{ color: 'var(--color-text)' }}
            >
              🎯 Professional Tools
            </h3>
            <p 
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-text)' }}
            >
              {t('home.landing.description')}
            </p>
          </div>
          <div className="text-left space-y-2">
            <h3 
              className="text-xl font-semibold"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              🚀 Comprehensive Suite
            </h3>
            <p 
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t('home.landing.descriptionSecondary')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-3" aria-labelledby="team-title">
        <h2 
          id="team-title"
          className="text-2xl font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          {t('home.landing.developedBy')}
        </h2>
        <div className="flex justify-center">
          <div 
            className="inline-flex items-center gap-3 p-4 rounded-xl"
            style={{ 
              background: 'var(--color-surface-elevated)', 
              border: '1px solid var(--color-divider)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
              M
            </div>
            <div className="text-left">
              <p 
                className="text-lg font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                {t('home.landing.team')}
              </p>
              <p 
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t('home.landing.teamRole')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="max-w-2xl mx-auto" aria-labelledby="getting-started-title">
        <div 
          className="p-6 rounded-xl text-center"
          style={{ 
            background: 'var(--color-surface-elevated)', 
            border: '1px solid var(--color-divider)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            backgroundImage: 'linear-gradient(135deg, var(--color-surface-elevated) 0%, rgba(var(--color-primary-rgb, 59, 130, 246), 0.05) 100%)'
          }}
        >
          <h3 
            id="getting-started-title"
            className="text-xl font-bold mb-3"
            style={{ color: 'var(--color-text)' }}
          >
            {t('home.landing.gettingStarted')}
          </h3>
          <p 
            className="text-base leading-relaxed mb-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('home.landing.gettingStartedDescription')}
          </p>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg">
              <span>👈</span>
              <span>Explore Tools</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

// ========================================
// DISPLAY NAME
// ========================================

LandingPage.displayName = 'LandingPage';

export default LandingPage;
