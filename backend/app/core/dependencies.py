# -*- coding: utf-8 -*-
"""
@fileoverview Enhanced dependency injection system with service lifecycle management
@version 2.0.0
@since 2025-08-25
@lastModified 2025-08-26

@description
Enhanced dependency injection container with service factory pattern,
lifecycle management, and health checks for production readiness.

@dependencies
- FastAPI Depends
- Service classes from app.services
- Logging configuration

@usage
from app.core.dependencies import get_math_service, get_business_service

@state
✅ Functional - Enhanced dependency injection system

@performance
- Singleton pattern for service instances
- Lazy initialization for services
- Memory-efficient service management
"""

import logging
from typing import Dict, Any, Optional
from functools import lru_cache

from fastapi import Depends, HTTPException, status

from app.services.math_service import MathCoordinator
from app.services.business_service import BusinessCoordinator
from app.services.finance_service import FinanceCoordinator
from app.services.external.currency_api import CurrencyAPIService

logger = logging.getLogger(__name__)

# Service registry for lifecycle management
_service_registry: Dict[str, Any] = {}


class ServiceFactory:
    """Factory for creating and managing service instances."""
    
    @staticmethod
    def create_service(service_class: type, service_name: str) -> Any:
        """Create a service instance with proper initialization."""
        try:
            if service_name not in _service_registry:
                instance = service_class()
                _service_registry[service_name] = instance
                logger.info(f"Service {service_name} created and registered")
            return _service_registry[service_name]
        except Exception as e:
            logger.error(f"Failed to create service {service_name}: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Service {service_name} initialization failed"
            )
    
    @staticmethod
    def get_service(service_name: str) -> Any:
        """Get existing service instance from registry."""
        if service_name not in _service_registry:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Service {service_name} not available"
            )
        return _service_registry[service_name]
    
    @staticmethod
    def health_check() -> Dict[str, Any]:
        """Check health of all registered services."""
        health_status = {
            "status": "healthy",
            "services": {},
            "timestamp": None
        }
        
        try:
            from datetime import datetime
            health_status["timestamp"] = datetime.now().isoformat()
            
            for service_name, service_instance in _service_registry.items():
                try:
                    # Basic health check - verify service has required attributes
                    if hasattr(service_instance, 'service_name'):
                        health_status["services"][service_name] = {
                            "status": "healthy",
                            "type": type(service_instance).__name__
                        }
                    else:
                        health_status["services"][service_name] = {
                            "status": "unhealthy",
                            "error": "Missing service_name attribute"
                        }
                        health_status["status"] = "degraded"
                except Exception as e:
                    health_status["services"][service_name] = {
                        "status": "unhealthy",
                        "error": str(e)
                    }
                    health_status["status"] = "degraded"
            
            if health_status["status"] == "degraded":
                logger.warning("Some services are unhealthy")
            else:
                logger.info("All services are healthy")
                
        except Exception as e:
            health_status["status"] = "unhealthy"
            health_status["error"] = str(e)
            logger.error(f"Health check failed: {str(e)}")
        
        return health_status


# ========================================
# SERVICE DEPENDENCIES
# ========================================

@lru_cache()
def get_math_service() -> MathCoordinator:
    """Get MathCoordinator instance with singleton pattern."""
    return ServiceFactory.create_service(MathCoordinator, "MathCoordinator")


@lru_cache()
def get_business_service() -> BusinessCoordinator:
    """Get BusinessCoordinator instance with singleton pattern."""
    return ServiceFactory.create_service(BusinessCoordinator, "BusinessCoordinator")


@lru_cache()
def get_finance_service() -> FinanceCoordinator:
    """Get FinanceCoordinator instance with singleton pattern."""
    return ServiceFactory.create_service(FinanceCoordinator, "FinanceCoordinator")


@lru_cache()
def get_currency_service() -> CurrencyAPIService:
    """Get CurrencyAPIService instance with singleton pattern."""
    return ServiceFactory.create_service(CurrencyAPIService, "CurrencyAPIService")


# ========================================
# TYPE ALIASES FOR DEPENDENCY INJECTION
# ========================================

# Type aliases for FastAPI dependency injection
MathServiceDep = MathCoordinator
BusinessServiceDep = BusinessCoordinator
FinanceServiceDep = FinanceCoordinator


# ========================================
# HEALTH CHECK DEPENDENCY
# ========================================

def get_health_status() -> Dict[str, Any]:
    """Get comprehensive health status of all services."""
    return ServiceFactory.health_check()


# ========================================
# REQUEST ID DEPENDENCY
# ========================================

def get_request_id() -> str:
    """Generate a unique request ID for tracking."""
    import uuid
    return str(uuid.uuid4())


# Type alias for FastAPI dependency injection
RequestIDDep = Depends(get_request_id)


# ========================================
# SERVICE VALIDATION DEPENDENCIES
# ========================================

def validate_service_availability(service_name: str) -> bool:
    """Validate that a specific service is available."""
    try:
        ServiceFactory.get_service(service_name)
        return True
    except HTTPException:
        return False


def get_available_services() -> Dict[str, str]:
    """Get list of all available services with their types."""
    return {
        name: type(instance).__name__
        for name, instance in _service_registry.items()
    }
