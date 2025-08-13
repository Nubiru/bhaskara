/**
 * @fileoverview Tests para BhaskaraForm component
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Suite de pruebas para el componente BhaskaraForm.
 * Verifica funcionalidad de formulario, validación y envío.
 * 
 * @dependencies
 * - React Testing Library
 * - Jest
 * - @testing-library/user-event
 * 
 * @usage
 * npm test -- BhaskaraForm.test.tsx
 * 
 * @state
 * ✅ Funcional - Tests actualizados para BhaskaraForm
 * 
 * @todo
 * - [PRIORITY: LOW] Agregar tests de integración con API
 * - [PRIORITY: LOW] Agregar tests de accesibilidad específicos
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BhaskaraForm from '../../../app/components/forms/BhaskaraForm';
import type { AnalysisRequest } from '../../../app/types/quadratic';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'form.coefficients.aLabel': 'Coeficiente A',
        'form.coefficients.bLabel': 'Coeficiente B',
        'form.coefficients.cLabel': 'Coeficiente C',
        'form.analyze': 'Analizar',
        'form.clear': 'Limpiar',
        'form.analysisMode': 'Modo de Análisis',
        'form.modes.full': 'Análisis Completo',
        'form.description': 'Descripción',
        'form.validation.required': 'Este campo es requerido',
        'form.errors.coefficientANonZero': 'El coeficiente "a" no puede ser cero',
      };
      return translations[key] || key;
    },
  }),
}));

describe('BhaskaraForm', () => {
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = (props = {}) => {
    const defaultProps = {
      onSubmit: mockOnSubmit,
      isLoading: false,
      ...props,
    };
    
    return render(<BhaskaraForm {...defaultProps} />);
  };

  describe('Rendering', () => {
    it('should render all coefficient input fields', () => {
      renderForm();
      
      expect(screen.getByLabelText('Coeficiente A')).toBeInTheDocument();
      expect(screen.getByLabelText('Coeficiente B')).toBeInTheDocument();
      expect(screen.getByLabelText('Coeficiente C')).toBeInTheDocument();
    });

    it('should render analysis mode selection', () => {
      renderForm();
      
      expect(screen.getByLabelText('Modo de Análisis')).toBeInTheDocument();
    });

    it('should render submit and clear buttons', () => {
      renderForm();
      
      expect(screen.getByRole('button', { name: 'Analizar' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Limpiar' })).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should allow user to input coefficient values', async () => {
      const user = userEvent.setup();
      renderForm();
      
      const coefficientA = screen.getByLabelText('Coeficiente A');
      const coefficientB = screen.getByLabelText('Coeficiente B');
      const coefficientC = screen.getByLabelText('Coeficiente C');
      
      await user.clear(coefficientA);
      await user.type(coefficientA, '1');
      await user.clear(coefficientB);
      await user.type(coefficientB, '-4');
      await user.clear(coefficientC);
      await user.type(coefficientC, '4');
      
      expect(coefficientA).toHaveValue(1);
      expect(coefficientB).toHaveValue(-4);
      expect(coefficientC).toHaveValue(4);
    });

    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      renderForm();
      
      // Fill form with valid data
      await user.clear(screen.getByLabelText('Coeficiente A'));
      await user.type(screen.getByLabelText('Coeficiente A'), '1');
      await user.clear(screen.getByLabelText('Coeficiente B'));
      await user.type(screen.getByLabelText('Coeficiente B'), '-4');
      await user.clear(screen.getByLabelText('Coeficiente C'));
      await user.type(screen.getByLabelText('Coeficiente C'), '4');
      
      // Submit form
      await user.click(screen.getByRole('button', { name: 'Analizar' }));
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            coefficients: { a: 1, b: -4, c: 4 },
            mode: expect.any(String),
          })
        );
      });
    });

    it('should clear form when clear button is clicked', async () => {
      const user = userEvent.setup();
      renderForm();
      
      // Fill form
      await user.clear(screen.getByLabelText('Coeficiente A'));
      await user.type(screen.getByLabelText('Coeficiente A'), '1');
      
      // Clear form
      await user.click(screen.getByRole('button', { name: 'Limpiar' }));
      
      await waitFor(() => {
        expect(screen.getByLabelText('Coeficiente A')).toHaveValue(0);
      });
    });
  });

  describe('Loading State', () => {
    it('should disable submit button when loading', () => {
      renderForm({ isLoading: true });
      
      const submitButton = screen.getByRole('button', { name: /analizar/i });
      expect(submitButton).toBeDisabled();
    });

    it('should show loading text when analyzing', () => {
      renderForm({ isLoading: true });
      
      expect(screen.getByText(/analizando/i)).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('should prevent submission with coefficient A = 0', async () => {
      const user = userEvent.setup();
      renderForm();
      
      // Set coefficient A to 0
      await user.clear(screen.getByLabelText('Coeficiente A'));
      await user.type(screen.getByLabelText('Coeficiente A'), '0');
      
      // Try to submit
      await user.click(screen.getByRole('button', { name: 'Analizar' }));
      
      // Should not call onSubmit
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderForm();
      
      expect(screen.getByLabelText('Coeficiente A')).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText('Coeficiente B')).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText('Coeficiente C')).toHaveAttribute('aria-required', 'true');
    });

    it('should have proper form structure', () => {
      renderForm();
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('aria-label');
    });
  });
});
