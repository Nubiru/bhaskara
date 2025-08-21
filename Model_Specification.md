# MutualMetrics

# Model Spec: Plataforma Web de Análisis Matemático y Empresarial

## 1. Introducción

Este documento dirige al equipo de desarrollo en la implementación de una aplicación web gratuita y de uso libre que permita a administradores de empresa, estudiantes y cualquier usuario interesado realizar análisis sobre funciones cuadráticas y análisis empresarial (ingresos, costos, beneficios, punto de equilibrio, etc.).

La plataforma incluye un sistema completo de Business Analytics con navegación modular, internacionalización completa y sistema de temas adaptativos.

Sirve como fuente de verdad para diseñar la arquitectura, definir requisitos y preparar historias de usuario, criterios de aceptación y diagramas de flujo.

---

## 2. Audiencia

- **Equipo de desarrollo MutualMetrics**

_No está dirigido al usuario final._

---

## 3. Propósito y Alcance

- **Propósito**: Facilitar cálculos estratégicos basados en modelos cuadráticos y análisis empresarial para apoyar la toma de decisiones en producción, precios, inversión y operación.
- **Alcance**:
  - **Análisis Matemático**: Cálculo de raíces, discriminante, vértice (máximo/mínimo), punto óptimo.
  - **Business Analytics Suite**: 
    - Análisis de Ingresos Totales
    - Análisis de Costos (fijos y variables)
    - Análisis de Beneficios Netos
    - Análisis de Punto de Equilibrio
  - **Interfaz**:
    - Sistema de navegación modular con sidebar
    - Internacionalización completa (Español/Inglés)
    - Sistema de temas (Light/Dark)
    - Diseño responsive y accesible
  - **Funcionalidades Core**:
    - Visualización gráfica interactiva
    - Reporte descargable (PDF/CSV) por módulo
    - Historial local de análisis recientes
    - Validación en tiempo real

---

## 4. Objetivos de Alto Nivel

1. **Precisión**: Tolerancia de error ≤ 10⁻⁶ en todos los resultados.
2. **Usabilidad**: Interfaz limpia, responsive y accesible (WCAG 2.1 AA).
3. **Rendimiento**: Latencia de cálculo < 200 ms bajo carga normal.
4. **Extensibilidad**: Motor de cálculo desacoplado para incorporar futuros modelos.
5. **Mantenibilidad**: Código modular y documentado, con cobertura de pruebas ≥ 85 %.
6. **Internacionalización**: Soporte completo para múltiples idiomas.
7. **Accesibilidad Visual**: Sistema de temas adaptativos.
8. **Modularidad**: Arquitectura de microservicios en el frontend.

---

## 5. Requisitos Funcionales (RF)

| ID      | Descripción                                                                         |
| ------- | ----------------------------------------------------------------------------------- |
| **RF1** | **Navegación Modular**: Sidebar colapsible con acceso a todos los módulos de análisis. |
| **RF2** | **Análisis Cuadrático**: Formulario para coeficientes `a`, `b`, `c` con cálculo completo. |
| **RF3** | **Business Analytics**: Módulos especializados para Revenue, Costs, Profit, Break-even. |
| **RF4** | **Internacionalización**: Toggle Español/Inglés con persistencia de preferencias. |
| **RF5** | **Sistema de Temas**: Toggle Light/Dark con detección automática de preferencias. |
| **RF6** | **Visualización**: Gráficas interactivas con Chart.js (zoom, tooltips, puntos clave). |
| **RF7** | **Descargas**: Reportes especializados por módulo (PDF/CSV) con datos completos. |
| **RF8** | **Historial**: Persistencia local de análisis con funcionalidad de recalcular. |
| **RF9** | **Validación**: Tiempo real con feedback visual y mensajes de error específicos. |
| **RF10** | **API Health**: Endpoints de monitoreo y verificación de estado del servicio. |

---

## 6. Requisitos No Funcionales (RNF)

- **RNF1**: Tiempo medio de respuesta < 200 ms.
- **RNF2**: 99.9 % de disponibilidad.
- **RNF3**: Escalabilidad horizontal (contenedores Docker / Kubernetes).
- **RNF4**: Seguridad: HTTPS obligatorio, CORS restringido al dominio oficial, rate-limiting.
- **RNF5**: Accesibilidad y compatibilidad con navegadores modernos (Chrome, Firefox, Edge, Safari).
- **RNF6**: Registro de errores y métricas (Logging, APM).
- **RNF7**: Internacionalización: Arquitectura modular escalable, carga de idiomas < 100ms, soporte RTL preparado.
- **RNF8**: Performance UI: Transiciones de tema < 200ms, sidebar responsivo.
- **RNF9**: Memory Management: Límite de 50MB para historial local.

---

## 7. Arquitectura de Alto Nivel

```
┌───────────────────────────────────────────────────────────────┐
│                       CLIENTE SPA                             │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐     │
│  │   Sidebar   │ │     Theme    │ │Internationalization │     │
│  │  Navigation │ │    System    │ │      (i18n)         │     │
│  └─────────────┘ └──────────────┘ └─────────────────────┘     │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │            Business Analytics Modules                   │  │
│  │    [Bhaskara] [Revenue] [Costs] [Profit] [Break-even]   │  │
│  └─────────────────────────────────────────────────────────┘  │
│     React Router v7 + TypeScript + Tailwind CSS + Chart.js    │
└───────────────────────────────────────────────────────────────┘
                              ⇅ HTTPS/REST
┌───────────────────────────────────────────────────────────────┐
│                        BACKEND API                            │
│     ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐  │
│     │   Bhaskara  │ │   Business   │ │      Download       │  │
│     │   Analysis  │ │   Analytics  │ │      Services       │  │
│     │             │ │   Endpoints  │ │                     │  │
│     └─────────────┘ └──────────────┘ └─────────────────────┘  │
│     FastAPI + Uvicorn + Python Mathematical Libraries         │
└───────────────────────────────────────────────────────────────┘
                              ⇅
┌───────────────────────────────────────────────────────────────┐
│                      CÁLCULO ENGINE                           │
│           Modular Mathematical & Business Logic               │
└───────────────────────────────────────────────────────────────┘
```

Nota operativa: Para desarrollo local se recomienda usar contenedores con Docker Compose (`docker compose up --build`). El frontend se sirve estáticamente (Nginx) y el backend expone documentación en `/docs`. Para entornos simples o limitados, se dispone de un stack Dockerfile unificado (`docker-compose.stack.yml`) que combina frontend y backend en una sola imagen con s6-overlay gestionando nginx y uvicorn.

### **Componentes:**

1. **Cliente SPA (React Router v7)**
   - **Navegación**: Sidebar modular con estado colapsible
   - **Temas**: Light/Dark mode con preferencias del sistema
   - **i18n**: Arquitectura modular escalable con react-i18next
     - Traducciones por dominio (navigation, forms, modules)
     - Estructura `/es/` y `/en/` simétrica
     - Agregadores principales para cada idioma
     - Escalabilidad preparada para nuevos módulos
   - **Módulos**: 5 análisis especializados con routing anidado
   - **Visualización**: Chart.js para gráficas interactivas

2. **Backend API (FastAPI)**
   - **Endpoints Cuadráticos**: `/analizar/bhaskara`, `/analizar/economia`
   - **Endpoints Business**: `/analisis/ingreso-total`, `/analisis/costo-total`, `/analisis/beneficio`, `/analisis/punto-equilibrio`
   - **Descargas**: `/descargar/*` para cada tipo de análisis
   - **Monitoreo**: `/health` con métricas detalladas

3. **Engine de Cálculo**
   - Matemático: Funciones cuadráticas, discriminantes, vértices
   - Empresarial: Revenue, costs, profit, break-even calculations
   - Modular y extensible para futuros tipos de análisis

---

## 8. Especificación de API

### 8.1 Endpoints de Análisis Cuadrático

#### POST `/analizar/bhaskara`
- **Descripción**: Análisis completo de función cuadrática
- **Request**: `{ "a": 1.5, "b": -4.2, "c": 2.0, "timestamp": "ISO", "clientVersion": "1.0.0" }`
- **Response**: Raíces, vértice, discriminante, ecuación, análisis completo

#### POST `/analizar/economia`
- **Descripción**: Análisis económico especializado
- **Request**: Coeficientes + parámetros económicos
- **Response**: Óptimos, marginales, puntos de equilibrio

### 8.2 Endpoints de Business Analytics

#### GET `/analisis/ingreso-total`
- **Descripción**: Cálculo de ingresos totales
- **Parameters**: `precio`, `cantidad`, `description`
- **Response**: Análisis de revenue con proyecciones

#### GET `/analisis/costo-total`
- **Descripción**: Análisis de costos fijos y variables
- **Parameters**: Estructura de costos empresarial
- **Response**: Breakdown completo de costos

#### GET `/analisis/beneficio`
- **Descripción**: Cálculo de beneficios netos
- **Parameters**: Ingresos, costos, períodos
- **Response**: Análisis de rentabilidad

#### GET `/analisis/punto-equilibrio`
- **Descripción**: Punto de equilibrio operativo
- **Parameters**: Costos fijos, variables, precio unitario
- **Response**: Break-even point y análisis de sensibilidad

### 8.3 Endpoints de Descarga

#### GET `/descargar/analisis-bhaskara`
#### GET `/descargar/analisis-ingresos`
#### GET `/descargar/analisis-costos`
#### GET `/descargar/analisis-beneficios`
#### GET `/descargar/analisis-equilibrio`
- **Formatos**: PDF, CSV, JSON
- **Incluye**: Gráficas, tablas, metadatos

### 8.4 Monitoreo

#### GET `/health`
- **Response**: Estado del servicio, métricas básicas

#### GET `/metrics`
- **Response**: Métricas detalladas para monitoring

---

## 9. Modelo de Datos

### 9.1 Análisis Cuadrático
```typescript
interface QuadraticAnalysis {
  id: string (UUID)
  coefficients: { a: number, b: number, c: number }
  mode: 'roots' | 'vertex' | 'optimal' | 'full'
  results: {
    equation: string
    discriminant: number
    roots: { x1: number | null, x2: number | null }
    vertex: { x: number, y: number }
    analysisId: string
  }
  metadata: {
    timestamp: string (ISO 8601)
    clientVersion: string
    sessionId?: string
  }
}
```

### 9.2 Business Analytics
```typescript
interface RevenueAnalysis {
  id: string
  params: { precio: number, cantidad: number }
  results: { ingresoTotal: number, proyecciones: number[] }
  timestamp: string
}

interface CostAnalysis {
  id: string
  params: { costosFijos: number, costosVariables: number }
  results: { costoTotal: number, breakdown: object }
  timestamp: string
}

interface ProfitAnalysis {
  id: string
  params: { ingresos: number, costos: number }
  results: { beneficioNeto: number, margen: number }
  timestamp: string
}

interface BreakEvenAnalysis {
  id: string
  params: { costosFijos: number, precioUnitario: number, costoVariable: number }
  results: { puntoEquilibrio: number, analisisSensibilidad: object }
  timestamp: string
}
```

### 9.3 UI State Management
```typescript
interface AppState {
  theme: 'light' | 'dark' | 'system'
  language: 'es' | 'en'
  navigation: {
    sidebarCollapsed: boolean
    currentModule: AnalysisModule
  }
  history: AnalysisRecord[]
}
```

**Nota**: El almacenamiento principal se maneja en el cliente con localStorage. Backend stateless para escalabilidad.

---

## 10. Seguridad y Privacidad

- **Comunicación cifrada**: TLS en todos los endpoints.
- **CORS**: Solo el dominio oficial puede invocar la API.
- **Rate-limiting**: Tope de 100 peticiones/minuto/IP.
- **CSP Headers**: Content Security Policy configurado.
- **XSS Protection**: Sanitización de inputs y outputs.
- **Data Privacy**: Cumplimiento GDPR para usuarios europeos.
- **Datos de usuario**: No se almacenan datos personales a menos que se habilite registro opcional.

---

## 11. Estrategia de Pruebas

- **Unitarias**: Cada función de cálculo y componente UI (≥85% cobertura).
- **Integración**: Validar flujos frontend ↔ backend con datos reales.
- **E2E**: Casos críticos (cálculos key, descarga de reportes) con Cypress.
- **A11y Testing**: Verificación automática de accesibilidad.
- **i18n Testing**: Validación de traducciones y contextos.
- **Performance Testing**: Core Web Vitals y métricas de UX.
- **CI/CD**: Automatización en cada PR con pipelines completos.

---

## 12. Glosario

- **Bhaskara**: Método para resolver ecuaciones cuadráticas.
- **Vértice**: Punto de máximo o mínimo en la parábola.
- **Óptimo económico**: Valor de x que maximiza ingreso o beneficio.
- **Marginal**: Variación discreta de ingreso, costo o beneficio.
- **SPA**: Single-Page Application.
- **Sidebar**: Panel de navegación lateral colapsible.
- **i18n**: Internacionalización (internationalization).
- **Theme System**: Sistema de temas visuales adaptativos.
- **Business Analytics**: Suite de análisis empresarial integrado.
- **Break-even**: Punto de equilibrio operativo empresarial.

---

**Versión**: 1.0  
**Última actualización**: Enero 2025  
**Próxima revisión**: Abril 2025