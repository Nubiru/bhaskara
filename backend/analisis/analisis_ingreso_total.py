# app/analisis/analisis_ingreso_total.py
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter(prefix="/analisis/ingreso_total", tags=["Ingreso Total"])

class IngresoTotalRequest(BaseModel):
    precio: float
    cantidad: float

@router.post("/")
def calcular_ingreso_total(data: IngresoTotalRequest):
    ingreso_total = data.precio * data.cantidad
    return {
        "precio": data.precio,
        "cantidad": data.cantidad,
        "ingreso_total": ingreso_total
    }
