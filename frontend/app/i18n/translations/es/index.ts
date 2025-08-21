/**
 * @fileoverview Archivo principal de traducciones en español (ES)
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Exporta todas las traducciones en español de forma modular.
 * Permite cargar secciones específicas y mantener el código organizado.
 * 
 * @dependencies
 * - Archivos de traducción modulares de la carpeta /es/
 * 
 * @usage
 * import { esTranslations } from './translations/es';
 * 
 * @state
 * ✅ Funcional - Estructura modular para traducciones
 * 
 * @performance
 * - Carga modular para mejor tree-shaking
 * - Estructura optimizada para mantenimiento
 */

// Import translation modules
import { navigation } from './navigation';
import { home } from './home';
import { form } from './form';
import { history } from './history';
import { about } from './about';
import { sidebar } from './sidebar';
import { footer } from './footer';
import { common } from './common';
import { analysis } from './analysis';
import bhaskara from './bhaskara';
import revenue from './revenue';
import costs from './costs';
import profit from './profit';
import breakeven from './breakeven';
import compoundInterest from './compoundInterest';
import currencyConverter from './currencyConverter';
import numberConverter from './numberConverter';
import { download } from './download';

// Exportar traducciones completas en español
export const esTranslations = {
  // Navegación básica
  nav: navigation.nav,
  
  // Páginas principales
  home,
  about,
  history,
  
  // Componentes de UI
  form,
  sidebar,
  footer,
  
  // Estados y acciones comunes
  common,
  navigation: navigation.navigation,
  accessibility: navigation.accessibility,
  actions: navigation.actions,
  
  // Módulos de análisis
  analysis,
  bhaskara,
  revenue,
  costs,
  profit,
  breakeven,
  compoundInterest,
  currencyConverter,
  numberConverter,
  
  // Sistema de descarga
  download,
} as const;

export default esTranslations;
