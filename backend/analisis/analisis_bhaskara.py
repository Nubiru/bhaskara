import math

def calcular_bhaskara(a: float, b: float, c: float):
    if a == 0:
        raise ValueError("El valor de 'a' no puede ser cero en una función cuadrática.")
    
    discriminante = b**2 - 4*a*c
    if discriminante < 0:
        return {"mensaje": "No hay soluciones reales"}

    x1 = (-b + math.sqrt(discriminante)) / (2*a)
    x2 = (-b - math.sqrt(discriminante)) / (2*a)
    
    return {"x1": x1, "x2": x2}