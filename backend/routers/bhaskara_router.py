from fastapi import APIRouter, Query
from analisis import calcular_bhaskara

router = APIRouter()

@router.get("/bhaskara")
def get_bhaskara(a: float = Query(...), b: float = Query(...), c: float = Query(...)):
    """
    Calcula las raíces de una ecuación cuadrática usando la fórmula de Bhaskara.
    """
    return calcular_bhaskara(a, b, c)
