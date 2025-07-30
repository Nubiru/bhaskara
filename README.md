# bhaskara

implementacion de formula bhaskara en el mundo empresarial

Tareas pendientes:

1. Nombre
2. objetivo claro del proyecto y para que lo desarrollamos
3. historias de usuario -> criterios de aceptacion
4. diagrama de flujo

5. enumerar las funcionalidades y empezar su desarrollo

6.

# Model Spec: Aplicación Web de Análisis de Funciones Cuadráticas

## 1. Introducción

**Propósito**  
Definir de forma clara y estructurada los objetivos, alcances, requisitos y componentes de una aplicación web que permita a usuarios efectuar diversos análisis sobre funciones cuadráticas (usando la fórmula de Bhaskara), con foco en máximos de ganancia, niveles óptimos de producción o precio, evaluación de costos variables y soporte a decisiones estratégicas.

**Alcance**  
– Cálculo de raíces (soluciones de \(ax^2 + bx + c = 0\)).  
– Cálculo de vértice (punto de máximo o mínimo).  
– Máximo de ingresos o ganancias (para funciones modelos de ingresos o beneficios).  
– Determinación de producción/precio óptimo (\(x^\* = -\tfrac{b}{2a}\)).  
– Evaluación de costos variables (modelo cuadrático de costo).  
– Visualización interactiva de la gráfica.
– Reporte descargable de resultados.

**Audiencia**
– Estudiantes de negocios.
– Analistas financieros y de operaciones.

---

## 2. Objetivos y Reglas

### 2.1 Objetivos Generales

1. **Precisión** en todos los cálculos (raíces, vértice, optimización).
2. **Usabilidad**: UI intuitiva y accesible, con validaciones claras.
3. **Interactividad**: gráfico dinámico y capacidad de ajustar parámetros en tiempo real.
4. **Extensibilidad**: fácil incorporación de nuevas variaciones de análisis.

### 2.2 Reglas de Cálculo

- Si \(a = 0\), notificar “No es una función cuadrática” y sugerir análisis lineal.
- Usar fórmula de Bhaskara con validación de discriminante:  
  \[
  \Delta = b^2 - 4ac;\quad
  x\_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}.
  \]
- Redondear resultados a 2 decimales.
- Para vértice:  
  \[
  x_v = -\frac{b}{2a},\quad
  y_v = a\,x_v^2 + b\,x_v + c.
  \]
- Para funciones de ingresos/ganancias \(R(x) = -p\,x^2 + q\,x + r\) u \(P(x)=R(x)-C(x)\), el óptimo en \(x^\*\) dado por \(-\tfrac{q}{2p}\).

---

## 3. Personas y Casos de Uso

| Persona                         | Necesidad principal                                                     | Historia de usuario                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Estudiante**                  | Comprobar ejercicios de matemáticas aplicadas.                          | “Como estudiante, quiero introducir \(a,b,c\) y ver raíces y vértice para validar mis cálculos.”       |
| **Analista financiero**         | Optimizar niveles de producción basados en modelo cuadrático de costos. | “Como analista, quiero conocer \(x^\*\) que maximiza el beneficio para ajustar mi plan de producción.” |
| **Investigador de operaciones** | Visualizar el efecto de variaciones en los coeficientes.                | “Como investigador, quiero modificar en tiempo real \(a,b,c\) y ver la gráfica actualizada.”           |

---

## 4. Requisitos

### 4.1 Funcionales

1. **RF1**: Formularios de entrada para coeficientes \(a, b, c\) y selección de tipo de análisis.
2. **RF2**: Cálculo de raíces y vértice al enviar el formulario.
3. **RF3**: Visualización de gráfica interactiva (zoom, tooltip).
4. **RF4**: Cálculo de producción/precio óptimo para funciones de ingresos/ganancias.
5. **RF5**: Descarga de reporte en PDF con resultados y gráfico.
6. **RF6**: Historial de los últimos 10 análisis almacenado en `localStorage`.
7. **RF7**: Validación en tiempo real de inputs (numeros, \(a \neq 0\)).

### 4.2 No Funcionales

- **RNF1**: Tiempo de respuesta < 200 ms para cálculos básicos.
- **RNF2**: 99% de uptime, despliegue en Vercel/Netlify.
- **RNF3**: Compatible con navegadores modernos (Chrome, Firefox, Edge, Safari).
- **RNF4**: Accesibilidad WCAG 2.1 nivel AA.
- **RNF5**: Código modular, documentado y testeable (cobertura > 80%).

---

## 5. Arquitectura de Alto Nivel

```plain
┌─────────┐    HTTPS     ┌──────────────┐    WebSocket    ┌─────────┐
│ Cliente │ ───────────▶ │ Frontend SPA │ ◀──────────────▶│ Server  │
│ (React) │              │ (React + TS) │                 │ (Node.js│
└─────────┘              └──────────────┘                 │+Express)│
                                                          └─────────┘
                 │                                            │
          REST  /│\   ┌───────────┐           Charts.js       │
               ┌─┴──┐ │  API Layer│◀──────────────────────────┘
               │ DB │ │ (compute, │
               │    │ │  history) │
               └────┘ └───────────┘
```
