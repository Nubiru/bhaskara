from fastapi import APIRouter
from fastapi.responses import FileResponse
import csv

router = APIRouter()

@router.get("/descargar/beneficio")
def descargar_beneficio(precio: float, cantidad: float, costo_fijo: float, costo_variable: float):
    ingreso_total = precio * cantidad
    costo_total = costo_fijo + (costo_variable * cantidad)
    beneficio = ingreso_total - costo_total

    filename = "beneficio.csv"
    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Precio", "Cantidad", "Costo Fijo", "Costo Variable", "Beneficio"])
        writer.writerow([precio, cantidad, costo_fijo, costo_variable, beneficio])

    return FileResponse(filename, media_type="text/csv", filename=filename)
