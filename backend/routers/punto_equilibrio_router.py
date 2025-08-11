from fastapi import APIRouter, Query
from analisis.analisis_equilibrio import calcular_punto_equilibrio
from descargas.desc_punto_equilibrio import descargar_punto_equilibrio_csv

router = APIRouter(prefix="/punto-equilibrio", tags=["Punto de Equilibrio"])

@router.get("/calcular")
def calcular(costo_fijo: float = Query(...), precio: float = Query(...), costo_variable: float = Query(...)):
    resultado = calcular_punto_equilibrio(costo_fijo, precio, costo_variable)
    return {"resultado": resultado}

@router.get("/descargar")
def descargar(costo_fijo: float = Query(...), precio: float = Query(...), costo_variable: float = Query(...)):
    file_path = descargar_punto_equilibrio_csv(costo_fijo, precio, costo_variable)
    return {"archivo": file_path}

