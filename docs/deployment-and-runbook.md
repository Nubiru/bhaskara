# Deployment y Runbook (Frontend)

## Entornos
- Desarrollo local: `npm run dev` (frontend), `uvicorn main:app --reload` (backend)
- Contenedores (recomendado): `docker compose up --build`
- Producción: imágenes Docker y orquestación (compose/K8s)

## Build
- Frontend: `npm ci && npm run build`
- Backend: `pip install -r requirements.txt`
- Contenedores: `docker compose build`

## Variables
- Ver docs/env.md

## Artefactos
- frontend/dist/ generado por Vite

## Cache
- Hash de contenido e invalidación por despliegue

## Rollback
- Conservar últimos 2 artefactos y apuntar hosting al anterior

## Salud
- Verificar /health del backend antes de promover a prod
- En compose: healthcheck incluido en servicio backend

## Incidencias comunes
- SPA 404: habilitar fallback a index.html en el host
- CORS: revisar VITE_API_BASE_URL y CORS backend
- Variables: Vite inyecta en build; runtime env no aplica
- Compose: si puertos ocupados, ajustar `5173:5173` o `8000:8000`

## Procedimiento repetible para cambios

### Cambios solo Frontend (React/TSX/CSS)
1. Reconstruir imagen: `docker compose build frontend`
2. Reiniciar servicio: `docker compose up -d frontend`
3. Hard refresh del navegador (Ctrl+F5). Si persisten assets viejos: `docker compose build --no-cache frontend` y repetir paso 2.

Alternativa rápida (desarrollo): ejecutar localmente `npm run dev` apuntando a `VITE_API_BASE_URL=http://localhost:8000`, manteniendo backend en Docker.

### Cambios solo Backend (FastAPI)
1. Reconstruir imagen: `docker compose build backend`
2. Reiniciar servicio: `docker compose up -d backend`

### Cambios en ambos
1. `docker compose up --build -d`
2. Hard refresh del navegador.

### Activos estáticos obsoletos
- Si Nginx sigue sirviendo el bundle anterior: `docker compose build --no-cache frontend && docker compose up -d frontend` y limpiar caché del navegador.
