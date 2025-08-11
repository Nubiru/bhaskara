from fastapi import APIRouter, Query
from analisis.analisis_bhaskara import calcular_bhaskara
#El coódigo en analisis_bahaskara.py es el mismo que en bhaskara.py

from descargas.desc_bhaskara import descargar_bhaskara_csv

router = APIRouter(prefix="/bhaskara", tags=["Bhaskara"])

@router.get("/calcular")
def calcular(a: float = Query(...), b: float = Query(...), c: float = Query(...)):
    resultado = calcular_bhaskara(a, b, c)
    return {"resultado": resultado}

@router.get("/descargar")
def descargar(a: float = Query(...), b: float = Query(...), c: float = Query(...)):
    file_path = descargar_bhaskara_csv(a, b, c)
    return {"archivo": file_path}
