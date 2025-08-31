# -*- coding: utf-8 -*-
"""
@fileoverview Services package for business logic
@version 2.0.0
@author Lead Software Engineer
@since 2025-08-26
@lastModified 2025-08-26

@description
Export all service classes and coordinators.
Provides centralized access to business logic services using coordinator pattern.

@dependencies
- All pure services and coordinators

@usage
from app.services import MathCoordinator, BusinessCoordinator, FinanceCoordinator
from app.services import QuadraticAnalysisService, RevenueAnalysisService

@state
✅ Functional - Coordinator pattern implemented

@bugs
- None currently identified

@todo
- Add more service types
- Implement service discovery
- Add performance monitoring

@performance
- O(1) for service access
- Efficient dependency injection

@security
- Secure service initialization
- No external dependencies
"""

# ========================================
# COORDINATOR SERVICES
# ========================================
from .math_service import MathCoordinator
from .business_service import BusinessCoordinator
from .finance_service import FinanceCoordinator

# ========================================
# PURE SERVICES
# ========================================
from .quadratic_analysis import QuadraticAnalysisService
from .number_conversion import NumberConversionService
from .revenue_analysis import RevenueAnalysisService
from .cost_analysis import CostAnalysisService
from .profit_analysis import ProfitAnalysisService
from .compound_interest import CompoundInterestService

# ========================================
# EXTERNAL SERVICES
# ========================================
from .external.currency_api import CurrencyAPIService

# ========================================
# EXPORTS
# ========================================
__all__ = [
    # Coordinators (main interface)
    "MathCoordinator",
    "BusinessCoordinator", 
    "FinanceCoordinator",
    
    # Pure services (direct access when needed)
    "QuadraticAnalysisService",
    "NumberConversionService",
    "RevenueAnalysisService",
    "CostAnalysisService",
    "ProfitAnalysisService",
    "CompoundInterestService",
    
    # External services
    "CurrencyAPIService"
]
