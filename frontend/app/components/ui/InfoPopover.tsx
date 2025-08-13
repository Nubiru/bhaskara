/**
 * @fileoverview Popover/Modal de información compacto con activador por icono
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-08-11
 * @lastModified 2025-08-11
 * 
 * @description
 * Componente reutilizable para mostrar bloques informativos ("Cómo usar...")
 * en un popover compacto, activado por un botón de icono. Usa variables CSS
 * del tema para colores y mantiene accesibilidad ARIA.
 */

import { useId, useState, useCallback, memo } from 'react';

interface InfoPopoverProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  trigger?: 'click' | 'hover';
}

const InfoPopover = memo<InfoPopoverProps>(({ title, children, className = '', trigger = 'click' }) => {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();

  const toggle = useCallback(() => setOpen(v => !v), []);
  const close = useCallback(() => setOpen(false), []);

  const hoverProps = trigger === 'hover' ? {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
  } : {};

  return (
    <div className={`relative inline-block text-left ${className}`} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
    }} {...hoverProps}>
      <button
        id={buttonId}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={trigger === 'click' ? toggle : undefined}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full border focus:outline-none focus:ring-2 transition"
        style={{
          borderColor: 'var(--color-divider)',
          color: 'var(--color-text)',
          background: 'var(--color-surface)'
        }}
        title={title}
      >
        ⓘ
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={buttonId}
          className="absolute right-0 z-20 mt-2 w-80 rounded-md shadow-lg focus:outline-none"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-divider)'
          }}
        >
          <div className="p-3">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{title}</h4>
              <button onClick={close} className="w-6 h-6 rounded-full text-xs" aria-label="Close" title="Close" style={{ color: 'var(--color-text-secondary)' }}>×</button>
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

InfoPopover.displayName = 'InfoPopover';

export default InfoPopover;


