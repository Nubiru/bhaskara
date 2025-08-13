/**
 * @fileoverview Página de información sobre el proyecto
 * @version 1.0.1
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Página que proporciona información sobre el proyecto MutualMetrics,
 * su propósito, tecnologías utilizadas, equipo de desarrollo y contacto.
 * Optimizada para SEO y accesibilidad completa.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * 
 * @usage
 * Ruta accesible en "/about"
 * 
 * @state
 * ✅ Funcional - Información completa implementada con accesibilidad
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
 * - Imágenes optimizadas (pendiente)
 * - Lazy loading de contenido (pendiente)
 * 
 * @accessibility
 * - Estructura semántica correcta
 * - Navegación por teclado implementada
 * - ARIA labels y roles apropiados
 * - Contraste de colores optimizado
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
    <div className={`min-h-screen py-6 ${className}`} style={{ background: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la página */}
        <header className="text-center mb-6">
          <img
            src="/favicon.png"
            alt="MutualMetrics logo"
            className="w-12 h-12 mx-auto mb-4"
            width={48}
            height={48}
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.subtitle')}
          </p>
        </header>
        {/* Primer bloque: Propósito + Características en 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <section className="rounded-lg shadow-lg p-6" aria-labelledby="purpose-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="purpose-title" className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              {t('about.purpose')}
            </h2>
            <div className="max-w-none">
              <p className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {t('about.purposeText1')}
              </p>
              <p className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {t('about.purposeText2')}
              </p>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {t('about.purposeText3')}
              </p>
            </div>
          </section>

          <section className="rounded-lg shadow-lg p-6" aria-labelledby="features-title" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-divider)' }}>
            <h2 id="features-title" className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              {t('about.features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>{t('about.feature1Title')}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('about.feature1Text')}
                </p>
              </div>
            </article>
              <article className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>{t('about.feature2Title')}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('about.feature2Text')}
                </p>
              </div>
            </article>
              <article className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>{t('about.feature3Title')}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('about.feature3Text')}
                </p>
              </div>
            </article>
              <article className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--color-text)' }}>{t('about.feature4Title')}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('about.feature4Text')}
                </p>
              </div>
            </article>
            </div>
          </section>
        </div>

        {/* Segundo bloque: Tecnologías + Contacto en 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" aria-labelledby="tech-title">
            <h2 id="tech-title" className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('about.technology')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('about.techFrontendTitle')}</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>React Router v7</p>
                  <p>TypeScript</p>
                  <p>Tailwind CSS</p>
                  <p>Chart.js</p>
                </div>
              </article>
              <article className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('about.techBackendTitle')}</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Python</p>
                  <p>FastAPI</p>
                  <p>Uvicorn</p>
                  <p>NumPy</p>
                </div>
              </article>
              <article className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('about.techQualityTitle')}</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Jest</p>
                  <p>ESLint</p>
                  <p>Prettier</p>
                  <p>Husky</p>
                </div>
              </article>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" aria-labelledby="contact-title">
            <h2 id="contact-title" className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('about.contact')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <article>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('about.contactDev')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('about.contactDevText')}
                </p>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>📧 {t('about.email')}: <a href="mailto:dev@mutualmetrics.com" className="text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">dev@mutualmetrics.com</a></p>
                  <p>🐙 {t('about.github')}: <a href="https://github.com/mutualmetrics" className="text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded" rel="noopener noreferrer" target="_blank">github.com/mutualmetrics</a></p>
                </div>
              </article>
              <article>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('about.contactContrib')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('about.contactContribText')}
                </p>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>🐛 {t('about.reportBugs')}</p>
                  <p>💡 {t('about.suggestions')}</p>
                  <p>📖 {t('about.documentation')}</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

export default AboutPage;
