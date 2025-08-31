/**
 * @fileoverview Model Specification for MutualMetrics Platform
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-31
 * 
 * @description
 * Core business requirements and system architecture specification for the
 * MutualMetrics platform. This document serves as the single source of truth
 * for all development decisions and requirements.
 * 
 * @dependencies
 * - Project architecture decisions
 * - Business requirements
 * - Technical specifications
 * 
 * @usage
 * Reference for all development decisions and requirements
 * 
 * @state
 * ✅ Functional - Complete model specification
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add performance benchmarks
 * - [PRIORITY: LOW] Add scalability metrics
 * 
 * @performance
 * - Latency targets defined
 * - Throughput requirements specified
 * - Resource constraints documented
 * 
 * @accessibility
 * - WCAG 2.1 AA compliance required
 * - Accessibility guidelines documented
 * - Testing requirements specified
 * 
 * @security
 * - Security requirements defined
 * - Authentication requirements specified
 * - Data protection requirements documented
 */

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
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐   │  │
│  │  │Revenue  │ │ Costs   │ │ Profit  │ │Break-even  │   │  │
│  │  │Analysis │ │Analysis │ │Analysis │ │ Analysis   │   │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │            Mathematical Analysis Modules                │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐   │  │
│  │  │Bhaskara │ │Quadratic│ │ Number  │ │  Financial  │   │  │
│  │  │Analysis │ │Functions│ │Converter│ │   Tools     │   │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                    API GATEWAY (FastAPI)                      │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐     │
│  │   Routing   │ │  Validation  │ │   Error Handling    │     │
│  │  & Caching  │ │  & Security  │ │   & Logging         │     │
│  └─────────────┘ └──────────────┘ └─────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC LAYER                         │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐     │
│  │   Math      │ │   Business   │ │     Financial       │     │
│  │  Services   │ │   Services   │ │     Services        │     │
│  └─────────────┘ └──────────────┘ └─────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                 │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐     │
│  │   Local     │ │   External   │ │     Validation      │     │
│  │   Storage   │ │     APIs     │ │     & Caching       │     │
│  └─────────────┘ └──────────────┘ └─────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
```

---

## 8. Módulos de Análisis

### 8.1 Análisis Cuadrático (Bhaskara)

**Descripción**: Análisis completo de funciones cuadráticas f(x) = ax² + bx + c

**Funcionalidades**:
- Cálculo de raíces (x₁, x₂)
- Determinación del discriminante (Δ = b² - 4ac)
- Cálculo del vértice (h, k)
- Análisis de concavidad y dirección
- Gráfica interactiva con puntos clave
- Exportación de resultados

**Validaciones**:
- Coeficiente `a` ≠ 0
- Números reales válidos
- Rango de coeficientes: ±10¹²

### 8.2 Business Analytics Suite

#### 8.2.1 Análisis de Ingresos Totales

**Modelo**: I = p × q
- **p**: Precio unitario
- **q**: Cantidad vendida

**Funcionalidades**:
- Cálculo de ingresos totales
- Análisis de sensibilidad al precio
- Gráfica de ingresos vs cantidad
- Exportación de análisis

#### 8.2.2 Análisis de Costos

**Modelo**: CT = CF + CV × q
- **CF**: Costos fijos totales
- **CV**: Costos variables por unidad
- **q**: Cantidad producida

**Funcionalidades**:
- Cálculo de costos totales
- Análisis de costos fijos vs variables
- Gráfica de costos vs cantidad
- Exportación de análisis

#### 8.2.3 Análisis de Beneficios

**Modelo**: B = I - CT
- **I**: Ingresos totales
- **CT**: Costos totales

**Funcionalidades**:
- Cálculo de beneficio neto
- Análisis de rentabilidad
- Gráfica de beneficios vs cantidad
- Exportación de análisis

#### 8.2.4 Análisis de Punto de Equilibrio

**Modelo**: q* = CF / (p - CV)
- **q***: Cantidad de equilibrio
- **p**: Precio unitario
- **CV**: Costo variable unitario

**Funcionalidades**:
- Cálculo del punto de equilibrio
- Análisis de viabilidad
- Gráfica de equilibrio
- Exportación de análisis

### 8.3 Herramientas Financieras

#### 8.3.1 Interés Compuesto

**Modelo**: A = P(1 + r/n)^(nt)
- **A**: Monto final
- **P**: Principal inicial
- **r**: Tasa de interés anual
- **n**: Frecuencia de capitalización
- **t**: Tiempo en años

**Funcionalidades**:
- Cálculo de monto final
- Análisis de diferentes frecuencias
- Gráfica de crecimiento
- Exportación de análisis

#### 8.3.2 Conversor de Monedas

**Funcionalidades**:
- Conversión en tiempo real
- Soporte para múltiples monedas
- Historial de conversiones
- Exportación de resultados

### 8.4 Convertidor de Números

**Funcionalidades**:
- Conversión entre bases (2, 8, 10, 16)
- Soporte para números fraccionarios
- Precisión configurable
- Exportación de resultados

---

## 9. Interfaz de Usuario

### 9.1 Sistema de Navegación

**Sidebar Colapsible**:
- Acceso directo a todos los módulos
- Indicador de módulo activo
- Agrupación lógica por categorías
- Responsive design para móviles

**Header**:
- Logo y nombre de la aplicación
- Toggle de tema (Light/Dark)
- Toggle de idioma (Español/Inglés)
- Información de usuario (futuro)

### 9.2 Sistema de Temas

**Tema Claro**:
- Fondos: crema/ámbar suaves
- Texto: gris oscuro
- Acentos: azul profesional
- Sombras: sutiles y elegantes

**Tema Oscuro**:
- Fondos: gris muy oscuro
- Texto: blanco/crema
- Acentos: azul claro
- Sombras: pronunciadas

**Validaciones**:
- Contraste WCAG 2.1 AA
- Transiciones suaves (< 200ms)
- Consistencia visual en todos los componentes

### 9.3 Internacionalización

**Idiomas Soportados**:
- Español (predeterminado)
- Inglés

**Elementos Traducibles**:
- Textos de interfaz
- Mensajes de error
- Documentación
- Ayuda contextual

**Características**:
- Persistencia de preferencias
- Carga dinámica de idiomas
- Soporte RTL preparado
- Fallback a idioma predeterminado

---

## 10. Arquitectura Técnica

### 10.1 Frontend (React 19 + TypeScript)

**Estructura de Componentes**:
```
src/
├── components/           # Componentes reutilizables
│   ├── forms/          # Formularios especializados
│   ├── charts/         # Componentes de gráficas
│   ├── layout/         # Componentes de layout
│   └── ui/             # Componentes base de UI
├── pages/               # Páginas de la aplicación
├── hooks/               # Custom hooks
├── services/            # Servicios de API
├── utils/               # Utilidades y helpers
├── types/               # Definiciones de tipos
├── styles/              # Estilos y temas
└── i18n/                # Configuración de idiomas
```

**Tecnologías**:
- React 19 con hooks y context
- TypeScript para type safety
- React Router v7 para navegación
- Tailwind CSS v4 para estilos
- Chart.js para visualizaciones
- React Hook Form + Zod para formularios

### 10.2 Backend (FastAPI + Python 3.12)

**Estructura de Servicios**:
```
backend/
├── app/
│   ├── api/            # Endpoints de API
│   ├── services/       # Lógica de negocio
│   ├── models/         # Modelos de datos
│   ├── core/           # Configuración y utilidades
│   └── main.py         # Punto de entrada
├── tests/               # Pruebas unitarias e integración
└── requirements.txt     # Dependencias de Python
```

**Tecnologías**:
- FastAPI para API REST
- Pydantic para validación de datos
- Uvicorn como servidor ASGI
- Python 3.12 para mejor rendimiento

### 10.3 Despliegue y DevOps

**Contenedorización**:
- Docker para desarrollo y producción
- Docker Compose para orquestación
- Nginx como proxy reverso
- Supervisord para gestión de procesos

**Monitoreo**:
- Health checks automáticos
- Logging estructurado
- Métricas de rendimiento
- Alertas de disponibilidad

---

## 11. Calidad y Testing

### 11.1 Cobertura de Pruebas

**Objetivo**: ≥ 85% de cobertura de código

**Tipos de Pruebas**:
- **Unitarias**: Lógica de negocio individual
- **Integración**: APIs y servicios
- **End-to-End**: Flujos completos de usuario
- **Accesibilidad**: Cumplimiento WCAG 2.1 AA
- **Performance**: Latencias y throughput

### 11.2 Validación de Accesibilidad

**WCAG 2.1 AA Compliance**:
- Contraste de colores adecuado
- Navegación por teclado
- Lectores de pantalla
- Textos alternativos
- Estructura semántica

**Herramientas**:
- axe-core para validación automática
- Lighthouse para auditorías
- Testing manual con lectores de pantalla

### 11.3 Performance y Rendimiento

**Métricas Objetivo**:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 200ms

**Optimizaciones**:
- Code splitting por rutas
- Lazy loading de componentes
- Caching de API responses
- Compresión de assets
- CDN para recursos estáticos

---

## 12. Seguridad y Privacidad

### 12.1 Medidas de Seguridad

**API Security**:
- Validación de entrada con Pydantic
- Rate limiting por IP
- CORS configurado apropiadamente
- Headers de seguridad HTTP

**Frontend Security**:
- Sanitización de datos de entrada
- Validación del lado del cliente
- Protección contra XSS
- CSP (Content Security Policy)

### 12.2 Privacidad de Datos

**Principios**:
- No recolección de datos personales
- Análisis locales sin persistencia
- Exportación de datos opcional
- Cumplimiento GDPR preparado

**Almacenamiento**:
- LocalStorage para preferencias
- SessionStorage para datos temporales
- No persistencia en servidor
- Cifrado de datos sensibles (futuro)

---

## 13. Escalabilidad y Mantenimiento

### 13.1 Arquitectura Escalable

**Diseño Modular**:
- Servicios desacoplados
- APIs stateless
- Caching distribuido
- Load balancing preparado

**Microservicios Ready**:
- Separación clara de responsabilidades
- APIs independientes
- Base de datos por servicio (futuro)
- Message queues (futuro)

### 13.2 Mantenibilidad

**Código Limpio**:
- Principios SOLID
- Patrones de diseño establecidos
- Documentación inline
- Naming conventions consistentes

**Monitoreo y Observabilidad**:
- Logging estructurado
- Métricas de negocio
- Trazabilidad de requests
- Alertas automáticas

---

## 14. Roadmap de Desarrollo

### 14.1 Fase 1: MVP (Minimum Viable Product)
- [x] Análisis cuadrático básico
- [x] Interfaz de usuario básica
- [x] API backend funcional
- [x] Despliegue en contenedores

### 14.2 Fase 2: Business Analytics
- [x] Módulos de análisis empresarial
- [x] Sistema de temas
- [x] Internacionalización
- [x] Gráficas interactivas

### 14.3 Fase 3: Herramientas Avanzadas
- [x] Herramientas financieras
- [x] Convertidor de números
- [x] Sistema de descargas
- [x] Historial de análisis

### 14.4 Fase 4: Optimización y Escalabilidad
- [ ] Performance optimization
- [ ] Testing automation
- [ ] CI/CD pipeline
- [ ] Monitoring avanzado

### 14.5 Fase 5: Funcionalidades Avanzadas
- [ ] Autenticación de usuarios
- [ ] Persistencia de datos
- [ ] Colaboración en tiempo real
- [ ] APIs públicas

---

## 15. Criterios de Aceptación

### 15.1 Funcionalidad

**Análisis Cuadrático**:
- ✅ Cálculo preciso de raíces
- ✅ Determinación correcta del discriminante
- ✅ Cálculo del vértice
- ✅ Gráfica interactiva funcional

**Business Analytics**:
- ✅ Cálculos matemáticos correctos
- ✅ Gráficas representativas
- ✅ Exportación de datos
- ✅ Validación de entrada

### 15.2 Usabilidad

**Interfaz**:
- ✅ Navegación intuitiva
- ✅ Responsive design
- ✅ Accesibilidad WCAG 2.1 AA
- ✅ Sistema de temas funcional

**Performance**:
- ✅ Latencias < 200ms
- ✅ Carga de página < 2s
- ✅ Transiciones suaves
- ✅ Sin bloqueos de UI

### 15.3 Calidad

**Código**:
- ✅ Cobertura de pruebas ≥ 85%
- ✅ Linting sin errores
- ✅ TypeScript sin any
- ✅ Documentación completa

**Despliegue**:
- ✅ Contenedores funcionales
- ✅ Health checks pasando
- ✅ Logs estructurados
- ✅ Métricas disponibles

---

## 16. Conclusión

Este documento de especificación del modelo establece los requisitos fundamentales para la plataforma MutualMetrics. La implementación debe seguir estos requisitos de manera estricta para garantizar la calidad, funcionalidad y escalabilidad del sistema.

El equipo de desarrollo debe referirse a este documento como la fuente de verdad para todas las decisiones técnicas y de implementación. Cualquier desviación debe ser documentada y justificada en los ADRs (Architecture Decision Records).

---

**Documento de Especificación del Modelo - MutualMetrics v1.0.0**  
**Última actualización**: 2025-08-31  
**Estado**: ✅ Aprobado para implementación
