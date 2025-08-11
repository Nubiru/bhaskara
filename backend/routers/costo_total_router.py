from fastapi import APIRouter, Query
from analisis.analisis_costo_total import calcular_costo_total

router = APIRouter()

@router.get("/costo_total")
def get_costo_total(costo_fijo: float = Query(...), costo_variable_unitario: float = Query(...), cantidad: int = Query(...)):
    """
    Calcula el costo total como costo fijo + (costo variable unitario * cantidad).
    """
    return {"total": calcular_costo_total(costo_fijo, costo_variable_unitario, cantidad)}
