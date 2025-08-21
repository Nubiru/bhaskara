# Deployment y Runbook (Frontend)

## Entornos
- Desarrollo local: `npm run dev` (frontend), `uvicorn main:app --reload` (backend)
- Contenedores separados (recomendado): `docker compose up --build`
- Stack unificado (POC/demo): `docker compose -f docker-compose.stack.yml up --build`
- Producción: imágenes Docker y orquestación (compose/K8s)

## Build
- Frontend: `npm ci && npm run build`
- Backend: `pip install -r requirements.txt`
- Contenedores separados: `docker compose build`
- Stack unificado: `docker build -f Dockerfile.stack -t mutualmetrics:stack .`

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

## Stack Unificado (Dockerfile.stack)

### Uso
```bash
# Construir e iniciar
docker compose -f docker-compose.stack.yml up --build

# Solo construir
docker build -f Dockerfile.stack -t mutualmetrics:stack .
```

### Ventajas
- Una sola imagen para frontend y backend
- Ideal para POCs, demos y entornos limitados
- s6-overlay gestiona nginx y uvicorn simultáneamente

### Consideraciones
- Frontend accede al backend via `/api/*` (proxy Nginx)
- Variables de entorno: `VITE_API_BASE_URL=http://localhost/api`
- Health check en puerto 8000 (backend directo)
