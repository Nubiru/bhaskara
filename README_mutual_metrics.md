# 🚀 MutualMetrics Frontend

**Plataforma Web de Análisis Matemático y Business Analytics**

Una aplicación React SPA moderna para análisis matemático de funciones cuadráticas y business analytics, con navegación modular, internacionalización completa y visualización interactiva.

## 📋 Características

### 🔬 Análisis Matemático
- ✅ **Análisis Cuadrático Completo**: Raíces, vértice, discriminante, óptimos económicos
- ✅ **Visualización Interactiva**: Gráficos de parábolas con Chart.js
- ✅ **Validación en Tiempo Real**: Feedback inmediato con React Hook Form + Zod

### 📈 Business Analytics Suite
- ✅ **Análisis de Ingresos**: Cálculo de revenue total con proyecciones
- ✅ **Análisis de Costos**: Breakdown de costos fijos y variables
- ✅ **Análisis de Beneficios**: Cálculo de profit margins y rentabilidad
- ✅ **Punto de Equilibrio**: Break-even analysis con sensibilidad

### 🌐 Experiencia de Usuario
- ✅ **Navegación Intuitiva**: Sidebar modular con acceso rápido
- ✅ **Internacionalización**: Soporte completo ES/EN
- ✅ **Sistema de Temas**: Light/Dark mode adaptativos
- ✅ **Responsive Design**: Optimizado para todos los dispositivos
- ✅ **Accesibilidad**: Cumple estándares WCAG 2.1 AA

### 🔧 Funcionalidades Técnicas
- ✅ **Historial Local**: Persistencia de análisis previos con localStorage
- ✅ **Integración Backend**: API completa con FastAPI endpoints
- ✅ **Manejo de Errores**: Retry logic y user-friendly messages
- ✅ **Performance**: Optimizado para carga rápida (< 200ms)
- ✅ **Type Safety**: TypeScript strict mode con Zod validation

## 🛠️ Stack Tecnológico

### Frontend Core
- **Framework**: React Router v7 (SPA mode)
- **Lenguaje**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 con custom themes
- **State Management**: React Hooks + Context API

### Librerías Especializadas
- **Gráficos**: Chart.js + react-chartjs-2
- **Formularios**: React Hook Form + Zod
- **API**: Axios con retry logic y interceptors
- **i18n**: react-i18next con detección automática
- **Themes**: Sistema custom con preferencias del sistema

### Calidad y Testing
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier + Husky
- **Accessibility**: jest-axe para testing a11y
- **Performance**: Lighthouse CI integrado

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 9.0.0

### Configuración

```bash
# 1. Clonar repositorio
git clone https://github.com/mutualmetrics/bhaskara.git
cd bhaskara/frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar desarrollo
npm run dev
```

### Variables de Entorno

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DOWNLOADS=true
VITE_DEBUG_MODE=false

# Optional: Analytics & Monitoring
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
VITE_SENTRY_DSN=SENTRY_DSN
```

## 📁 Arquitectura del Proyecto

```
frontend/
├── app/                          # React Router v7 app directory
│   ├── root.tsx                  # Layout principal con providers
│   ├── routes.ts                 # Configuración de rutas anidadas
│   ├── app.css                   # Estilos globales + Tailwind v4
│   │
│   ├── routes/                   # Definición de rutas
│   │   ├── home.tsx             # Página principal (legacy)
│   │   ├── history.tsx          # Historial de análisis
│   │   ├── about.tsx            # Información del proyecto
│   │   └── analysis/            # Business Analytics Routes
│   │       ├── bhaskara.tsx     # Análisis cuadrático
│   │       ├── revenue.tsx      # Análisis de ingresos
│   │       ├── costs.tsx        # Análisis de costos
│   │       ├── profit.tsx       # Análisis de beneficios
│   │       └── break-even.tsx   # Punto de equilibrio
│   │
│   ├── components/               # Componentes modulares
│   │   ├── navigation/          # Sidebar y navegación
│   │   ├── providers/           # Theme + Language providers
│   │   ├── ui/                  # Loading, toggles, buttons
│   │   ├── forms/               # QuadraticForm y validaciones
│   │   ├── charts/              # QuadraticChart y visualización
│   │   ├── history/             # HistoryList y gestión
│   │   └── layout/              # Header, Footer globales
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useLocalHistory.ts   # Gestión de historial
│   │   └── useTheme.ts          # Gestión de temas
│   │
│   ├── services/                 # Capa de servicios
│   │   └── api.ts               # API service con todos los endpoints
│   │
│   ├── types/                    # Tipos TypeScript
│   │   ├── quadratic.ts         # Análisis cuadrático
│   │   ├── business.ts          # Business analytics
│   │   └── api.ts               # Requests y responses
│   │
│   ├── utils/                    # Utilidades
│   │   └── api-helpers.ts       # Retry logic, error handling
│   │
│   ├── constants/                # Constantes
│   │   └── api.ts               # Endpoints y configuración
│   │
│   └── i18n/                     # Internacionalización
│       ├── config.ts            # Configuración react-i18next
│       └── translations/        # Traducciones modulares
│           ├── es/              # Español - estructura modular
│           │   ├── index.ts     # Agregador principal ES
│           │   ├── navigation.ts # Navegación y accesibilidad
│           │   ├── home.ts      # Página principal
│           │   ├── form.ts      # Formularios (compartido)
│           │   ├── history.ts   # Página historial
│           │   ├── about.ts     # Página acerca de
│           │   ├── sidebar.ts   # Navegación lateral
│           │   ├── footer.ts    # Componente footer
│           │   ├── common.ts    # Estados comunes
│           │   ├── analysis.ts  # Módulos de análisis
│           │   └── revenue.ts   # Módulo de ingresos
│           └── en/              # English - misma estructura
│               ├── index.ts     # Agregador principal EN
│               ├── navigation.ts
│               ├── home.ts
│               ├── form.ts
│               ├── history.ts
│               ├── about.ts
│               ├── sidebar.ts
│               ├── footer.ts
│               ├── common.ts
│               ├── analysis.ts
│               └── revenue.ts
│
├── public/                       # Assets estáticos
├── react-router.config.ts        # Configuración SPA + optimizaciones
├── tsconfig.json                 # TypeScript config estricto
├── tailwind.config.js            # Tailwind v4 + custom themes
└── vite.config.ts                # Vite optimizado para performance
```

## 🎯 Módulos de Análisis

### 1. 📐 Análisis Cuadrático (Bhaskara)
- **Entrada**: Coeficientes a, b, c
- **Salida**: Raíces, vértice, discriminante, ecuación
- **Visualización**: Gráfica de parábola interactiva
- **Casos**: Educación, modelado matemático

### 2. 💰 Análisis de Ingresos
- **Entrada**: Precio unitario, cantidad
- **Salida**: Ingreso total, proyecciones
- **Aplicación**: Planning de ventas, pricing strategy

### 3. 💸 Análisis de Costos
- **Entrada**: Costos fijos, costos variables
- **Salida**: Costo total, breakdown detallado
- **Aplicación**: Control de costos, presupuestos

### 4. 📊 Análisis de Beneficios
- **Entrada**: Ingresos, costos totales
- **Salida**: Beneficio neto, márgenes
- **Aplicación**: Análisis de rentabilidad

### 5. ⚖️ Punto de Equilibrio
- **Entrada**: Costos fijos, precio, costo variable unitario
- **Salida**: Punto de equilibrio, análisis de sensibilidad
- **Aplicación**: Planning estratégico, viabilidad

## 🧪 Testing y Calidad

### Testing Suite
```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test:coverage

# Tests de accesibilidad
npm run test:a11y

# Tests E2E (futuro)
npm run test:e2e
```

### Métricas de Calidad
- **Cobertura de Tests**: ≥ 85%
- **TypeScript Strict**: 100% type-safe
- **Lighthouse Score**: ≥ 90
- **Accessibility**: WCAG 2.1 AA compliance
- **Bundle Size**: < 1MB compressed

## 🔧 Scripts de Desarrollo

| Comando | Función |
|---------|---------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build optimizado para producción |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | ESLint + Prettier verificación |
| `npm run lint:fix` | Auto-fix de problemas de linting |
| `npm run type-check` | Verificación completa TypeScript |
| `npm run test` | Suite completa de tests |
| `npm run test:coverage` | Tests con reporte de cobertura |

## 📊 Performance Targets

### Core Web Vitals
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Time to Interactive**: < 3s

### Bundle Optimization
- **Initial Bundle**: < 500KB gzipped
- **Chart.js**: Lazy loaded por módulo
- **i18n Resources**: Carga bajo demanda
- **Code Splitting**: Por rutas y componentes pesados

## 🔒 Seguridad y Privacidad

### Medidas de Seguridad
- **Input Sanitization**: Todos los inputs validados con Zod
- **XSS Protection**: DOMPurify para contenido dinámico
- **CSRF Protection**: Tokens en requests sensibles
- **CSP Headers**: Content Security Policy configurado

### Privacidad de Datos
- **Local Storage**: Solo análisis y preferencias de UI
- **No Tracking**: Sin cookies de terceros por defecto
- **GDPR Ready**: Cumplimiento con regulaciones europeas
- **Data Export**: Usuario controla sus datos completamente

## ♿ Accesibilidad

### Implementación WCAG 2.1 AA
- **Keyboard Navigation**: Navegación completa por teclado
- **Screen Readers**: Labels y descriptions semánticas
- **Color Contrast**: Ratio ≥ 4.5:1 en todos los elementos
- **Focus Management**: Indicadores visuales claros
- **Alternative Text**: Para gráficas y elementos visuales

### Testing Automático
- **jest-axe**: Verificación automática en CI/CD
- **Manual Testing**: Con herramientas de screen readers
- **User Testing**: Con usuarios con discapacidades

## 🌍 Internacionalización

### Idiomas Soportados
- **🇪🇸 Español**: Idioma principal, traducción nativa
- **🇺🇸 English**: Traducción completa, contexto técnico

### Características i18n
- **Toggle Dinámico**: Cambio de idioma sin recarga
- **Persistencia**: Preferencia guardada en localStorage
- **Arquitectura Modular**: Traducciones organizadas por dominio
- **Pluralization**: Manejo automático de plurales
- **Number Formatting**: Formato de números por región
- **Escalabilidad**: Estructura preparada para múltiples idiomas

### Arquitectura Modular de Traducciones
```typescript
// Estructura escalable por dominio
translations/
├── es/                    # Idioma español
│   ├── index.ts          # Agregador principal
│   ├── navigation.ts     # Nav + accesibilidad
│   ├── home.ts          # Página principal
│   ├── form.ts          # Formularios compartidos
│   ├── sidebar.ts       # Navegación lateral
│   └── revenue.ts       # Módulo específico
└── en/                   # English (misma estructura)
    └── ...

// Beneficios:
✅ Separación por responsabilidad
✅ Desarrollo paralelo sin conflictos
✅ Escalabilidad para nuevos módulos
✅ Tree-shaking optimizado
✅ Mantenimiento simplificado
```

## 🚀 Deployment

### Ambientes
```bash
# Desarrollo
npm run dev

# Staging
npm run build:staging

# Producción
npm run build:prod
```

### Optimizaciones de Build
- **Tree Shaking**: Eliminación de código no usado
- **Minification**: Compresión optimizada
- **Asset Optimization**: Imágenes y recursos optimizados
- **Caching Strategy**: Headers de cache configurados

## 🤝 Contribución

### Workflow de Desarrollo
1. **Fork** del repositorio
2. **Feature Branch**: `git checkout -b feature/nueva-funcionalidad`
3. **Desarrollo**: Siguiendo [codigo_optimizado.md](codigo_optimizado.md)
4. **Testing**: Verificar que todos los tests pasen
5. **Pull Request**: Con descripción detallada

### Estándares de Calidad
- **Código**: Seguir guías de [codigo_optimizado.md](codigo_optimizado.md)
- **Tests**: Mantener cobertura ≥ 85%
- **Documentation**: Documentar componentes
- **i18n**: Agregar traducciones para strings
- **A11y**: Verificar accesibilidad en funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 📞 Contacto y Soporte

- **Email**: contact@mutualmetrics.com
- **GitHub Issues**: Para bugs y feature requests
- **Documentación**: [docs.mutualmetrics.com](https://docs.mutualmetrics.com)
- **Especificación**: Ver [Model Specification.md](Model%20Specification.md)

## 🙏 Agradecimientos

- [React Router v7](https://reactrouter.com/) - Framework de routing moderno
- [Tailwind CSS v4](https://tailwindcss.com/) - Sistema de diseño utility-first
- [Chart.js](https://www.chartjs.org/) - Visualización de datos interactiva
- [react-i18next](https://react.i18next.com/) - Internacionalización React

---

**💡 MutualMetrics v1.0 - Análisis matemático y business analytics en una plataforma moderna**

**Desarrollado con ❤️ por el equipo MutualMetrics**