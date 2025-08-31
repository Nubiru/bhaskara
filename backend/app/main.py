# -*- coding: utf-8 -*-
"""
@fileoverview FastAPI application entry point with enhanced middleware and configuration
@version 2.0.0
@since 2025-08-25
@lastModified 2025-08-25

@description
Production-ready FastAPI application with comprehensive middleware,
error handling, logging, and service management for the MutualMetrics backend.

@dependencies
- FastAPI framework
- Enhanced middleware system
- Custom exception handlers
- Service dependency injection
- Logging configuration

@usage
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

@state
✅ Functional - Production-ready FastAPI application

@performance
- Optimized middleware stack
- Efficient error handling
- Structured logging for monitoring
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.core.middleware import setup_middleware, setup_exception_handlers, lifespan
from app.core.dependencies import get_health_status
from app.api.v1.router import api_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

# Create FastAPI application
app = FastAPI(
    title="MutualMetrics Backend API",
    description="Professional-grade backend for mathematical, financial, and business analytics",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# Setup middleware and exception handlers
setup_middleware(app)
setup_exception_handlers(app)

# Include API router
app.include_router(api_router, prefix="/api/v1")

# ========================================
# ROOT ENDPOINTS
# ========================================

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "MutualMetrics Backend API",
        "version": "2.0.0",
        "status": "operational",
        "documentation": "/docs",
        "health": "/health"
    }


@app.get("/health")
async def health_check():
    """Comprehensive health check endpoint."""
    try:
        health_status = get_health_status()
        return health_status
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "error": "Health check failed",
            "message": str(e)
        }


@app.get("/ready")
async def readiness_check():
    """Readiness check for Kubernetes/container orchestration."""
    try:
        from app.core.dependencies import ServiceFactory
        # Check if core services are available
        available_services = ServiceFactory.get_available_services()
        
        if available_services:
            return {
                "status": "ready",
                "services": available_services,
                "message": "All core services are available"
            }
        else:
            return {
                "status": "not_ready",
                "message": "No services are available"
            }
    except Exception as e:
        logger.error(f"Readiness check failed: {str(e)}")
        return {
            "status": "not_ready",
            "error": "Readiness check failed",
            "message": str(e)
        }


# ========================================
# LEGACY COMPATIBILITY ENDPOINTS
# ========================================

@app.get("/api/health")
async def legacy_health():
    """Legacy health endpoint for backward compatibility."""
    return await health_check()


@app.get("/api/ready")
async def legacy_ready():
    """Legacy readiness endpoint for backward compatibility."""
    return await readiness_check()


# ========================================
# ERROR HANDLING
# ========================================

@app.exception_handler(404)
async def not_found_handler(request: Request, exc: Exception):
    """Handle 404 errors with custom response."""
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "message": f"The requested resource '{request.url.path}' was not found",
            "available_endpoints": [
                "/",
                "/health",
                "/ready",
                "/docs",
                "/api/v1"
            ]
        }
    )


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc: Exception):
    """Handle 500 errors with custom response."""
    logger.error(f"Internal server error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred",
            "request_id": getattr(request.state, 'request_id', 'unknown')
        }
    )


# ========================================
# STARTUP EVENTS
# ========================================

@app.on_event("startup")
async def startup_event():
    """Application startup event."""
    logger.info("MutualMetrics Backend API starting up...")
    logger.info("Version: 2.0.0")
    logger.info("Environment: Production")


@app.on_event("shutdown")
async def shutdown_event():
    """Application shutdown event."""
    logger.info("MutualMetrics Backend API shutting down...")


# ========================================
# DEVELOPMENT ENDPOINTS
# ========================================

if __name__ == "__main__":
    import uvicorn
    
    logger.info("Starting MutualMetrics Backend API in development mode...")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
