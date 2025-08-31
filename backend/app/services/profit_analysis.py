# -*- coding: utf-8 -*-
"""
@fileoverview Pure profit analysis service for business calculations
@version 1.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Pure business service for profit analysis and calculations.
No coordination, no complex business logic - just pure profit mathematics.

@dependencies
- app.core.exceptions for error handling
- datetime for timestamping

@usage
from app.services.profit_analysis import ProfitAnalysisService
service = ProfitAnalysisService()
result = service.analyze_profit(revenue, costs, description)

@state
✅ Functional - Pure profit calculations

@bugs
- None currently identified

@todo
- Add profit margin analysis
- Add profit trend analysis
- Add profit optimization scenarios

@performance
- O(1) for basic calculations
- Efficient memory usage

@security
- Input validation to prevent calculation errors
- No external dependencies
"""

import logging
from typing import Dict, Any, Optional
from datetime import datetime
from app.core.exceptions import BusinessLogicException

logger = logging.getLogger(__name__)


class ProfitAnalysisService:
    """Pure business service for profit analysis operations."""
    
    def __init__(self):
        self.service_name = "ProfitAnalysisService"
    
    def analyze_profit(
        self, 
        revenue: float, 
        costs: float, 
        description: str = ""
    ) -> Dict[str, Any]:
        """
        Analyze profit and margin.
        
        Args:
            revenue: Total revenue
            costs: Total costs
            description: Optional description of the analysis
            
        Returns:
            Dict with profit analysis results
        """
        try:
            # Validate inputs
            if revenue < 0:
                raise BusinessLogicException(
                    "Los ingresos no pueden ser negativos",
                    operation="profit_analysis"
                )
            if costs < 0:
                raise BusinessLogicException(
                    "Los costos no pueden ser negativos",
                    operation="profit_analysis"
                )
            
            # Calculate profit and margin
            net_profit = revenue - costs
            profit_margin = (net_profit / revenue * 100) if revenue > 0 else 0
            cost_margin = (costs / revenue * 100) if revenue > 0 else 0
            
            # Calculate additional metrics
            metrics = self._calculate_profit_metrics(revenue, costs, net_profit, profit_margin)
            
            # Return pure profit results
            return {
                "revenue": revenue,
                "costs": costs,
                "net_profit": net_profit,
                "profit_margin": profit_margin,
                "cost_margin": cost_margin,
                "description": description,
                "metrics": metrics,
                "analysis_timestamp": datetime.now().isoformat()
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Profit analysis failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de beneficios: {str(e)}",
                operation="profit_analysis"
            )
    
    def _calculate_profit_metrics(
        self, 
        revenue: float, 
        costs: float, 
        net_profit: float, 
        profit_margin: float
    ) -> Dict[str, Any]:
        """Calculate additional profit metrics."""
        try:
            metrics = {
                "profitability_ratio": net_profit / revenue if revenue > 0 else 0,
                "cost_efficiency": revenue / costs if costs > 0 else 0,
                "profit_percentage": profit_margin,
                "cost_percentage": (costs / revenue * 100) if revenue > 0 else 0
            }
            
            # Add profit classification
            if profit_margin > 20:
                profit_classification = "Alto"
            elif profit_margin > 10:
                profit_classification = "Medio"
            elif profit_margin > 0:
                profit_classification = "Bajo"
            else:
                profit_classification = "Sin beneficios"
            
            metrics["profit_classification"] = profit_classification
            
            return metrics
            
        except Exception as e:
            logger.error(f"Profit metrics calculation failed: {str(e)}")
            return {
                "profitability_ratio": 0,
                "cost_efficiency": 0,
                "profit_percentage": 0,
                "cost_percentage": 0,
                "profit_classification": "Error"
            }
    
    def calculate_profit_optimization(
        self, 
        current_revenue: float, 
        current_costs: float,
        target_profit_increase: float,
        optimization_type: str = "percentage"
    ) -> Dict[str, Any]:
        """
        Calculate profit optimization scenarios.
        
        Args:
            current_revenue: Current revenue
            current_costs: Current costs
            target_profit_increase: Target profit increase amount or percentage
            optimization_type: "amount" or "percentage"
            
        Returns:
            Dict with optimization scenarios
        """
        try:
            # Validate inputs
            if current_revenue < 0 or current_costs < 0:
                raise BusinessLogicException(
                    "Los ingresos y costos actuales no pueden ser negativos",
                    operation="profit_analysis"
                )
            if target_profit_increase < 0:
                raise BusinessLogicException(
                    "El incremento objetivo de beneficios no puede ser negativo",
                    operation="profit_analysis"
                )
            if optimization_type not in ["amount", "percentage"]:
                raise BusinessLogicException(
                    "El tipo de optimización debe ser 'amount' o 'percentage'",
                    operation="profit_analysis"
                )
            
            # Calculate current profit
            current_profit = current_revenue - current_costs
            
            # Calculate target profit increase
            if optimization_type == "percentage":
                target_increase_amount = current_profit * (target_profit_increase / 100) if current_profit > 0 else 0
            else:
                target_increase_amount = target_profit_increase
            
            target_profit = current_profit + target_increase_amount
            
            # Calculate optimization scenarios
            scenarios = {
                "increase_revenue_only": {
                    "new_revenue": current_revenue + target_increase_amount,
                    "new_costs": current_costs,
                    "new_profit": target_profit,
                    "revenue_increase": target_increase_amount
                },
                "decrease_costs_only": {
                    "new_revenue": current_revenue,
                    "new_costs": max(0, current_costs - target_increase_amount),
                    "new_profit": target_profit,
                    "cost_decrease": target_increase_amount
                },
                "mixed_approach": {
                    "revenue_increase": target_increase_amount * 0.6,  # 60% revenue, 40% cost
                    "cost_decrease": target_increase_amount * 0.4,
                    "new_revenue": current_revenue + (target_increase_amount * 0.6),
                    "new_costs": max(0, current_costs - (target_increase_amount * 0.4)),
                    "new_profit": target_profit
                }
            }
            
            return {
                "current_state": {
                    "revenue": current_revenue,
                    "costs": current_costs,
                    "profit": current_profit
                },
                "target": {
                    "type": optimization_type,
                    "value": target_profit_increase,
                    "amount": target_increase_amount,
                    "profit": target_profit
                },
                "scenarios": scenarios
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Profit optimization calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de optimización de beneficios: {str(e)}",
                operation="profit_analysis"
            )
    
    def calculate_profit_trends(
        self, 
        historical_data: list[Dict[str, float]]
    ) -> Dict[str, Any]:
        """
        Calculate profit trends from historical data.
        
        Args:
            historical_data: List of dicts with 'revenue', 'costs', 'profit' keys
            
        Returns:
            Dict with trend analysis
        """
        try:
            if not historical_data or len(historical_data) < 2:
                raise BusinessLogicException(
                    "Se requieren al menos 2 puntos de datos para análisis de tendencias",
                    operation="profit_analysis"
                )
            
            # Extract data
            revenues = [item.get('revenue', 0) for item in historical_data]
            costs = [item.get('costs', 0) for item in historical_data]
            profits = [item.get('profit', 0) for item in historical_data]
            
            # Calculate trends
            revenue_trend = self._calculate_trend(revenues)
            cost_trend = self._calculate_trend(costs)
            profit_trend = self._calculate_trend(profits)
            
            # Calculate growth rates
            revenue_growth = self._calculate_growth_rate(revenues)
            cost_growth = self._calculate_growth_rate(costs)
            profit_growth = self._calculate_growth_rate(profits)
            
            return {
                "data_points": len(historical_data),
                "trends": {
                    "revenue": revenue_trend,
                    "costs": cost_trend,
                    "profit": profit_trend
                },
                "growth_rates": {
                    "revenue": revenue_growth,
                    "costs": cost_growth,
                    "profit": profit_growth
                },
                "summary": {
                    "is_profitable": all(p >= 0 for p in profits),
                    "trending_up": profit_trend > 0,
                    "stable_margins": abs(revenue_growth - cost_growth) < 5
                }
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Profit trend calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de tendencias de beneficios: {str(e)}",
                operation="profit_analysis"
            )
    
    def _calculate_trend(self, values: list[float]) -> float:
        """Calculate simple linear trend (positive = increasing, negative = decreasing)."""
        if len(values) < 2:
            return 0
        
        # Simple trend: difference between last and first value
        return values[-1] - values[0]
    
    def _calculate_growth_rate(self, values: list[float]) -> float:
        """Calculate average growth rate between consecutive values."""
        if len(values) < 2:
            return 0
        
        growth_rates = []
        for i in range(1, len(values)):
            if values[i-1] != 0:
                growth_rate = ((values[i] - values[i-1]) / values[i-1]) * 100
                growth_rates.append(growth_rate)
        
        return sum(growth_rates) / len(growth_rates) if growth_rates else 0
