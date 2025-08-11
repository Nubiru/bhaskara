from fastapi import APIRouter, Query
from analisis.analisis_ingreso_total import calcular_ingreso_total

router = APIRouter()

@router.get("/ingreso_total")
def get_ingreso_total(precio: float = Query(...), cantidad: int = Query(...)):
    """
    Calcula el ingreso total como precio * cantidad.
    """
    return {"total": calcular_ingreso_total(precio, cantidad)}
