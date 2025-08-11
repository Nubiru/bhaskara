# app/main.py
from fastapi import FastAPI
from backend.routers import (
    bhaskara_router,
    ingreso_total_router,
    costo_total_router,
    beneficio_router,
    punto_equilibrio_router
)

app = FastAPI(title="API Funciones Cuadráticas y Economía")

# Registrar routers
app.include_router(bhaskara_router.router, prefix="/bhaskara", tags=["Bhaskara"])
app.include_router(ingreso_total_router.router, prefix="/ingreso-total", tags=["Ingreso Total"])
app.include_router(costo_total_router.router, prefix="/costo-total", tags=["Costo Total"])
app.include_router(beneficio_router.router, prefix="/beneficio", tags=["Beneficio"])
app.include_router(punto_equilibrio_router.router, prefix="/punto-equilibrio", tags=["Punto de Equilibrio"])

@app.get("/")
def root():
    return {"mensaje": "API en funcionamiento"}
