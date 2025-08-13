# -*- coding: utf-8 -*-
"""
@fileoverview Router principal de API pública (análisis y negocio).
@version 1.0.0
@since 2025-08-12
@lastModified 2025-08-12

Responsabilidad
- Exponer endpoints consumidos por el frontend (Bhaskara y Business Analytics)
- No incluir lógica de negocio; delegar a servicios en `services/`
"""

from typing import Optional
from fastapi import APIRouter, Query
from pydantic import BaseModel

from services.math_service import calcular_bhaskara_full
from services.business_service import (
    calcular_ingreso_total,
    calcular_costo_total,
    calcular_beneficio,
    calcular_punto_equilibrio,
)

router = APIRouter()


# Envoltorio estándar
def ok(data):
    return {"success": True, "data": data, "error": None}


class BhaskaraBody(BaseModel):
    coefficients: dict
    mode: Optional[str] = "full"
    description: Optional[str] = None


@router.post("/analizar/bhaskara")
def analizar_bhaskara(body: BhaskaraBody):
    return ok(calcular_bhaskara_full(body))


@router.get("/analisis/ingreso-total")
def analisis_ingreso_total(
    precio: float = Query(...), cantidad: float = Query(...), description: Optional[str] = None
):
    return ok(calcular_ingreso_total(precio, cantidad))


@router.get("/analisis/costo-total")
def analisis_costo_total(
    costos_fijos: float = Query(...),
    costos_variables: float = Query(...),
    cantidad: Optional[float] = Query(None),
    description: Optional[str] = None,
):
    return ok(calcular_costo_total(costos_fijos, costos_variables, cantidad))


@router.get("/analisis/beneficio")
def analisis_beneficio(
    ingreso_total: float = Query(...), costo_total: float = Query(...), description: Optional[str] = None
):
    return ok(calcular_beneficio(ingreso_total, costo_total))


@router.get("/analisis/punto-equilibrio")
def analisis_punto_equilibrio(
    costos_fijos: float = Query(...),
    precio: float = Query(...),
    costo_variable_unitario: float = Query(...),
    description: Optional[str] = None,
):
    return ok(calcular_punto_equilibrio(costos_fijos, precio, costo_variable_unitario))


