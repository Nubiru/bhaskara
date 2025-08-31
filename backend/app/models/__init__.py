# -*- coding: utf-8 -*-
"""
@fileoverview Data models package for the application
@version 1.0.0
@since 2025-08-25
@lastModified 2025-08-25

Responsabilidad
- Export all data models and schemas
- Provide centralized access to data structures
"""

from .schemas import *
from .domain import *

__all__ = [
    # Schemas
    "QuadraticRequest",
    "NumberConverterRequest",
    "CompoundInterestRequest",
    "CurrencyConversionRequest",
    "RevenueRequest",
    "CostsRequest",
    "ProfitRequest",
    "BreakevenRequest",
    # Domain models
    "AnalysisResult",
    "ExchangeRate",
    "ConversionResult"
]
