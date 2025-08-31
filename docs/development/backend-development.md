/**
 * @fileoverview Backend Development Guide for MutualMetrics Platform
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-31
 * 
 * @description
 * Comprehensive guide for backend development, including setup, architecture,
 * and development workflow for the MutualMetrics platform.
 * 
 * @dependencies
 * - FastAPI framework
 * - Python 3.12+
 * - Docker environment
 * - Pydantic v2
 * 
 * @usage
 * Reference for backend developers and setup instructions
 * 
 * @state
 * ✅ Functional - Complete backend development guide
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add testing guidelines
 * - [PRIORITY: LOW] Add performance optimization tips
 * 
 * @performance
 * - API response time targets defined
 * - Performance monitoring guidelines
 * 
 * @security
 * - Input validation requirements
 * - CORS configuration guidelines
 */

# 🐍 Backend Development Guide - MutualMetrics Platform

## 🎯 **Overview**

This guide covers backend development for the MutualMetrics platform, a FastAPI-based application for mathematical and business analytics. The backend provides RESTful APIs for quadratic function analysis, business analytics, and financial tools.

## 🚀 **Development Environment Setup**

### **Primary Environment: Docker Container (Recommended)**

Our main development environment uses a single Docker container with both frontend and backend:

```bash
# Build and run the full stack
docker compose -f docker-compose.stack.yml up --build

# Access the application
Frontend: http://localhost
Backend API: http://localhost/api (via Nginx proxy)
API Docs: http://localhost/api/docs (via Nginx proxy)
```

**Benefits of Docker Environment:**
- ✅ **Single container** with both frontend and backend
- ✅ **Nginx proxy** for seamless API routing
- ✅ **Supervisord** for process management
- ✅ **Production-like** environment for testing
- ✅ **Consistent** across all development machines

### **Alternative: Local Development (For specific debugging)**

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv

# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# Windows cmd
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload --host 0.0.0.0 --port 8081
```

**Note:** Local development runs on port 8081 to avoid conflicts with the Docker container.

## 🏗️ **Architecture Overview**

### **Service Architecture (Coordinator Pattern)**

```
backend/app/services/
├── coordinators/            # High-level coordination
│   ├── math_coordinator.py
│   ├── business_coordinator.py
│   └── finance_coordinator.py
├── pure_services/           # Pure calculation logic
│   ├── quadratic_analysis.py
│   ├── revenue_analysis.py
│   ├── cost_analysis.py
│   ├── profit_analysis.py
│   ├── break_even_analysis.py
│   ├── compound_interest.py
│   ├── number_conversion.py
│   └── currency_conversion.py
└── external/                # External API integrations
    └── currency_api.py
```

### **API Structure**

```
/api/v1/
├── health/                  # Health checks
├── math/                    # Mathematical tools
│   ├── quadratic           # Quadratic analysis
│   ├── number-converter    # Number system conversion
│   └── economy             # Economic analysis
├── business/                # Business analytics
│   ├── revenue             # Revenue analysis
│   ├── costs               # Cost analysis
│   ├── profit              # Profit analysis
│   └── break-even          # Break-even analysis
├── finance/                 # Financial tools
│   ├── compound-interest   # Compound interest
│   └── currency-converter  # Currency conversion
└── download/                # Download operations
    └── analysis            # Download analysis results
```

## 📦 **Dependencies & Requirements**

### **Core Dependencies**

```txt
# Core FastAPI Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0

# HTTP and Networking
aiohttp==3.9.1
httpx==0.25.2
requests==2.31.0

# Data Processing and Validation
python-multipart==0.0.6
email-validator==2.1.0
```

### **Development Dependencies**

```txt
# Development and Testing
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0
black==23.11.0
isort==5.12.0
flake8==6.1.0
mypy==1.7.1
```

## 🔧 **Development Workflow**

### **1. Code Organization**

- **Models**: Pydantic schemas in `app/models/`
- **Services**: Business logic in `app/services/`
- **API Routes**: Endpoints in `app/api/v1/`
- **Core**: Configuration and utilities in `app/core/`

### **2. Adding New Endpoints**

1. **Create Request/Response Models** in `app/models/schemas.py`
2. **Implement Business Logic** in appropriate service file
3. **Add Route** in `app/api/v1/router.py`
4. **Update Dependencies** if needed
5. **Test** the endpoint

### **3. Testing**

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_math_service.py
```

## 📡 **Available Endpoints**

### **Health Check**
- `GET /api/health` - Service health status

### **Mathematical Tools**
- `GET /api/math/quadratic` - Quadratic function analysis (Bhaskara)
- `GET /api/math/economy` - Economic quadratic analysis
- `GET /api/math/number-converter` - Number system converter

### **Business Analytics**
- `GET /api/business/revenue` - Revenue analysis
- `GET /api/business/costs` - Cost analysis
- `GET /api/business/profit` - Profit analysis
- `GET /api/business/breakeven` - Break-even analysis

### **Financial Tools**
- `GET /api/finance/compound-interest` - Compound interest calculation
- `GET /api/finance/currency-converter` - Currency converter

### **Downloads**
- `GET /api/download/analysis` - Download analysis results

## 🐛 **Common Issues & Solutions**

### **Pydantic v2 Migration Issues**

If you encounter Pydantic compatibility issues:

1. **BaseSettings Import**: Use `from pydantic_settings import BaseSettings`
2. **Validator Decorators**: Use `@field_validator` instead of `@validator`
3. **Regex Parameter**: Use `pattern` instead of `regex` in Field definitions

### **Import Path Issues**

- **Module Imports**: Use absolute imports (e.g., `from app.models.schemas import ...`)
- **Settings Import**: Use `from config.settings import settings`

### **Docker Issues**

- **Container Restarts**: Check logs with `docker compose -f docker-compose.stack.yml logs`
- **Port Conflicts**: Ensure ports 80 and 8081 are available
- **Build Issues**: Clear cache with `docker system prune -a`

## 📊 **Performance Guidelines**

### **Response Time Targets**
- **Health Checks**: < 100ms
- **Simple Calculations**: < 200ms
- **Complex Analysis**: < 500ms
- **File Downloads**: < 1s

### **Memory Management**
- **Service Instances**: Use singleton pattern with `@lru_cache`
- **Large Data**: Implement pagination for large datasets
- **Caching**: Use in-memory caching for frequently accessed data

## 🔒 **Security Considerations**

### **Input Validation**
- **All Inputs**: Validate with Pydantic models
- **File Uploads**: Validate file types and sizes
- **API Keys**: Store in environment variables

### **CORS Configuration**
- **Development**: Allow localhost origins
- **Production**: Restrict to specific domains
- **Headers**: Include necessary security headers

## 📚 **Additional Resources**

- **[API Documentation](docs/api/README.md)** - Complete API reference
- **[Architecture Guide](docs/architecture/README.md)** - System design details
- **[Deployment Guide](docs/deployment/README.md)** - Production deployment
- **[Troubleshooting](docs/deployment/troubleshooting.md)** - Common issues and solutions

---

**Backend Development Guide - MutualMetrics v1.0.0**  
**Last Updated**: 2025-08-31  
**Status**: ✅ Complete - Ready for development
