# -*- coding: utf-8 -*-
"""
@fileoverview Servicios matemáticos para análisis Bhaskara y utilidades.
@version 1.0.0
@since 2025-08-12
@lastModified 2025-08-12

Responsabilidad
- Contener la lógica de negocio para construir la respuesta completa esperada por el frontend
- Calcular raíces, discriminante, vértice y metadatos del análisis
"""

import math
from typing import Dict, Any
from pydantic import BaseModel


class BhaskaraBody(BaseModel):
    coefficients: dict
    mode: str = "full"
    description: str | None = None


def calcular_bhaskara(a: float, b: float, c: float) -> Dict[str, float | None]:
    discriminante = b ** 2 - 4 * a * c
    if discriminante < 0:
        return {"x1": None, "x2": None}
    x1 = (-b + math.sqrt(discriminante)) / (2 * a)
    x2 = (-b - math.sqrt(discriminante)) / (2 * a)
    return {"x1": x1, "x2": x2}


def calcular_bhaskara_full(body: BhaskaraBody) -> Dict[str, Any]:
    a = float(body.coefficients.get("a"))
    b = float(body.coefficients.get("b"))
    c = float(body.coefficients.get("c"))

    roots = calcular_bhaskara(a, b, c)
    equation = f"{a}x^2 + {b}x + {c} = 0"
    discriminant = b ** 2 - 4 * a * c
    vertex_x = -b / (2 * a)
    vertex_y = a * vertex_x ** 2 + b * vertex_x + c
    axis = -b / (2 * a)
    direction = "upward" if a > 0 else "downward"

    return {
        "type": "full",
        "coefficients": {"a": a, "b": b, "c": c},
        "equation": equation,
        "discriminant": discriminant,
        "roots": {
            "x1": roots.get("x1"),
            "x2": roots.get("x2"),
            "nature": _roots_nature(discriminant),
            "abs": {
                "x1": (abs(roots.get("x1")) if roots.get("x1") is not None else None),
                "x2": (abs(roots.get("x2")) if roots.get("x2") is not None else None),
            },
        },
        "vertex": {"x": vertex_x, "y": vertex_y},
        "axisOfSymmetry": axis,
        "direction": direction,
        "analysisDate": _iso_now(),
        "analysisId": "bhaskara-1",
    }


def _roots_nature(discriminant: float) -> str:
    if discriminant > 0:
        return "real_distinct"
    if discriminant == 0:
        return "real_equal"
    return "complex"


def _iso_now() -> str:
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).isoformat()


