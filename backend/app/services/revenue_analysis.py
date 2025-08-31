# -*- coding: utf-8 -*-
"""
@fileoverview Pure revenue analysis service for business calculations
@version 1.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Pure business service for revenue analysis and calculations.
No coordination, no complex business logic - just pure revenue mathematics.

@dependencies
- app.core.exceptions for error handling
- datetime for timestamping

@usage
from app.services.revenue_analysis import RevenueAnalysisService
service = RevenueAnalysisService()
result = service.analyze_revenue(price, quantity, description)

@state
✅ Functional - Pure revenue calculations

@bugs
- None currently identified

@todo
- Add revenue projections
- Add seasonal analysis
- Add growth rate calculations

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


class RevenueAnalysisService:
    """Pure business service for revenue analysis operations."""
    
    def __init__(self):
        self.service_name = "RevenueAnalysisService"
    
    def analyze_revenue(
        self, 
        price: float, 
        quantity: float, 
        description: str = ""
    ) -> Dict[str, Any]:
        """
        Analyze revenue based on price and quantity.
        
        Args:
            price: Unit price
            quantity: Number of units sold
            description: Optional description of the analysis
            
        Returns:
            Dict with revenue analysis results
        """
        try:
            # Validate inputs
            if price < 0:
                raise BusinessLogicException(
                    "El precio no puede ser negativo",
                    operation="revenue_analysis"
                )
            if quantity < 0:
                raise BusinessLogicException(
                    "La cantidad no puede ser negativa",
                    operation="revenue_analysis"
                )
            
            # Calculate total revenue
            total_revenue = price * quantity
            
            # Calculate additional metrics
            metrics = self._calculate_revenue_metrics(price, quantity, total_revenue)
            
            # Return pure revenue results
            return {
                "price": price,
                "quantity": quantity,
                "total_revenue": total_revenue,
                "description": description,
                "metrics": metrics,
                "analysis_timestamp": datetime.now().isoformat()
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Revenue analysis failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de ingresos: {str(e)}",
                operation="revenue_analysis"
            )
    
    def _calculate_revenue_metrics(
        self, 
        price: float, 
        quantity: float, 
        total_revenue: float
    ) -> Dict[str, Any]:
        """Calculate additional revenue metrics."""
        try:
            # Average revenue per unit (same as price for single price point)
            avg_revenue_per_unit = price if quantity > 0 else 0
            
            # Revenue efficiency (revenue per unit of input)
            revenue_efficiency = total_revenue / quantity if quantity > 0 else 0
            
            # Marginal revenue (additional revenue from one more unit)
            marginal_revenue = price
            
            # Revenue growth rate (if we had previous data)
            # For now, we'll set this as a placeholder
            revenue_growth_rate = None
            
            return {
                "average_revenue_per_unit": avg_revenue_per_unit,
                "revenue_efficiency": revenue_efficiency,
                "marginal_revenue": marginal_revenue,
                "revenue_growth_rate": revenue_growth_rate
            }
            
        except Exception as e:
            logger.error(f"Revenue metrics calculation failed: {str(e)}")
            return {
                "average_revenue_per_unit": 0,
                "revenue_efficiency": 0,
                "marginal_revenue": 0,
                "revenue_growth_rate": None
            }
    
    def calculate_revenue_with_discount(
        self, 
        original_price: float, 
        quantity: float, 
        discount_percentage: float
    ) -> Dict[str, Any]:
        """
        Calculate revenue with discount applied.
        
        Args:
            original_price: Original unit price
            quantity: Number of units
            discount_percentage: Discount percentage (0-100)
            
        Returns:
            Dict with discounted revenue analysis
        """
        try:
            # Validate discount percentage
            if not (0 <= discount_percentage <= 100):
                raise BusinessLogicException(
                    "El porcentaje de descuento debe estar entre 0 y 100",
                    operation="revenue_analysis"
                )
            
            # Calculate discounted price
            discount_amount = original_price * (discount_percentage / 100)
            discounted_price = original_price - discount_amount
            
            # Calculate revenue with discount
            discounted_revenue = discounted_price * quantity
            original_revenue = original_price * quantity
            total_discount = original_revenue - discounted_revenue
            
            return {
                "original_price": original_price,
                "discounted_price": discounted_price,
                "discount_percentage": discount_percentage,
                "discount_amount": discount_amount,
                "quantity": quantity,
                "original_revenue": original_revenue,
                "discounted_revenue": discounted_revenue,
                "total_discount": total_discount,
                "savings_percentage": (total_discount / original_revenue * 100) if original_revenue > 0 else 0
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Discounted revenue calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de ingresos con descuento: {str(e)}",
                operation="revenue_analysis"
            )
    
    def calculate_revenue_projection(
        self, 
        current_revenue: float, 
        growth_rate: float, 
        periods: int
    ) -> Dict[str, Any]:
        """
        Calculate revenue projection over multiple periods.
        
        Args:
            current_revenue: Current revenue
            growth_rate: Growth rate per period (as decimal, e.g., 0.05 for 5%)
            periods: Number of periods to project
            
        Returns:
            Dict with revenue projections
        """
        try:
            # Validate inputs
            if current_revenue < 0:
                raise BusinessLogicException(
                    "El ingreso actual no puede ser negativo",
                    operation="revenue_analysis"
                )
            if periods < 1:
                raise BusinessLogicException(
                    "El número de períodos debe ser al menos 1",
                    operation="revenue_analysis"
                )
            
            # Calculate projections
            projections = []
            cumulative_growth = 1.0
            
            for period in range(1, periods + 1):
                cumulative_growth *= (1 + growth_rate)
                projected_revenue = current_revenue * cumulative_growth
                
                projections.append({
                    "period": period,
                    "projected_revenue": round(projected_revenue, 2),
                    "growth_multiplier": round(cumulative_growth, 4),
                    "period_growth": round(growth_rate * 100, 2)
                })
            
            # Calculate summary metrics
            final_revenue = current_revenue * cumulative_growth
            total_growth = final_revenue - current_revenue
            average_growth_rate = ((final_revenue / current_revenue) ** (1/periods) - 1) if periods > 0 else 0
            
            return {
                "current_revenue": current_revenue,
                "growth_rate_per_period": growth_rate,
                "number_of_periods": periods,
                "projections": projections,
                "summary": {
                    "final_revenue": round(final_revenue, 2),
                    "total_growth": round(total_growth, 2),
                    "total_growth_percentage": round((total_growth / current_revenue * 100), 2),
                    "average_growth_rate": round(average_growth_rate, 4)
                }
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Revenue projection calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de proyección de ingresos: {str(e)}",
                operation="revenue_analysis"
            )
