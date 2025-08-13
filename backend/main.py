"""
@fileoverview Punto de entrada FastAPI. Solo inicializa la app, CORS y registra routers.
@version 1.0.0
@since 2025-08-12
@lastModified 2025-08-12

No incluir lógica de negocio ni handlers completos aquí.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import APP_NAME, APP_VERSION, ALLOWED_ORIGINS
from routers.health_router import router as health_router
from routers.api_router import router as api_router
from openapi import configure_openapi


app = FastAPI(title=APP_NAME, version=APP_VERSION)

# CORS for local Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)
app.include_router(api_router)

# Configurar OpenAPI (ruta por defecto /docs y /openapi.json habilitadas)
configure_openapi(app)


