# -*- coding: utf-8 -*-
"""
@fileoverview Pure quadratic analysis service for mathematical calculations
@version 1.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Pure mathematical service for quadratic equation analysis using Bhaskara's formula.
No business logic, no coordination - just pure mathematical operations.

@dependencies
- math module for mathematical operations
- app.core.exceptions for error handling

@usage
from app.services.quadratic_analysis import QuadraticAnalysisService
service = QuadraticAnalysisService()
result = service.analyze_quadratic(a, b, c)

@state
✅ Functional - Pure mathematical calculations

@bugs
- None currently identified

@todo
- Add more mathematical analysis methods
- Optimize for edge cases

@performance
- O(1) for basic calculations
- Efficient memory usage for large numbers

@security
- Input validation to prevent mathematical errors
"""

import math
import logging
from typing import Dict, Any, Tuple
from app.core.exceptions import BusinessLogicException

logger = logging.getLogger(__name__)


class QuadraticAnalysisService:
    """Pure mathematical service for quadratic equation analysis."""
    
    def __init__(self):
        self.service_name = "QuadraticAnalysisService"
    
    def analyze_quadratic(self, a: float, b: float, c: float) -> Dict[str, Any]:
        """
        Pure mathematical analysis of quadratic function ax² + bx + c.
        
        Args:
            a: Coefficient of x² (must not be 0)
            b: Coefficient of x
            c: Constant term
            
        Returns:
            Dict with pure mathematical results
        """
        try:
            # Validate coefficient a
            if a == 0:
                raise BusinessLogicException(
                    "El coeficiente 'a' no puede ser cero (no sería una función cuadrática)",
                    operation="quadratic_analysis"
                )
            
            # Calculate discriminant
            discriminant = b ** 2 - 4 * a * c
            
            # Calculate roots
            roots = self._calculate_roots(a, b, c, discriminant)
            
            # Calculate vertex
            vertex_x = -b / (2 * a)
            vertex_y = a * vertex_x ** 2 + b * vertex_x + c
            
            # Determine direction
            direction = "upward" if a > 0 else "downward"
            
            # Return pure mathematical results
            return {
                "coefficients": {"a": a, "b": b, "c": c},
                "equation": f"{a}x² + {b}x + {c} = 0",
                "discriminant": discriminant,
                "roots": roots,
                "vertex": {"x": vertex_x, "y": vertex_y},
                "axis_of_symmetry": vertex_x,
                "direction": direction,
                "roots_nature": self._get_roots_nature(discriminant)
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Quadratic analysis failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis cuadrático: {str(e)}",
                operation="quadratic_analysis"
            )
    
    def _calculate_roots(self, a: float, b: float, c: float, discriminant: float) -> Dict[str, Any]:
        """Calculate roots of the quadratic equation."""
        if discriminant < 0:
            return {
                "x1": None,
                "x2": None,
                "nature": "complex",
                "abs": {"x1": None, "x2": None}
            }
        elif discriminant == 0:
            x = -b / (2 * a)
            return {
                "x1": x,
                "x2": x,
                "nature": "real_equal",
                "abs": {"x1": abs(x), "x2": abs(x)}
            }
        else:
            x1 = (-b + math.sqrt(discriminant)) / (2 * a)
            x2 = (-b - math.sqrt(discriminant)) / (2 * a)
            return {
                "x1": x1,
                "x2": x2,
                "nature": "real_distinct",
                "abs": {"x1": abs(x1), "x2": abs(x2)}
            }
    
    def _get_roots_nature(self, discriminant: float) -> str:
        """Get the nature of the roots based on discriminant."""
        if discriminant > 0:
            return "real_distinct"
        elif discriminant == 0:
            return "real_equal"
        else:
            return "complex"
    
    def calculate_derivative(self, a: float, b: float) -> Dict[str, Any]:
        """
        Calculate derivative of quadratic function.
        
        Args:
            a: Coefficient of x²
            b: Coefficient of x
            
        Returns:
            Dict with derivative information
        """
        try:
            # Derivative: 2ax + b
            derivative_coefficients = {"a": 2 * a, "b": b}
            derivative_equation = f"{2*a}x + {b}"
            
            # Critical point (where derivative = 0)
            critical_point = -b / (2 * a) if a != 0 else None
            
            return {
                "derivative_coefficients": derivative_coefficients,
                "derivative_equation": derivative_equation,
                "critical_point": critical_point
            }
            
        except Exception as e:
            logger.error(f"Derivative calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de derivada: {str(e)}",
                operation="derivative_calculation"
            )
