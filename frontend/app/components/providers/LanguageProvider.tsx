/**
 * @fileoverview Provider de idioma para inicialización de i18n
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Provider que inicializa el sistema i18n y asegura que las traducciones
 * estén disponibles antes del primer render. Maneja la detección automática
 * de idioma y la sincronización con el DOM.
 * 
 * @dependencies
 * - react-i18next para traducciones
 * - i18n config personalizado
 * 
 * @usage
 * <LanguageProvider>
 *   <App />
 * </LanguageProvider>
 * 
 * @state
 * ✅ Funcional - Provider de idioma listo
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Loading spinner durante carga de traducciones
 * - [PRIORITY: LOW] Error boundary para fallos de i18n
 * 
 * @performance
 * - Inicialización optimizada de i18n
 * - Evita flicker de traducciones
 * 
 * @accessibility
 * - Sincronización del atributo lang
 * - Soporte RTL preparado para futuras expansiones
 * 
 * @security
 * - Sin vulnerabilidades conocidas
 */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage } from '../../i18n/config';

/**
 * Props del LanguageProvider
 */
interface LanguageProviderProps {
  children: React.ReactNode;
}

/**
 * Componente interno que maneja la inicialización del idioma
 */
const LanguageInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Solo ejecutar si i18n está inicializado
    if (!i18n.isInitialized) {
      return;
    }

    // Función para aplicar cambios de idioma al DOM
    const applyLanguageToDOM = (language: string) => {
      // Actualizar atributo lang del HTML
      document.documentElement.lang = language;
      
      // Actualizar dirección de texto (preparado para RTL)
      const direction = ['ar', 'he', 'fa'].includes(language) ? 'rtl' : 'ltr';
      document.documentElement.dir = direction;
      
      // Actualizar meta tag de idioma si existe
      let languageMeta = document.querySelector('meta[name="language"]');
      if (!languageMeta) {
        languageMeta = document.createElement('meta');
        languageMeta.setAttribute('name', 'language');
        document.head.appendChild(languageMeta);
      }
      languageMeta.setAttribute('content', language);
      
      // Actualizar meta tag de locale
      let localeMeta = document.querySelector('meta[property="og:locale"]');
      if (!localeMeta) {
        localeMeta = document.createElement('meta');
        localeMeta.setAttribute('property', 'og:locale');
        document.head.appendChild(localeMeta);
      }
      const locale = language === 'es' ? 'es_ES' : 'en_US';
      localeMeta.setAttribute('content', locale);
    };

    // Aplicar idioma inicial solo una vez
    if (i18n.language) {
      applyLanguageToDOM(i18n.language);
    }
    
    // Listener para cambios de idioma
    const handleLanguageChange = (lng: string) => {
      applyLanguageToDOM(lng);
    };

    // Suscribirse a cambios de idioma
    i18n.on('languageChanged', handleLanguageChange);
    
    // Marcar como inicializado solo una vez
    if (!isInitialized) {
      setIsInitialized(true);
    }

    // Cleanup
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n.isInitialized, i18n.language]); // Fixed dependencies

  // Mostrar loading hasta que i18n esté listo
  if (!isInitialized || !i18n.isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Cargando... / Loading...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Provider principal de idioma
 * 
 * @param children - Componentes hijos que tendrán acceso a las traducciones
 * @returns JSX element con i18n inicializado
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  return (
    <LanguageInitializer>
      {children}
    </LanguageInitializer>
  );
};

export default LanguageProvider;
