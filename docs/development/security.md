# Seguridad y Privacidad

## Principios
- TLS (prod), CORS restringido, sin PII por defecto
- localStorage solo para preferencias e historial local

## Controles
- XSS: Validación (Zod) y sanitización (DOMPurify)
- CSP: Política estricta en hosting/CDN
- Rate limiting: en backend
- Dependencias: auditorías en CI

## Threat model (STRIDE)
- Spoofing: tokens (futuro si hay auth)
- Tampering: HTTPS + integridad de assets
- Repudiation: X-Request-Id y logs en backend
- Info Disclosure: minimizar telemetry; sin PII
- DoS: rate limiting
- Elevation: rutas públicas sin privilegios

## Telemetría
- Opt-in. Retención sugerida ≤ 30 días

## Responsabilidades
- Frontend: no secretos, manejar errores sin stack traces en UI
- Backend: validaciones, RL, logging seguro
