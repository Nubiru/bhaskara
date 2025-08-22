# Plan Ejecutivo Unificado - MutualMetrics (Frontend, Backend y DevOps)

## Objetivo
Consolidar en un solo roadmap todas las acciones para: mejorar UI/UX y temas, estabilizar y ampliar backend, y estandarizar el entorno full‑stack (Docker/Compose y alternativa local con concurrently).

## Alcance
- Frontend (React Router v7, TS, Tailwind v4, theming tokens)
- Backend (FastAPI, servicios puros y routers claros)
- Contenedores y DX (Docker/Nginx/Uvicorn, Docker Compose, concurrently)
- Calidad (testing, accesibilidad, visual baseline, performance)

---

## Roadmap por Fases

### Fase 1 — Infraestructura de Temas y Accesibilidad (UI/UX)
- [x] Variables CSS temáticas unificadas (`app/styles/themes.css`) con `--color-surface-elevated` y tokens semánticos
- [x] Provider de tema estable aplicando `data-theme` en `<html>` y validación de contraste (`validateThemeContrast`)
- [x] Calentamiento del tema claro (fondos crema/ámbar) y texto claro en tema oscuro (incluye placeholders)
- [x] Documentar guías de contraste y uso de tokens (WCAG 2.1 AA) en docs/design-tokens.md y docs/testing-strategy.md

Entregables: contraste validado, superficies elevadas en paneles, tooltips/popovers coherentes, documentación completa de tokens y estrategia de testing

### Fase 2 — Layout Global y Navegación
- [x] Header y Sidebar tokenizados; marca visible en ambos temas (logo `favicon.png`)
- [x] Gradientes opcionales profesionales en Header/Sidebar (discretos, con AA)
- [x] Estados hover/focus activos en enlaces; indicador claro de sección actual

Entregables: navegación consistente, foco visible, lectura clara en ambos temas, gradientes profesionales implementados, estados de navegación mejorados

### Fase 3 — Formularios y Flujo de Análisis
- [x] BhaskaraForm compacto; inputs `type=text` con `inputMode=decimal` (permite `-` al inicio), sin títulos redundantes
- [x] Revenue/Cost/Profit forms compactados y tokenizados; errores con `--color-error`
- [x] BreakevenForm alineado a tokens y estados visuales

Entregables: formularios concisos, accesibles y consistentes

### Fase 4 — Páginas de Análisis y Contenido Auxiliar
- [x] Bhaskara page con `InfoPopover` en header y paneles elevados
- [x] Revenue/Costs/Profit/Break-even: superficies elevadas, alturas de charts reducidas, lazy loading
- [x] Revisar y reforzar T4.2–T4.5 para ajustes finos de distribución y densidad

Entregables: páginas compactas sin scroll vertical innecesario; popovers en lugar de cajas fijas, formularios completamente implementados y tematizados

### Fase 5 — Gráficas y Utilidades
- [x] Chart components leen tokens; tooltips y grids temáticos
- [x] Utilidad `chartColors.ts` centralizada
- [x] Validación de contraste en utilidades de charts (T5.2)

Entregables: paleta consistente en gráficas y accesibles en ambos temas, validación automática de contraste WCAG 2.1 AA

### Fase 6 — UI Reutilizable y Descargas
- [x] ThemeToggle y LanguageToggle con tokens y transiciones
- [x] LoadingSpinner tematizado con variantes
- [x] Actualizar `DownloadButton` y `FileDownloader` a tokens, estados hover/focus y mensajes de error consistentes

Entregables: componentes base pulidos y coherentes, tokens temáticos implementados, estados de interacción mejorados

### Fase 7 — Páginas Informativas
- [x] About page: tokens, superficies elevadas, grid 2×2 sin scroll
- [x] History page: tokens y paneles coherentes; extender InfoPopover donde aplique

Entregables: información clara, compacta y con la misma identidad visual, grid 2×2 implementado sin scroll

### Fase 8 — Testing, Performance y Calidad
- [x] A11y smoke tests (axe-core) y visual baseline snapshots para rutas clave
- [x] Validar contraste y transiciones entre temas; teclados y lectores de pantalla
- [x] Lazy loading de Chart.js y code splitting por rutas, memoización selectiva

KPIs: cobertura ≥85%, Lighthouse ≥90, bundle <1MB gz, contraste AA, accesibilidad validada, performance optimizada

---

## Fase 9 — Frontend Polish y Mejoras Finales
- [x] Implementar Currency Converter UI completa (backend ya implementado)
- [x] Agregar animaciones de transición suaves entre herramientas
- [x] Implementar lazy loading de herramientas de análisis
- [x] Agregar persistencia de vista seleccionada en localStorage
- [ ] Optimizar responsive design para dispositivos móviles
- [ ] Implementar skeleton loaders para mejor UX durante transiciones

Entregables: UI completamente pulida, transiciones fluidas, experiencia móvil optimizada, Currency Converter y Number Converter completamente funcionales

---

## Backend — Estabilización y Endpoints
- [x] Separación de responsabilidades: `routers/*` y `services/*`
- [x] Bhaskara POST `/analizar/bhaskara` devuelve `FullAnalysisResult` (incluye `coefficients`, `roots.abs` sin decimales en UI)
- [x] Business GET: ingreso, costo total, beneficio, punto de equilibrio
- [x] OpenAPI en `/docs` y CORS configurado
- [x] Limpieza legacy: eliminar `backend/analisis/*`; adaptar descargas a `services/*`
- [ ] Revisar descargas legacy (`desc_*.py`) y unificar en servicios o remover si no se usan

Entregables: API clara, sin importaciones colaterales, contratos estables para frontend

---

## Contenedores y Entorno Local
- [x] Frontend Dockerfile multi-stage → Nginx sirviendo `/build/client`
- [x] Backend Dockerfile (python:3.12-slim) → uvicorn; `requirements.txt` limpio
- [x] Docker Compose: dos servicios, healthcheck backend; `VITE_API_BASE_URL=http://localhost:8000`
- [ ] Script local alternativo con concurrently: `npm run dev:full` (front Vite + backend uvicorn)
  - [ ] Crear `backend/README_backend.md` con venv y sin venv (uvicorn directo) y troubleshooting

### Stack Dockerfile (monorepo opcional)
- [ ] `Dockerfile.stack` con multi-stage que construya frontend y backend en la misma imagen para despliegues simples
- [ ] Target separado para CI (builder) y runtime (nginx + uvicorn via supervisord o s6)

Especificación:
- Stage `frontend-builder`: node:20-alpine, instala deps y `npm run build` en `frontend/` → produce `/app/frontend/build/client`.
- Stage `backend-runtime`: python:3.12-slim, instala `requirements.txt`, copia backend y assets del build de frontend a `/usr/share/nginx/html`.
- Opción A: Multi-container en una imagen con s6/supervisord para `nginx` y `uvicorn` (simple, útil para POCs).
- Opción B (preferida para prod): mantener Compose (dos servicios). `Dockerfile.stack` solo para entornos limitados (Heroku-like).
- Exponer 80 para Nginx, 8000 para Uvicorn (si single-image), o proxy Nginx → Uvicorn en `/api`.

Entregables: dev reproducible con Compose y opción local sin Docker

---

## Tareas Inmediatas (Next 3–5)
1) ✅ **CRITICAL**: Resolver fallos de i18n - claves no traducidas en toda la aplicación
2) ✅ **CRITICAL**: Implementar Landing Page como vista por defecto (no Cost Analysis)
3) ✅ **CRITICAL**: Corregir superposición sidebar/footer para layout consistente
4) ✅ **HIGH**: Optimizar tema claro con colores menos agresivos para la vista
5) ✅ **HIGH**: Asegurar que paneles de resultados muestren mensajes específicos por herramienta
6) ✅ **MEDIUM**: Actualizar metadata del sitio web a 'MutualMetrics' (sin internacionalización)

**TODAS LAS TAREAS CRÍTICAS COMPLETADAS** ✅
**Próximas tareas disponibles:**
- Implementar gradientes opcionales en Header/Sidebar (Fase 2)
- Validación de contraste en charts (Fase 5)
- Actualizar DownloadButton y FileDownloader (Fase 6)

6) ✅ Backend: añadir endpoint de Interés Compuesto y tipos en frontend
7) ✅ Producto: agregar Landing Page (presentación) y Currency Converter

---

## Checklist de Control (marcar al avanzar)
- [x] Documentación de contraste WCAG actualizada
- [x] Gradientes en Header/Sidebar AA
- [x] Navegación con hover/focus consistente
- [x] BreakevenForm tematizado
- [x] Validación contraste en charts
- [x] Download comps tematizados
- [x] About page 2×2 tokenizada
- [x] A11y teclado/lectores verificados
- [x] Code splitting/lazy Chart.js aplicado
- [x] Revenue/Costs/Profit/Break-even forms completamente implementados
- [x] Interés compuesto (API + UI) disponible
- [x] Landing Page implementada y ruta por defecto
- [x] Script `dev:full` funcionando y documentado
- [ ] Descargas legacy revisadas/unificadas
- [ ] `Dockerfile.stack` creado y probado
- [ ] Decisión y unificación de historial (backend/DB vs frontend/local)
- [x] Currency converter implementado y tematizado
- [x] Frontend polish y animaciones implementadas

### Nuevas Tareas Críticas Identificadas
- [x] **CRITICAL**: Resolver fallos de i18n - claves no traducidas en toda la aplicación
- [x] **CRITICAL**: Implementar Landing Page como vista por defecto (no Cost Analysis)
- [x] **CRITICAL**: Corregir superposición sidebar/footer para layout consistente
- [x] **HIGH**: Optimizar tema claro con colores menos agresivos para la vista
- [x] **HIGH**: Asegurar que paneles de resultados muestren mensajes específicos por herramienta

---

## Correcciones Críticas Inmediatas

### 1) Fallos de i18n (CRITICAL)
**Problema**: Numerosas claves de traducción no se resuelven, mostrando texto como `costs.form.title`, `home.sidebar.footer`, etc.
**Causa**: Falta de traducciones en archivos de idioma o uso incorrecto de `t()` en componentes
**Acción**: 
- Identificar sistemáticamente todas las claves no resueltas
- Agregar traducciones faltantes en `public/locales/en.json` y `public/locales/es.json`
- Verificar uso correcto de `t()` en todos los componentes
- Implementar fallbacks para claves faltantes

### 2) Landing Page como Vista por Defecto (CRITICAL)
**Estado**: ✅ COMPLETADO - La landing page está correctamente configurada y funcionando
**Nota**: El routing en `home.tsx` está perfectamente implementado, no hay errores críticos

### 3) Superposición Sidebar/Footer (CRITICAL)
**Estado**: ✅ COMPLETADO - Implementado CSS Grid layout con división clara del eje Y
**Solución**: 
- Cambiado de Flexbox a CSS Grid (`grid grid-rows-[1fr] grid-cols-[200px_1fr]`)
- Sidebar con `overflow-hidden` y `flex-shrink-0` para header/footer
- Contenido principal con `overflow-hidden` y scroll interno
- Root container con `overflow-hidden` para prevenir overlap

### 4) Optimización del Tema Claro (HIGH)
**Estado**: ✅ COMPLETADO - Implementados colores crema/ámbar suaves para confort visual
**Solución**: 
- Cambiado `--color-background` de `#fff8ef` a `#fefbf3` (crema muy suave)
- Ajustado `--color-surface` a `#faf8f0` y `--color-surface-elevated` a `#fefcf7`
- Implementadas transiciones suaves de 300ms con cubic-bezier para mejor UX
- Mantenida conformidad WCAG 2.1 AA con contraste adecuado

### 5) Mensajes de Resultados Específicos por Herramienta (HIGH)
**Estado**: ✅ COMPLETADO - Implementados mensajes específicos y diferenciados por herramienta
**Solución**: 
- Revenue Analysis: Mensajes específicos con traducciones para resultados de ingresos
- Compound Interest: Mensajes específicos con cálculo de tasa de crecimiento
- Todas las herramientas: Uso correcto de `noResultsMessage` y `analyzeButtonMessage` específicos
- i18n keys diferenciadas por herramienta en archivos de traducción

---

## Nuevas Iniciativas Estratégicas

### 1) Interés Compuesto (Composed/Compound Interest)
- Backend: `GET /analisis/interes-compuesto` con params `principal`, `rate`, `times_per_year`, `years`, `contributions?`, `contrib_frequency?`.
- Servicios: función pura en `services/business_service.py` con validaciones.
- Frontend: formulario `CompoundInterestForm.tsx`, gráfica de crecimiento y desglose de aportes.
- Tipos e i18n actualizados; tests unitarios.

Detalles técnicos:
- Fórmula base: `A = P * (1 + r/n)^(n*t) + contrib * F(contrib_frequency, r, n, t)`; considerar series de aportes (anual, mensual).
- Entradas: `principal (>=0)`, `rate (0..1)`, `times_per_year (1,2,4,12,365)`, `years (>0)`, `contributions (>=0)`, `contrib_frequency (mensual/anual)`.
- Salidas: `finalAmount`, `totalContributions`, `interestEarned`, `schedule[]` para gráficos y tablas.
- Aceptación: validación de parámetros, errores claros, contrato versionado en OpenAPI; tests con casos límite.

### 2) Unificación del Historial de Análisis
- Decisión: migrar a backend como autoridad (persistencia futura), frontend mantiene cache local.
- API: `GET/POST /historial` con esquemas; storage temporal en memoria (fase 1), DB futura (fase 2).
- Frontend: `useLocalHistory` adapta a modo híbrido; feature flag para fallback puro local.

Detalles técnicos:
- Esquema `AnalysisRecord { id, type, payload, createdAt, meta }`, `type in ['bhaskara','revenue','cost','profit','breakeven','compound']`.
- Fase 1: almacenamiento en proceso (dict) con TTL opcional; Fase 2: persistencia SQLite/Postgres.
- Resolución de conflictos: el frontend envía registros con `clientId`; backend devuelve `serverId` y reconcilia.
- Aceptación: endpoints documentados en OpenAPI; pruebas de sincronización y fallback cuando backend no está disponible.

### 3) Landing Page (Presentación)
- Nueva ruta `/` con hero, valor, features, CTA a análisis; no Bhaskara por defecto.
- Header/Sidebar visibles con estado activo correcto; tema aplicado y sin scroll vertical.

Detalles técnicos:
- Componente `routes/landing.tsx` con secciones hero, features (cards con tokens), testimonios (opcional), CTA a `/analysis/bhaskara`.
- SEO básico: `<title>`, `<meta name=description>`, imágenes optimizadas, accesibilidad AA.
- Aceptación: LCP < 2.0s, CLS < 0.1, contraste AA, sin scroll innecesario.

### 4) Currency Converter
- Servicio público de tipos de cambio o tabla fija diaria (feature flag para online/offline).
- Frontend: `CurrencyConverter.tsx` con selección de monedas, tasas y resultado; tokens y accesibilidad.
- Backend: endpoint opcional `/util/convertir-moneda?from&to&amount` con proveedor configurable.

Detalles técnicos:
- Provider interface en backend: `get_rate(from,to) -> float`; implementación simple `ECB`/mock.
- Cache TTL (p.ej. 12h) y fallback offline con tabla básica.
- Frontend: listas de monedas, validación de cantidad, formato local; i18n de símbolos.
- Aceptación: exactitud dentro de tolerancia, errores manejados (sin conexión), contraste AA en UI.


---

## Notas de Calidad (según code-standard.md)
- Un cambio por commit/PR; historia lineal (rebase); sin breadcrumbs
- Actualizar README como fuente única de comandos (Docker y local)
- Mantener headers de archivo y fechas; tipos estrictos; tests incluidos