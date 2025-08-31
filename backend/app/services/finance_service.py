# -*- coding: utf-8 -*-
"""
@fileoverview Financial analysis services coordinator
@version 2.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Coordinator service for financial analysis operations.
Uses strategy pattern to delegate to focused services for specific functionality.
Provides unified interface for financial analysis operations.

@dependencies
- app.models.schemas for request/response models
- app.models.domain for domain models
- app.core.exceptions for error handling
- Pure services: compound_interest, currency_conversion

@usage
from app.services.finance_service import FinanceCoordinator
coordinator = FinanceCoordinator()
result = coordinator.analyze_compound_interest(request)

@state
✅ Functional - Coordinator pattern implemented

@bugs
- None currently identified

@todo
- Add more financial analysis types
- Implement caching strategy
- Add performance monitoring

@performance
- O(1) for coordination overhead
- Delegates to optimized pure services

@security
- Input validation through pure services
- Secure external API integration
"""

import uuid
import logging
from typing import Dict, Any, Optional, List
from datetime import datetime

from app.models.schemas import (
    CompoundInterestRequest, CurrencyConversionRequest
)
from app.models.domain import (
    CompoundInterestResult, CurrencyConversionResult
)
from app.core.exceptions import BusinessLogicException
from .compound_interest import CompoundInterestService
from .external.currency_api import CurrencyAPIService

logger = logging.getLogger(__name__)


class FinanceCoordinator:
    """Coordinator service for financial analysis operations."""
    
    def __init__(self):
        self.service_name = "FinanceCoordinator"
        # Initialize pure services using strategy pattern
        self.compound_interest_service = CompoundInterestService()
        self.currency_service = CurrencyAPIService()
    
    def analyze_compound_interest(self, request: CompoundInterestRequest) -> CompoundInterestResult:
        """
        Analyze compound interest with optional contributions.
        
        Args:
            request: Compound interest analysis request
            
        Returns:
            CompoundInterestResult with analysis details
        """
        try:
            # Delegate to pure compound interest service
            interest_result = self.compound_interest_service.calculate_compound_interest(
                request.principal,
                request.tasa_anual,
                request.frecuencia_anual,
                request.años,
                request.contribuciones,
                request.frecuencia_contribucion
            )
            
            # Generate analysis ID
            analysis_id = f"compound-interest-{uuid.uuid4().hex[:8]}"
            
            # Create domain result
            result = CompoundInterestResult(
                analysis_id=analysis_id,
                analysis_type="compound_interest",
                analysis_date=datetime.now(),
                description=request.description,
                principal=request.principal,
                tasa_anual=request.tasa_anual,
                frecuencia_anual=request.frecuencia_anual,
                años=request.años,
                monto_final=interest_result.get("final_amount", 0),
                interes_ganado=interest_result.get("interest_earned", 0),
                schedule=interest_result.get("schedule", []),
                metadata={
                    "compound_interest_analysis": interest_result,
                    "breakdown": interest_result.get("breakdown", {}),
                    "total_contributions": interest_result.get("total_contributions", 0),
                    "frecuencia_contribucion": request.frecuencia_contribucion or "anual"
                }
            )
            
            logger.info(f"Compound interest analysis coordinated successfully - ID: {analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Compound interest coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de interés compuesto: {str(e)}",
                operation="compound_interest_analysis"
            )
    
    async def convert_currency(self, request: CurrencyConversionRequest) -> CurrencyConversionResult:
        """
        Convert currency using live exchange rates.
        
        Args:
            request: Currency conversion request
            
        Returns:
            CurrencyConversionResult with conversion details
        """
        try:
            # Get exchange rate from external service
            exchange_rate = await self.currency_service.get_exchange_rate(
                request.from_currency, request.to_currency
            )
            
            # Calculate converted amount
            converted_amount = request.amount * exchange_rate.rate
            
            # Get currency information
            currency_info = {
                "from": self._get_currency_info(request.from_currency),
                "to": self._get_currency_info(request.to_currency)
            }
            
            # Generate analysis ID
            analysis_id = f"currency-conversion-{uuid.uuid4().hex[:8]}"
            
            # Create domain result
            result = CurrencyConversionResult(
                analysis_id=analysis_id,
                analysis_type="currency_conversion",
                analysis_date=datetime.now(),
                description=request.description,
                original_amount=request.amount,
                original_currency=request.from_currency,
                target_currency=request.to_currency,
                exchange_rate=exchange_rate.rate,
                converted_amount=round(converted_amount, 2),
                conversion_date=exchange_rate.last_updated,
                currency_info=currency_info,
                metadata={
                    "source": exchange_rate.source,
                    "last_updated": exchange_rate.last_updated.isoformat(),
                    "exchange_rate_data": {
                        "from_currency": exchange_rate.from_currency,
                        "to_currency": exchange_rate.to_currency,
                        "rate": exchange_rate.rate,
                        "source": exchange_rate.source
                    }
                }
            )
            
            logger.info(f"Currency conversion coordinated successfully - ID: {analysis_id}")
            return result
            
        except Exception as e:
            logger.error(f"Currency conversion coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en conversión de divisas: {str(e)}",
                operation="currency_conversion"
            )
    
    def analyze_investment_scenarios(
        self,
        principal: float,
        annual_rate: float,
        years: float,
        scenarios: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Analyze multiple investment scenarios.
        
        Args:
            principal: Initial capital
            annual_rate: Annual interest rate
            years: Investment time
            scenarios: List of contribution scenarios
            
        Returns:
            Dict with scenario analysis
        """
        try:
            scenario_results = []
            
            for i, scenario in enumerate(scenarios):
                # Get contribution details
                contributions = scenario.get("contributions", 0)
                contribution_frequency = scenario.get("frequency", "annual")
                scenario_name = scenario.get("name", f"Scenario {i+1}")
                
                # Calculate compound interest for this scenario
                interest_result = self.compound_interest_service.calculate_compound_interest(
                    principal, annual_rate, 12, years, contributions, contribution_frequency
                )
                
                scenario_results.append({
                    "scenario_name": scenario_name,
                    "contributions": contributions,
                    "contribution_frequency": contribution_frequency,
                    "final_amount": interest_result.get("final_amount", 0),
                    "interest_earned": interest_result.get("interest_earned", 0),
                    "total_contributions": interest_result.get("total_contributions", 0),
                    "roi": self._calculate_roi(principal, interest_result.get("final_amount", 0)),
                    "analysis": interest_result
                })
            
            # Generate analysis ID
            analysis_id = f"investment-scenarios-{uuid.uuid4().hex[:8]}"
            
            # Create comprehensive analysis
            analysis = {
                "analysis_id": analysis_id,
                "analysis_type": "investment_scenarios",
                "analysis_date": datetime.now().isoformat(),
                "base_parameters": {
                    "principal": principal,
                    "annual_rate": annual_rate,
                    "years": years
                },
                "scenarios": scenario_results,
                "summary": self._generate_scenario_summary(scenario_results),
                "recommendations": self._generate_investment_recommendations(scenario_results)
            }
            
            logger.info(f"Investment scenarios analysis coordinated successfully - ID: {analysis_id}")
            return analysis
            
        except Exception as e:
            logger.error(f"Investment scenarios coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de escenarios de inversión: {str(e)}",
                operation="investment_scenarios_analysis"
            )
    
    def analyze_retirement_planning(
        self,
        current_age: int,
        retirement_age: int,
        current_savings: float,
        monthly_contribution: float,
        expected_return: float
    ) -> Dict[str, Any]:
        """
        Analyze retirement planning scenarios.
        
        Args:
            current_age: Current age
            retirement_age: Target retirement age
            current_savings: Current savings
            monthly_contribution: Monthly contribution
            expected_return: Expected annual return rate
            
        Returns:
            Dict with retirement analysis
        """
        try:
            # Calculate years to retirement
            years_to_retirement = retirement_age - current_age
            
            if years_to_retirement <= 0:
                raise BusinessLogicException(
                    "La edad de jubilación debe ser mayor que la edad actual",
                    operation="retirement_planning"
                )
            
            # Calculate compound interest with monthly contributions
            retirement_result = self.compound_interest_service.calculate_compound_interest(
                current_savings,
                expected_return,
                12,  # Monthly compounding
                years_to_retirement,
                monthly_contribution * 12,  # Annual contribution
                "annual"
            )
            
            # Generate analysis ID
            analysis_id = f"retirement-planning-{uuid.uuid4().hex[:8]}"
            
            # Create retirement analysis
            analysis = {
                "analysis_id": analysis_id,
                "analysis_type": "retirement_planning",
                "analysis_date": datetime.now().isoformat(),
                "parameters": {
                    "current_age": current_age,
                    "retirement_age": retirement_age,
                    "years_to_retirement": years_to_retirement,
                    "current_savings": current_savings,
                    "monthly_contribution": monthly_contribution,
                    "expected_return": expected_return
                },
                "projections": {
                    "final_amount": retirement_result.get("final_amount", 0),
                    "total_contributions": retirement_result.get("total_contributions", 0),
                    "interest_earned": retirement_result.get("interest_earned", 0),
                    "monthly_contribution_total": monthly_contribution * 12 * years_to_retirement
                },
                "schedule": retirement_result.get("schedule", []),
                "recommendations": self._generate_retirement_recommendations(
                    current_savings, monthly_contribution, expected_return, years_to_retirement
                )
            }
            
            logger.info(f"Retirement planning analysis coordinated successfully - ID: {analysis_id}")
            return analysis
            
        except Exception as e:
            logger.error(f"Retirement planning coordination failed: {str(e)}")
            raise BusinessLogicException(
                f"Error en análisis de planificación de jubilación: {str(e)}",
                operation="retirement_planning"
            )
    
    # ========================================
    # PRIVATE HELPER METHODS
    # ========================================
    
    def _get_currency_info(self, currency_code: str) -> Dict[str, str]:
        """Get currency information."""
        currency_info = {
            "USD": {"name": "Dólar Estadounidense", "symbol": "$"},
            "EUR": {"name": "Euro", "symbol": "€"},
            "GBP": {"name": "Libra Esterlina", "symbol": "£"},
            "JPY": {"name": "Yen Japonés", "symbol": "¥"},
            "CAD": {"name": "Dólar Canadiense", "symbol": "C$"},
            "AUD": {"name": "Dólar Australiano", "symbol": "A$"},
            "CHF": {"name": "Franco Suizo", "symbol": "CHF"},
            "CNY": {"name": "Yuan Chino", "symbol": "¥"},
            "INR": {"name": "Rupia India", "symbol": "₹"},
            "BRL": {"name": "Real Brasileño", "symbol": "R$"},
            "MXN": {"name": "Peso Mexicano", "symbol": "$"}
        }
        
        return currency_info.get(currency_code, {
            "name": f"Moneda {currency_code}",
            "symbol": currency_code
        })
    
    def _calculate_roi(self, initial: float, final: float) -> float:
        """Calculate Return on Investment percentage."""
        if initial <= 0:
            return 0
        return ((final - initial) / initial) * 100
    
    def _generate_scenario_summary(self, scenarios: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate summary of all investment scenarios."""
        if not scenarios:
            return {}
        
        # Find best and worst performing scenarios
        best_scenario = max(scenarios, key=lambda x: x.get("final_amount", 0))
        worst_scenario = min(scenarios, key=lambda x: x.get("final_amount", 0))
        
        # Calculate averages
        total_final_amount = sum(s.get("final_amount", 0) for s in scenarios)
        avg_final_amount = total_final_amount / len(scenarios)
        
        return {
            "total_scenarios": len(scenarios),
            "best_scenario": {
                "name": best_scenario.get("scenario_name", ""),
                "final_amount": best_scenario.get("final_amount", 0),
                "roi": best_scenario.get("roi", 0)
            },
            "worst_scenario": {
                "name": worst_scenario.get("scenario_name", ""),
                "final_amount": worst_scenario.get("final_amount", 0),
                "roi": worst_scenario.get("roi", 0)
            },
            "average_final_amount": avg_final_amount,
            "scenario_range": best_scenario.get("final_amount", 0) - worst_scenario.get("final_amount", 0)
        }
    
    def _generate_investment_recommendations(self, scenarios: List[Dict[str, Any]]) -> List[str]:
        """Generate investment recommendations based on scenario analysis."""
        recommendations = []
        
        if not scenarios:
            return ["No hay escenarios disponibles para análisis"]
        
        # Find best performing scenario
        best_scenario = max(scenarios, key=lambda x: x.get("final_amount", 0))
        
        recommendations.append(f"El escenario '{best_scenario.get('scenario_name', '')}' ofrece el mejor rendimiento")
        
        # Analyze contribution patterns
        high_contribution_scenarios = [s for s in scenarios if s.get("contributions", 0) > 0]
        if high_contribution_scenarios:
            recommendations.append("Los escenarios con contribuciones regulares muestran mejor rendimiento a largo plazo")
        
        # Analyze ROI
        high_roi_scenarios = [s for s in scenarios if s.get("roi", 0) > 20]
        if high_roi_scenarios:
            recommendations.append("Considerar escenarios con alto ROI para crecimiento agresivo")
        
        return recommendations
    
    def _generate_retirement_recommendations(
        self, 
        current_savings: float, 
        monthly_contribution: float, 
        expected_return: float, 
        years: int
    ) -> List[str]:
        """Generate retirement planning recommendations."""
        recommendations = []
        
        # Calculate target retirement amount (rule of thumb: 25x annual expenses)
        # Assuming 80% of current income needed in retirement
        target_amount = current_savings * 25  # Simplified calculation
        
        if monthly_contribution < 1000:
            recommendations.append("Considerar aumentar las contribuciones mensuales para alcanzar objetivos de jubilación")
        
        if expected_return < 0.06:
            recommendations.append("Evaluar opciones de inversión con mayor potencial de retorno")
        
        if years < 20:
            recommendations.append("Planificar jubilación temprana requiere contribuciones más agresivas")
        
        recommendations.append("Revisar el plan de jubilación anualmente y ajustar según cambios en la situación financiera")
        
        return recommendations
