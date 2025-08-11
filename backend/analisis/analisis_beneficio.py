# app/analisis/analisis_beneficio.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/analisis/beneficio", tags=["Beneficio"])

class BeneficioRequest(BaseModel):
    ingreso_total: float
    costo_total: float

@router.post("/")
def calcular_beneficio(data: BeneficioRequest):
    beneficio = data.ingreso_total - data.costo_total
    return {
        "ingreso_total": data.ingreso_total,
        "costo_total": data.costo_total,
        "beneficio": beneficio
    }
