# -*- coding: utf-8 -*-
"""
@fileoverview Custom exception hierarchy for the application
@version 1.0.0
@since 2025-08-25
@lastModified 2025-08-25

Responsabilidad
- Define custom exception classes for different error types
- Provide consistent error handling across the application
- Include proper error codes and user-friendly messages
"""

from typing import Any, Dict, Optional
from fastapi import HTTPException, status


class MutualMetricsException(Exception):
    """Base exception for all application errors."""
    
    def __init__(
        self,
        message: str,
        error_code: str = None,
        details: Optional[Dict[str, Any]] = None,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR
    ):
        self.message = message
        self.error_code = error_code
        self.details = details or {}
        self.status_code = status_code
        super().__init__(self.message)


class ValidationException(MutualMetricsException):
    """Raised when input validation fails."""
    
    def __init__(self, message: str, field: str = None, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            error_code="VALIDATION_ERROR",
            details={"field": field, **details} if details else {"field": field},
            status_code=status.HTTP_400_BAD_REQUEST
        )


class BusinessLogicException(MutualMetricsException):
    """Raised when business logic validation fails."""
    
    def __init__(self, message: str, operation: str = None, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            error_code="BUSINESS_LOGIC_ERROR",
            details={"operation": operation, **details} if details else {"operation": operation},
            status_code=status.HTTP_400_BAD_REQUEST
        )


class ExternalAPIException(MutualMetricsException):
    """Raised when external API calls fail."""
    
    def __init__(
        self,
        message: str,
        api_name: str = None,
        status_code: int = None,
        details: Optional[Dict[str, Any]] = None
    ):
        super().__init__(
            message=message,
            error_code="EXTERNAL_API_ERROR",
            details={
                "api_name": api_name,
                "external_status_code": status_code,
                **details
            } if details else {
                "api_name": api_name,
                "external_status_code": status_code
            },
            status_code=status.HTTP_502_BAD_GATEWAY
        )


class RateLimitException(MutualMetricsException):
    """Raised when rate limits are exceeded."""
    
    def __init__(self, message: str = "Rate limit exceeded", retry_after: int = None):
        super().__init__(
            message=message,
            error_code="RATE_LIMIT_EXCEEDED",
            details={"retry_after": retry_after} if retry_after else {},
            status_code=status.HTTP_429_TOO_MANY_REQUESTS
        )


class CacheException(MutualMetricsException):
    """Raised when cache operations fail."""
    
    def __init__(self, message: str, operation: str = None, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            error_code="CACHE_ERROR",
            details={"operation": operation, **details} if details else {"operation": operation},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


class ConfigurationException(MutualMetricsException):
    """Raised when configuration is invalid or missing."""
    
    def __init__(self, message: str, config_key: str = None, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            error_code="CONFIGURATION_ERROR",
            details={"config_key": config_key, **details} if details else {"config_key": config_key},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# HTTP Exception converters
def to_http_exception(exc: MutualMetricsException) -> HTTPException:
    """Convert custom exception to FastAPI HTTPException."""
    return HTTPException(
        status_code=exc.status_code,
        detail={
            "error": exc.error_code,
            "message": exc.message,
            "details": exc.details
        }
    )


def handle_validation_error(field: str, message: str) -> ValidationException:
    """Create a validation error for a specific field."""
    return ValidationException(
        message=f"Validation error in field '{field}': {message}",
        field=field
    )


def handle_business_logic_error(operation: str, message: str) -> BusinessLogicException:
    """Create a business logic error for a specific operation."""
    return BusinessLogicException(
        message=f"Business logic error in operation '{operation}': {message}",
        operation=operation
    )
