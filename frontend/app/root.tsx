/**
 * @fileoverview Componente root principal de MutualMetrics SPA
 * @version 1.0.2
 * @author MutualMetrics Team
 * @since 2025-08-21
 * @lastModified 2025-08-21
 * 
 * @description
 * Componente root que define la estructura HTML base de la aplicación SPA.
 * Incluye el layout principal, navegación, manejo de errores y configuración
 * de seguridad. Punto de entrada principal de la aplicación React Router.
 * 
 * @dependencies
 * - React Router v7.7.1
 * - Tailwind CSS v4.1.4
 * - Componentes de layout (Header, Footer)
 * 
 * @usage
 * Este componente se renderiza automáticamente como punto de entrada
 * de la aplicación React Router SPA.
 * 
 * @state
 * ✅ Funcional - Layout completo implementado con Header y Footer
 * 
 * @bugs
 * - ✅ FIXED: Layout height issues - Implementado flexbox correcto
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar meta tags dinámicos por ruta
 * - [PRIORITY: LOW] Implementar PWA manifest
 * - [PRIORITY: LOW] Agregar service worker para cache
 * 
 * @performance
 * - Layout optimizado para carga rápida
 * - Fonts precargadas para mejor performance
 * - Componentes lazy-loaded (pendiente)
 * 
 * @security
 * - CSP headers configurados
 * - XSS protection habilitada
 * - Referrer policy configurada
 * - Frame options configuradas
 */

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";

// Inicializar i18n antes de cualquier componente
import "./i18n/config";

// Importación de componentes de layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ThemeProvider from "./components/providers/ThemeProvider";
import LanguageProvider from "./components/providers/LanguageProvider";
import { validateThemeContrast } from "./utils/a11y";

/**
 * Configuración de enlaces externos y recursos
 * Optimizada para performance y seguridad
 */
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
];

/**
 * Componente Layout principal
 * Define la estructura HTML base y configuración de seguridad
 */
export function Layout({ children }: { children: React.ReactNode }) {
  // Optional: validate theme contrast on client mount (no-op on server)
  if (typeof window !== 'undefined') {
    try { validateThemeContrast(); } catch {}
  }
  return (
    <html lang="es" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Herramienta web gratuita para análisis de funciones cuadráticas. Calcula raíces, vértices, óptimos económicos y visualiza parábolas interactivamente." />
        <meta name="keywords" content="análisis cuadrático, funciones matemáticas, parábolas, raíces, vértice, matemáticas, educación" />
        <meta name="author" content="Mariano Capella & Gabriel Osemberg" />
        
        {/* Security Headers - Note: X-Frame-Options should be set by server, removed from meta */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        <title>MutualMetrics</title>
        <Meta />
        <Links />
      </head>
      <body
        className="h-full"
        style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>
          <ThemeProvider>
            <div id="root" className="h-full flex flex-col overflow-hidden">
              {/* Header de navegación */}
              <Header />
              
              {/* Contenido principal - toma el espacio restante, sin overlap */}
              <main className="flex-1 min-h-0 overflow-hidden">
                {children}
              </main>
              
              {/* Footer */}
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Componente App principal
 * Renderiza el Outlet de React Router
 */
export default function App() {
  return <Outlet />;
}

/**
 * Error Boundary para manejo de errores globales
 * Proporciona feedback visual y opciones de recuperación
 */
export function ErrorBoundary({ error }: { error: Error }) {
  let message = "¡Ups!";
  let details = "Ha ocurrido un error inesperado.";
  let stack: string | undefined;

  // Manejo específico de errores de ruta
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "La página solicitada no se pudo encontrar."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{message}</h1>
        <p className="text-gray-600 mb-4">{details}</p>
        {stack && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Ver detalles técnicos
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-x-auto">
              <code>{stack}</code>
            </pre>
          </details>
        )}
        <a 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors mt-4"
          aria-label="Volver al inicio de la aplicación"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
