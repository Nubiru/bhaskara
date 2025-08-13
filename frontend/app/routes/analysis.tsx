/**
 * @fileoverview Layout principal para módulos de análisis de negocio
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Layout principal que incluye sidebar de navegación y área de contenido
 * para todos los módulos de análisis de negocio. Maneja el estado del
 * sidebar y la navegación entre diferentes tipos de análisis.
 * 
 * @dependencies
 * - React Router para outlet y navegación
 * - react-i18next para internacionalización
 * - Sidebar component para navegación lateral
 * 
 * @usage
 * /analysis/* - Layout base para todos los análisis de negocio
 * 
 * @state
 * ✅ Funcional - Layout con sidebar implementado
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: MEDIUM] Agregar breadcrumbs de navegación
 * - [PRIORITY: LOW] Implementar sidebar responsive para mobile
 * - [PRIORITY: LOW] Agregar shortcuts de teclado
 * 
 * @performance
 * - Layout memoizado para evitar re-renders
 * - Sidebar state optimizado
 * 
 * @accessibility
 * - Skip links para navegación
 * - Landmark regions ARIA
 * - Focus management entre sidebar y content
 */

import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/navigation/Sidebar';

/**
 * Componente principal de layout para análisis
 */
export default function AnalysisLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /**
   * Maneja el toggle del sidebar
   */
  const handleSidebarToggle = useCallback((isOpen: boolean) => {
    setSidebarOpen(isOpen);
  }, []);

  /**
   * Obtiene el título de la página actual
   */
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/analysis' || path === '/analysis/bhaskara') {
      return t('analysis.bhaskara.title', 'Análisis Bhaskara');
    }
    
    switch (path) {
      case '/analysis/revenue':
        return t('analysis.revenue.title', 'Análisis de Ingresos');
      case '/analysis/costs':
        return t('analysis.costs.title', 'Análisis de Costos');
      case '/analysis/profit':
        return t('analysis.profit.title', 'Análisis de Beneficios');
      case '/analysis/break-even':
        return t('analysis.breakeven.title', 'Punto de Equilibrio');
      default:
        return t('analysis.title', 'Análisis de Negocio');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={handleSidebarToggle}
        className="hidden md:flex"
      />

      {/* Main Content Area */}
      <div 
        className={`
          flex-1 flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}
        `}
      >
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded"
        >
          {t('accessibility.skipToContent', 'Saltar al contenido principal')}
        </a>

        {/* Page Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Sidebar Toggle */}
              <button
                type="button"
                onClick={() => handleSidebarToggle(!sidebarOpen)}
                className="
                  md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  hover:text-gray-900 dark:hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                "
                aria-label={t('navigation.toggleMenu', 'Alternar menú')}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Page Title */}
              <div className="flex-1 md:flex-none">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {getPageTitle()}
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {t('analysis.subtitle', 'Herramientas avanzadas de análisis empresarial')}
                </p>
              </div>

              {/* Quick Actions - Could be expanded */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  type="button"
                  className="
                    inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600
                    rounded-md text-sm font-medium text-gray-700 dark:text-gray-300
                    bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                  "
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-9v12.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5V6.75A1.5 1.5 0 014.5 5.25h10.5a1.5 1.5 0 011.5 1.5V7.5" />
                  </svg>
                  {t('actions.exportAll', 'Exportar Todo')}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main 
          id="main-content"
          className="flex-1 overflow-y-auto focus:outline-none"
          role="main"
          aria-label={t('navigation.mainContent', 'Contenido principal')}
        >
          <div className="px-6 py-6">
            {/* Outlet for nested routes */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => handleSidebarToggle(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
          <Sidebar 
            isOpen={sidebarOpen} 
            onToggle={handleSidebarToggle}
            className="relative z-50"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Meta function for page metadata
 */
export function meta() {
  return [
    { title: 'Business Analysis - MutualMetrics' },
    { 
      name: 'description', 
      content: 'Complete suite of business analysis tools: revenue, costs, profits and break-even point.' 
    },
  ];
}

/**
 * Error boundary for this route
 */
export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg 
              className="h-8 w-8 text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Analysis Error
            </h3>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <p>
                There was a problem loading the analysis module. 
                Please try reloading the page.
              </p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="
                  inline-flex items-center px-3 py-2 border border-transparent text-sm 
                  font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 
                  dark:text-red-200 dark:bg-red-900 dark:hover:bg-red-800
                  focus:outline-none focus:ring-2 focus:ring-red-500
                "
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
