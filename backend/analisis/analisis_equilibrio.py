def calcular_punto_equilibrio(costo_fijo: float, precio_unitario: float, costo_variable_unitario: float):
    if precio_unitario <= costo_variable_unitario:
        raise ValueError("El precio unitario debe ser mayor al costo variable unitario.")
    return costo_fijo / (precio_unitario - costo_variable_unitario)
