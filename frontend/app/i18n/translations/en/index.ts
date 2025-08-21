/**
 * @fileoverview English translations main index file
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Exports all English translations in a modular structure.
 * Allows loading specific sections and maintaining organized code.
 * 
 * @dependencies
 * - Modular translation files from /en/ folder
 * 
 * @usage
 * import { enTranslations } from './translations/en';
 * 
 * @state
 * ✅ Functional - Modular structure for translations
 * 
 * @performance
 * - Modular loading for better tree-shaking
 * - Structure optimized for maintenance
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

// Export complete English translations
export const enTranslations = {
  // Basic navigation
  nav: navigation.nav,
  
  // Main pages
  home,
  about,
  history,
  
  // UI components
  form,
  sidebar,
  footer,
  
  // Common states and actions
  common,
  navigation: navigation.navigation,
  accessibility: navigation.accessibility,
  actions: navigation.actions,
  
  // Analysis modules
  analysis,
  bhaskara,
  revenue,
  costs,
  profit,
  breakeven,
  compoundInterest,
  currencyConverter,
  numberConverter,
  
  // Download system
  download,
} as const;

export default enTranslations;
