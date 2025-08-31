# -*- coding: utf-8 -*-
"""
@fileoverview Pydantic schemas for API requests and responses
@version 1.0.0
@since 2025-08-25
@lastModified 2025-08-25

Responsabilidad
- Define request/response schemas for all API endpoints
- Provide validation and serialization for data transfer
- Ensure type safety and data consistency
"""

from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field, field_validator
from datetime import datetime


# ========================================
# MATHEMATICAL TOOLS SCHEMAS
# ========================================

class QuadraticRequest(BaseModel):
    """Request schema for quadratic analysis."""
    a: float = Field(..., description="Coeficiente cuadrático (a ≠ 0)", gt=0)
    b: float = Field(..., description="Coeficiente lineal (b)")
    c: float = Field(..., description="Coeficiente constante (c)")
    mode: str = Field(
        default="completo", 
        description="Modo de análisis",
        pattern="^(completo|raices|vertice|optimal)$"
    )
    description: Optional[str] = Field(None, description="Descripción opcional del análisis")
    
    @field_validator('a')
    @classmethod
    def validate_coefficient_a(cls, v):
        if v == 0:
            raise ValueError("El coeficiente 'a' no puede ser cero")
        return v


class NumberConverterRequest(BaseModel):
    """Request schema for number conversion."""
    number: str = Field(..., description="Número a convertir (puede incluir fracciones)")
    from_base: int = Field(..., description="Base de origen (2, 8, 10, 16)", ge=2, le=16)
    to_base: int = Field(..., description="Base de destino (2, 8, 10, 16)", ge=2, le=16)
    precision: int = Field(
        default=20, 
        description="Precisión para números fraccionarios",
        ge=1, le=100
    )
    description: Optional[str] = Field(None, description="Descripción opcional de la conversión")
    
    @field_validator('from_base', 'to_base')
    @classmethod
    def validate_bases(cls, v):
        valid_bases = [2, 8, 10, 16]
        if v not in valid_bases:
            raise ValueError(f"Base debe ser una de: {valid_bases}")
        return v


# ========================================
# BUSINESS ANALYTICS SCHEMAS
# ========================================

class RevenueRequest(BaseModel):
    """Request schema for revenue analysis."""
    precio: float = Field(..., description="Precio unitario del producto/servicio", gt=0)
    cantidad: float = Field(..., description="Cantidad vendida", ge=0)
    description: Optional[str] = Field(None, description="Descripción opcional del análisis")


class CostsRequest(BaseModel):
    """Request schema for costs analysis."""
    costos_fijos: float = Field(..., description="Costos fijos totales", ge=0)
    costos_variables: float = Field(..., description="Costos variables totales o por unidad", ge=0)
    cantidad: Optional[float] = Field(None, description="Cantidad para cálculo de costos variables", ge=0)
    description: Optional[str] = Field(None, description="Descripción opcional del análisis")


class ProfitRequest(BaseModel):
    """Request schema for profit analysis."""
    ingreso_total: float = Field(..., description="Ingreso total", ge=0)
    costo_total: float = Field(..., description="Costo total", ge=0)
    description: Optional[str] = Field(None, description="Descripción opcional del análisis")


class BreakevenRequest(BaseModel):
    """Request schema for break-even analysis."""
    costos_fijos: float = Field(..., description="Costos fijos totales", ge=0)
    precio: float = Field(..., description="Precio unitario de venta", gt=0)
    costo_variable_unitario: float = Field(..., description="Costo variable por unidad", ge=0)
    description: Optional[str] = Field(None, description="Descripción opcional del análisis")


# ========================================
# FINANCIAL TOOLS SCHEMAS
# ========================================

class CompoundInterestRequest(BaseModel):
    """Request schema for compound interest analysis."""
    principal: float = Field(..., description="Capital inicial", ge=0)
    tasa_anual: float = Field(..., description="Tasa de interés anual como decimal", ge=0, le=1)
    frecuencia_anual: int = Field(..., description="Veces por año que se capitaliza", gt=0)
    años: float = Field(..., description="Tiempo de inversión en años", gt=0)
    contribuciones: Optional[float] = Field(None, description="Contribución regular por período", ge=0)
    frecuencia_contribucion: Optional[str] = Field(
        None, 
        description="Frecuencia de contribución",
        pattern="^(mensual|anual)$"
    )
    description: Optional[str] = Field(None, description="Descripción opcional del análisis")


class CurrencyConversionRequest(BaseModel):
    """Request schema for currency conversion."""
    amount: float = Field(..., description="Cantidad a convertir", gt=0)
    from_currency: str = Field(..., description="Moneda de origen (código ISO 4217)", min_length=3, max_length=3)
    to_currency: str = Field(..., description="Moneda de destino (código ISO 4217)", min_length=3, max_length=3)
    description: Optional[str] = Field(None, description="Descripción opcional de la conversión")
    
    @field_validator('from_currency', 'to_currency')
    @classmethod
    def validate_currency_codes(cls, v):
        return v.upper()
    
    @field_validator('to_currency')
    @classmethod
    def validate_different_currencies(cls, v, info):
        if 'from_currency' in info.data and v == info.data['from_currency']:
            raise ValueError("Las monedas de origen y destino deben ser diferentes")
        return v


# ========================================
# COMMON RESPONSE SCHEMAS
# ========================================

class BaseResponse(BaseModel):
    """Base response schema for all API endpoints."""
    success: bool = Field(..., description="Indica si la operación fue exitosa")
    data: Optional[Dict[str, Any]] = Field(None, description="Datos de la respuesta")
    error: Optional[str] = Field(None, description="Mensaje de error si la operación falló")
    request_id: Optional[str] = Field(None, description="ID único de la solicitud")
    timestamp: datetime = Field(default_factory=datetime.now, description="Timestamp de la respuesta")


class ErrorResponse(BaseResponse):
    """Error response schema."""
    success: bool = Field(default=False, description="Operación fallida")
    error_code: str = Field(..., description="Código de error")
    details: Optional[Dict[str, Any]] = Field(None, description="Detalles adicionales del error")


class SuccessResponse(BaseResponse):
    """Success response schema."""
    success: bool = Field(default=True, description="Operación exitosa")
    data: Dict[str, Any] = Field(..., description="Datos de la respuesta")


# ========================================
# DOWNLOAD SCHEMAS
# ========================================

class DownloadRequest(BaseModel):
    """Request schema for file downloads."""
    analysis_type: str = Field(
        ..., 
        description="Tipo de análisis a descargar",
        pattern="^(quadratic|revenue|costs|profit|breakeven|compound-interest)$"
    )
    format: str = Field(
        default="csv", 
        description="Formato de descarga",
        pattern="^(csv|json|excel)$"
    )
    analysis_ids: Optional[str] = Field(None, description="IDs de análisis separados por coma")
    description: Optional[str] = Field(None, description="Descripción opcional")


# ========================================
# VALIDATION HELPERS
# ========================================

def validate_positive_number(value: float, field_name: str) -> float:
    """Validate that a number is positive."""
    if value <= 0:
        raise ValueError(f"{field_name} debe ser mayor que cero")
    return value


def validate_non_negative_number(value: float, field_name: str) -> float:
    """Validate that a number is non-negative."""
    if value < 0:
        raise ValueError(f"{field_name} no puede ser negativo")
    return value


def validate_percentage(value: float, field_name: str) -> float:
    """Validate that a value is a valid percentage (0-1)."""
    if not 0 <= value <= 1:
        raise ValueError(f"{field_name} debe estar entre 0 y 1")
    return value
