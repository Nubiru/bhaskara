from analisis_ingreso_total import calcular_ingreso_total
from analisis_costo_total import calcular_costo_total

def calcular_beneficio(precio_unitario: float, cantidad: float, costo_fijo: float, costo_variable_unitario: float):
    ingreso = calcular_ingreso_total(precio_unitario, cantidad)
    costo = calcular_costo_total(costo_fijo, costo_variable_unitario, cantidad)
    return ingreso - costo
