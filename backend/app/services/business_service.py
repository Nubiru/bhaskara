# -*- coding: utf-8 -*-
"""
@fileoverview Business analytics services coordinator
@version 2.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Coordinator service for business analytics operations.
Uses strategy pattern to delegate to focused services for specific functionality.
Provides unified interface for business analysis operations.

@dependencies
- app.models.schemas for request/response models
- app.models.domain for domain models
- app.core.exceptions for error handling
- Pure services: revenue_analysis, cost_analysis, profit_analysis

@usage
from app.services.business_service import BusinessCoordinator
coordinator = BusinessCoordinator()
result = coordinator.analyze_revenue(request)

@state
✅ Functional - Coordinator pattern implemented

@bugs
- None currently identified

@todo
- Add more business analysis types
- Implement caching strategy
- Add performance monitoring

@performance
- O(1) for coordination overhead
- Delegates to optimized pure services

@security
- Input validation through pure services
- No external dependencies
"""

import uuid
import logging
from typing import Dict, Any, Optional
from datetime import datetime

from app.models.schemas import (
    RevenueRequest, CostsRequest, ProfitRequest, BreakevenRequest
)
from app.models.domain import (
    RevenueAnalysisResult, CostsAnalysisResult, 
    ProfitAnalysisResult, BreakevenAnalysisResult
)
from app.core.exceptions import BusinessLogicException
from .revenue_analysis import RevenueAnalysisService
from .cost_analysis import CostAnalysisService
from .profit_analysis import ProfitAnalysisService

logger = logging.getLogger(__name__)


class BusinessCoordinator:
    """Coordinator service for business analytics operations."""
    
    def __init__(self):
        self.service_name = "BusinessCoordinator"
        # Initialize pure services using strategy pattern
        self.revenue_service = RevenueAnalysisService()
        self.cost_service = CostAnalysisService()
        self.profit_service = ProfitAnalysisService()
    
    def analyze_revenue(self, request: RevenueRequest) -> RevenueAnalysisResult:
        """
        Analyze revenue based on price and quantity.
        
        Args:
            request: Revenue analysis request
            
        Returns:
            RevenueAnalysisResult with analysis details
        """
        try:
            # Delegate to pure revenue service
            revenue_result = self.revenue_service.analyze_revenue(
                request.precio, request.cantidad, request.description
            )
            
            # Generate analysis ID
            analysis_id = f"revenue-{uuid.uuid4().hex[:8]}"
            
            # Create domain result
            result = RevenueAnalysisResult(
                analysis_id=analysis_id,
                analysis_type="revenue",
                analysis_date=datetime.now(),
                description=request.description,
                precio=request.precio,
                cantidad=request.cantidad,
                ingreso_total=revenue_result.get("total_revenue", 0),
                proyecciones=revenue_result.get("projections", []),
                metadata={
                    "revenue_analysis": revenue_result,
                    "metrics": revenue_result.get("metrics", {})
                }
            )
            
            logger.info(f"Revenue analysis coordinated successfully - ID: {analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Revenue analysis coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de ingresos: {str(e)}",
                operation="revenue_analysis"
            )
    
    def analyze_costs(self, request: CostsRequest) -> CostsAnalysisResult:
        """
        Analyze costs breakdown.
        
        Args:
            request: Costs analysis request
            
        Returns:
            CostsAnalysisResult with analysis details
        """
        try:
            # Delegate to pure cost service
            cost_result = self.cost_service.analyze_costs(
                request.costos_fijos, request.costos_variables, 
                request.cantidad, request.description
            )
            
            # Generate analysis ID
            analysis_id = f"costs-{uuid.uuid4().hex[:8]}"
            
            # Create domain result
            result = CostsAnalysisResult(
                analysis_id=analysis_id,
                analysis_type="costs",
                analysis_date=datetime.now(),
                description=request.description,
                costos_fijos=request.costos_fijos,
                costos_variables=request.costos_variables,
                costo_total=cost_result.get("total_costs", 0),
                breakdown={
                    "costosFijos": request.costos_fijos,
                    "costosVariables": cost_result.get("total_variable_costs", 0),
                    "cantidad": request.cantidad,
                    "cost_analysis": cost_result
                }
            )
            
            logger.info(f"Costs analysis coordinated successfully - ID: {analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Costs analysis coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de costos: {str(e)}",
                operation="costs_analysis"
            )
    
    def analyze_profit(self, request: ProfitRequest) -> ProfitAnalysisResult:
        """
        Analyze profit and margin.
        
        Args:
            request: Profit analysis request
            
        Returns:
            ProfitAnalysisResult with analysis details
        """
        try:
            # Delegate to pure profit service
            profit_result = self.profit_service.analyze_profit(
                request.ingreso_total, request.costo_total, request.description
            )
            
            # Generate analysis ID
            analysis_id = f"profit-{uuid.uuid4().hex[:8]}"
            
            # Create domain result
            result = ProfitAnalysisResult(
                analysis_id=analysis_id,
                analysis_type="profit",
                analysis_date=datetime.now(),
                description=request.description,
                ingreso_total=request.ingreso_total,
                costo_total=request.costo_total,
                beneficio_neto=profit_result.get("net_profit", 0),
                margen=profit_result.get("profit_margin", 0),
                metadata={
                    "profit_analysis": profit_result,
                    "metrics": profit_result.get("metrics", {})
                }
            )
            
            logger.info(f"Profit analysis coordinated successfully - ID: {analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Profit analysis coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de beneficios: {str(e)}",
                operation="profit_analysis"
            )
    
    def analyze_breakeven(self, request: BreakevenRequest) -> BreakevenAnalysisResult:
        """
        Analyze break-even point.
        
        Args:
            request: Break-even analysis request
            
        Returns:
            BreakevenAnalysisResult with analysis details
        """
        try:
            # Delegate to pure cost service for break-even calculation
            breakeven_result = self.cost_service.calculate_break_even_point(
                request.costos_fijos, request.precio, request.costo_variable_unitario
            )
            
            # Generate analysis ID
            analysis_id = f"breakeven-{uuid.uuid4().hex[:8]}"
            
            # Create domain result
            result = BreakevenAnalysisResult(
                analysis_id=analysis_id,
                analysis_type="breakeven",
                analysis_date=datetime.now(),
                description=request.description,
                costos_fijos=request.costos_fijos,
                precio=request.precio,
                costo_variable_unitario=request.costo_variable_unitario,
                punto_equilibrio=breakeven_result.get("break_even_quantity"),
                analisis_sensibilidad={
                    "margen_contribucion": breakeven_result.get("contribution_margin", 0),
                    "porcentaje_margen": breakeven_result.get("contribution_margin_percentage", 0),
                    "is_viable": breakeven_result.get("is_viable", False),
                    "reason": breakeven_result.get("reason", ""),
                    "breakeven_analysis": breakeven_result
                }
            )
            
            logger.info(f"Break-even analysis coordinated successfully - ID: {analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Break-even analysis coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de punto de equilibrio: {str(e)}",
                operation="breakeven_analysis"
            )
    
    def analyze_business_optimization(
        self, 
        current_revenue: float, 
        current_costs: float,
        target_profit_increase: float
    ) -> Dict[str, Any]:
        """
        Analyze business optimization scenarios.
        
        Args:
            current_revenue: Current revenue
            current_costs: Current costs
            target_profit_increase: Target profit increase percentage
            
        Returns:
            Dict with optimization analysis
        """
        try:
            # Get profit optimization scenarios
            profit_optimization = self.profit_service.calculate_profit_optimization(
                current_revenue, current_costs, target_profit_increase, "percentage"
            )
            
            # Get cost optimization scenarios
            cost_optimization = self.cost_service.calculate_cost_optimization(
                current_costs * 0.6,  # Assume 60% fixed, 40% variable
                current_costs * 0.4,
                target_profit_increase * 0.4,  # Target 40% cost reduction
                "percentage"
            )
            
            # Combine results
            optimization_analysis = {
                "profit_optimization": profit_optimization,
                "cost_optimization": cost_optimization,
                "recommendations": self._generate_optimization_recommendations(
                    profit_optimization, cost_optimization
                )
            }
            
            logger.info("Business optimization analysis coordinated successfully")
            return optimization_analysis
            
        except Exception as e:
            logger.error(f"Business optimization coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de optimización empresarial: {str(e)}",
                operation="business_optimization"
            )
    
    # ========================================
    # PRIVATE HELPER METHODS
    # ========================================
    
    def _generate_optimization_recommendations(
        self, 
        profit_optimization: Dict[str, Any], 
        cost_optimization: Dict[str, Any]
    ) -> list[str]:
        """Generate optimization recommendations based on analysis."""
        recommendations = []
        
        # Profit optimization recommendations
        if profit_optimization.get("scenarios"):
            scenarios = profit_optimization["scenarios"]
            if scenarios.get("increase_revenue_only"):
                recommendations.append("Enfocarse en aumentar ingresos para mejorar beneficios")
            if scenarios.get("decrease_costs_only"):
                recommendations.append("Reducir costos para mejorar beneficios")
            if scenarios.get("mixed_approach"):
                recommendations.append("Enfoque mixto: aumentar ingresos y reducir costos")
        
        # Cost optimization recommendations
        if cost_optimization.get("scenarios"):
            scenarios = cost_optimization["scenarios"]
            if scenarios.get("fixed_costs_only"):
                recommendations.append("Priorizar reducción de costos fijos")
            if scenarios.get("variable_costs_only"):
                recommendations.append("Priorizar reducción de costos variables")
            if scenarios.get("proportional"):
                recommendations.append("Reducción proporcional de costos fijos y variables")
        
        return recommendations
