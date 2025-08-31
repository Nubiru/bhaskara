# -*- coding: utf-8 -*-
"""
@fileoverview Pure compound interest service for financial calculations
@version 1.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Pure financial service for compound interest calculations.
No coordination, no complex business logic - just pure financial mathematics.

@dependencies
- app.core.exceptions for error handling
- datetime for timestamping

@usage
from app.services.compound_interest import CompoundInterestService
service = CompoundInterestService()
result = service.calculate_compound_interest(principal, rate, frequency, years, contributions)

@state
✅ Functional - Pure financial calculations

@bugs
- None currently identified

@todo
- Add inflation adjustment
- Add tax implications
- Add risk assessment

@performance
- O(n) for contribution schedules
- Efficient memory usage

@security
- Input validation to prevent calculation errors
- No external dependencies
"""

import logging
from typing import Dict, Any, Optional, List
from datetime import datetime
from app.core.exceptions import BusinessLogicException

logger = logging.getLogger(__name__)


class CompoundInterestService:
    """Pure financial service for compound interest calculations."""
    
    def __init__(self):
        self.service_name = "CompoundInterestService"
    
    def calculate_compound_interest(
        self,
        principal: float,
        annual_rate: float,
        frequency: int,
        years: float,
        contributions: Optional[float] = None,
        contribution_frequency: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Calculate compound interest with optional contributions.
        
        Args:
            principal: Initial capital (>= 0)
            annual_rate: Annual interest rate as decimal (0.05 = 5%)
            frequency: Times per year that interest is compounded (1, 2, 4, 12, 365)
            years: Investment time in years (> 0)
            contributions: Regular contribution per period (>= 0, optional)
            contribution_frequency: 'monthly' or 'annual' (optional)
        
        Returns:
            Dict with calculation results
        """
        try:
            # Validate inputs
            self._validate_inputs(principal, annual_rate, frequency, years, contributions)
            
            # Calculate period rate and total periods
            period_rate = annual_rate / frequency
            total_periods = int(frequency * years)
            
            # Calculate principal amount with compound interest
            principal_amount = principal * (1 + period_rate) ** total_periods
            
            # Calculate contributions if they exist
            contribution_amount = 0.0
            total_contributions = 0.0
            schedule = []
            
            if contributions and contributions > 0:
                contribution_amount, total_contributions, schedule = self._calculate_contributions(
                    contributions, contribution_frequency, years, period_rate, frequency
                )
            
            # Calculate final results
            final_amount = principal_amount + contribution_amount
            interest_earned = final_amount - principal - total_contributions
            
            # Return pure financial results
            return {
                "principal": principal,
                "annual_rate": annual_rate,
                "frequency": frequency,
                "years": years,
                "contributions": contributions or 0,
                "contribution_frequency": contribution_frequency or "annual",
                "final_amount": round(final_amount, 2),
                "interest_earned": round(interest_earned, 2),
                "total_contributions": round(total_contributions, 2),
                "schedule": schedule,
                "breakdown": {
                    "principal_amount": round(principal_amount, 2),
                    "contribution_amount": round(contribution_amount, 2),
                    "total_periods": total_periods,
                    "period_rate": round(period_rate, 6)
                }
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Compound interest calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de interés compuesto: {str(e)}",
                operation="compound_interest_calculation"
            )
    
    def _validate_inputs(
        self, 
        principal: float, 
        annual_rate: float, 
        frequency: int, 
        years: float, 
        contributions: Optional[float]
    ):
        """Validate all input parameters."""
        if principal < 0:
            raise BusinessLogicException(
                "El capital inicial debe ser >= 0",
                operation="compound_interest_calculation"
            )
        if annual_rate < 0 or annual_rate > 1:
            raise BusinessLogicException(
                "La tasa anual debe estar entre 0 y 1",
                operation="compound_interest_calculation"
            )
        if frequency <= 0:
            raise BusinessLogicException(
                "La frecuencia anual debe ser > 0",
                operation="compound_interest_calculation"
            )
        if years <= 0:
            raise BusinessLogicException(
                "Los años deben ser > 0",
                operation="compound_interest_calculation"
            )
        if contributions is not None and contributions < 0:
            raise BusinessLogicException(
                "Las contribuciones deben ser >= 0",
                operation="compound_interest_calculation"
            )
    
    def _calculate_contributions(
        self,
        contributions: float,
        contribution_frequency: str,
        years: float,
        period_rate: float,
        frequency: int
    ) -> tuple[float, float, List[Dict[str, Any]]]:
        """Calculate contribution amounts and generate schedule."""
        try:
            if contribution_frequency == 'monthly':
                contributions_per_period = contributions / 12
                contribution_periods = int(frequency * years)
            elif contribution_frequency == 'annual':
                contributions_per_period = contributions
                contribution_periods = int(years)
            else:
                # Default to annual contributions
                contributions_per_period = contributions
                contribution_periods = int(years)
            
            # Formula for regular contributions with compound interest
            if period_rate > 0:
                contribution_amount = contributions_per_period * (
                    ((1 + period_rate) ** contribution_periods - 1) / period_rate
                )
            else:
                contribution_amount = contributions_per_period * contribution_periods
            
            total_contributions = contributions_per_period * contribution_periods
            
            # Generate schedule for charts
            schedule = self._generate_contribution_schedule(
                contributions_per_period, contribution_periods, years, period_rate
            )
            
            return contribution_amount, total_contributions, schedule
            
        except Exception as e:
            logger.error(f"Contribution calculation failed: {str(e)}")
            return 0.0, 0.0, []
    
    def _generate_contribution_schedule(
        self,
        contributions_per_period: float,
        contribution_periods: int,
        years: float,
        period_rate: float
    ) -> List[Dict[str, Any]]:
        """Generate contribution schedule for visualization."""
        try:
            schedule = []
            
            for i in range(contribution_periods + 1):
                year = i / (contribution_periods / years) if contribution_periods > 0 else 0
                
                if period_rate > 0:
                    partial_amount = contributions_per_period * (
                        ((1 + period_rate) ** i - 1) / period_rate
                    )
                else:
                    partial_amount = contributions_per_period * i
                
                schedule.append({
                    "year": round(year, 2),
                    "amount": round(partial_amount, 2),
                    "contributions": round(contributions_per_period * i, 2),
                    "interest": round(partial_amount - contributions_per_period * i, 2)
                })
            
            return schedule
            
        except Exception as e:
            logger.error(f"Schedule generation failed: {str(e)}")
            return []
    
    def calculate_effective_annual_rate(
        self, 
        nominal_rate: float, 
        frequency: int
    ) -> Dict[str, Any]:
        """
        Calculate effective annual rate (EAR) from nominal rate.
        
        Args:
            nominal_rate: Nominal annual rate as decimal
            frequency: Compounding frequency per year
            
        Returns:
            Dict with EAR calculation
        """
        try:
            # Validate inputs
            if nominal_rate < 0 or nominal_rate > 1:
                raise BusinessLogicException(
                    "La tasa nominal debe estar entre 0 y 1",
                    operation="compound_interest_calculation"
                )
            if frequency <= 0:
                raise BusinessLogicException(
                    "La frecuencia debe ser > 0",
                    operation="compound_interest_calculation"
                )
            
            # Calculate EAR
            effective_rate = (1 + nominal_rate / frequency) ** frequency - 1
            
            # Calculate difference
            rate_difference = effective_rate - nominal_rate
            
            return {
                "nominal_rate": nominal_rate,
                "frequency": frequency,
                "effective_rate": round(effective_rate, 6),
                "effective_rate_percentage": round(effective_rate * 100, 4),
                "rate_difference": round(rate_difference, 6),
                "rate_difference_percentage": round(rate_difference * 100, 4)
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"EAR calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de tasa efectiva: {str(e)}",
                operation="compound_interest_calculation"
            )
    
    def calculate_rule_of_72(
        self, 
        annual_rate: float
    ) -> Dict[str, Any]:
        """
        Calculate doubling time using Rule of 72.
        
        Args:
            annual_rate: Annual interest rate as decimal
            
        Returns:
            Dict with doubling time calculation
        """
        try:
            # Validate rate
            if annual_rate <= 0 or annual_rate > 1:
                raise BusinessLogicException(
                    "La tasa anual debe estar entre 0 y 1",
                    operation="compound_interest_calculation"
                )
            
            # Rule of 72: 72 / (rate * 100)
            doubling_time = 72 / (annual_rate * 100)
            
            # Calculate exact doubling time for comparison
            exact_doubling_time = 1 / annual_rate if annual_rate > 0 else float('inf')
            
            return {
                "annual_rate": annual_rate,
                "annual_rate_percentage": annual_rate * 100,
                "rule_of_72_doubling_time": round(doubling_time, 2),
                "exact_doubling_time": round(exact_doubling_time, 2),
                "rule_accuracy": round(abs(doubling_time - exact_doubling_time), 2),
                "rule_accuracy_percentage": round(
                    abs(doubling_time - exact_doubling_time) / exact_doubling_time * 100, 2
                ) if exact_doubling_time != float('inf') else 0
            }
            
        except BusinessLogicException:
            raise
        except Exception as e:
            logger.error(f"Rule of 72 calculation failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en cálculo de regla del 72: {str(e)}",
                operation="compound_interest_calculation"
            )
