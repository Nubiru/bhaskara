# 🐍 MutualMetrics Backend

**FastAPI Backend for Mathematical & Business Analytics**

## 🚀 Quick Start

### Local Development

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Access Points

- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **OpenAPI Spec**: http://localhost:8000/openapi.json

## 🏗️ Architecture

- **Framework**: FastAPI + Python 3.12
- **Server**: Uvicorn (ASGI)
- **Validation**: Pydantic models
- **Documentation**: Auto-generated OpenAPI/Swagger

## 📁 Structure

```
backend/
├── main.py              # FastAPI application entry
├── config.py            # Configuration and environment
├── routers/             # API route handlers
│   ├── health_router.py # Health check endpoints
│   ├── api_router.py    # Main API endpoints
│   └── download_router.py # Download endpoints
├── services/            # Business logic
│   ├── math_service.py  # Mathematical calculations
│   └── business_service.py # Business analytics
└── requirements.txt     # Python dependencies
```

## 🔧 Development

### Adding New Endpoints

1. Create route handler in `routers/`
2. Add business logic in `services/`
3. Update `main.py` to include new router
4. Test with auto-generated docs

### Environment Variables

```bash
# Optional: Create .env file
APP_NAME=MutualMetrics Backend
APP_VERSION=1.0.0
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## 🐳 Docker

For containerized development, use the stack approach:

```bash
# From project root
docker compose -f docker-compose.stack.yml up --build
```

## 🧪 Testing

```bash
# Run tests (when implemented)
pytest

# Run with coverage
pytest --cov=.
```

## 📚 API Documentation

All endpoints are automatically documented at `/docs` when running the server.
