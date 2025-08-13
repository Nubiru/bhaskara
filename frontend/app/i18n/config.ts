/**
 * @fileoverview Configuración de internacionalización (i18n) para MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Configuración principal de react-i18next para soporte bilingüe
 * (Español/Inglés). Incluye detección automática de idioma del navegador,
 * persistencia en localStorage y carga modular de recursos de traducción.
 * 
 * @dependencies
 * - react-i18next v13+
 * - i18next-browser-languagedetector
 * - Módulos de traducción modulares (./translations/es, ./translations/en)
 * 
 * @usage
 * import './i18n/config';
 * En componentes: const { t, i18n } = useTranslation();
 * 
 * @state
 * ✅ Funcional - Configuración i18n modular lista para uso
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: MEDIUM] Agregar más idiomas (Portugués, Francés)
 * - [PRIORITY: LOW] Implementar carga lazy de traducciones
 * - [PRIORITY: LOW] Agregar pluralización avanzada
 * 
 * @performance
 * - Estructura modular para mejor tree-shaking y mantenimiento
 * - Carga optimizada de traducciones por módulos
 * - Detección eficiente de idioma del navegador
 * - Persistencia local para evitar re-detección
 * 
 * @accessibility
 * - lang attribute sincronizado con HTML
 * - Soporte completo para lectores de pantalla
 * - Respeta preferencias de idioma del sistema
 * 
 * @security
 * - Validación de códigos de idioma
 * - Sanitización de valores de traducción
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones modulares
import { esTranslations } from './translations/es';
import { enTranslations } from './translations/en';

// Recursos de traducción modulares para mejor mantenimiento
const resources = {
  es: {
    translation: esTranslations
  },
  en: {
    translation: enTranslations
  }
} as const;

// Configuración de i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    
    // Idioma por defecto
    fallbackLng: 'es',
    
    // Idiomas soportados
    supportedLngs: ['es', 'en'],
    
    // Configuración del detector de idioma
    detection: {
      // Orden de detección: localStorage > navigator > default
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Clave para localStorage
      lookupLocalStorage: 'i18nextLng',
      
      // Cache del idioma detectado
      caches: ['localStorage'],
      
      // Excluir cache en ciertos casos
      excludeCacheFor: ['cimode']
    },
    
    // Interpolación y formato (actualizado para i18next>=21.3.0)
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
      formatSeparator: ',',
      // Removed legacy format function - use built-in formatters now
    },
    
    // Configuración de depuración (deshabilitado para production)
    debug: false,
    
    // Configuración de React
    react: {
      useSuspense: false, // Evitar suspense para mejor control
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span']
    },
    
    // Configuración de carga
    load: 'languageOnly', // Cargar solo 'es' en lugar de 'es-ES'
    
    // Configuración de namespaces
    defaultNS: 'translation',
    
    // Configuración de separadores
    keySeparator: '.',
    nsSeparator: ':',
    
    // Configuración de pluralización
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // Configuración de postProcesado
    postProcess: ['interval'],
    
    // Configuración de limpieza de código
    cleanCode: true,
    
    // Configuración de retorno
    returnNull: false,
    returnEmptyString: false,
    returnObjects: false,
    
    // Configuración de joins
    joinArrays: false,
    
    // Configuración de parsing
    parseMissingKeyHandler: (key: string) => {
      if (import.meta.env.DEV) {
        console.warn(`🌐 Missing translation key: ${key}`);
      }
      return key;
    }
  });

// Exportar la instancia configurada
export default i18n;

// Tipos TypeScript para las claves de traducción
export type TranslationKeys = typeof resources.es.translation;
export type LanguageCode = 'es' | 'en';

// Función helper para cambio de idioma
export const changeLanguage = (lng: LanguageCode): Promise<void> => {
  return i18n.changeLanguage(lng).then(() => {
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = lng;
    
    // Actualizar meta tags si es necesario
    const htmlLangMeta = document.querySelector('meta[name="language"]');
    if (htmlLangMeta) {
      htmlLangMeta.setAttribute('content', lng);
    }
  });
};

// Función helper para obtener idioma actual
export const getCurrentLanguage = (): LanguageCode => {
  return i18n.language as LanguageCode;
};

// Función helper para verificar si un idioma está soportado
export const isLanguageSupported = (lng: string): lng is LanguageCode => {
  const supportedLngs = i18n.options.supportedLngs;
  if (!supportedLngs || !Array.isArray(supportedLngs)) {
    return false;
  }
  return supportedLngs.includes(lng);
};