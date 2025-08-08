from pydantic import BaseModel

class CoeficientesCuadraticos(BaseModel):
    a: float
    b: float
    c: float

class VariablesEconomicas(BaseModel):
    precio: float
    cantidad: float
    costo_fijo: float
    costo_variable_unitario: float
