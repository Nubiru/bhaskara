# MutualMetrics

Tareas pendientes:

1. Nombre - CalcuLibre
2. objetivo claro del proyecto y para que lo desarrollamos
3. historias de usuario -> criterios de aceptacion
4. diagrama de flujo

5. enumerar las funcionalidades y empezar su desarrollo

6.

# Model Spec: Herramienta Web de Análisis de Funciones Cuadráticas

## 1. Introducción

Este documento dirige al equipo de desarrollo en la implementación de una aplicación web gratuita y de uso libre que permita a administradores de empresa, estudiantes y cualquier usuario interesado realizar análisis sobre funciones cuadráticas (raíces, vértice, óptimos económicos, costos variables, márgenes, etc.). Sirve como fuente de verdad para diseñar la arquitectura, definir requisitos y preparar historias de usuario, criterios de aceptación y diagramas de flujo.

---

## 2. Audiencia

- **Equipo de desarrollo full-stack**
- **Arquitectos de software**
- **QA / DevOps**

_No está dirigido al usuario final._

---

## 3. Propósito y Alcance

- **Propósito**: Facilitar cálculos estratégicos basados en modelos cuadráticos para apoyar la toma de decisiones en producción, precios, inversión y operación.
- **Alcance**:
  - Cálculo de raíces y discriminante.
  - Determinación del vértice (máximo/mínimo).
  - Cálculo de punto óptimo para ingresos/beneficio.
  - Evaluación de costos variables y márgenes (ingreso marginal, costo marginal, beneficio marginal).
  - Visualización gráfica interactiva.
  - Reporte descargable (PDF o CSV).
  - Historial local de análisis recientes.

---

## 4. Objetivos de Alto Nivel

1. **Precisión**: Tolerancia de error ≤ 10⁻⁶ en todos los resultados.
2. **Usabilidad**: Interfaz limpia, responsive y accesible (WCAG 2.1 AA).
3. **Rendimiento**: Latencia de cálculo < 200 ms bajo carga normal.
4. **Extensibilidad**: Motor de cálculo desacoplado para incorporar futuros modelos (polinomios de grado superior, análisis estadísticos).
5. **Mantenibilidad**: Código modular y documentado, con cobertura de pruebas ≥ 85 %.

---

## 5. Requisitos Funcionales (RF)

| ID      | Descripción                                                                         |
| ------- | ----------------------------------------------------------------------------------- |
| **RF1** | Formulario de entrada: coeficientes `a`, `b`, `c` y selector de modo de análisis.   |
| **RF2** | Cálculo backend de: raíces, vértice, punto óptimo, márgenes y valores intermedios.  |
| **RF3** | Gráfica interactiva de la parábola y puntos clave (zoom, tooltips).                 |
| **RF4** | Descarga de informe con resultados y gráfica (PDF y/o CSV).                         |
| **RF5** | Historial local (últimos 10 análisis) con posibilidad de “recalcular”.              |
| **RF6** | Validación de entrada en tiempo real (`a ≠ 0`, campos numéricos, rangos razonables) |
| **RF7** | Endpoint de salud (`/health`) para monitoreo y uptime.                              |

---

## 6. Requisitos No Funcionales (RNF)

- **RNF1**: Tiempo medio de respuesta < 200 ms.
- **RNF2**: 99.9 % de disponibilidad.
- **RNF3**: Escalabilidad horizontal (contenedores Docker / Kubernetes).
- **RNF4**: Seguridad: HTTPS obligatorio, CORS restringido al dominio oficial, rate-limiting.
- **RNF5**: Accesibilidad y compatibilidad con navegadores modernos (Chrome, Firefox, Edge, Safari).
- **RNF6**: Registro de errores y métricas (Logging, APM).

---

## 7. Arquitectura de Alto Nivel

[ Cliente SPA ] ⇄ [ API Gateway / Backend ] ⇄ [ Módulo de Cálculo ]
↓ ↓ ↓
React.js REST/JSON Math Engine
(HTTPS) (desacoplado)

1. **Cliente (SPA)**
   - Framework: React, Vue o similar.
   - Consumo de API REST.
   - Chart library (Chart.js, D3.js).
2. **Backend**
   - Framework web ligero (por ejemplo, FastAPI, Express, Spring Boot).
   - Endpoints REST para análisis y descargas.
   - Capa de validación y orquestación.
3. **Módulo de Cálculo**
   - Componente independiente (librería interna) que recibe `(a,b,c,mode)` y devuelve resultados.
   - Interfaces bien definidas para reemplazo futuro.

---

## 8. Especificación de API

### 8.1 POST `/api/analyze`

- **Descripción**: Ejecuta el análisis cuadrático.
- **Request** (JSON):

  ```json
  {
    "a": 1.5,
    "b": -4.2,
    "c": 2.0,
    "mode": "full" // "roots" | "vertex" | "optimal" | "marginals" | "full"
  }
  ```

- **Response** (200 OK, JSON):

```json
{
  "roots": [ x1, x2 ],
  "vertex": { "x": xv, "y": yv },
  "optimal": { "x": x_opt, "value": val_opt },
  "marginals": {
    "revenue": mr,
    "cost": mc,
    "profit": mp
  },
  "points": [ { "x":…, "y":… }, … ]
}
```

- **Códigos de error**

400: entrada inválida (a == 0, valores no numéricos).

500: error interno.

### 8.2 GET /health

- **Descripción**: Verifica el estado del servicio.
- **Response** 200 OK con { "status": "ok" }.

## 9. Modelo de Datos

AnalysisRecord:
id: string (UUID)
a: number
b: number
c: number
mode: enum [roots, vertex, optimal, marginals, full]
results:
roots: [number, number]
vertex:
x: number
y: number
optimal:
x: number
value: number
marginals:
revenue: number
cost: number
profit: number
points: - x: number
y: number
timestamp: string (ISO 8601)

Nota: El almacenamiento de registros es opcional; por defecto, el historial se maneja en el cliente.

# 10. Seguridad y Privacidad

Comunicación cifrada: TLS en todos los endpoints.

CORS: Solo el dominio oficial puede invocar la API.

Rate-limiting: Tope de 100 peticiones/minuto/IP.

Datos de usuario: No se almacenan datos personales a menos que se habilite registro opcional.

## 11. Estrategia de Pruebas

Unitarias: Cada función de cálculo y componente UI.

Integración: Validar flujos frontend ↔ backend con datos reales.

E2E: Casos críticos (cálculos key, descarga de reportes) con Cypress o Playwright.

CI/CD: Automatización en cada PR con pipelines de linting, tests y despliegue a entorno de staging.

## 12. Glosario

Bhaskara: Método para resolver ecuaciones cuadráticas.

Vértice: Punto de máximo o mínimo en la parábola.

Óptimo económico: Valor de x que maximiza ingreso o beneficio.

Marginal: Variación discreta de ingreso, costo o beneficio.

SPA: Single-Page Application.
