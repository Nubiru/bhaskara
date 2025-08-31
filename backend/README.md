# 🐍 MutualMetrics Backend - Professional Architecture

**FastAPI Backend for Mathematical & Business Analytics with Enterprise-Grade Architecture**

## 🏗️ Architecture Overview

```
backend/
├── main.py                 # FastAPI application entry point
├── config/                 # Configuration management
│   ├── __init__.py
│   ├── settings.py        # Environment-based settings
│   ├── database.py        # Database configuration
│   └── logging.py         # Logging configuration
├── app/                    # Main application package
│   ├── __init__.py
│   ├── core/              # Core application components
│   │   ├── __init__.py
│   │   ├── exceptions.py  # Custom exception classes
│   │   ├── middleware.py  # Custom middleware
│   │   └── dependencies.py # Dependency injection
│   ├── api/               # API layer
│   │   ├── __init__.py
│   │   ├── v1/            # API version 1
│   │   │   ├── __init__.py
│   │   │   ├── endpoints/ # Route handlers
│   │   │   │   ├── math.py
│   │   │   │   ├── business.py
│   │   │   │   ├── finance.py
│   │   │   │   └── download.py
│   │   │   └── router.py  # Main API router
│   │   └── deps.py        # API dependencies
│   ├── models/            # Data models
│   │   ├── __init__.py
│   │   ├── domain/        # Domain models
│   │   └── schemas/       # Pydantic schemas
│   ├── services/          # Business logic layer
│   │   ├── __init__.py
│   │   ├── math_service.py
│   │   ├── business_service.py
│   │   ├── finance_service.py
│   │   └── external/      # External API services
│   │       ├── __init__.py
│   │       └── currency_api.py
│   ├── repositories/      # Data access layer
│   │   ├── __init__.py
│   │   └── base.py
│   ├── utils/             # Utility functions
│   │   ├── __init__.py
│   │   ├── cache.py       # Caching utilities
│   │   └── validators.py  # Validation utilities
│   └── tests/             # Test suite
│       ├── __init__.py
│       ├── conftest.py
│       └── unit/
└── requirements.txt        # Dependencies
```

## 🚀 Quick Start

### Local Development

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8081
```

### Access Points

- **API**: http://localhost:8081
- **Documentation**: http://localhost:8081/docs
- **OpenAPI Spec**: http://localhost:8081/openapi.json
- **Health Check**: http://localhost:8081/health

## 🔧 Development Standards

### Code Quality
- **Type Hints**: 100% coverage required
- **Docstrings**: All public functions documented
- **Error Handling**: Custom exception hierarchy
- **Testing**: Minimum 85% coverage
- **Logging**: Structured logging with correlation IDs

### Architecture Principles
- **Dependency Injection**: Services injected, not imported
- **Single Responsibility**: Each module has one clear purpose
- **Interface Segregation**: Services implement specific interfaces
- **Dependency Inversion**: High-level modules don't depend on low-level modules

## 📚 API Documentation

All endpoints are automatically documented at `/docs` with:
- Request/response schemas
- Authentication requirements
- Rate limiting information
- Example requests/responses
- Error codes and descriptions

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test category
pytest tests/unit/services/
pytest tests/integration/api/
```

## 🚨 Current Status

**⚠️ ARCHITECTURE INCOMPLETE - REFACTORING REQUIRED**

The current backend is a basic prototype that needs complete architectural refactoring to meet professional standards.
