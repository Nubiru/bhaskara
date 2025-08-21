# -*- coding: utf-8 -*-
"""
@fileoverview Router principal de API pública (análisis y negocio).
@version 1.1.0
@since 2025-08-21
@lastModified 2025-08-21

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
    calcular_interes_compuesto,
)

router = APIRouter()


# Envoltorio estándar
def ok(data):
    return {"success": True, "data": data, "error": None}


class BhaskaraBody(BaseModel):
    coefficients: dict
    mode: Optional[str] = "full"
    description: Optional[str] = None


class CompoundInterestBody(BaseModel):
    principal: float
    tasa_anual: float
    frecuencia_anual: int
    años: float
    contribuciones: Optional[float] = None
    frecuencia_contribucion: Optional[str] = None
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


@router.post("/analisis/interes-compuesto")
def analisis_interes_compuesto(body: CompoundInterestBody):
    """
    Calcula el interés compuesto con o sin contribuciones regulares.
    
    Args:
        principal: Capital inicial (>= 0)
        tasa_anual: Tasa de interés anual como decimal (0.05 = 5%)
        frecuencia_anual: Veces por año que se capitaliza (1, 2, 4, 12, 365)
        años: Tiempo de inversión en años (> 0)
        contribuciones: Contribución regular por período (>= 0, opcional)
        frecuencia_contribucion: 'mensual' o 'anual' (opcional)
    
    Returns:
        Resultado del cálculo con desglose completo
    """
    try:
        resultado = calcular_interes_compuesto(
            principal=body.principal,
            tasa_anual=body.tasa_anual,
            frecuencia_anual=body.frecuencia_anual,
            años=body.años,
            contribuciones=body.contribuciones,
            frecuencia_contribucion=body.frecuencia_contribucion
        )
        return ok(resultado)
    except ValueError as e:
        return {"success": False, "data": None, "error": str(e)}
    except Exception as e:
        return {"success": False, "data": None, "error": f"Error interno: {str(e)}"}


