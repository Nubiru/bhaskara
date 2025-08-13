# -*- coding: utf-8 -*-
"""
@fileoverview Router de endpoints de salud y estado del backend.
@version 1.0.0
@since 2025-08-12
@lastModified 2025-08-12

Responsabilidad
- Exponer `/health` con estado básico de la aplicación.
"""

from fastapi import APIRouter
from config import APP_VERSION

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok", "uptime": 0, "version": APP_VERSION}


