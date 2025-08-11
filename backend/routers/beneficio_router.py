from fastapi import APIRouter, Query
from analisis.analisis_beneficio import calcular_beneficio
from descargas.desc_beneficio import descargar_beneficio_csv

router = APIRouter(prefix="/beneficio", tags=["Beneficio"])

@router.get("/calcular")
def calcular(ingreso_total: float = Query(...), costo_total: float = Query(...)):
    resultado = calcular_beneficio(ingreso_total, costo_total)
    return {"resultado": resultado}

@router.get("/descargar")
def descargar(ingreso_total: float = Query(...), costo_total: float = Query(...)):
    file_path = descargar_beneficio_csv(ingreso_total, costo_total)
    return {"archivo": file_path}
