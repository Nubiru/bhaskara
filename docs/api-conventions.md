# Convenciones de API

- Base URL configurable vía `VITE_API_BASE_URL`
- Preferir JSON (`application/json; charset=utf-8`)
- Cálculos con cuerpo → usar POST; evitar sobrecargar GET
- Incluir `clientVersion` y opcional `X-Request-Id`
- Envoltorio estándar de respuesta: `{ success, data, error }`
- HTTP mapping: 400 entrada inválida, 404 no encontrado, 429 rate limit, 500 interno, 503 no disponible
- `/health` retorna `{ status, uptime, version }`
- Descargas por `Accept` y `Content-Disposition`
- El servidor retorna datos numéricos; la localización/i18n es responsabilidad del cliente
