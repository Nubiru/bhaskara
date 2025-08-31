# -*- coding: utf-8 -*-
"""
@fileoverview Pure cost analysis service for business calculations
@version 1.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Pure business service for cost analysis and calculations.
No coordination, no complex business logic - just pure cost mathematics.

@dependencies
- app.core.exceptions for error handling
- datetime for timestamping

@usage
from app.services.cost_analysis import CostAnalysisService
service = CostAnalysisService()
result = service.analyze_costs(fixed_costs, variable_costs, quantity)

@state
✅ Functional - Pure cost calculations

@bugs
- None currently identified

@todo
- Add cost breakdown by category
- Add cost optimization suggestions
- Add cost trend analysis

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


class CostAnalysisService:
    """Pure business service for cost analysis operations."""
    
    def __init__(self):
        self.service_name = "CostAnalysisService"
    
    def analyze_costs(
        self, 
        fixed_costs: float, 
        variable_costs: float, 
        quantity: Optional[float] = None,
        description: str = ""
    ) -> Dict[str, Any]:
        """
        Analyze costs breakdown.
        
        Args:
            fixed_costs: Fixed costs (independent of quantity)
            variable_costs: Variable costs per unit
            quantity: Number of units (optional for total variable costs)
            description: Optional description of the analysis
            
        Returns:
            Dict with cost analysis results
        """
        try:
            # Validate inputs
            if fixed_costs < 0:
                raise BusinessLogicException(
                    "Los costos fijos no pueden ser negativos",
                    operation="cost_analysis"
                )
            if variable_costs < 0:
                raise BusinessLogicException(
                    "Los costos variables no pueden ser negativos",
                    operation="cost_analysis"
                )
            if quantity is not None and quantity < 0:
                raise BusinessLogicException(
                    "La cantidad no puede ser negativa",
                    operation="cost_analysis"
                )
            
            # Calculate costs
            if quantity is not None:
                total_variable_costs = variable_costs * quantity
                total_costs = fixed_costs + total_variable_costs
                cost_per_unit = total_costs / quantity if quantity > 0 else 0
            else:
                total_variable_costs = variable_costs
                total_costs = fixed_costs + variable_costs
                cost_per_unit = None
            
            # Calculate additional metrics
            metrics = self._calculate_cost_metrics(
                fixed_costs, variable_costs, total_costs, quantity
            )
            
            # Return pure cost results
            return {
                "fixed_costs": fixed_costs,
                "variable_costs": variable_costs,
                "quantity": quantity,
                "total_variable_costs": total_variable_costs,
                "total_costs": total_costs,
                "cost_per_unit": cost_per_unit,
                "description": description,
                "metrics": metrics,
                "analysis_timestamp": datetime.now().isoformat()
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Cost analysis failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de costos: {str(e)}",
                operation="cost_analysis"
            )
    
    def _calculate_cost_metrics(
        self, 
        fixed_costs: float, 
        variable_costs: float, 
        total_costs: float, 
        quantity: Optional[float]
    ) -> Dict[str, Any]:
        """Calculate additional cost metrics."""
        try:
            metrics = {
                "fixed_cost_percentage": (fixed_costs / total_costs * 100) if total_costs > 0 else 0,
                "variable_cost_percentage": ((total_costs - fixed_costs) / total_costs * 100) if total_costs > 0 else 0
            }
            
            if quantity is not None and quantity > 0:
                metrics.update({
                    "fixed_cost_per_unit": fixed_costs / quantity,
                    "variable_cost_per_unit": variable_costs,
                    "total_cost_per_unit": total_costs / quantity
                })
            
            return metrics
            
        except Exception as e:
            logger.error(f"Cost metrics calculation failed: {str(e)}")
            return {
                "fixed_cost_percentage": 0,
                "variable_cost_percentage": 0
            }
    
    def calculate_break_even_point(
        self, 
        fixed_costs: float, 
        price_per_unit: float, 
        variable_cost_per_unit: float
    ) -> Dict[str, Any]:
        """
        Calculate break-even point.
        
        Args:
            fixed_costs: Total fixed costs
            price_per_unit: Price per unit
            variable_cost_per_unit: Variable cost per unit
            
        Returns:
            Dict with break-even analysis
        """
        try:
            # Validate inputs
            if fixed_costs < 0:
                raise BusinessLogicException(
                    "Los costos fijos no pueden ser negativos",
                    operation="cost_analysis"
                )
            if price_per_unit <= 0:
                raise BusinessLogicException(
                    "El precio por unidad debe ser mayor que cero",
                    operation="cost_analysis"
                )
            if variable_cost_per_unit < 0:
                raise BusinessLogicException(
                    "El costo variable por unidad no puede ser negativo",
                    operation="cost_analysis"
                )
            
            # Check if break-even is possible
            if price_per_unit <= variable_cost_per_unit:
                return {
                    "break_even_quantity": None,
                    "break_even_revenue": None,
                    "contribution_margin": price_per_unit - variable_cost_per_unit,
                    "contribution_margin_percentage": 0,
                    "is_viable": False,
                    "reason": "El precio debe ser mayor que el costo variable por unidad para alcanzar el punto de equilibrio"
                }
            
            # Calculate break-even point
            contribution_margin = price_per_unit - variable_cost_per_unit
            contribution_margin_percentage = (contribution_margin / price_per_unit) * 100
            break_even_quantity = fixed_costs / contribution_margin
            break_even_revenue = break_even_quantity * price_per_unit
            
            return {
                "break_even_quantity": round(break_even_quantity, 2),
                "break_even_revenue": round(break_even_revenue, 2),
                "contribution_margin": round(contribution_margin, 2),
                "contribution_margin_percentage": round(contribution_margin_percentage, 2),
                "is_viable": True,
                "reason": "Punto de equilibrio alcanzable"
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Break-even calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo del punto de equilibrio: {str(e)}",
                operation="cost_analysis"
            )
    
    def calculate_cost_optimization(
        self, 
        current_fixed_costs: float, 
        current_variable_costs: float,
        target_cost_reduction: float,
        reduction_type: str = "percentage"
    ) -> Dict[str, Any]:
        """
        Calculate cost optimization scenarios.
        
        Args:
            current_fixed_costs: Current fixed costs
            current_variable_costs: Current variable costs per unit
            target_cost_reduction: Target reduction amount or percentage
            reduction_type: "amount" or "percentage"
            
        Returns:
            Dict with optimization scenarios
        """
        try:
            # Validate inputs
            if current_fixed_costs < 0 or current_variable_costs < 0:
                raise BusinessLogicException(
                    "Los costos actuales no pueden ser negativos",
                    operation="cost_analysis"
                )
            if target_cost_reduction < 0:
                raise BusinessLogicException(
                    "La reducción objetivo no puede ser negativa",
                    operation="cost_analysis"
                )
            if reduction_type not in ["amount", "percentage"]:
                raise BusinessLogicException(
                    "El tipo de reducción debe ser 'amount' o 'percentage'",
                    operation="cost_analysis"
                )
            
            # Calculate target reduction
            if reduction_type == "percentage":
                if target_cost_reduction > 100:
                    raise BusinessLogicException(
                        "El porcentaje de reducción no puede ser mayor al 100%",
                        operation="cost_analysis"
                    )
                target_reduction_amount = (current_fixed_costs + current_variable_costs) * (target_cost_reduction / 100)
            else:
                target_reduction_amount = target_cost_reduction
            
            # Calculate new costs
            total_current_costs = current_fixed_costs + current_variable_costs
            new_total_costs = total_current_costs - target_reduction_amount
            
            if new_total_costs < 0:
                new_total_costs = 0
                actual_reduction = total_current_costs
            else:
                actual_reduction = target_reduction_amount
            
            # Calculate optimization scenarios
            scenarios = {
                "fixed_costs_only": {
                    "new_fixed_costs": max(0, current_fixed_costs - actual_reduction),
                    "new_variable_costs": current_variable_costs,
                    "total_savings": actual_reduction
                },
                "variable_costs_only": {
                    "new_fixed_costs": current_fixed_costs,
                    "new_variable_costs": max(0, current_variable_costs - actual_reduction),
                    "total_savings": actual_reduction
                },
                "proportional": {
                    "reduction_ratio": actual_reduction / total_current_costs if total_current_costs > 0 else 0,
                    "new_fixed_costs": max(0, current_fixed_costs * (1 - actual_reduction / total_current_costs)) if total_current_costs > 0 else 0,
                    "new_variable_costs": max(0, current_variable_costs * (1 - actual_reduction / total_current_costs)) if total_current_costs > 0 else 0,
                    "total_savings": actual_reduction
                }
            }
            
            return {
                "current_costs": {
                    "fixed": current_fixed_costs,
                    "variable": current_variable_costs,
                    "total": total_current_costs
                },
                "target_reduction": {
                    "type": reduction_type,
                    "value": target_cost_reduction,
                    "amount": target_reduction_amount
                },
                "actual_reduction": actual_reduction,
                "new_total_costs": new_total_costs,
                "scenarios": scenarios
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Cost optimization calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de optimización de costos: {str(e)}",
                operation="cost_analysis"
            )
