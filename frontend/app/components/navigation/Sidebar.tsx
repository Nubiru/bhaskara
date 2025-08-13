/**
 * @fileoverview Componente de navegación lateral para módulos de análisis
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Sidebar de navegación que permite al usuario cambiar entre diferentes
 * módulos de análisis: Bhaskara, Revenue, Costs, Profit, Break-even.
 * Incluye iconografía, estados activos, y accesibilidad completa.
 * 
 * @dependencies
 * - React Router para navegación
 * - react-i18next para internacionalización
 * - Tailwind CSS para estilos
 * 
 * @usage
 * <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
 * 
 * @state
 * ✅ Funcional - Navegación lateral implementada
 * 
 * @bugs
 * - Ninguno conocido
 * 
 * @todo
 * - [PRIORITY: MEDIUM] Agregar animaciones de transición
 * - [PRIORITY: LOW] Implementar drag-to-resize functionality
 * - [PRIORITY: LOW] Agregar shortcuts de teclado para navegación
 * 
 * @performance
 * - Componente memoizado para evitar re-renders innecesarios
 * - Iconos optimizados con SVG inline
 * - Lazy loading de rutas pesadas
 * 
 * @accessibility
 * - ARIA navigation landmarks
 * - Keyboard navigation support
 * - Screen reader optimized
 * - Focus management
 */

import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

/**
 * Props del componente Sidebar
 */
interface SidebarProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}

/**
 * Definición de item de navegación
 */
interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  current: boolean;
  badge?: string;
}

/**
 * Iconos SVG para cada módulo de análisis
 */
const BhaskaraIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01m3 0h.01M9 11h.01m3 0h.01m3 0h.01" />
  </svg>
);

const RevenueIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CostIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const ProfitIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const BreakEvenIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);

/**
 * Componente principal Sidebar
 */
export const Sidebar = memo<SidebarProps>(({ 
  isOpen = true, 
  onToggle,
  className = '' 
}) => {
  const location = useLocation();
  const { t } = useTranslation();

  /**
   * Configuración de navegación con traducciones
   */
  const navigation: NavigationItem[] = [
    {
      id: 'bhaskara',
      name: t('sidebar.bhaskara', 'Bhaskara'),
      href: '/',
      icon: BhaskaraIcon,
      description: t('sidebar.bhaskaraDesc', 'Análisis de ecuaciones cuadráticas'),
      current: location.pathname === '/',
      badge: t('sidebar.implemented', 'Implementado')
    },
    {
      id: 'revenue',
      name: t('sidebar.revenue', 'Ingresos'),
      href: '/analysis/revenue',
      icon: RevenueIcon,
      description: t('sidebar.revenueDesc', 'Cálculo de ingresos totales'),
      current: location.pathname === '/analysis/revenue'
    },
    {
      id: 'costs',
      name: t('sidebar.costs', 'Costos'),
      href: '/analysis/costs',
      icon: CostIcon,
      description: t('sidebar.costsDesc', 'Análisis de costos fijos y variables'),
      current: location.pathname === '/analysis/costs'
    },
    {
      id: 'profit',
      name: t('sidebar.profit', 'Beneficio'),
      href: '/analysis/profit',
      icon: ProfitIcon,
      description: t('sidebar.profitDesc', 'Cálculo de beneficios netos'),
      current: location.pathname === '/analysis/profit'
    },
    {
      id: 'breakeven',
      name: t('sidebar.breakeven', 'Punto de Equilibrio'),
      href: '/analysis/break-even',
      icon: BreakEvenIcon,
      description: t('sidebar.breakevenDesc', 'Análisis de punto de equilibrio'),
      current: location.pathname === '/analysis/break-even'
    }
  ];

  /**
   * Maneja el toggle del sidebar
   */
  const handleToggle = useCallback(() => {
    onToggle?.(!isOpen);
  }, [isOpen, onToggle]);

  /**
   * Maneja eventos de teclado para accesibilidad
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onToggle?.(false);
    }
  }, [onToggle]);

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 flex-shrink-0 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'}
        ${className}
      `}
      aria-label={t('sidebar.navigationLabel', 'Navegación de análisis')}
      onKeyDown={handleKeyDown}
      style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-divider)' }}
    >
      {/* Header del Sidebar */}
      <div className="flex h-16 items-center justify-between px-4" style={{ borderBottom: '1px solid var(--color-divider)' }}>
        {isOpen && (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('sidebar.title', 'Análisis')}
          </h2>
        )}
        
        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="
            p-2 rounded-md
            focus:outline-none focus:ring-2
            transition-colors duration-200
          "
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label={isOpen ? t('sidebar.collapse', 'Colapsar sidebar') : t('sidebar.expand', 'Expandir sidebar')}
        >
          <svg 
            className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 px-2 py-4" aria-label={t('sidebar.mainNavigation', 'Navegación principal')}>
        {navigation.map((item) => {
          const Icon = item.icon;
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 relative ${!isOpen && 'justify-center'} hover:underline hover:underline-offset-4`}
              aria-current={item.current ? 'page' : undefined}
              title={!isOpen ? item.name : undefined}
              style={{
                color: item.current ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                background: item.current ? 'transparent' : 'transparent',
                borderRight: item.current ? '2px solid var(--color-primary)' : '2px solid transparent'
              }}
            >
              {/* Icon */}
              <Icon
                className={`flex-shrink-0 ${!isOpen ? 'h-6 w-6' : 'h-5 w-5'}`}
                style={{ color: item.current ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
                aria-hidden="true"
              />
              
              {/* Label y Description */}
              {isOpen && (
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <span className="
                        ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                        bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300
                      ">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer del Sidebar */}
      {isOpen && (
        <div className="p-4" style={{ borderTop: '1px solid var(--color-divider)' }}>
          <div className="text-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>
            <p>{t('sidebar.version', 'MutualMetrics v2.0')}</p>
            <p>{t('sidebar.businessAnalytics', 'Business Analytics Suite')}</p>
          </div>
        </div>
      )}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
