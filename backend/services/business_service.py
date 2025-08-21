# -*- coding: utf-8 -*-
"""
@fileoverview Servicios de cálculo para módulos de negocio (ingresos, costos, beneficio, punto de equilibrio, interés compuesto).
@version 1.1.0
@since 2025-08-21
@lastModified 2025-08-21

Responsabilidad
- Proveer funciones puras de cálculo usadas por los routers de API
- Cálculos financieros: interés compuesto, proyecciones de inversión
"""

from typing import Dict, Any, Optional, List
from decimal import Decimal, ROUND_HALF_UP
import math


def calcular_ingreso_total(precio: float, cantidad: float) -> Dict[str, Any]:
    ingreso_total = precio * cantidad
    # Se podrían agregar proyecciones básicas (mock) para la UI
    proyecciones = []
    return {"ingresoTotal": ingreso_total, "proyecciones": proyecciones}


def calcular_costo_total(
    costos_fijos: float, costos_variables: float, cantidad: Optional[float] = None
) -> Dict[str, Any]:
    if cantidad is not None:
        costo_total = costos_fijos + (costos_variables * cantidad)
    else:
        costo_total = costos_fijos + costos_variables
    breakdown: Dict[str, float] = {
        "costosFijos": float(costos_fijos),
        "costosVariables": float(costos_variables if cantidad is None else costos_variables * cantidad),
    }
    return {"costoTotal": costo_total, "breakdown": breakdown}


def calcular_beneficio(ingreso_total: float, costo_total: float) -> Dict[str, Any]:
    beneficio = ingreso_total - costo_total
    margen = 0.0 if ingreso_total == 0 else beneficio / ingreso_total
    return {"beneficioNeto": beneficio, "margen": margen}


def calcular_punto_equilibrio(costos_fijos: float, precio: float, costo_variable_unitario: float) -> Dict[str, Any]:
    if precio <= costo_variable_unitario:
        return {
            "puntoEquilibrio": None,
            "analisisSensibilidad": {"error": "precio <= costo variable"},
        }
    punto = costos_fijos / (precio - costo_variable_unitario)
    return {"puntoEquilibrio": punto, "analisisSensibilidad": {}}


def calcular_interes_compuesto(
    principal: float,
    tasa_anual: float,
    frecuencia_anual: int,
    años: float,
    contribuciones: Optional[float] = None,
    frecuencia_contribucion: Optional[str] = None
) -> Dict[str, Any]:
    """
    Calcula el interés compuesto con o sin contribuciones regulares.
    
    Args:
        principal: Capital inicial (>= 0)
        tasa_anual: Tasa de interés anual como decimal (0.05 = 5%)
        frecuencia_anual: Veces por año que se capitaliza (1, 2, 4, 12, 365)
        años: Tiempo de inversión en años (> 0)
        contribuciones: Contribución regular por período (>= 0)
        frecuencia_contribucion: 'mensual' o 'anual'
    
    Returns:
        Dict con resultados del cálculo
    """
    # Validaciones
    if principal < 0:
        raise ValueError("El capital inicial debe ser >= 0")
    if tasa_anual < 0 or tasa_anual > 1:
        raise ValueError("La tasa anual debe estar entre 0 y 1")
    if frecuencia_anual <= 0:
        raise ValueError("La frecuencia anual debe ser > 0")
    if años <= 0:
        raise ValueError("Los años deben ser > 0")
    if contribuciones is not None and contribuciones < 0:
        raise ValueError("Las contribuciones deben ser >= 0")
    
    # Tasa por período
    tasa_periodo = tasa_anual / frecuencia_anual
    periodos_totales = int(frecuencia_anual * años)
    
    # Cálculo del capital inicial con interés compuesto
    monto_principal = principal * (1 + tasa_periodo) ** periodos_totales
    
    # Cálculo de contribuciones si existen
    monto_contribuciones = 0.0
    total_contribuciones = 0.0
    schedule = []
    
    if contribuciones and contribuciones > 0:
        if frecuencia_contribucion == 'mensual':
            contribuciones_por_periodo = contribuciones / 12
            periodos_contribucion = periodos_totales
        elif frecuencia_contribucion == 'anual':
            contribuciones_por_periodo = contribuciones
            periodos_contribucion = int(años)
        else:
            # Por defecto, contribuciones anuales
            contribuciones_por_periodo = contribuciones
            periodos_contribucion = int(años)
        
        # Fórmula para contribuciones regulares con interés compuesto
        if tasa_periodo > 0:
            monto_contribuciones = contribuciones_por_periodo * (
                ((1 + tasa_periodo) ** periodos_contribucion - 1) / tasa_periodo
            )
        else:
            monto_contribuciones = contribuciones_por_periodo * periodos_contribucion
        
        total_contribuciones = contribuciones_por_periodo * periodos_contribucion
        
        # Generar schedule para gráficos
        for i in range(periodos_contribucion + 1):
            año = i / (periodos_contribucion / años) if periodos_contribucion > 0 else 0
            if tasa_periodo > 0:
                monto_parcial = contribuciones_por_periodo * (
                    ((1 + tasa_periodo) ** i - 1) / tasa_periodo
                )
            else:
                monto_parcial = contribuciones_por_periodo * i
            
            schedule.append({
                "año": round(año, 2),
                "monto": round(monto_parcial, 2),
                "contribuciones": round(contribuciones_por_periodo * i, 2),
                "interes": round(monto_parcial - contribuciones_por_periodo * i, 2)
            })
    
    # Resultados finales
    monto_final = monto_principal + monto_contribuciones
    interes_ganado = monto_final - principal - total_contribuciones
    
    return {
        "montoFinal": round(monto_final, 2),
        "capitalInicial": round(principal, 2),
        "totalContribuciones": round(total_contribuciones, 2),
        "interesGanado": round(interes_ganado, 2),
        "tasaAnual": tasa_anual,
        "frecuenciaAnual": frecuencia_anual,
        "años": años,
        "contribuciones": contribuciones or 0,
        "frecuenciaContribucion": frecuencia_contribucion or "anual",
        "schedule": schedule,
        "desglose": {
            "montoPrincipal": round(monto_principal, 2),
            "montoContribuciones": round(monto_contribuciones, 2),
            "periodosTotales": periodos_totales,
            "tasaPeriodo": round(tasa_periodo, 6)
        }
    }


def calcular_apy_efectivo(tasa_nominal: float, frecuencia_anual: int) -> float:
    """
    Calcula el APY (Annual Percentage Yield) efectivo.
    
    Args:
        tasa_nominal: Tasa nominal anual como decimal
        frecuencia_anual: Frecuencia de capitalización
    
    Returns:
        APY efectivo como decimal
    """
    if frecuencia_anual <= 0:
        raise ValueError("La frecuencia anual debe ser > 0")
    
    return (1 + tasa_nominal / frecuencia_anual) ** frecuencia_anual - 1


def calcular_tiempo_duplicacion(tasa_anual: float) -> float:
    """
    Calcula el tiempo para duplicar una inversión (Regla del 72).
    
    Args:
        tasa_anual: Tasa de interés anual como decimal
    
    Returns:
        Años para duplicar la inversión
    """
    if tasa_anual <= 0:
        raise ValueError("La tasa anual debe ser > 0")
    
    return 72 / (tasa_anual * 100)


