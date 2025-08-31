# -*- coding: utf-8 -*-
"""
@fileoverview Main API router for version 1
@version 1.0.0
@since 2025-08-25
@lastModified 2025-08-25

Responsabilidad
- Main API router integrating all endpoints
- Provide dependency injection for services
- Handle request/response formatting
"""

from fastapi import APIRouter, Depends, Query, HTTPException
from typing import Optional
from app.core.dependencies import (
    MathServiceDep,
    BusinessServiceDep,
    FinanceServiceDep,
    RequestIDDep
)
from app.models.schemas import (
    QuadraticRequest,
    NumberConverterRequest,
    RevenueRequest,
    CostsRequest,
    ProfitRequest,
    BreakevenRequest,
    CompoundInterestRequest,
    CurrencyConversionRequest,
    SuccessResponse,
    ErrorResponse
)
from app.models.domain import (
    QuadraticAnalysisResult,
    NumberConversionResult,
    RevenueAnalysisResult,
    CostsAnalysisResult,
    ProfitAnalysisResult,
    BreakevenAnalysisResult,
    CompoundInterestResult,
    CurrencyConversionResult
)
from app.core.exceptions import BusinessLogicException, ValidationException
from datetime import datetime

# Create main API router
api_router = APIRouter(prefix="/api/v1", tags=["API v1"])


# ========================================
# MATHEMATICAL TOOLS ENDPOINTS
# ========================================

@api_router.get("/math/quadratic", response_model=SuccessResponse)
async def analyze_quadratic(
    a: float = Query(..., description="Coeficiente cuadrático (a ≠ 0)", gt=0),
    b: float = Query(..., description="Coeficiente lineal (b)"),
    c: float = Query(..., description="Coeficiente constante (c)"),
    mode: Optional[str] = Query("completo", description="Modo de análisis"),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    math_service: MathServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Analyze quadratic function using Bhaskara's formula."""
    try:
        # Create request object
        request = QuadraticRequest(
            a=a, b=b, c=c, mode=mode, description=description
        )
        
        # Perform analysis
        result = math_service.analyze_quadratic(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@api_router.get("/math/number-converter", response_model=SuccessResponse)
async def convert_number(
    number: str = Query(..., description="Número a convertir"),
    from_base: int = Query(..., description="Base de origen (2, 8, 10, 16)", ge=2, le=16),
    to_base: int = Query(..., description="Base de destino (2, 8, 10, 16)", ge=2, le=16),
    precision: Optional[int] = Query(20, description="Precisión", ge=1, le=100),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    math_service: MathServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Convert number between different numerical systems."""
    try:
        # Create request object
        request = NumberConverterRequest(
            number=number,
            from_base=from_base,
            to_base=to_base,
            precision=precision,
            description=description
        )
        
        # Perform conversion
        result = math_service.convert_number(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


# ========================================
# BUSINESS ANALYTICS ENDPOINTS
# ========================================

@api_router.get("/business/revenue", response_model=SuccessResponse)
async def analyze_revenue(
    precio: float = Query(..., description="Precio unitario", gt=0),
    cantidad: float = Query(..., description="Cantidad vendida", ge=0),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    business_service: BusinessServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Analyze revenue based on price and quantity."""
    try:
        # Create request object
        request = RevenueRequest(
            precio=precio,
            cantidad=cantidad,
            description=description
        )
        
        # Perform analysis
        result = business_service.analyze_revenue(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@api_router.get("/business/costs", response_model=SuccessResponse)
async def analyze_costs(
    costos_fijos: float = Query(..., description="Costos fijos", ge=0),
    costos_variables: float = Query(..., description="Costos variables", ge=0),
    cantidad: Optional[float] = Query(None, description="Cantidad", ge=0),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    business_service: BusinessServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Analyze costs breakdown."""
    try:
        # Create request object
        request = CostsRequest(
            costos_fijos=costos_fijos,
            costos_variables=costos_variables,
            cantidad=cantidad,
            description=description
        )
        
        # Perform analysis
        result = business_service.analyze_costs(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@api_router.get("/business/profit", response_model=SuccessResponse)
async def analyze_profit(
    ingreso_total: float = Query(..., description="Ingreso total", ge=0),
    costo_total: float = Query(..., description="Costo total", ge=0),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    business_service: BusinessServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Analyze profit and margin."""
    try:
        # Create request object
        request = ProfitRequest(
            ingreso_total=ingreso_total,
            costo_total=costo_total,
            description=description
        )
        
        # Perform analysis
        result = business_service.analyze_profit(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@api_router.get("/business/breakeven", response_model=SuccessResponse)
async def analyze_breakeven(
    costos_fijos: float = Query(..., description="Costos fijos", ge=0),
    precio: float = Query(..., description="Precio unitario", gt=0),
    costo_variable_unitario: float = Query(..., description="Costo variable unitario", ge=0),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    business_service: BusinessServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Analyze break-even point."""
    try:
        # Create request object
        request = BreakevenRequest(
            costos_fijos=costos_fijos,
            precio=precio,
            costo_variable_unitario=costo_variable_unitario,
            description=description
        )
        
        # Perform analysis
        result = business_service.analyze_breakeven(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


# ========================================
# FINANCIAL TOOLS ENDPOINTS
# ========================================

@api_router.get("/finance/compound-interest", response_model=SuccessResponse)
async def analyze_compound_interest(
    principal: float = Query(..., description="Capital inicial", ge=0),
    tasa_anual: float = Query(..., description="Tasa anual", ge=0, le=1),
    frecuencia_anual: int = Query(..., description="Frecuencia anual", gt=0),
    años: float = Query(..., description="Tiempo en años", gt=0),
    contribuciones: Optional[float] = Query(None, description="Contribuciones", ge=0),
    frecuencia_contribucion: Optional[str] = Query(None, description="Frecuencia contribución"),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    finance_service: FinanceServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Analyze compound interest with optional contributions."""
    try:
        # Create request object
        request = CompoundInterestRequest(
            principal=principal,
            tasa_anual=tasa_anual,
            frecuencia_anual=frecuencia_anual,
            años=años,
            contribuciones=contribuciones,
            frecuencia_contribucion=frecuencia_contribucion,
            description=description
        )
        
        # Perform analysis
        result = finance_service.analyze_compound_interest(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@api_router.get("/finance/currency-converter", response_model=SuccessResponse)
async def convert_currency(
    amount: float = Query(..., description="Cantidad a convertir", gt=0),
    from_currency: str = Query(..., description="Moneda de origen"),
    to_currency: str = Query(..., description="Moneda de destino"),
    description: Optional[str] = Query(None, description="Descripción opcional"),
    finance_service: FinanceServiceDep = Depends(),
    request_id: str = RequestIDDep
) -> SuccessResponse:
    """Convert currency using live exchange rates."""
    try:
        # Create request object
        request = CurrencyConversionRequest(
            amount=amount,
            from_currency=from_currency,
            to_currency=to_currency,
            description=description
        )
        
        # Perform conversion
        result = finance_service.convert_currency(request)
        
        # Return success response
        return SuccessResponse(
            success=True,
            data=result.dict(),
            request_id=request_id,
            timestamp=result.analysis_date
        )
        
    except BusinessLogicException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


# ========================================
# HEALTH CHECK ENDPOINT
# ========================================

@api_router.get("/health", response_model=SuccessResponse)
async def health_check(request_id: str = RequestIDDep) -> SuccessResponse:
    """Health check endpoint."""
    return SuccessResponse(
        success=True,
        data={
            "status": "healthy",
            "version": "1.0.0",
            "timestamp": datetime.now().isoformat()
        },
        request_id=request_id,
        timestamp=datetime.now()
    )
