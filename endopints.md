1️⃣ Endpoints de análisis (/analisis/...)
Estos responden con los cálculos directamente en JSON.

GET /analisis/bhaskara → Resuelve una ecuación cuadrática con los coeficientes a, b y c.

GET /analisis/ingreso-total → Calcula el ingreso total (precio × cantidad).

GET /analisis/costo-total → Calcula el costo total (costos fijos + costos variables).

GET /analisis/beneficio → Calcula el beneficio (ingreso total - costo total).

GET /analisis/punto-equilibrio → Calcula el punto de equilibrio (costos fijos / (precio - costo variable unitario)).

2️⃣ Endpoints de descarga (/descargar/...)
Estos devuelven archivos (CSV, Excel, PDF) con los cálculos hechos.

GET /descargar/ingreso-total → Genera archivo con resultados de ingreso total.

GET /descargar/costo-total → Genera archivo con resultados de costo total.

GET /descargar/beneficio → Genera archivo con resultados de beneficio.

GET /descargar/punto-equilibrio → Genera archivo con resultados de punto de equilibrio.


Con esta estructura, en main.py podés importar cada endpoint así:

from analisis.bhaskara import router as bhaskara_router
from analisis.analisis_ingreso_total import router as ingreso_router
from analisis.analisis_costo_total import router as costo_router
from analisis.analisis_beneficio import router as beneficio_router
from analisis.analisis_punto_equilibrio import router as equilibrio_router

from descargar.descargar_ingreso_total import router as descargar_ingreso_router
from descargar.descargar_costo_total import router as descargar_costo_router
from descargar.descargar_beneficio import router as descargar_beneficio_router
from descargar.descargar_punto_equilibrio import router as descargar_equilibrio_router
