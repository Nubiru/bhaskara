/**
 * @fileoverview Traducciones de la página principal en español
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 */

export const home = {
  title: 'Análisis de Funciones Cuadráticas',
  subtitle: 'Herramienta web gratuita para analizar funciones cuadráticas. Calcula raíces, vértices, óptimos económicos y visualiza parábolas interactivamente.',
  formTitle: 'Coeficientes de la Función',
  formDescription: 'Ingresa los coeficientes de tu función cuadrática: f(x) = ax² + bx + c',
  resultsTitle: 'Resultados del Análisis',
  analyzing: 'Analizando función...',
  analyzingDescription: 'Calculando raíces, vértice y propiedades',
  analysisError: 'Error de análisis',
  analysisCompleted: '✅ Análisis Completado',
  equation: 'Ecuación',
  noResults: 'Ingresa coeficientes y selecciona modo de análisis para ver resultados aquí.',
  analyzeButton: 'Analizar Función',
  
  // Landing page translations
  landing: {
    title: 'MutualMetrics',
    subtitle: 'Plataforma gratuita para análisis matemático de funciones cuadráticas y análisis empresarial',
    description: 'MutualMetrics ofrece herramientas profesionales para análisis matemático y empresarial, diseñadas para estudiantes, educadores y profesionales que necesitan insights precisos y visualizaciones claras.',
    descriptionSecondary: 'Nuestras herramientas incluyen análisis de funciones cuadráticas, cálculos de ingresos, costos, beneficios y puntos de equilibrio, todo en una interfaz intuitiva y accesible.',
    developedBy: 'Desarrollado por',
    team: 'MutualMetrics Team',
    teamRole: 'Desarrollo y Diseño',
    gettingStarted: '🚀 Comenzar',
    gettingStartedDescription: 'Usa el menú izquierdo para explorar nuestras herramientas de análisis. Cada herramienta está diseñada para ser intuitiva y proporcionar resultados profesionales con visualizaciones claras.'
  },
  
  // Sidebar tool translations
  sidebar: {
    title: 'Herramientas',
    subtitle: 'Herramientas profesionales de análisis para cálculos matemáticos y empresariales',
    footer: 'MutualMetrics v2.0 - Suite de Análisis Profesional',
    tools: {
      bhaskara: 'Análisis Cuadrático',
      revenue: 'Análisis de Ingresos',
      costs: 'Análisis de Costos',
      profit: 'Análisis de Beneficios',
      breakEven: 'Punto de Equilibrio',
      compoundInterest: 'Interés Compuesto',
      currencyConverter: 'Conversor de Monedas',
      numberConverter: 'Conversor de Números'
    },
    descriptions: {
      bhaskara: 'Calcula raíces, vértices y discriminantes de funciones cuadráticas',
      revenue: 'Calcula ingresos totales y proyecciones de ventas',
      costs: 'Desglose de costos fijos y variables',
      profit: 'Cálculo de márgenes y rentabilidad',
      breakEven: 'Análisis de punto de equilibrio con sensibilidad',
      compoundInterest: 'Calcula el crecimiento de inversiones con interés compuesto',
      currencyConverter: 'Convierte entre 20+ monedas con tasas en tiempo real',
      numberConverter: 'Convierte entre decimal, binario, octal y hexadecimal'
    },
    categories: {
      math: 'Matemáticas',
      business: 'Análisis Empresarial',
      utilities: 'Utilidades'
    }
  }
} as const;
