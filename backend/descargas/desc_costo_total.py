"""
@fileoverview Utilidades de descarga de costos (legacy). No se registran rutas aquí.
"""
import csv
from io import StringIO


def generar_csv_costo_total(costo_fijo: float, costo_variable: float, cantidad: float) -> str:
    costo_total = costo_fijo + (costo_variable * cantidad)
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["Costo Fijo", "Costo Variable", "Cantidad", "Costo Total"])
    writer.writerow([costo_fijo, costo_variable, cantidad, costo_total])
    return output.getvalue()

# Compatibilidad con imports legacy
def descargar_costo_total_csv(costo_fijo: float, costo_variable: float, cantidad: float) -> str:
    return generar_csv_costo_total(costo_fijo, costo_variable, cantidad)
