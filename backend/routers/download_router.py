# -*- coding: utf-8 -*-
"""
@fileoverview Rutas de descarga unificadas (CSV/Excel/PDF) para análisis de negocio.
@version 1.0.0
@since 2025-08-13
@lastModified 2025-08-13

Responsabilidad
- Ofrecer endpoints /descargar/* generando archivos desde servicios puros.
- Evitar dependencias legacy en backend/descargas/*.
"""

from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from io import StringIO
import csv

from services.business_service import (
    calcular_ingreso_total,
    calcular_costo_total,
    calcular_beneficio,
    calcular_punto_equilibrio,
)


router = APIRouter()


def _csv_response(headers: list[str], row: list):
    buffer = StringIO()
    writer = csv.writer(buffer)
    writer.writerow(headers)
    writer.writerow(row)
    buffer.seek(0)
    return StreamingResponse(iter([buffer.getvalue()]), media_type="text/csv")


@router.get("/descargar/ingreso-total")
def descargar_ingreso_total_csv(
    precio: float = Query(...), cantidad: float = Query(...), format: str = Query("csv")
):
    ingreso = calcular_ingreso_total(precio, cantidad)
    return _csv_response(["Precio Unitario", "Cantidad", "Ingreso Total"], [precio, cantidad, ingreso])


@router.get("/descargar/costo-total")
def descargar_costo_total_csv(
    costos_fijos: float = Query(...), costos_variables: float = Query(...), cantidad: float = Query(...), format: str = Query("csv")
):
    costo_total = calcular_costo_total(costos_fijos, costos_variables, cantidad)
    return _csv_response(
        ["Costos Fijos", "Costos Variables", "Cantidad", "Costo Total"],
        [costos_fijos, costos_variables, cantidad, costo_total],
    )


@router.get("/descargar/beneficio")
def descargar_beneficio_csv(
    ingreso_total: float = Query(...), costo_total: float = Query(...), format: str = Query("csv")
):
    beneficio = calcular_beneficio(ingreso_total, costo_total)
    return _csv_response(["Ingreso Total", "Costo Total", "Beneficio"], [ingreso_total, costo_total, beneficio])


@router.get("/descargar/punto-equilibrio")
def descargar_punto_equilibrio_csv(
    costos_fijos: float = Query(...), precio: float = Query(...), costo_variable_unitario: float = Query(...), format: str = Query("csv")
):
    resultado = calcular_punto_equilibrio(costos_fijos, precio, costo_variable_unitario)
    return _csv_response(
        ["Costos Fijos", "Precio", "Costo Variable U.", "Punto Equilibrio (Unidades)", "Punto Equilibrio (Ingresos)"],
        [costos_fijos, precio, costo_variable_unitario, resultado["unidades"], resultado["ingresos"]],
    )


