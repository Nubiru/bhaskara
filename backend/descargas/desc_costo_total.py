from fastapi import APIRouter
from fastapi.responses import FileResponse
import csv

router = APIRouter()

@router.get("/descargar/costo-total")
def descargar_costo_total(costo_fijo: float, costo_variable: float, cantidad: float):
    costo_total = costo_fijo + (costo_variable * cantidad)

    filename = "costo_total.csv"
    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Costo Fijo", "Costo Variable", "Cantidad", "Costo Total"])
        writer.writerow([costo_fijo, costo_variable, cantidad, costo_total])

    return FileResponse(filename, media_type="text/csv", filename=filename)
