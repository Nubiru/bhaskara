/**
 * @fileoverview Traducciones en español para el módulo de análisis de Bhaskara (ecuación cuadrática)
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-01-01
 * 
 * @description
 * Contiene todas las traducciones en español específicas para el módulo
 * de análisis de Bhaskara (ecuación cuadrática). Incluye formularios, resultados, 
 * validaciones, interpretaciones y explicaciones matemáticas.
 * 
 * @state
 * ✅ Funcional - Traducciones completas para Análisis de Bhaskara
 */

const bhaskara = {
  // Títulos y navegación
  'bhaskara.title': 'Análisis de Bhaskara',
  'bhaskara.subtitle': 'Analiza funciones cuadráticas y encuentra raíces usando la fórmula de Bhaskara',
  'bhaskara.description': 'Herramienta matemática avanzada para análisis de ecuaciones cuadráticas',

  // Formulario
  'bhaskara.form.title': 'Coeficientes de la Función Cuadrática',
  'bhaskara.form.subtitle': 'Introduce los coeficientes de tu función cuadrática: f(x) = ax² + bx + c',
  'bhaskara.form.coefficientALabel': 'Coeficiente A',
  'bhaskara.form.coefficientAPlaceholder': 'Ej: 1',
  'bhaskara.form.coefficientADescription': 'Coeficiente de x² (debe ser diferente de cero)',
  'bhaskara.form.coefficientAUnit': '',
  'bhaskara.form.coefficientBLabel': 'Coeficiente B',
  'bhaskara.form.coefficientBPlaceholder': 'Ej: -5',
  'bhaskara.form.coefficientBDescription': 'Coeficiente de x',
  'bhaskara.form.coefficientBUnit': '',
  'bhaskara.form.coefficientCLabel': 'Coeficiente C',
  'bhaskara.form.coefficientCPlaceholder': 'Ej: 6',
  'bhaskara.form.coefficientCDescription': 'Término constante',
  'bhaskara.form.coefficientCUnit': '',
  'bhaskara.form.analyze': 'Analizar Función',
  'bhaskara.form.analyzing': 'Analizando...',
  'bhaskara.form.calculation': 'Cálculo en Tiempo Real',
  'bhaskara.form.formula': 'Fórmula de Bhaskara: x = (-b ± √(b² - 4ac)) / 2a',

  // Resultados
  'bhaskara.results.title': 'Resultados del Análisis de la Función Cuadrática',
  'bhaskara.results.summary': 'Resumen de la Función',
  'bhaskara.results.function': 'Función',
  'bhaskara.results.roots': 'Raíces',
  'bhaskara.results.root1': 'Raíz 1',
  'bhaskara.results.root2': 'Raíz 2',
  'bhaskara.results.vertex': 'Vértice',
  'bhaskara.results.vertexX': 'Vértice X',
  'bhaskara.results.vertexY': 'Vértice Y',
  'bhaskara.results.discriminant': 'Discriminante',
  'bhaskara.results.discriminantValue': 'Valor del Discriminante',
  'bhaskara.results.axisOfSymmetry': 'Eje de Simetría',
  'bhaskara.results.direction': 'Dirección',
  'bhaskara.results.opensUp': 'Se Abre Hacia Arriba',
  'bhaskara.results.opensDown': 'Se Abre Hacia Abajo',

  // Interpretaciones matemáticas
  'bhaskara.interpretation.title': 'Interpretación Matemática',
  'bhaskara.interpretation.twoRealRoots': 'Dos raíces reales distintas',
  'bhaskara.interpretation.oneRealRoot': 'Una raíz real (raíz doble)',
  'bhaskara.interpretation.noRealRoots': 'Sin raíces reales (raíces complejas)',
  'bhaskara.interpretation.positiveDiscriminant': 'Discriminante positivo - Dos raíces reales',
  'bhaskara.interpretation.zeroDiscriminant': 'Discriminante cero - Una raíz real',
  'bhaskara.interpretation.negativeDiscriminant': 'Discriminante negativo - Sin raíces reales',

  // Estados del análisis
  'bhaskara.states.noResults': 'Ingresa los coeficientes de la función para ver los resultados del análisis',
  'bhaskara.states.calculating': 'Calculando análisis de función cuadrática...',
  'bhaskara.states.error': 'Error en el análisis de función cuadrática',
  'bhaskara.states.invalid': 'Coeficientes inválidos para función cuadrática',

  // Gráfica
  'bhaskara.chart.title': 'Visualización de la Función Cuadrática',
  'bhaskara.chart.functionLabel': 'Función f(x)',
  'bhaskara.chart.rootsLabel': 'Raíces',
  'bhaskara.chart.vertexLabel': 'Vértice',
  'bhaskara.chart.axisLabel': 'Eje de Simetría',
  'bhaskara.chart.xAxis': 'Eje X',
  'bhaskara.chart.yAxis': 'Eje Y',
  'bhaskara.chart.gridLabel': 'Cuadrícula',

  // Validación
  'bhaskara.validation.coefficientARequired': 'El coeficiente A es requerido',
  'bhaskara.validation.coefficientANonZero': 'El coeficiente A debe ser diferente de cero',
  'bhaskara.validation.coefficientBRequired': 'El coeficiente B es requerido',
  'bhaskara.validation.coefficientCRequired': 'El coeficiente C es requerido',
  'bhaskara.validation.validNumbers': 'Todos los coeficientes deben ser números válidos',

  // Ayuda y ejemplos
  'bhaskara.help.title': 'Cómo usar el análisis de Bhaskara',
  'bhaskara.help.step1': '1. Introduce el coeficiente A (debe ser diferente de cero)',
  'bhaskara.help.step2': '2. Introduce el coeficiente B',
  'bhaskara.help.step3': '3. Introduce el término constante C',
  'bhaskara.help.step4': '4. Analiza las propiedades de la función y las raíces',
  'bhaskara.help.examples': 'Ejemplos comunes',
  'bhaskara.help.standardForm': 'Forma estándar: f(x) = x² - 5x + 6',
  'bhaskara.help.factoredForm': 'Forma factorizada: f(x) = (x - 2)(x - 3)',

  // Conceptos matemáticos
  'bhaskara.concepts.title': 'Conceptos Matemáticos',
  'bhaskara.concepts.quadraticFunction': 'Una función cuadrática es una función polinómica de grado 2',
  'bhaskara.concepts.roots': 'Las raíces son los valores de x donde f(x) = 0',
  'bhaskara.concepts.vertex': 'El vértice es el punto máximo o mínimo de la parábola',
  'bhaskara.concepts.discriminant': 'El discriminante determina la naturaleza de las raíces',

  // Acciones
  'bhaskara.actions.download': 'Descargar Análisis',
  'bhaskara.actions.reset': 'Reiniciar',
  'bhaskara.actions.export': 'Exportar Datos',
  'bhaskara.actions.print': 'Imprimir Reporte',
};

export default bhaskara;
