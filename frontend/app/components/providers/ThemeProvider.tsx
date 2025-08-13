/**
 * @fileoverview Provider de contexto para el sistema de tema
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Proveedor de contexto que inicializa y gestiona el sistema de tema
 * de la aplicación. Asegura que el tema se aplique correctamente
 * al montar la aplicación y se sincronice con el DOM.
 * 
 * @dependencies
 * - useTheme hook para manejo de estado del tema
 * - React para contexto y efectos
 * 
 * @usage
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * @state
 * ✅ Funcional - Provider de tema inicializado correctamente
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar animaciones de transición de tema
 * - [PRIORITY: LOW] Implementar tema por defecto desde configuración
 * 
 * @performance
 * - Inicialización optimizada del tema
 * - Evita flicker en carga inicial
 * 
 * @accessibility
 * - Respeta preferencias del sistema
 * - Sincronización completa con DOM
 * 
 * @security
 * - Sin vulnerabilidades conocidas
 */

import React, { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Props del ThemeProvider
 */
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Componente interno que inicializa el tema
 */
const ThemeInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    // Ensure data-theme attribute is set for CSS variables
    root.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  return <>{children}</>;
};

/**
 * Provider de tema que inicializa el sistema de tema
 * 
 * @param children - Componentes hijos que tendrán acceso al tema
 * @returns JSX element con tema aplicado
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeInitializer>
      {children}
    </ThemeInitializer>
  );
};

export default ThemeProvider;
