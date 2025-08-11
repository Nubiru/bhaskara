from fastapi import APIRouter, Query
from analisis.analisis_equilibrio import calcular_punto_equilibrio

router = APIRouter()

@router.get("/punto_equilibrio")
def get_punto_equilibrio(costo_fijo: float = Query(...), precio_unitario: float = Query(...), costo_variable_unitario: float = Query(...)):
    """
    Calcula el punto de equilibrio en unidades.
    """
    return {"punto_equilibrio": calcular_punto_equilibrio(costo_fijo, precio_unitario, costo_variable_unitario)}
