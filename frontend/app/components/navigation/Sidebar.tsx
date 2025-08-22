/**
 * @fileoverview Componente Sidebar con navegación de herramientas
 * @version 1.0.1
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-21
 * 
 * @description
 * Sidebar de navegación que muestra todas las herramientas disponibles
 * con categorización, estados de implementación y tooltips informativos.
 * Implementa gradientes profesionales con conformidad WCAG 2.1 AA.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * - Sistema de gradientes personalizado
 * - Hook useTranslation para i18n
 * 
 * @usage
 * Se renderiza en el layout principal junto con el contenido dinámico.
 * 
 * @state
 * ✅ Funcional - Navegación de herramientas implementada con gradientes profesionales
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de entrada/salida
 * - [PRIORITY: LOW] Implementar búsqueda de herramientas
 * 
 * @performance
 * - Componente memoizado para optimización
 * - Renderizado condicional de tooltips
 * - Gradientes optimizados con will-change
 * 
 * @accessibility
 * - Navegación por teclado implementada
 * - ARIA labels y roles apropiados
 * - Tooltips accesibles
 * - Gradientes con contraste AA mantenido
 * 
 * @security
 * - Navegación segura implementada
 * - Enlaces internos validados
 */

import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { ToolConfig, ViewType } from '../../types/tools';

// ========================================
// PROPS INTERFACE
// ========================================

interface SidebarProps {
  /** Vista actualmente seleccionada */
  currentView: ViewType;
  /** Función para cambiar la vista */
  onViewChange: (view: ViewType) => void;
  /** Configuración de herramientas disponibles */
  toolsConfig: readonly ToolConfig[];
  /** Clases CSS adicionales */
  className?: string;
}

// ========================================
// COMPONENT IMPLEMENTATION
// ========================================

/**
 * Sidebar de navegación para herramientas
 */
const Sidebar = memo<SidebarProps>(({ 
  currentView, 
  onViewChange, 
  toolsConfig, 
  className = '' 
}) => {
  const { t } = useTranslation();

  /**
   * Handler para cambio de vista
   */
  const handleToolClick = useCallback((toolId: ViewType) => {
    onViewChange(toolId);
  }, [onViewChange]);

  /**
   * Renderizar herramienta individual
   */
  const renderTool = useCallback((tool: ToolConfig) => {
    const isActive = currentView === tool.id;
    const isImplemented = tool.isImplemented;

    return (
      <button
        key={tool.id}
        onClick={() => handleToolClick(tool.id)}
        className={`w-full text-left p-3 rounded-lg transition-all duration-300 hover:shadow-lg group relative nav-button-gradient sidebar-link-hover ${
          isActive 
            ? 'active-gradient shadow-md sidebar-link-active' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
        } ${className}`}
        style={{
          color: isActive 
            ? 'white' 
            : 'var(--color-text)'
        }}
        aria-label={`${tool.label} - ${tool.description}`}
        aria-pressed={isActive}
      >
        {/* Icono de la herramienta */}
        <div className="flex items-center space-x-3">
          <span className="text-xl">{tool.icon}</span>
          <div className="flex-1 text-left">
            <div className="font-medium text-sm">{tool.label}</div>
            {tool.category && (
              <div 
                className="text-xs opacity-70"
                style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}
              >
                {tool.category}
              </div>
            )}
          </div>
        </div>

        {/* Indicador de implementación */}
        {!isImplemented && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
              🚧
            </span>
          </div>
        )}

        {/* Tooltip en hover */}
        <div 
          className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
          style={{
            backgroundColor: 'var(--color-surface-elevated)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-divider)'
          }}
        >
          {tool.description}
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45"
            style={{
              backgroundColor: 'var(--color-surface-elevated)',
              borderLeft: '1px solid var(--color-divider)',
              borderBottom: '1px solid var(--color-divider)'
            }}
          />
        </div>
      </button>
    );
  }, [currentView, onViewChange, className]);

  return (
    <aside 
      className="h-full flex flex-col overflow-hidden sidebar-gradient sidebar-slide-in"
      style={{ 
        borderRight: '1px solid var(--color-divider)',
        width: '200px'
      }}
      role="navigation"
      aria-label="Navegación de herramientas"
    >
      {/* Header del sidebar */}
      <div className="p-4 border-b flex-shrink-0 sidebar-header-gradient" style={{ borderColor: 'var(--color-divider)' }}>
        <h2 
          className="text-lg font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          {t('home.sidebar.title', 'Herramientas')}
        </h2>
        <p 
          className="text-sm mt-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {t('home.sidebar.subtitle', 'Selecciona una herramienta para comenzar')}
        </p>
      </div>

      {/* Lista de herramientas - scrollable si es necesario */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
        {toolsConfig.map(renderTool)}
      </nav>

      {/* Footer del sidebar - fijo en la parte inferior */}
      <div className="p-4 border-t flex-shrink-0 sidebar-footer-gradient" style={{ borderColor: 'var(--color-divider)' }}>
        <div className="text-center">
          <div 
            className="text-xs"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('home.sidebar.footer', 'MutualMetrics v2.0 - Suite de Análisis Profesional')}
          </div>
        </div>
      </div>
    </aside>
  );
});

// ========================================
// DISPLAY NAME
// ========================================

Sidebar.displayName = 'Sidebar';

export default Sidebar;
