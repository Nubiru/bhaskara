# app/analisis/analisis_punto_equilibrio.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/analisis/analisis_equilibrio", tags=["Punto de Equilibrio"])

class PuntoEquilibrioRequest(BaseModel):
    costo_fijo: float
    precio_unitario: float
    costo_variable_unitario: float

@router.post("/")
def calcular_punto_equilibrio(data: PuntoEquilibrioRequest):
    if data.precio_unitario <= data.costo_variable_unitario:
        return {"error": "El precio unitario debe ser mayor que el costo variable unitario"}
    punto_equilibrio = data.costo_fijo / (data.precio_unitario - data.costo_variable_unitario)
    return {
        "costo_fijo": data.costo_fijo,
        "precio_unitario": data.precio_unitario,
        "costo_variable_unitario": data.costo_variable_unitario,
        "punto_equilibrio": punto_equilibrio
    }
