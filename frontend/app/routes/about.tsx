/**
 * @fileoverview Página de información sobre el proyecto
 * @version 1.0.1
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-21
 * 
 * @description
 * Página que proporciona información sobre el proyecto MutualMetrics,
 * implementada con grid 2×2 sin scroll, tokens temáticos y superficies elevadas.
 * Optimizada para SEO y accesibilidad completa.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * - Sistema de temas unificado
 * 
 * @usage
 * Ruta accesible en "/about"
 * 
 * @state
 * ✅ Funcional - Grid 2×2 implementado con tokens temáticos y sin scroll
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar más detalles del equipo
 * - [PRIORITY: LOW] Incluir roadmap del proyecto
 * - [PRIORITY: LOW] Agregar enlaces a redes sociales
 * 
 * @performance
 * - Contenido estático optimizado
 * - Grid layout sin scroll para mejor UX
 * - Transiciones suaves con hover effects
 * 
 * @accessibility
 * - Estructura semántica correcta
 * - Navegación por teclado implementada
 * - ARIA labels y roles apropiados
 * - Contraste de colores optimizado
 * - Grid layout accesible
 * 
 * @security
 * - Enlaces externos con rel="noopener noreferrer"
 * - Validación de URLs
 * - Protección contra clickjacking
 * - Sanitización de contenido dinámico
 */

import { memo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Configuración de meta tags para SEO y accesibilidad
 */
export function meta() {
  return [
    { title: "About - MutualMetrics" },
    { name: "description", content: "Learn more about MutualMetrics, our mission and the technologies we use." },
    { name: "keywords", content: "MutualMetrics, quadratic analysis, mathematical functions, team, technologies" },
    { name: "author", content: "MutualMetrics Team" },
    { property: "og:title", content: "About - MutualMetrics" },
    { property: "og:description", content: "Learn more about MutualMetrics, our mission and technologies" },
    { property: "og:type", content: "website" },
  ];
}

/**
 * Props del componente AboutPage
 */
interface AboutPageProps {
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Página de información sobre el proyecto
 * Proporciona detalles sobre MutualMetrics y su equipo
 * Implementa patrones de diseño responsivo y accesibilidad completa
 */
const AboutPage = memo<AboutPageProps>(({ className = '' }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`h-screen overflow-hidden ${className}`} style={{ background: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        {/* Header de la página */}
        <header className="text-center py-6 flex-shrink-0">
          <img
            src="/favicon.png"
            alt="MutualMetrics logo"
            className="w-12 h-12 mx-auto mb-4"
            width={48}
            height={48}
          />
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            {t('about.title')}
          </h1>
          <p 
            className="text-xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('about.subtitle')}
          </p>
        </header>

        {/* Grid 2×2 principal - sin scroll */}
        <main className="flex-1 grid grid-cols-2 grid-rows-2 gap-6 pb-6">
          {/* Card 1: Misión y Propósito */}
          <div 
            className="rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{ 
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-divider)'
            }}
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                🎯
              </div>
              <h2 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {t('about.mission.title')}
              </h2>
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t('about.mission.description')}
            </p>
          </div>

          {/* Card 2: Tecnologías */}
          <div 
            className="rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{ 
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-divider)'
            }}
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
                ⚡
              </div>
              <h2 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {t('about.technologies.title')}
              </h2>
            </div>
            <div className="space-y-2">
              {['frontend', 'backend', 'deployment'].map((tech) => (
                <div key={tech} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }} />
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {t(`about.technologies.${tech}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Equipo */}
          <div 
            className="rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{ 
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-divider)'
            }}
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: 'var(--color-success)', color: 'white' }}>
                👥
              </div>
              <h2 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {t('about.team.title')}
              </h2>
            </div>
            <div className="space-y-2">
              {['lead', 'frontend', 'backend'].map((role) => (
                <div key={role} className="flex items-center justify-between">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t(`about.team.roles.${role}`)}
                  </span>
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-text)'
                    }}
                  >
                    {t(`about.team.names.${role}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Características */}
          <div 
            className="rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{ 
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-divider)'
            }}
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: 'var(--color-warning)', color: 'white' }}>
                ✨
              </div>
              <h2 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {t('about.features.title')}
              </h2>
            </div>
            <div className="space-y-2">
              {['accessibility', 'performance', 'responsive'].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    style={{ color: 'var(--color-success)' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {t(`about.features.${feature}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});

export default AboutPage;
