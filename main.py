# app/main.py
from fastapi import FastAPI
from backend.analisis import analisis_ingreso_total, analisis_costo_total, analisis_beneficio, analisis_equilibrio

app = FastAPI(title="API de Análisis Económico", version="1.0")

# Incluir routers
app.include_router(analisis_ingreso_total.router)
app.include_router(analisis_costo_total.router)
app.include_router(analisis_beneficio.router)
app.include_router(analisis_equilibrio.router)

@app.get("/")
def home():
    return {"mensaje": "Bienvenido a la API de análisis económico"}
