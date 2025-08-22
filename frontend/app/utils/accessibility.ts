/**
 * @fileoverview Utilidades de accesibilidad para MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Utilidades para validar y mejorar la accesibilidad de la aplicación,
 * incluyendo navegación por teclado, compatibilidad con lectores de pantalla,
 * y validación de ARIA labels.
 * 
 * @dependencies
 * - WCAG 2.1 AA guidelines
 * - ARIA specification
 * - Keyboard navigation patterns
 * 
 * @usage
 * Importar y usar para validar accesibilidad en componentes
 * 
 * @state
 * ✅ Funcional - Utilidades de accesibilidad implementadas
 * 
 * @accessibility
 * - Validación de navegación por teclado
 * - Verificación de ARIA labels
 * - Compatibilidad con lectores de pantalla
 * - Conformidad WCAG 2.1 AA
 */

/**
 * Configuración de accesibilidad para navegación por teclado
 */
export const keyboardNavigationConfig = {
  // Teclas de navegación estándar
  keys: {
    TAB: 'Tab',
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
  },
  
  // Patrones de navegación
  patterns: {
    HORIZONTAL: ['ArrowLeft', 'ArrowRight'],
    VERTICAL: ['ArrowUp', 'ArrowDown'],
    GRID: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
    LIST: ['ArrowUp', 'ArrowDown', 'Home', 'End'],
  }
} as const;

/**
 * Valida si un elemento es navegable por teclado
 * @param element Elemento HTML a validar
 * @returns Objeto con resultado de validación
 */
export function validateKeyboardNavigation(element: HTMLElement): {
  isFocusable: boolean;
  hasTabIndex: boolean;
  hasKeyboardHandlers: boolean;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  
  // Verificar si el elemento es focusable
  const isFocusable = element.tabIndex >= 0 || 
                     element.tagName === 'BUTTON' ||
                     element.tagName === 'A' ||
                     element.tagName === 'INPUT' ||
                     element.tagName === 'SELECT' ||
                     element.tagName === 'TEXTAREA';
  
  if (!isFocusable) {
    suggestions.push('Elemento no es focusable por defecto');
    suggestions.push('Considera agregar tabindex="0" o hacer el elemento focusable');
  }
  
  // Verificar tabindex
  const hasTabIndex = element.hasAttribute('tabindex');
  if (!hasTabIndex && !isFocusable) {
    suggestions.push('Agregar tabindex="0" para hacer el elemento focusable');
  }
  
  // Verificar manejadores de teclado
  const hasKeyboardHandlers = element.onkeydown !== null || 
                              element.onkeyup !== null || 
                              element.onkeypress !== null;
  
  if (!hasKeyboardHandlers && isFocusable) {
    suggestions.push('Implementar manejadores de eventos de teclado');
    suggestions.push('Considera agregar onKeyDown para Enter y Space');
  }
  
  return {
    isFocusable,
    hasTabIndex,
    hasKeyboardHandlers,
    suggestions
  };
}

/**
 * Valida ARIA labels y roles
 * @param element Elemento HTML a validar
 * @returns Objeto con resultado de validación
 */
export function validateARIA(element: HTMLElement): {
  hasRole: boolean;
  hasLabel: boolean;
  hasDescription: boolean;
  isValidRole: boolean;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  
  // Verificar role
  const hasRole = element.hasAttribute('role');
  const role = element.getAttribute('role');
  const isValidRole = hasRole ? isValidARIArole(role!) : true;
  
  if (!hasRole) {
    suggestions.push('Considera agregar un role apropiado');
  } else if (!isValidRole) {
    suggestions.push(`Role "${role}" no es válido según especificación ARIA`);
  }
  
  // Verificar aria-label
  const hasLabel = element.hasAttribute('aria-label') || 
                   element.hasAttribute('aria-labelledby');
  
  if (!hasLabel && isInteractiveElement(element)) {
    suggestions.push('Agregar aria-label o aria-labelledby para elementos interactivos');
  }
  
  // Verificar aria-describedby
  const hasDescription = element.hasAttribute('aria-describedby');
  
  if (!hasDescription && isComplexElement(element)) {
    suggestions.push('Considera agregar aria-describedby para elementos complejos');
  }
  
  return {
    hasRole,
    hasLabel,
    hasDescription,
    isValidRole,
    suggestions
  };
}

/**
 * Verifica si un role de ARIA es válido
 * @param role Role a validar
 * @returns true si el role es válido
 */
function isValidARIArole(role: string): boolean {
  const validRoles = [
    // Landmark roles
    'banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search',
    // Document structure roles
    'article', 'cell', 'columnheader', 'definition', 'directory', 'document', 'feed', 'figure', 'group', 'heading', 'img', 'list', 'listitem', 'math', 'none', 'note', 'presentation', 'row', 'rowgroup', 'rowheader', 'separator', 'table', 'term', 'toolbar', 'tooltip',
    // Widget roles
    'button', 'checkbox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar', 'radio', 'scrollbar', 'searchbox', 'slider', 'spinbutton', 'switch', 'tab', 'tabpanel', 'textbox', 'treeitem',
    // Window roles
    'dialog', 'alertdialog', 'grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'
  ];
  
  return validRoles.includes(role);
}

/**
 * Verifica si un elemento es interactivo
 * @param element Elemento HTML
 * @returns true si el elemento es interactivo
 */
function isInteractiveElement(element: HTMLElement): boolean {
  const interactiveTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
  const interactiveRoles = ['button', 'link', 'menuitem', 'tab', 'checkbox', 'radio', 'slider'];
  
  return interactiveTags.includes(element.tagName) || 
         interactiveRoles.includes(element.getAttribute('role') || '');
}

/**
 * Verifica si un elemento es complejo
 * @param element Elemento HTML
 * @returns true si el elemento es complejo
 */
function isComplexElement(element: HTMLElement): boolean {
  const complexRoles = ['grid', 'listbox', 'menu', 'tablist', 'tree', 'treegrid'];
  return complexRoles.includes(element.getAttribute('role') || '');
}

/**
 * Valida la navegación por teclado en un componente
 * @param container Contenedor del componente
 * @returns Reporte de validación de accesibilidad
 */
export function validateComponentAccessibility(container: HTMLElement): {
  overallScore: number;
  keyboardNavigation: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  ariaSupport: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  focusManagement: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  summary: string;
} {
  const focusableElements = container.querySelectorAll(
    'button, a, input, select, textarea, [tabindex], [role]'
  );
  
  let keyboardScore = 0;
  let ariaScore = 0;
  let focusScore = 0;
  const keyboardIssues: string[] = [];
  const ariaIssues: string[] = [];
  const focusIssues: string[] = [];
  const keyboardSuggestions: string[] = [];
  const ariaSuggestions: string[] = [];
  const focusSuggestions: string[] = [];
  
  // Validar cada elemento focusable
  focusableElements.forEach((element, index) => {
    const keyboardValidation = validateKeyboardNavigation(element as HTMLElement);
    const ariaValidation = validateARIA(element as HTMLElement);
    
    // Calcular puntuación de navegación por teclado
    if (keyboardValidation.isFocusable) keyboardScore += 1;
    if (keyboardValidation.hasKeyboardHandlers) keyboardScore += 1;
    
    if (!keyboardValidation.isFocusable) {
      keyboardIssues.push(`Elemento ${index + 1}: No es focusable`);
    }
    if (!keyboardValidation.hasKeyboardHandlers) {
      keyboardIssues.push(`Elemento ${index + 1}: Sin manejadores de teclado`);
    }
    
    keyboardSuggestions.push(...keyboardValidation.suggestions);
    
    // Calcular puntuación de ARIA
    if (ariaValidation.hasRole) ariaScore += 1;
    if (ariaValidation.hasLabel) ariaScore += 1;
    if (ariaValidation.hasDescription) ariaScore += 1;
    if (ariaValidation.isValidRole) ariaScore += 1;
    
    if (!ariaValidation.hasRole) {
      ariaIssues.push(`Elemento ${index + 1}: Sin role definido`);
    }
    if (!ariaValidation.hasLabel) {
      ariaIssues.push(`Elemento ${index + 1}: Sin label accesible`);
    }
    
    ariaSuggestions.push(...ariaValidation.suggestions);
    
    // Calcular puntuación de gestión de foco
    if (element.hasAttribute('tabindex')) focusScore += 1;
    if (element.style.outline !== 'none') focusScore += 1;
    
    if (element.style.outline === 'none') {
      focusIssues.push(`Elemento ${index + 1}: Sin outline visible`);
      focusSuggestions.push('Agregar outline visible para indicar foco');
    }
  });
  
  // Normalizar puntuaciones (0-100)
  const totalElements = focusableElements.length;
  const maxScore = totalElements * 2; // 2 puntos por elemento
  
  const normalizedKeyboardScore = totalElements > 0 ? (keyboardScore / maxScore) * 100 : 100;
  const normalizedAriaScore = totalElements > 0 ? (ariaScore / maxScore) * 100 : 100;
  const normalizedFocusScore = totalElements > 0 ? (focusScore / maxScore) * 100 : 100;
  
  const overallScore = Math.round((normalizedKeyboardScore + normalizedAriaScore + normalizedFocusScore) / 3);
  
  let summary = `Puntuación general de accesibilidad: ${overallScore}/100\n`;
  summary += `Elementos focusables encontrados: ${totalElements}\n`;
  
  if (overallScore >= 90) {
    summary += 'Estado: EXCELENTE - Accesibilidad bien implementada';
  } else if (overallScore >= 70) {
    summary += 'Estado: BUENO - Algunas mejoras recomendadas';
  } else if (overallScore >= 50) {
    summary += 'Estado: REGULAR - Se requieren mejoras significativas';
  } else {
    summary += 'Estado: CRÍTICO - Se requieren mejoras urgentes';
  }
  
  return {
    overallScore,
    keyboardNavigation: {
      score: Math.round(normalizedKeyboardScore),
      issues: keyboardIssues,
      suggestions: [...new Set(keyboardSuggestions)]
    },
    ariaSupport: {
      score: Math.round(normalizedAriaScore),
      issues: ariaIssues,
      suggestions: [...new Set(ariaSuggestions)]
    },
    focusManagement: {
      score: Math.round(normalizedFocusScore),
      issues: focusIssues,
      suggestions: [...new Set(focusSuggestions)]
    },
    summary
  };
}

/**
 * Hook para manejar navegación por teclado en listas/grids
 * @param items Array de elementos navegables
 * @param onSelect Callback cuando se selecciona un elemento
 * @returns Funciones de navegación
 */
export function useKeyboardNavigation<T>(
  items: T[],
  onSelect: (item: T, index: number) => void
) {
  const handleKeyDown = (event: React.KeyboardEvent, currentIndex: number) => {
    const { key } = event;
    
    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        onSelect(items[nextIndex], nextIndex);
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        onSelect(items[prevIndex], prevIndex);
        break;
        
      case 'Home':
        event.preventDefault();
        onSelect(items[0], 0);
        break;
        
      case 'End':
        event.preventDefault();
        onSelect(items[items.length - 1], items.length - 1);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelect(items[currentIndex], currentIndex);
        break;
    }
  };
  
  return { handleKeyDown };
}

/**
 * Utilidad para crear IDs únicos para ARIA
 * @param prefix Prefijo para el ID
 * @param suffix Sufijo opcional
 * @returns ID único
 */
export function createAriaId(prefix: string, suffix?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}${suffix ? `-${suffix}` : ''}`;
}

/**
 * Valida contraste de colores para accesibilidad
 * @param foreground Color del primer plano
 * @param background Color de fondo
 * @returns true si el contraste es suficiente para WCAG AA
 */
export function validateColorContrast(foreground: string, background: string): boolean {
  // Implementación simplificada - en producción usar librería especializada
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
  };
  
  const luminance1 = getLuminance(foreground);
  const luminance2 = getLuminance(background);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  const ratio = (lighter + 0.05) / (darker + 0.05);
  
  return ratio >= 4.5; // WCAG AA para texto normal
}
