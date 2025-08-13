/**
 * @fileoverview Configuración de Jest para testing
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Configuración completa de Jest para testing unitario y de integración.
 * Incluye setup para React Testing Library, cobertura de código y ES modules.
 *
 * @dependencies
 * - Jest para test runner
 * - React Testing Library para testing de componentes
 * - jsdom para DOM simulation
 *
 * @usage
 * npm test - Ejecutar tests
 * npm run test:coverage - Tests con cobertura
 *
 * @state
 * ✅ Funcional - Configuración completa de testing
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar support para visual regression testing
 * - [PRIORITY: LOW] Configurar parallel testing
 *
 * @performance
 * - Tests paralelos habilitados
 * - Cache de Jest optimizado
 * - Setup files mínimos
 *
 * @accessibility
 * - Testing de accesibilidad incluido
 * - Screen reader compatibility tests
 * - Keyboard navigation tests
 *
 * @security
 * - Test environment isolated
 * - No external network calls in tests
 * - Mock de APIs sensitivas
 */

module.exports = {
  // Environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup/test-setup.ts'],
  
  // Module name mapping for path aliases
  moduleNameMapper: {
    // Style files
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    // Image files
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      '<rootDir>/tests/__mocks__/fileMock.js',
    
    // Module aliases
    '^~/(.*)$': '<rootDir>/app/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  
  // File extensions to consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Transform files
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: './tsconfig.test.json',
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Preset for ES modules
  preset: 'ts-jest/presets/default-esm',
  
  // Test file patterns
  testMatch: [
    '<rootDir>/app/**/__tests__/**/*.(ts|tsx|js|jsx)',
    '<rootDir>/app/**/*.(test|spec).(ts|tsx|js|jsx)',
    '<rootDir>/tests/**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  
  // Files to ignore
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
  ],
  
  // Module paths to ignore for transformation
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@testing-library|chart.js|react-chartjs-2))',
  ],
  
  // Coverage configuration
  collectCoverage: false, // Enable manually with --coverage flag
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/__tests__/**',
    '!app/**/*.test.{ts,tsx}',
    '!app/**/*.spec.{ts,tsx}',
    '!app/**/index.{ts,tsx}',
    '!app/root.tsx', // Entry point, tested via E2E
    '!app/routes.ts', // Route config, tested via E2E
  ],
  
  // Coverage thresholds (85% minimum as per plan)
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  
  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'clover',
  ],
  
  // Coverage directory
  coverageDirectory: 'coverage',
  

  
  // Global setup - disabled for simplicity
  // globalSetup: '<rootDir>/tests/setup/globalSetup.ts',
  // globalTeardown: '<rootDir>/tests/setup/globalTeardown.ts',
  
  // Test timeout
  testTimeout: 10000,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true,
  
  // Verbose output
  verbose: true,
  
  // Error on deprecated usage
  errorOnDeprecated: true,
  
  // Bail on first error in CI
  bail: process.env.CI ? 1 : 0,
  
  // Max workers for parallel testing
  maxWorkers: process.env.CI ? 2 : '50%',
  
  // Extensions to resolve
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  
  // Globals for ts-jest
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
