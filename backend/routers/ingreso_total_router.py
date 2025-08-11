from fastapi import APIRouter, Query
from analisis.analisis_ingreso_total import calcular_ingreso_total
from descargas.desc_ingreso_total import descargar_ingreso_total_csv

router = APIRouter(prefix="/ingreso-total", tags=["Ingreso Total"])

@router.get("/calcular")
def calcular(precio: float = Query(...), cantidad: float = Query(...)):
    resultado = calcular_ingreso_total(precio, cantidad)
    return {"resultado": resultado}

@router.get("/descargar")
def descargar(precio: float = Query(...), cantidad: float = Query(...)):
    file_path = descargar_ingreso_total_csv(precio, cantidad)
    return {"archivo": file_path}
