# -*- coding: utf-8 -*-
"""
@fileoverview Utilidad para configurar/ajustar el esquema OpenAPI.
@version 1.0.0
@since 2025-08-12
@lastModified 2025-08-12

Responsabilidad
- Generar la descripción de OpenAPI y permitir futuras extensiones
"""

from fastapi import FastAPI


def configure_openapi(app: FastAPI) -> None:
    """Hook para ajustar metadatos OpenAPI si fuese necesario."""
    openapi_schema = app.openapi()
    app.openapi_schema = openapi_schema


