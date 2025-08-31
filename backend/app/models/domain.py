# -*- coding: utf-8 -*-
"""
@fileoverview Domain models for business entities and analysis results
@version 1.0.0
@since 2025-08-25
@lastModified 2025-08-25

Responsabilidad
- Define domain models for business entities
- Represent analysis results and calculations
- Provide structured data for business logic
"""

from typing import Dict, Any, Optional, List
from pydantic import BaseModel, Field
from datetime import datetime
from dataclasses import dataclass


# ========================================
# ANALYSIS RESULT MODELS
# ========================================

class AnalysisResult(BaseModel):
    """Base model for all analysis results."""
    analysis_id: str = Field(..., description="ID único del análisis")
    analysis_type: str = Field(..., description="Tipo de análisis realizado")
    analysis_date: datetime = Field(default_factory=datetime.now, description="Fecha del análisis")
    description: Optional[str] = Field(None, description="Descripción del análisis")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Metadatos adicionales")


class QuadraticAnalysisResult(AnalysisResult):
    """Result model for quadratic analysis."""
    analysis_type: str = Field(default="quadratic", description="Tipo de análisis")
    coefficients: Dict[str, float] = Field(..., description="Coeficientes de la función")
    equation: str = Field(..., description="Ecuación de la función")
    discriminant: float = Field(..., description="Valor del discriminante")
    roots: Dict[str, Any] = Field(..., description="Raíces de la función")
    vertex: Dict[str, float] = Field(..., description="Coordenadas del vértice")
    axis_of_symmetry: float = Field(..., description="Eje de simetría")
    direction: str = Field(..., description="Dirección de la parábola")


class NumberConversionResult(AnalysisResult):
    """Result model for number conversion."""
    analysis_type: str = Field(default="number_conversion", description="Tipo de análisis")
    original_number: str = Field(..., description="Número original")
    original_base: int = Field(..., description="Base de origen")
    target_base: int = Field(..., description="Base de destino")
    converted_number: str = Field(..., description="Número convertido")
    precision: int = Field(..., description="Precisión utilizada")
    algorithm_used: str = Field(..., description="Algoritmo utilizado")
    conversion_steps: Dict[str, str] = Field(..., description="Pasos de la conversión")


class RevenueAnalysisResult(AnalysisResult):
    """Result model for revenue analysis."""
    analysis_type: str = Field(default="revenue", description="Tipo de análisis")
    precio: float = Field(..., description="Precio unitario")
    cantidad: float = Field(..., description="Cantidad vendida")
    ingreso_total: float = Field(..., description="Ingreso total")
    proyecciones: List[Dict[str, Any]] = Field(default_factory=list, description="Proyecciones futuras")


class CostsAnalysisResult(AnalysisResult):
    """Result model for costs analysis."""
    analysis_type: str = Field(default="costs", description="Tipo de análisis")
    costos_fijos: float = Field(..., description="Costos fijos")
    costos_variables: float = Field(..., description="Costos variables")
    costo_total: float = Field(..., description="Costo total")
    breakdown: Dict[str, float] = Field(..., description="Desglose de costos")


class ProfitAnalysisResult(AnalysisResult):
    """Result model for profit analysis."""
    analysis_type: str = Field(default="profit", description="Tipo de análisis")
    ingreso_total: float = Field(..., description="Ingreso total")
    costo_total: float = Field(..., description="Costo total")
    beneficio_neto: float = Field(..., description="Beneficio neto")
    margen: float = Field(..., description="Margen de beneficio")


class BreakevenAnalysisResult(AnalysisResult):
    """Result model for break-even analysis."""
    analysis_type: str = Field(default="breakeven", description="Tipo de análisis")
    costos_fijos: float = Field(..., description="Costos fijos")
    precio: float = Field(..., description="Precio unitario")
    costo_variable_unitario: float = Field(..., description="Costo variable unitario")
    punto_equilibrio: Optional[float] = Field(None, description="Punto de equilibrio")
    analisis_sensibilidad: Dict[str, Any] = Field(default_factory=dict, description="Análisis de sensibilidad")


class CompoundInterestResult(AnalysisResult):
    """Result model for compound interest analysis."""
    analysis_type: str = Field(default="compound_interest", description="Tipo de análisis")
    principal: float = Field(..., description="Capital inicial")
    tasa_anual: float = Field(..., description="Tasa anual")
    frecuencia_anual: int = Field(..., description="Frecuencia anual")
    años: float = Field(..., description="Tiempo en años")
    monto_final: float = Field(..., description="Monto final")
    interes_ganado: float = Field(..., description="Interés ganado")
    schedule: List[Dict[str, Any]] = Field(default_factory=list, description="Cronograma de pagos")


# ========================================
# CURRENCY AND EXCHANGE MODELS
# ========================================

@dataclass
class ExchangeRate:
    """Exchange rate data structure."""
    from_currency: str
    to_currency: str
    rate: float
    last_updated: datetime
    source: str


class CurrencyConversionResult(AnalysisResult):
    """Result model for currency conversion."""
    analysis_type: str = Field(default="currency_conversion", description="Tipo de análisis")
    original_amount: float = Field(..., description="Cantidad original")
    original_currency: str = Field(..., description="Moneda de origen")
    target_currency: str = Field(..., description="Moneda de destino")
    exchange_rate: float = Field(..., description="Tasa de cambio")
    converted_amount: float = Field(..., description="Cantidad convertida")
    conversion_date: datetime = Field(..., description="Fecha de la conversión")
    currency_info: Dict[str, Dict[str, str]] = Field(..., description="Información de las monedas")


# ========================================
# UTILITY MODELS
# ========================================

class PaginationInfo(BaseModel):
    """Pagination information for list results."""
    page: int = Field(..., description="Página actual", ge=1)
    page_size: int = Field(..., description="Tamaño de página", ge=1, le=100)
    total_items: int = Field(..., description="Total de elementos", ge=0)
    total_pages: int = Field(..., description="Total de páginas", ge=0)
    has_next: bool = Field(..., description="Indica si hay página siguiente")
    has_previous: bool = Field(..., description="Indica si hay página anterior")


class ListResult(BaseModel):
    """Generic list result with pagination."""
    items: List[Any] = Field(..., description="Lista de elementos")
    pagination: PaginationInfo = Field(..., description="Información de paginación")
    filters: Optional[Dict[str, Any]] = Field(None, description="Filtros aplicados")


class HealthCheckResult(BaseModel):
    """Health check result model."""
    status: str = Field(..., description="Estado del servicio")
    timestamp: datetime = Field(default_factory=datetime.now, description="Timestamp del check")
    version: str = Field(..., description="Versión del servicio")
    uptime: float = Field(..., description="Tiempo de actividad en segundos")
    services: Dict[str, str] = Field(default_factory=dict, description="Estado de servicios dependientes")


# ========================================
# VALIDATION MODELS
# ========================================

class ValidationError(BaseModel):
    """Validation error model."""
    field: str = Field(..., description="Campo con error")
    message: str = Field(..., description="Mensaje de error")
    value: Optional[Any] = Field(None, description="Valor que causó el error")
    code: Optional[str] = Field(None, description="Código de error")


class ValidationResult(BaseModel):
    """Validation result model."""
    is_valid: bool = Field(..., description="Indica si la validación fue exitosa")
    errors: List[ValidationError] = Field(default_factory=list, description="Lista de errores de validación")
    warnings: List[str] = Field(default_factory=list, description="Lista de advertencias")
