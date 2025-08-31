# -*- coding: utf-8 -*-
"""
@fileoverview Mathematical analysis service coordinator
@version 2.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Coordinator service for mathematical analysis operations.
Uses strategy pattern to delegate to focused services for specific functionality.
Provides unified interface for mathematical operations.

@dependencies
- app.models.schemas for request/response models
- app.models.domain for domain models
- app.core.exceptions for error handling
- Pure services: quadratic_analysis, number_conversion

@usage
from app.services.math_service import MathCoordinator
coordinator = MathCoordinator()
result = coordinator.analyze_quadratic(request)

@state
✅ Functional - Coordinator pattern implemented

@bugs
- None currently identified

@todo
- Add more mathematical analysis types
- Implement caching strategy
- Add performance monitoring

@performance
- O(1) for coordination overhead
- Delegates to optimized pure services

@security
- Input validation through pure services
- No external dependencies
"""

import logging
from typing import Dict, Any, Optional

from app.models.schemas import QuadraticRequest, NumberConverterRequest
from app.models.domain import (
    QuadraticAnalysisResult, 
    NumberConversionResult
)
from app.core.exceptions import BusinessLogicException
from .quadratic_analysis import QuadraticAnalysisService
from .number_conversion import NumberConversionService

logger = logging.getLogger(__name__)


class MathCoordinator:
    """Coordinator service for mathematical analysis operations."""
    
    def __init__(self):
        self.service_name = "MathCoordinator"
        # Initialize pure services using strategy pattern
        self.quadratic_service = QuadraticAnalysisService()
        self.number_converter_service = NumberConversionService()
    
    def analyze_quadratic(self, request: QuadraticRequest) -> QuadraticAnalysisResult:
        """
        Analyze quadratic function using Bhaskara's formula.
        
        Args:
            request: Quadratic analysis request
            
        Returns:
            QuadraticAnalysisResult with complete analysis
        """
        try:
            # Delegate to pure quadratic service
            mathematical_result = self.quadratic_service.analyze_quadratic(
                request.a, request.b, request.c
            )
            
            # Create domain result with additional metadata
            result = QuadraticAnalysisResult(
                analysis_id=mathematical_result.get("analysis_id", "quadratic-analysis"),
                analysis_type="quadratic",
                analysis_date=mathematical_result.get("analysis_timestamp"),
                description=request.description,
                coefficients=mathematical_result.get("coefficients", {}),
                equation=mathematical_result.get("equation", ""),
                discriminant=mathematical_result.get("discriminant", 0),
                roots=mathematical_result.get("roots", {}),
                vertex=mathematical_result.get("vertex", {}),
                axis_of_symmetry=mathematical_result.get("axis_of_symmetry", 0),
                direction=mathematical_result.get("direction", ""),
                metadata={
                    "mode": request.mode,
                    "roots_nature": mathematical_result.get("roots_nature", ""),
                    "mathematical_analysis": mathematical_result
                }
            )
            
            logger.info(f"Quadratic analysis coordinated successfully - ID: {result.analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Quadratic analysis coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis cuadrático: {str(e)}",
                operation="quadratic_analysis"
            )
    
    def analyze_economy(self, request: QuadraticRequest) -> QuadraticAnalysisResult:
        """
        Economic analysis of quadratic function.
        Interprets coefficients in terms of costs, revenues, and benefits.
        """
        try:
            # Get mathematical analysis first
            mathematical_result = self.quadratic_service.analyze_quadratic(
                request.a, request.b, request.c
            )
            
            # Add economic interpretation
            economic_analysis = self._interpret_economic_meaning(
                request.a, request.b, request.c, 
                mathematical_result.get("vertex", {}).get("x", 0),
                mathematical_result.get("vertex", {}).get("y", 0)
            )
            
            # Create domain result with economic context
            result = QuadraticAnalysisResult(
                analysis_id=mathematical_result.get("analysis_id", "economy-analysis"),
                analysis_type="economy",
                analysis_date=mathematical_result.get("analysis_timestamp"),
                description=request.description,
                coefficients=mathematical_result.get("coefficients", {}),
                equation=mathematical_result.get("equation", ""),
                discriminant=mathematical_result.get("discriminant", 0),
                roots=mathematical_result.get("roots", {}),
                vertex=mathematical_result.get("vertex", {}),
                axis_of_symmetry=mathematical_result.get("axis_of_symmetry", 0),
                direction=mathematical_result.get("direction", ""),
                metadata={
                    "economic_analysis": economic_analysis,
                    "mode": request.mode,
                    "mathematical_analysis": mathematical_result
                }
            )
            
            logger.info(f"Economic analysis coordinated successfully - ID: {result.analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Economic analysis coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis económico: {str(e)}",
                operation="economic_analysis"
            )
    
    def convert_number(self, request: NumberConverterRequest) -> NumberConversionResult:
        """
        Convert number between different numerical systems using optimized algorithm.
        
        Args:
            request: Number conversion request
            
        Returns:
            NumberConversionResult with conversion details
        """
        try:
            # Delegate to pure number conversion service
            conversion_result = self.number_converter_service.convert_number(
                request.number, request.from_base, request.to_base, request.precision
            )
            
            # Create domain result
            result = NumberConversionResult(
                analysis_id=conversion_result.get("analysis_id", "number-conversion"),
                analysis_type="number_conversion",
                analysis_date=conversion_result.get("analysis_timestamp"),
                description=request.description,
                original_number=conversion_result.get("original_number", ""),
                original_base=conversion_result.get("original_base", 10),
                target_base=conversion_result.get("target_base", 10),
                converted_number=conversion_result.get("converted_number", ""),
                precision=conversion_result.get("precision", 20),
                algorithm_used=conversion_result.get("algorithm_used", ""),
                conversion_steps=conversion_result.get("conversion_steps", {}),
                metadata={
                    "baseNames": conversion_result.get("base_names", {}),
                    "conversion_details": conversion_result
                }
            )
            
            logger.info(f"Number conversion coordinated successfully - ID: {result.analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Number conversion coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en conversión numérica: {str(e)}",
                operation="number_conversion"
            )
    
    # ========================================
    # PRIVATE HELPER METHODS
    # ========================================
    
    def _interpret_economic_meaning(
        self, 
        a: float, 
        b: float, 
        c: float, 
        vertex_x: float, 
        vertex_y: float
    ) -> Dict[str, Any]:
        """Interpret coefficients in economic terms."""
        interpretation = {
            "function_type": "cost" if a > 0 else "revenue" if a < 0 else "linear",
            "coefficient_analysis": {
                "a": {
                    "meaning": "Curvatura (costos fijos si > 0, ingresos máximos si < 0)",
                    "value": a
                },
                "b": {
                    "meaning": "Tendencia lineal (costos variables si > 0, demanda si < 0)",
                    "value": b
                },
                "c": {
                    "meaning": "Intercepto (costos fijos base si > 0, ingresos base si < 0)",
                    "value": c
                }
            },
            "economic_insights": []
        }
        
        # Add specific insights based on function type
        if a > 0:  # Cost function
            interpretation["economic_insights"].extend([
                "Función de costos (parábola hacia arriba)",
                f"Punto de costo mínimo en x = {vertex_x:.2f}",
                f"Costo mínimo: {vertex_y:.2f}"
            ])
        elif a < 0:  # Revenue function
            interpretation["economic_insights"].extend([
                "Función de ingresos (parábola hacia abajo)",
                f"Punto de ingreso máximo en x = {vertex_x:.2f}",
                f"Ingreso máximo: {vertex_y:.2f}"
            ])
        
        return interpretation
