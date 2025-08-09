from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
import io

from bhaskara import calcular_bhaskara
from bhaskara.backend.analisis.analisis_ingreso_total import calcular_ingreso_total
from bhaskara.backend.analisis.analisis_costo_total import calcular_costo_total
from analisis.analisis_beneficio import calcular_beneficio
from analisis.analisis_equilibrio import calcular_punto_equilibrio

from descargas.desc_ingreso_total import descargar_ingreso_total

app = FastAPI(title="Funciones Cuadráticas y Economía")

# ---------- BHASKARA ----------
@app.get("/bhaskara/")
def resolver_bhaskara(a: float, b: float, c: float):
    return calcular_bhaskara(a, b, c)

# ---------- ANÁLISIS ----------
@app.get("/analisis/ingreso_total/")
def analisis_ingreso_total(precio_unitario: float, cantidad: float):
    return {"ingreso_total": calcular_ingreso_total(precio_unitario, cantidad)}

@app.get("/analisis/costo_total/")
def analisis_costo_total(costo_fijo: float, costo_variable_unitario: float, cantidad: float):
    return {"costo_total": calcular_costo_total(costo_fijo, costo_variable_unitario, cantidad)}

@app.get("/analisis/beneficio/")
def analisis_beneficio(precio_unitario: float, cantidad: float, costo_fijo: float, costo_variable_unitario: float):
    return {"beneficio": calcular_beneficio(precio_unitario, cantidad, costo_fijo, costo_variable_unitario)}

@app.get("/analisis/punto_equilibrio/")
def analisis_punto_equilibrio(costo_fijo: float, precio_unitario: float, costo_variable_unitario: float):
    return {"punto_equilibrio": calcular_punto_equilibrio(costo_fijo, precio_unitario, costo_variable_unitario)}

# ---------- DESCARGAS ----------
@app.get("/descargar/ingreso_total/")
def descargar_ingreso(precio_unitario: float, cantidad: float):
    csv_data = descargar_ingreso_total(precio_unitario, cantidad)
    return StreamingResponse(io.StringIO(csv_data), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=ingreso_total.csv"})


# IMPORTAR Y REGISTRAR ESTOS ROUTERS

from fastapi import FastAPI
from bhaskara import router as bhaskara_router
from analisis import ingreso_total, costo_total, beneficio, punto_equilibrio
from descargas import ingreso_total as descargar_ingreso_total
from descargas import costo_total as descargar_costo_total
from descargas import beneficio as descargar_beneficio
from descargas import punto_equilibrio as descargar_punto_equilibrio

app = FastAPI()

app.include_router(bhaskara_router)
app.include_router(ingreso_total.router)
app.include_router(costo_total.router)
app.include_router(beneficio.router)
app.include_router(punto_equilibrio.router)
app.include_router(descargar_ingreso_total.router)
app.include_router(descargar_costo_total.router)
app.include_router(descargar_beneficio.router)
app.include_router(descargar_punto_equilibrio.router)
