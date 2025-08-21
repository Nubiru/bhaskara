# 🚀 MutualMetrics - Mathematical & Business Analytics Platform

**Version:** 1.0.0  
**Last Updated:** 2025-08-20  
**Status:** ✅ Production Ready - Full Stack Containerized

## 🎯 Overview

MutualMetrics is a high-performance web application for mathematical and business analytics, featuring:
- **Quadratic Function Analysis** (Bhaskara's formula)
- **Business Analytics** (Revenue, Costs, Profit, Break-even)
- **Financial Tools** (Compound Interest, Currency Converter)
- **Number System Converter** (Hex, Octal, Decimal, Binary)
- **Modern UI/UX** with light/dark themes and internationalization

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + React Router v7
- **Backend**: FastAPI + Python 3.12 + Uvicorn
- **Deployment**: Single container with Nginx + Supervisord
- **Development**: Local dev servers + Containerized production

## 🚀 Quick Start

### Option 1: Containerized Deployment (Recommended)

```bash
# Build and run the full stack
docker compose -f docker-compose.stack.yml up --build

# Access the application
Frontend: http://localhost
Backend API: http://localhost:8000
API Docs: http://localhost:8000/docs
```

### Option 2: Local Development

```bash
# Frontend (React dev server)
cd frontend
npm install
npm run dev
# Access: http://localhost:5173

# Backend (Python with virtual environment)
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# Access: http://localhost:8000
```

## 📁 Project Structure

```
bhaskara/
├── frontend/                 # React frontend application
│   ├── app/                 # Main application code
│   ├── components/          # Reusable UI components
│   ├── routes/              # React Router routes
│   ├── styles/              # CSS and theme files
│   └── package.json         # Frontend dependencies
├── backend/                  # FastAPI backend
│   ├── routers/             # API route handlers
│   ├── services/            # Business logic services
│   ├── main.py              # FastAPI application entry
│   └── requirements.txt     # Python dependencies
├── Dockerfile.stack          # Single container deployment
├── docker-compose.stack.yml  # Stack deployment configuration
└── docs/                     # Development documentation
```

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run typecheck    # TypeScript type checking
npm run test         # Run tests
```

### Backend
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000  # Development server
pytest               # Run tests (when implemented)
```

### Docker
```bash
# Build and run stack
docker compose -f docker-compose.stack.yml up --build

# Stop stack
docker compose -f docker-compose.stack.yml down

# View logs
docker compose -f docker-compose.stack.yml logs -f
```

## 🌐 API Endpoints

### Health Check
- `GET /health` - Service health status

### Mathematical Analysis
- `POST /analizar/bhaskara` - Quadratic function analysis
- `POST /analizar/ingreso-total` - Revenue analysis
- `POST /analizar/costo-total` - Cost analysis
- `POST /analizar/punto-equilibrio` - Break-even analysis

### Downloads
- `GET /descargar/{analysis_type}/{filename}` - Download analysis results

## 🎨 UI Features

- **Responsive Design** - Mobile-first approach
- **Theme System** - Light/Dark mode with CSS variables
- **Internationalization** - English/Spanish support
- **Accessibility** - WCAG 2.1 AA compliance
- **Interactive Charts** - Chart.js integration
- **Form Validation** - React Hook Form + Zod

## 🔒 Security & Performance

- **CORS Configuration** - Configurable allowed origins
- **Input Validation** - Pydantic models for API validation
- **Error Handling** - Comprehensive error responses
- **Health Checks** - Container health monitoring
- **Process Management** - Supervisord for service orchestration

## 📚 Documentation

- [Model Specification](Model_Specification.md) - System architecture and API specs
- [Executive Plan](Plan_Ejecutivo_MutualMetrics.md) - Development roadmap
- [Docker Setup](docs/docker-setup.md) - Containerization guide
- [Deployment Guide](docs/deployment-and-runbook.md) - Production deployment
- [Landing Page Architecture](docs/landing-page-architecture.md) - Component structure and layout system

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Frontend: Ensure port 5173 is available
   - Backend: Ensure port 8000 is available
   - Container: Ensure ports 80 and 8000 are available

2. **Docker Build Issues**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild without cache: `docker compose -f docker-compose.stack.yml up --build --no-cache`

3. **Frontend Build Issues**
   - Clear node modules: `rm -rf node_modules package-lock.json && npm install`
   - Clear React Router cache: `rm -rf .react-router`

4. **Backend Connection Issues**
   - Check CORS configuration in `backend/config.py`
   - Verify API base URL in frontend environment

### Development vs Production

- **Development**: Use local dev servers for faster iteration
- **Production**: Use containerized stack for deployment
- **Testing**: Containerized stack provides production-like environment

## 🤝 Contributing

1. Follow the [Code of Conduct](CODE_OF_CONDUCT.md)
2. Read [Contributing Guidelines](CONTRIBUTING.md)
3. Follow [Code Standards](code-standard.md)
4. Update documentation for any changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔄 Version History

- **1.0.0** (2025-08-20) - Production ready with full stack containerization
- **0.9.0** - UI/UX revamp and theme system
- **0.8.0** - React Router v7 migration and refactoring
- **0.7.0** - Business analytics tools implementation
- **0.6.0** - Docker containerization and deployment
- **0.5.0** - FastAPI backend implementation
- **0.4.0** - React frontend foundation
- **0.3.0** - Project architecture and planning
- **0.2.0** - Initial project setup
- **0.1.0** - Project conception and requirements

---

**Built with ❤️ by the MutualMetrics Team**