from fastapi import APIRouter, Query
from analisis.analisis_beneficio import calcular_beneficio

router = APIRouter()

@router.get("/beneficio")
def get_beneficio(precio: float = Query(...), cantidad: int = Query(...), costo_fijo: float = Query(...), costo_variable_unitario: float = Query(...)):
    """
    Calcula el beneficio como ingreso total - costo total.
    """
    return {"beneficio": calcular_beneficio(precio, cantidad, costo_fijo, costo_variable_unitario)}
