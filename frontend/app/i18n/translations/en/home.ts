export const home = {
  title: 'Quadratic Function Analysis',
  subtitle: 'Free web tool for analyzing quadratic functions. Calculate roots, vertices, economic optima, and visualize parabolas interactively.',
  formTitle: 'Function Coefficients',
  formDescription: 'Enter the coefficients of your quadratic function: f(x) = ax² + bx + c',
  resultsTitle: 'Analysis Results',
  analyzing: 'Analyzing function...',
  analyzingDescription: 'Calculating roots, vertex, and properties',
  analysisError: 'Analysis error',
  analysisCompleted: '✅ Analysis Completed',
  equation: 'Equation',
  noResults: 'Enter coefficients and select analysis mode to see results here.',
  analyzeButton: 'Analyze Function',
  
  // Landing page translations
  landing: {
    title: 'MutualMetrics',
    subtitle: 'Free platform for mathematical analysis of quadratic functions and business analytics',
    description: 'MutualMetrics offers professional tools for mathematical and business analysis, designed for students, educators, and professionals who need precise insights and clear visualizations.',
    descriptionSecondary: 'Our tools include quadratic function analysis, revenue calculations, costs, benefits, and break-even points, all in an intuitive and accessible interface.',
    developedBy: 'Developed by',
    team: 'MutualMetrics Team',
    teamRole: 'Development & Design',
    gettingStarted: '🚀 Get Started',
    gettingStartedDescription: 'Use the left menu to explore our analysis tools. Each tool is designed to be intuitive and provide professional results with clear visualizations.'
  },
  
  // Sidebar tool translations
  sidebar: {
    title: 'Tools',
    subtitle: 'Professional analysis tools for mathematical and business calculations',
    footer: 'MutualMetrics v2.0 - Professional Analytics Suite',
    tools: {
      bhaskara: 'Quadratic Analysis',
      revenue: 'Revenue Analysis',
      costs: 'Cost Analysis',
      profit: 'Profit Analysis',
      breakEven: 'Break-even Point',
      compoundInterest: 'Compound Interest',
      currencyConverter: 'Currency Converter',
      numberConverter: 'Number Converter'
    },
    descriptions: {
      bhaskara: 'Calculate roots, vertices, and discriminants of quadratic functions',
      revenue: 'Calculate total revenue and sales projections',
      costs: 'Breakdown of fixed and variable costs',
      profit: 'Calculation of margins and profitability',
      breakEven: 'Break-even analysis with sensitivity',
      compoundInterest: 'Calculate investment growth with compound interest',
      currencyConverter: 'Convert between 20+ currencies with real-time rates',
      numberConverter: 'Convert between decimal, binary, octal, and hexadecimal'
    },
    categories: {
      math: 'Mathematics',
      business: 'Business Analytics',
      utilities: 'Utilities'
    }
  }
} as const;
