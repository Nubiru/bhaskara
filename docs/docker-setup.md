# 🐳 Docker Setup Guide - MutualMetrics

**Guía completa para ejecutar MutualMetrics con Docker**

## 📋 Opciones de Despliegue

MutualMetrics ofrece dos enfoques de Docker para diferentes necesidades:

### 🚀 Opción 1: Servicios Separados (Recomendado)
- **Ideal para**: Desarrollo, debugging, producción
- **Ventajas**: Separación clara, debugging independiente, escalabilidad
- **Comando**: `docker compose up --build`

### 🎯 Opción 2: Stack Unificado
- **Ideal para**: POCs, demos, entornos con recursos limitados
- **Ventajas**: Una sola imagen, despliegue simple, recursos compartidos
- **Comando**: `docker compose -f docker-compose.stack.yml up --build`

## 🛠️ Configuración de Servicios Separados

### Estructura
```
docker-compose.yml
├── frontend/          # React SPA + Nginx
└── backend/           # FastAPI + Uvicorn
```

### Comandos
```bash
# Construir e iniciar
docker compose up --build

# Solo backend
docker compose up backend

# Solo frontend
docker compose up frontend

# En segundo plano
docker compose up -d

# Ver logs
docker compose logs -f

# Parar servicios
docker compose down
```

### Accesos
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🎯 Configuración de Stack Unificado

### Estructura
```
Dockerfile.stack
docker-compose.stack.yml
docker/
├── nginx.conf
├── default.conf
└── s6-rc.d/
    ├── nginx/
    ├── uvicorn/
    └── user/
```

### Comandos
```bash
# Opción 1: Construir imagen stack (recomendado para POCs)
docker build -f Dockerfile.stack -t mutualmetrics:stack .

# Opción 2: Construir e iniciar stack via compose
docker compose -f docker-compose.stack.yml up --build

# Opción 3: Ejecutar imagen stack ya construida
docker run -p 80:80 -p 8000:8000 mutualmetrics:stack
```

### Accesos
- **Frontend**: http://localhost (puerto 80)
- **Backend Directo**: http://localhost:8000
- **Backend via Proxy**: http://localhost/api
- **API Docs**: http://localhost/api/docs

## 🔧 Configuración de Nginx

### Proxy API
El stack unificado usa Nginx para:
- Servir archivos estáticos del frontend
- Proxy `/api/*` → backend uvicorn
- Headers de seguridad
- Compresión gzip
- Cache de assets estáticos

### Configuración
```nginx
# API proxy
location /api/ {
    proxy_pass http://127.0.0.1:8000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## 📊 Gestión de Procesos (s6-overlay)

### Servicios
- **nginx**: Servidor web para frontend
- **uvicorn**: Backend FastAPI
- **s6-overlay**: Orquestador de procesos

### Health Checks
```bash
# Verificar estado
curl http://localhost:8000/health

# Logs del contenedor
docker logs <container_id>
```

## 🚨 Troubleshooting

### Problemas Comunes

#### Frontend no carga
```bash
# Verificar logs
docker compose logs frontend

# Reconstruir
docker compose build frontend
```

#### Backend no responde
```bash
# Verificar health check
curl http://localhost:8000/health

# Ver logs
docker compose logs backend
```

#### Puerto ocupado
```bash
# Ver puertos en uso
netstat -tulpn | grep :80
netstat -tulpn | grep :8000

# Cambiar puertos en docker-compose.yml
```

### Logs y Debugging
```bash
# Logs en tiempo real
docker compose logs -f [service]

# Entrar al contenedor
docker compose exec [service] sh

# Ver procesos
docker compose exec [service] ps aux
```

## 🔒 Seguridad

### Usuario no-root
- Ambos enfoques usan usuario `appuser` (UID 1000)
- Nginx y uvicorn corren sin privilegios
- Volúmenes montados con permisos apropiados

### Headers de Seguridad
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 📈 Performance

### Optimizaciones
- **Multi-stage builds**: Reduce tamaño de imagen final
- **Gzip compression**: Para assets estáticos y API responses
- **Cache headers**: Assets estáticos con cache largo
- **Worker processes**: Nginx optimizado para concurrencia

### Métricas Esperadas
- **Startup time**: 5-10 segundos
- **Memory usage**: ~200MB total
- **Response time**: <100ms para API, <50ms para frontend

## 🚀 Despliegue en Producción

### Recomendación
- **Desarrollo**: Servicios separados para debugging
- **Staging**: Servicios separados para testing
- **Producción**: Servicios separados para escalabilidad
- **POC/Demo**: Stack unificado para simplicidad

### Variables de Entorno
```bash
# Backend
PYTHONPATH=/app/backend
VITE_API_BASE_URL=http://localhost/api

# Frontend (stack unificado)
VITE_API_BASE_URL=http://localhost/api
```

## 📚 Referencias

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [s6-overlay](https://github.com/just-containers/s6-overlay)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
