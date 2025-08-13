# Entorno - Variables y Configuración

Crea un archivo `.env.local` en `frontend/` con las siguientes variables. No commitees `.env.local`.

## Variables requeridas
```
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
```

## Flags opcionales
```
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DOWNLOADS=true
VITE_DEBUG_MODE=false
```

## Integraciones opcionales
```
VITE_GA_TRACKING_ID=
VITE_SENTRY_DSN=
```

Notas:
- Reinicia el dev server tras cambios en `.env.local`.
- Nunca expongas secretos reales en el repo.

