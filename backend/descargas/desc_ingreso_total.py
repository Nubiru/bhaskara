"""
@fileoverview Utilidades de descarga para ingreso total (compatibilidad legacy)
"""
import csv
from io import StringIO
from analisis.analisis_ingreso_total import calcular_ingreso_total

def descargar_ingreso_total(precio_unitario: float, cantidad: float):
    ingreso = calcular_ingreso_total(precio_unitario, cantidad)
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["Precio Unitario", "Cantidad", "Ingreso Total"])
    writer.writerow([precio_unitario, cantidad, ingreso])
    return output.getvalue()

# Compatibilidad con imports legacy
def descargar_ingreso_total_csv(precio_unitario: float, cantidad: float):
    return descargar_ingreso_total(precio_unitario, cantidad)
