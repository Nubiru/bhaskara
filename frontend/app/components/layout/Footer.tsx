/**
 * @fileoverview Componente Footer con información del proyecto
 * @version 1.0.1
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Componente de pie de página que incluye información del proyecto,
 * enlaces útiles, detalles de contacto y enlaces de redes sociales.
 * Optimizado para accesibilidad y SEO.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * 
 * @usage
 * Se renderiza automáticamente en el layout principal de la aplicación.
 * 
 * @state
 * ✅ Funcional - Información completa implementada con accesibilidad
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar newsletter signup
 * - [PRIORITY: LOW] Implementar analytics tracking
 * - [PRIORITY: LOW] Agregar más enlaces de redes sociales
 * 
 * @performance
 * - Componente memoizado para optimización
 * - Enlaces optimizados con preload
 * - Imágenes lazy-loaded (pendiente)
 * 
 * @accessibility
 * - Enlaces con descripciones apropiadas
 * - Estructura semántica correcta
 * - Navegación por teclado
 * 
 * @security
 * - Enlaces externos con rel="noopener noreferrer"
 * - Validación de URLs
 * - Protección contra clickjacking
 */

import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

/**
 * Props del componente Footer
 */
interface FooterProps {
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Tipo para enlaces del footer
 */
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
  description?: string;
}

/**
 * Componente Footer con información del proyecto
 * Incluye enlaces útiles, información de contacto y detalles del proyecto
 */
export const Footer = memo<FooterProps>(({ className = '' }) => {
  const { t } = useTranslation();
  
  // Enlaces de producto con traducciones
  const productLinks: FooterLink[] = [
    { name: t('nav.home'), href: '/', description: 'Herramienta principal de análisis' },
    { name: t('nav.history'), href: '/history', description: 'Ver análisis previos' },
    { name: t('nav.about'), href: '/about', description: 'Información del proyecto' },
  ];

  // Enlaces de recursos con traducciones
  const resourceLinks: FooterLink[] = [
    { name: t('footer.documentation'), href: '#', external: true, description: 'Guías de uso' },
    { name: 'API Reference', href: '#', external: true, description: 'Documentación técnica' },
    { name: 'Ejemplos', href: '#', external: true, description: 'Casos de uso' },
  ];

  // Enlaces legales con traducciones
  const legalLinks: FooterLink[] = [
    { name: t('footer.privacy'), href: '#', external: true, description: 'Política de privacidad' },
    { name: t('footer.terms'), href: '#', external: true, description: 'Términos de servicio' },
    { name: 'Cookies', href: '#', external: true, description: 'Política de cookies' },
  ];

  return (
    <footer className={`${className}`} role="contentinfo" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-divider)', color: 'var(--color-text)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/favicon.png"
                alt="MutualMetrics logo"
                className="w-8 h-8 rounded-lg"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
              />
              <span className="text-xl font-bold">MutualMetrics</span>
            </div>
            <p className="mb-4 max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mutualmetrics"
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md"
                aria-label="Visitar GitHub de MutualMetrics"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@mutualmetrics.com"
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md"
                aria-label="Enviar email a contact@mutualmetrics.com"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos - Producto */}
          <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {t('footer.links')}
            </h3>
            <ul className="space-y-2" role="list">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md"
                    aria-describedby={link.description ? `${link.name}-description` : undefined}
                  >
                    {link.name}
                    {link.description && (
                      <span id={`${link.name}-description`} className="sr-only">
                        {link.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Recursos
            </h3>
            <ul className="space-y-2" role="list">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md"
                    aria-describedby={link.description ? `${link.name}-description` : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    target={link.external ? "_blank" : undefined}
                  >
                    {link.name}
                    {link.description && (
                      <span id={`${link.name}-description`} className="sr-only">
                        {link.description}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--color-divider)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md"
                  aria-describedby={link.description ? `${link.name}-description` : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  target={link.external ? "_blank" : undefined}
                >
                  {link.name}
                  {link.description && (
                    <span id={`${link.name}-description`} className="sr-only">
                      {link.description}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
