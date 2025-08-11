# app/analisis/analisis_costo_total.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/analisis/costo_total", tags=["Costo Total"])

class CostoTotalRequest(BaseModel):
    costo_fijo: float
    costo_variable_unitario: float
    cantidad: float

@router.post("/")
def calcular_costo_total(data: CostoTotalRequest):
    costo_total = data.costo_fijo + (data.costo_variable_unitario * data.cantidad)
    return {
        "costo_fijo": data.costo_fijo,
        "costo_variable_unitario": data.costo_variable_unitario,
        "cantidad": data.cantidad,
        "costo_total": costo_total
    }
