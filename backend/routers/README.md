"""
@fileoverview Guía de routers activos.

Estructura actual (refactorizada):
- main.py → inicializa FastAPI/CORS/OpenAPI y registra routers
- routers/health_router.py → `/health`
- routers/api_router.py → Endpoints consumidos por el frontend
- services/ → Lógica de negocio (math_service.py, business_service.py)

Nota: Se eliminaron routers legacy individuales para evitar importaciones colaterales.

Reiniciacion: 

.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
"""
