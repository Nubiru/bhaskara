# Backend README - MutualMetrics

**Version:** 1.0.0  
**Last Modified:** 2025-08-21  
**Author:** MutualMetrics Team  
**Python Version:** 3.12+  

## Overview

This document provides comprehensive setup and development instructions for the MutualMetrics backend API built with FastAPI.

## Quick Start

### Option 1: Virtual Environment (Recommended)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Option 2: Direct Uvicorn (No Virtual Environment)

```bash
# Navigate to backend directory
cd backend

# Install dependencies globally (not recommended for production)
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Development Setup

### Prerequisites

- **Python 3.12+** - [Download here](https://www.python.org/downloads/)
- **pip** - Usually comes with Python
- **Git** - [Download here](https://git-scm.com/downloads)

### Environment Variables

Create a `.env` file in the backend directory:

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=true

# CORS Settings
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Database (Future)
DATABASE_URL=sqlite:///./mutualmetrics.db

# Security
SECRET_KEY=your-secret-key-here
```

### Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── README_backend.md       # This file
├── routers/               # API route definitions
│   ├── __init__.py
│   ├── analysis.py        # Mathematical analysis endpoints
│   └── business.py        # Business analytics endpoints
├── services/              # Business logic services
│   ├── __init__.py
│   ├── analysis_service.py # Mathematical analysis logic
│   └── business_service.py # Business analytics logic
├── types/                 # Pydantic models and type definitions
│   ├── __init__.py
│   ├── quadratic.py       # Quadratic analysis types
│   └── business.py        # Business analysis types
└── utils/                 # Utility functions
    ├── __init__.py
    └── validators.py      # Input validation utilities
```

## API Endpoints

### Mathematical Analysis

- **POST** `/analizar/bhaskara` - Quadratic function analysis
- **GET** `/analizar/bhaskara/{analysis_id}` - Get specific analysis

### Business Analytics

- **GET** `/analisis/ingreso` - Revenue analysis
- **GET** `/analisis/costo` - Cost analysis  
- **GET** `/analisis/beneficio` - Profit analysis
- **GET** `/analisis/punto-equilibrio` - Break-even analysis
- **GET** `/analisis/interes-compuesto` - Compound interest analysis

### Utility Endpoints

- **GET** `/docs` - Interactive API documentation (Swagger UI)
- **GET** `/redoc` - Alternative API documentation
- **GET** `/health` - Health check endpoint

## Development Commands

### Running the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000

# Custom port
uvicorn main:app --reload --port 9000

# Bind to specific IP
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Testing

```bash
# Run all tests
pytest

# Run tests with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_analysis_service.py

# Run tests in watch mode
pytest-watch
```

### Code Quality

```bash
# Format code with Black
black .

# Sort imports with isort
isort .

# Lint with flake8
flake8 .

# Type checking with mypy
mypy .

# Run all quality checks
black . && isort . && flake8 . && mypy .
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `OSError: [Errno 98] Address already in use`

**Solution:**
```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### 2. Virtual Environment Not Activated

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# Ensure virtual environment is activated
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

# Verify activation
which python  # Should show .venv path
pip list      # Should show installed packages
```

#### 3. Permission Denied

**Error:** `PermissionError: [Errno 13] Permission denied`

**Solution:**
```bash
# Use different port
uvicorn main:app --reload --port 8001

# Or run with sudo (not recommended)
sudo uvicorn main:app --reload --port 8000
```

#### 4. CORS Issues

**Error:** `Access to fetch at 'http://localhost:8000/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution:**
- Check `.env` file has correct `ALLOWED_ORIGINS`
- Ensure frontend URL is in the allowed origins list
- Restart the backend server after changing CORS settings

#### 5. Import Errors

**Error:** `ModuleNotFoundError: No module named 'routers'`

**Solution:**
```bash
# Ensure you're in the backend directory
pwd  # Should show /path/to/project/backend

# Check Python path
python -c "import sys; print(sys.path)"

# Run from project root if needed
cd ..  # Go to project root
python -m uvicorn backend.main:app --reload
```

### Performance Issues

#### 1. Slow Response Times

**Symptoms:** API responses taking >1 second

**Solutions:**
```bash
# Enable logging to identify bottlenecks
uvicorn main:app --reload --log-level debug

# Check for database queries (if applicable)
# Monitor memory usage
# Profile code with cProfile
```

#### 2. High Memory Usage

**Symptoms:** Server using excessive RAM

**Solutions:**
```bash
# Monitor memory usage
htop  # macOS/Linux
taskmgr  # Windows

# Check for memory leaks
# Restart server periodically in development
# Use production server (Gunicorn) for long-running instances
```

## Production Deployment

### Using Gunicorn

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Using Docker

```bash
# Build image
docker build -t mutualmetrics-backend .

# Run container
docker run -p 8000:8000 mutualmetrics-backend
```

### Environment Variables for Production

```env
DEBUG=false
API_HOST=0.0.0.0
API_PORT=8000
ALLOWED_ORIGINS=https://yourdomain.com
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:password@localhost/dbname
```

## Monitoring and Logging

### Log Levels

```python
# In main.py
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### Health Checks

```bash
# Check server health
curl http://localhost:8000/health

# Expected response
{
  "status": "healthy",
  "timestamp": "2025-08-21T10:00:00Z",
  "version": "1.0.0"
}
```

## Contributing

### Code Style

- Use **Black** for code formatting
- Use **isort** for import sorting
- Follow **PEP 8** guidelines
- Use **type hints** for all functions
- Write **docstrings** for all public functions

### Testing

- Write tests for all new functionality
- Maintain >80% code coverage
- Use **pytest** for testing framework
- Mock external dependencies

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-endpoint

# Make changes and commit
git add .
git commit -m "feat: add new analysis endpoint"

# Push and create PR
git push origin feature/new-endpoint
```

## Support

### Getting Help

1. **Check this README** for common solutions
2. **Search existing issues** on GitHub
3. **Create new issue** with detailed description
4. **Contact the team** for urgent matters

### Useful Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)

## Version History

- **1.0.0** (2025-08-21): Initial backend setup with FastAPI
