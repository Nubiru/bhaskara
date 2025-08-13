/**
 * @fileoverview Tests para LoadingSpinner component
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Suite de pruebas para el componente LoadingSpinner.
 * Verifica renderizado, accesibilidad y diferentes tamaños.
 * 
 * @dependencies
 * - React Testing Library
 * - Jest
 * 
 * @usage
 * npm test -- LoadingSpinner.test.tsx
 * 
 * @state
 * ✅ Funcional - Tests centralizados y actualizados
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../../app/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  describe('Rendering', () => {
    it('should render loading spinner', () => {
      render(<LoadingSpinner />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('should have accessible text', () => {
      render(<LoadingSpinner />);
      
      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes', () => {
      render(<LoadingSpinner />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Size variations', () => {
    it('should render small size', () => {
      render(<LoadingSpinner size="sm" />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-4');
      expect(spinner).toHaveClass('h-4');
    });

    it('should render medium size (default)', () => {
      render(<LoadingSpinner />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-8');
      expect(spinner).toHaveClass('h-8');
    });

    it('should render large size', () => {
      render(<LoadingSpinner size="lg" />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('w-12');
      expect(spinner).toHaveClass('h-12');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      render(<LoadingSpinner className="custom-class" />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should be screen reader accessible', () => {
      render(<LoadingSpinner />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-live', 'polite');
      
      const text = screen.getByText('Cargando...');
      expect(text).toHaveClass('sr-only');
    });

    it('should not be focusable', () => {
      render(<LoadingSpinner />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).not.toHaveAttribute('tabindex');
    });
  });
});
