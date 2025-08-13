# -*- coding: utf-8 -*-
"""
@fileoverview Servicios de cálculo para módulos de negocio (ingresos, costos, beneficio, punto de equilibrio).
@version 1.0.0
@since 2025-08-12
@lastModified 2025-08-12

Responsabilidad
- Proveer funciones puras de cálculo usadas por los routers de API
"""

from typing import Dict, Any, Optional


def calcular_ingreso_total(precio: float, cantidad: float) -> Dict[str, Any]:
    ingreso_total = precio * cantidad
    # Se podrían agregar proyecciones básicas (mock) para la UI
    proyecciones = []
    return {"ingresoTotal": ingreso_total, "proyecciones": proyecciones}


def calcular_costo_total(
    costos_fijos: float, costos_variables: float, cantidad: Optional[float] = None
) -> Dict[str, Any]:
    if cantidad is not None:
        costo_total = costos_fijos + (costos_variables * cantidad)
    else:
        costo_total = costos_fijos + costos_variables
    breakdown: Dict[str, float] = {
        "costosFijos": float(costos_fijos),
        "costosVariables": float(costos_variables if cantidad is None else costos_variables * cantidad),
    }
    return {"costoTotal": costo_total, "breakdown": breakdown}


def calcular_beneficio(ingreso_total: float, costo_total: float) -> Dict[str, Any]:
    beneficio = ingreso_total - costo_total
    margen = 0.0 if ingreso_total == 0 else beneficio / ingreso_total
    return {"beneficioNeto": beneficio, "margen": margen}


def calcular_punto_equilibrio(costos_fijos: float, precio: float, costo_variable_unitario: float) -> Dict[str, Any]:
    if precio <= costo_variable_unitario:
        return {
            "puntoEquilibrio": None,
            "analisisSensibilidad": {"error": "precio <= costo variable"},
        }
    punto = costos_fijos / (precio - costo_variable_unitario)
    return {"puntoEquilibrio": punto, "analisisSensibilidad": {}}


