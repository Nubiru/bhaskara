import csv
import os
from analisis.analisis_bhaskara import calcular_bhaskara

def descargar_bhaskara_csv(a: float, b: float, c: float) -> str:
    resultado = calcular_bhaskara(a, b, c)
    file_path = f"bhaskara_{a}_{b}_{c}.csv"
    abs_path = os.path.join(os.getcwd(), "backend", "descargas", file_path)

    with open(abs_path, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        if "mensaje" in resultado:
            writer.writerow(["Mensaje"])
            writer.writerow([resultado["mensaje"]])
        else:
            writer.writerow(["x1", "x2"])
            writer.writerow([resultado["x1"], resultado["x2"]])
    return abs_path