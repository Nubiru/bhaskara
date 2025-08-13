# Observabilidad (Frontend)

## Error tracking
- Sentry recomendado (VITE_SENTRY_DSN)
- Error Boundaries + contexto

## Performance
- Lighthouse CI ≥ 90
- Core Web Vitals: FCP < 1.5s, LCP < 2.5s, CLS < 0.1, FID < 100ms

## Logging
- Evitar logs ruidosos en prod
- Propagar X-Request-Id cuando esté disponible

## Health
- Comprobar /health backend y mostrar feedback al usuario cuando aplique
