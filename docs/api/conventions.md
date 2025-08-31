# API Conventions & Architecture

## Base URLs

### Containerized Deployment
- **Frontend**: `http://localhost`
- **Backend API**: `http://localhost/api` (via Nginx proxy)
- **API Docs**: `http://localhost/api/docs`

### Local Development
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8081` (direct access)

## API Structure

### Endpoint Pattern
- **Mathematical Tools**: `/api/math/{tool}`
- **Business Analytics**: `/api/business/{type}`
- **Financial Tools**: `/api/finance/{tool}`
- **Downloads**: `/api/download/{type}`
- **Health Check**: `/api/health`

### Request/Response Standards
- Base URL configurable vía `VITE_API_BASE_URL`
- Preferir JSON (`application/json; charset=utf-8`)
- Cálculos con cuerpo → usar POST; evitar sobrecargar GET
- Incluir `clientVersion` y opcional `X-Request-Id`
- Envoltorio estándar de respuesta: `{ success, data, error }`

### HTTP Status Mapping
- 400: entrada inválida
- 404: no encontrado
- 429: rate limit
- 500: interno
- 503: no disponible

### Data Standards
- `/health` retorna `{ status, uptime, version }`
- Descargas por `Accept` y `Content-Disposition`
- El servidor retorna datos numéricos; la localización/i18n es responsabilidad del cliente

## Nginx Proxy Configuration

The containerized stack uses Nginx to proxy API requests:
```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8081/;
}
```

This means:
- Frontend calls: `http://localhost/api/analizar/bhaskara`
- Nginx forwards to: `http://127.0.0.1:8081/analizar/bhaskara` (inside container)
- Backend processes and returns response
- Nginx forwards response back to frontend
