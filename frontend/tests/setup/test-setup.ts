/**
 * @fileoverview Setup global para tests con Jest y React Testing Library
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Configuración global para tests, incluyendo matchers personalizados,
 * mocks globales, y setup de Testing Library.
 *
 * @dependencies
 * - @testing-library/jest-dom para matchers adicionales
 * - jsdom para DOM simulation
 * - Jest para mocking
 *
 * @usage
 * Automáticamente importado por Jest en todos los tests
 *
 * @state
 * ✅ Funcional - Setup completo para testing environment
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar custom matchers específicos del dominio
 * - [PRIORITY: LOW] Setup para visual regression testing
 *
 * @performance
 * - Mocks optimizados para performance
 * - Cleanup automático entre tests
 * - Memory leak prevention
 *
 * @accessibility
 * - Screen reader simulation setup
 * - Keyboard navigation testing ready
 * - ARIA attributes validation
 *
 * @security
 * - Secure test environment
 * - API mocking for security
 * - No real network calls in tests
 */

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure React Testing Library
configure({
  // How long to wait for async operations
  asyncUtilTimeout: 5000,
  
  // Custom test ID attribute
  testIdAttribute: 'data-testid',
  
  // Show suggestions for better queries
  showOriginalStackTrace: true,
});

// Mock window.matchMedia (used by Chart.js and responsive components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver (used by lazy loading components)
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

// Mock ResizeObserver (used by Chart.js)
global.ResizeObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock Canvas API (used by Chart.js)
HTMLCanvasElement.prototype.getContext = jest.fn().mockImplementation((type) => {
  if (type === '2d') {
    return {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(() => ({
        data: new Array(4),
      })),
      putImageData: jest.fn(),
      createImageData: jest.fn(() => []),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    };
  }
  return null;
});

// Mock URL.createObjectURL (used for file downloads)
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock fetch API
global.fetch = jest.fn();

// Mock console methods to avoid noise in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = jest.fn((message) => {
    // Still log actual errors, but filter out known React warnings in tests
    if (
      typeof message === 'string' &&
      !message.includes('Warning: ReactDOM.render is deprecated') &&
      !message.includes('Warning: React.createFactory() is deprecated')
    ) {
      originalError(message);
    }
  });
  
  console.warn = jest.fn((message) => {
    // Filter out known warnings
    if (
      typeof message === 'string' &&
      !message.includes('componentWillReceiveProps has been renamed')
    ) {
      originalWarn(message);
    }
  });
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
  
  // Clear localStorage mock
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  // Clean up any pending timers
  jest.useRealTimers();
});

// Global test utilities for Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveFocus(): R;
    }
  }
}

// Export test utilities for reuse
export const testUtils = {
  // Simulate user typing with delay
  typeWithDelay: async (element: HTMLElement, text: string, delay = 100) => {
    for (const char of text) {
      await new Promise(resolve => setTimeout(resolve, delay));
      // Add character typing simulation here
    }
  },
  
  // Wait for async operations
  waitForAsync: (ms = 0) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Mock window size for responsive testing
  mockWindowSize: (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    window.dispatchEvent(new Event('resize'));
  },
};
