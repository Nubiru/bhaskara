from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from models import CoeficientesCuadraticos, VariablesEconomicas
from services import *
import json

app = FastAPI()

@app.post("/analizar/bhaskara")
def resolver_ecuacion(data: CoeficientesCuadraticos):
    return calcular_bhaskara(data.a, data.b, data.c)

@app.post("/analizar/economia")
def analizar_economia(data: VariablesEconomicas):
    it = ingreso_total(data.precio, data.cantidad)
    ct = costo_total(data.costo_fijo, data.costo_variable_unitario, data.cantidad)
    b = beneficio(it, ct)
    pe = punto_equilibrio(data.precio, data.costo_variable_unitario, data.costo_fijo)

    return {
        "ingreso_total": it,
        "costo_total": ct,
        "beneficio": b,
        "punto_equilibrio": pe
    }

@app.post("/descargar/analisis")
def descargar_resultado(data: VariablesEconomicas):
    it = ingreso_total(data.precio, data.cantidad)
    ct = costo_total(data.costo_fijo, data.costo_variable_unitario, data.cantidad)
    b = beneficio(it, ct)
    pe = punto_equilibrio(data.precio, data.costo_variable_unitario, data.costo_fijo)

    resultado = {
        "ingreso_total": it,
        "costo_total": ct,
        "beneficio": b,
        "punto_equilibrio": pe
    }

    # Guardar en archivo
    with open("resultado.json", "w") as f:
        json.dump(resultado, f, indent=4)

    return FileResponse("resultado.json", media_type='application/json', filename="resultado.json")
