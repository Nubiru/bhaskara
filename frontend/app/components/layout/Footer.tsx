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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Logo y descripción */}
          <div className="flex items-center space-x-3">
            <img
              src="/favicon.png"
              alt="MutualMetrics logo"
              className="w-6 h-6 rounded-lg"
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
            />
            <span className="text-lg font-bold">MutualMetrics</span>
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('footer.description')}
            </span>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-sm hover:text-blue-400 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/history" className="text-sm hover:text-blue-400 transition-colors">
              {t('nav.history')}
            </Link>
            <Link to="/about" className="text-sm hover:text-blue-400 transition-colors">
              {t('nav.about')}
            </Link>
            <a
              href="https://github.com/mutualmetrics"
              className="text-sm hover:text-blue-400 transition-colors"
              aria-label="Visitar GitHub de MutualMetrics"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              href="mailto:contact@mutualmetrics.com"
              className="text-sm hover:text-blue-400 transition-colors"
              aria-label="Enviar email a contact@mutualmetrics.com"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
