import math

def calcular_bhaskara(a, b, c):
    discriminante = b**2 - 4*a*c
    if discriminante < 0:
        return {"mensaje": "No hay raíces reales"}
    x1 = (-b + math.sqrt(discriminante)) / (2*a)
    x2 = (-b - math.sqrt(discriminante)) / (2*a)
    return {"x1": x1, "x2": x2}

def ingreso_total(precio, cantidad):
    return precio * cantidad

def costo_total(fijo, variable_unitario, cantidad):
    return fijo + variable_unitario * cantidad

def beneficio(it, ct):
    return it - ct

def punto_equilibrio(precio, variable_unitario, fijo):
    if precio == variable_unitario:
        return None
    return fijo / (precio - variable_unitario)

def vertice(a, b):
    if a == 0:
        return None
    x = -b / (2*a)
    return x
