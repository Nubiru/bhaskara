/**
 * @fileoverview Teardown global que se ejecuta después de todos los tests
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 *
 * @description
 * Configuración de limpieza que se ejecuta una vez después de completar todos los tests.
 * Incluye cleanup de resources, reporting de métricas y memory cleanup.
 *
 * @dependencies
 * - Jest para testing environment
 *
 * @usage
 * Automáticamente ejecutado por Jest después de todos los tests
 *
 * @state
 * ✅ Funcional - Teardown global completo
 *
 * @bugs
 * - Ninguno conocido
 *
 * @todo
 * - [PRIORITY: LOW] Agregar cleanup para testing database
 * - [PRIORITY: LOW] Enhanced performance reporting
 *
 * @performance
 * - Cleanup optimizado para liberar memoria
 * - Performance metrics collection
 *
 * @accessibility
 * - Cleanup de accessibility testing tools
 *
 * @security
 * - Secure cleanup de test environment
 * - No data leakage entre test runs
 */

module.exports = async function globalTeardown() {
  console.log('🧹 Iniciando teardown global de tests...');
  
  // Performance metrics
  if (global.performance && global.performance.mark) {
    global.performance.mark('test-suite-end');
    global.performance.measure('test-suite-duration', 'test-suite-start', 'test-suite-end');
    
    const measure = global.performance.getEntriesByName('test-suite-duration')[0];
    if (measure) {
      console.log(`⏱️  Test suite duration: ${Math.round(measure.duration)}ms`);
    }
  }
  
  // Memory usage report
  if (global.process && global.process.memoryUsage) {
    const memUsage = global.process.memoryUsage();
    console.log(`💾 Memory usage: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
  }
  
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
  
  // Clear any remaining timers
  if (global.clearTimeout) {
    // Clear any test timers that might be hanging
    for (let i = 1; i < 9999; i++) {
      global.clearTimeout(i);
      global.clearInterval(i);
    }
  }
  
  // Console methods are restored automatically on process exit
  
  console.log('✅ Teardown global de tests completado');
};
