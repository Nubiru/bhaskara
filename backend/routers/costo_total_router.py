from fastapi import APIRouter, Query
from analisis.analisis_costo_total import calcular_costo_total
from descargas.desc_costo_total import descargar_costo_total_csv

router = APIRouter(prefix="/costo-total", tags=["Costo Total"])

@router.get("/calcular")
def calcular(costo_fijo: float = Query(...), costo_variable: float = Query(...), cantidad: float = Query(...)):
    resultado = calcular_costo_total(costo_fijo, costo_variable, cantidad)
    return {"resultado": resultado}

@router.get("/descargar")
def descargar(costo_fijo: float = Query(...), costo_variable: float = Query(...), cantidad: float = Query(...)):
    file_path = descargar_costo_total_csv(costo_fijo, costo_variable, cantidad)
    return {"archivo": file_path}
