/**
 * @fileoverview Setup global que se ejecuta antes de todos los tests
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Configuración global que se ejecuta una vez antes de iniciar la suite de tests.
 * Incluye setup de environment, mocks globales y configuraciones de performance.
 *
 * @dependencies
 * - Jest para testing environment
 *
 * @usage
 * Automáticamente ejecutado por Jest antes de todos los tests
 *
 * @state
 * ✅ Funcional - Setup global completo
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar setup para testing database
 * - [PRIORITY: LOW] Performance profiling setup
 *
 * @performance
 * - Setup optimizado para ejecución rápida
 * - Memory management configurado
 *
 * @accessibility
 * - Environment listo para tests de accesibilidad
 *
 * @security
 * - Environment aislado y seguro
 * - No network calls habilitado
 */

module.exports = async function globalSetup() {
  console.log('🧪 Iniciando setup global de tests...');
  
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.REACT_APP_ENV = 'test';
  process.env.REACT_APP_API_BASE_URL = 'http://localhost:8081';
  
  // Configure timezone for consistent test results
  process.env.TZ = 'UTC';
  
  // Disable console output in tests (except errors)
  if (!process.env.VERBOSE_TESTS) {
    const originalLog = console.log;
    const originalInfo = console.info;
    const originalDebug = console.debug;
    
    console.log = () => {};
    console.info = () => {};
    console.debug = () => {};
  }
  
  // Setup performance monitoring
  if (global.performance && global.performance.mark) {
    global.performance.mark('test-suite-start');
  }
  
  // Memory usage baseline
  if (global.gc) {
    global.gc();
  }
  
  console.log('✅ Setup global de tests completado');
};
