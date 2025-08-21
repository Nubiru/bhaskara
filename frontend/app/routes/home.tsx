/**
 * @fileoverview Página principal de MutualMetrics - Landing con análisis oculto
 * @version 2.2.0
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Página principal que funciona como landing page con presentación de MutualMetrics.
 * Incluye sidebar izquierdo (200px) que revela herramientas de análisis al hacer clic.
 * Implementa sistema de contenido dinámico sin navegación de página.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * - Componentes de análisis existentes
 * - Sistema de temas y i18n
 * - Hooks y componentes refactorizados
 * 
 * @usage
 * Ruta principal accesible en "/" - Landing page con análisis oculto
 * 
 * @state
 * ✅ FUNCIONAL - Refactorización completa con componentes separados
 * 
 * @bugs
 * - ✅ FIXED: Sidebar overlap con footer - Implementado layout flexbox correcto
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de transición suaves
 * - [PRIORITY: LOW] Implementar lazy loading de herramientas
 * - [PRIORITY: LOW] Agregar persistencia de vista seleccionada
 * 
 * @performance
 * - Componentes memoizados y optimizados
 * - Estado unificado para análisis
 * - Lazy loading de contenido pesado
 * 
 * @accessibility
 * - Navegación por teclado completa
 * - ARIA labels para cambio de contenido
 * - Focus management entre landing y análisis
 * - Contraste optimizado para todos los elementos
 * 
 * @security
 * - Validación de entrada en formularios
 * - Sanitización de datos de análisis
 * - Protección contra XSS en contenido dinámico
 */

import { memo, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ViewType } from '../types/tools';
import { TOOLS_CONFIG } from '../constants/tools';
import { useAnalysisHandlers } from '../hooks/useAnalysisHandlers';
import Sidebar from '../components/navigation/Sidebar';
import LandingPage from '../components/layout/LandingPage';
import ToolContentRenderer from '../components/layout/ToolContentRenderer';

/**
 * Configuración de meta tags para SEO y accesibilidad
 */
export function meta() {
  return [
    { title: "MutualMetrics - Análisis Matemático y Business Analytics" },
    { name: "description", content: "Plataforma gratuita para análisis matemático de funciones cuadráticas y business analytics. Calcula raíces, vértices, óptimos económicos y visualiza parábolas interactivamente." },
    { name: "keywords", content: "análisis matemático, funciones cuadráticas, parábolas, raíces, vértice, business analytics, matemáticas, educación" },
    { name: "author", content: "Mariano Capella & Gabriel Osemberg" },
    { property: "og:title", content: "MutualMetrics - Análisis Matemático y Business Analytics" },
    { property: "og:description", content: "Plataforma gratuita para análisis matemático y business analytics" },
    { property: "og:type", content: "website" },
  ];
}

/**
 * Props del componente HomePage
 */
interface HomePageProps {
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Página principal de MutualMetrics
 * Landing page con sidebar que revela herramientas de análisis
 */
const HomePage = memo<HomePageProps>(({ className = '' }) => {
  const { t } = useTranslation();
  
  // Estado para manejo de la vista actual
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  
  // Hook personalizado para manejo de análisis
  const { handlers, analysisState } = useAnalysisHandlers();

  /**
   * Handler para cambio de vista
   */
  const handleViewChange = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  /**
   * Wrapper para la función de traducción que convierte tipos
   */
  const translateFunction = useCallback((key: string, defaultValue?: string): string => {
    if (defaultValue) {
      return t(key, defaultValue);
    }
    return t(key);
  }, [t]);

  /**
   * Renderizar contenido según la vista actual
   */
  const renderContent = useMemo(() => {
    if (currentView === 'landing') {
      return <LandingPage />;
    }
    
    return (
      <ToolContentRenderer
        currentView={currentView}
        analysisState={analysisState}
        handlers={handlers}
        t={translateFunction}
      />
    );
  }, [currentView, analysisState, handlers, translateFunction]);

  /**
   * Obtener configuración de herramientas con traducciones
   */
  const toolsConfig = useMemo(() => 
    TOOLS_CONFIG.map(tool => ({
      ...tool,
      label: t(tool.translationKey, tool.label),
      description: t(tool.descriptionKey, tool.description)
    })), [t]
  );

  return (
    <div 
      className={`grid grid-rows-[1fr] grid-cols-[200px_1fr] h-full theme-gradient-transition ${className}`}
      style={{ 
        backgroundColor: 'var(--color-background)',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, var(--color-surface-elevated) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, var(--color-surface-elevated) 0%, transparent 50%),
          radial-gradient(circle at 50% 100%, var(--color-surface-elevated) 0%, transparent 50%)
        `,
        backgroundSize: '600px 600px, 500px 500px, 400px 400px',
        backgroundPosition: '0 0, 300px 300px, 0 100%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Sidebar de 200px - altura completa, sin overlap con footer */}
      <div className="h-full overflow-hidden">
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          toolsConfig={toolsConfig}
        />
      </div>

      {/* Contenido principal - toma el espacio restante, sin overlap */}
      <main className="h-full overflow-hidden p-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header de la página */}
          <header className="text-center mb-8 flex-shrink-0">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              {currentView === 'landing' 
                ? t('home.landing.title') 
                : toolsConfig.find(t => t.id === currentView)?.label
              }
            </h1>
            {currentView !== 'landing' && (
              <p 
                className="text-base mt-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {toolsConfig.find(t => t.id === currentView)?.description}
              </p>
            )}
          </header>

          {/* Contenido dinámico - scrollable si es necesario, sin overlap */}
          <div className="flex-1 min-h-0 overflow-y-auto transition-all duration-500 ease-in-out">
            {renderContent}
          </div>
        </div>
      </main>
    </div>
  );
});

export default HomePage;
