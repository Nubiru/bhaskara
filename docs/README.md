/**
 * @fileoverview Main Documentation Index for MutualMetrics Project
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-31
 * 
 * @description
 * Central documentation hub for the MutualMetrics project. This document
 * provides navigation and organization for all project documentation,
 * following a logical hierarchy for easy discovery and maintenance.
 * 
 * @dependencies
 * - All documentation files in this directory
 * - Project structure and architecture
 * 
 * @usage
 * Start here to find any project documentation
 * 
 * @state
 * ✅ Functional - Main documentation index
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: HIGH] Consolidate scattered documentation
 * - [PRIORITY: MEDIUM] Standardize all file headers
 * - [PRIORITY: LOW] Add search functionality
 * 
 * @performance
 * - Organized for quick navigation
 * - Logical grouping reduces search time
 * 
 * @accessibility
 * - Clear navigation structure
 * - Consistent formatting
 * 
 * @security
 * - No sensitive information exposed
 * - Public documentation only
 */

# 🚀 MutualMetrics - Mathematical & Business Analytics Platform

**Version:** 1.0.0  
**Last Updated:** 2025-08-31  
**Status:** ✅ Production Ready - Full Stack Containerized

## 🎯 **Overview**

MutualMetrics is a high-performance web application for mathematical and business analytics, featuring:
- **Quadratic Function Analysis** (Bhaskara's formula)
- **Business Analytics** (Revenue, Costs, Profit, Break-even)
- **Financial Tools** (Compound Interest, Currency Converter)
- **Number System Converter** (Hex, Octal, Decimal, Binary)
- **Modern UI/UX** with light/dark themes and internationalization

## 🏗️ **Architecture**

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + React Router v7
- **Backend**: FastAPI + Python 3.12 + Uvicorn
- **Deployment**: Single container with Nginx + Supervisord
- **Development**: Local dev servers + Containerized production

## 🚀 **Quick Start**

### **Option 1: Main Development Environment - Docker Container (Recommended)**

```bash
# Build and run the full stack (Frontend + Backend in one container)
docker compose -f docker-compose.stack.yml up --build

# Access the application
Frontend: http://localhost
Backend API: http://localhost/api (via Nginx proxy)
API Docs: http://localhost/api/docs (via Nginx proxy)
```

**Why Docker?** This is our primary development environment because:
- ✅ **Single container** with both frontend and backend
- ✅ **Nginx proxy** for seamless API routing
- ✅ **Supervisord** for process management
- ✅ **Production-like** environment for testing
- ✅ **Consistent** across all development machines

### **Option 2: Alternative Local Development (For specific debugging)**

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
uvicorn main:app --reload --host 0.0.0.0 --port 8081
# Access: http://localhost:8081 (local development)
```

## 📁 **Project Structure**

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

## 🔧 **Development Commands**

### **Frontend**
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run typecheck    # TypeScript type checking
npm run test         # Run tests
```

### **Backend**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8081  # Development server
pytest               # Run tests (when implemented)
```

### **Docker**
```bash
# Build and run stack
docker compose -f docker-compose.stack.yml up --build

# Stop stack
docker compose -f docker-compose.stack.yml down

# View logs
docker compose -f docker-compose.stack.yml logs -f
```

## 🌐 **API Endpoints**

**Note**: In containerized deployment, all API endpoints are accessed via Nginx proxy at `http://localhost/api/`

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

### **Local Development**
When running locally (not in Docker), access directly:
- `GET http://localhost:8081/health`
- `GET http://localhost:8081/math/quadratic`
- `GET http://localhost:8081/business/revenue`
- `GET http://localhost:8081/finance/compound-interest`

## 🎨 **UI Features**

- **Responsive Design** - Mobile-first approach
- **Theme System** - Light/Dark mode with CSS variables
- **Internationalization** - English/Spanish support
- **Accessibility** - WCAG 2.1 AA compliance
- **Interactive Charts** - Chart.js integration
- **Form Validation** - React Hook Form + Zod

## 🔒 **Security & Performance**

- **CORS Configuration** - Configurable allowed origins
- **Input Validation** - Pydantic models for API validation
- **Error Handling** - Comprehensive error responses
- **Health Checks** - Container health monitoring
- **Process Management** - Supervisord for service orchestration

## 📚 **Documentation Navigation**

### **🚀 Getting Started**
- **[Model Specification](project-management/model-specification.md)** - Core business requirements and system architecture
- **[Development Roadmap](project-management/roadmap.md)** - Comprehensive development phases and milestones
- **[API Restructuring Summary](project-management/api-restructuring-summary.md)** - Current migration status and next steps

### **🏗️ Architecture & Design**
- **[System Architecture](architecture/README.md)** - Overall system design
- **[API Architecture](architecture/api-architecture.md)** - API design principles
- **[Frontend Architecture](architecture/frontend-architecture.md)** - React/TypeScript structure
- **[Backend Architecture](architecture/backend-architecture.md)** - FastAPI/Python structure

### **🔌 API Documentation**
- **[API Overview](api/README.md)** - Complete API documentation
- **[API Conventions](api/conventions.md)** - Standards and best practices
- **[API Endpoints](api/endpoints.md)** - All available endpoints
- **[OpenAPI Spec](api/openapi.yaml)** - Machine-readable API specification

### **🐳 Deployment & Operations**
- **[Docker Setup](deployment/docker-setup.md)** - Container configuration
- **[Environment Configuration](deployment/environment.md)** - Environment variables
- **[Deployment Guide](deployment/deployment-guide.md)** - Production deployment
- **[Runbook](deployment/runbook.md)** - Operational procedures
- **[Troubleshooting Guide](deployment/troubleshooting.md)** - Common issues and solutions

### **🧪 Development & Testing**
- **[Development Guide](development/README.md)** - Development setup and workflow
- **[Testing Strategy](development/testing-strategy.md)** - Testing approach and tools
- **[Code Standards](../code-standard.md)** - Coding conventions

### **🎨 UI/UX Design**
- **[Design System](design/README.md)** - Visual design principles and system
- **[Design Tokens](design/design-tokens.md)** - CSS variables and theming
- **[Component Library](design/components.md)** - Reusable UI components

### **📋 Project Management**
- **[API Restructuring Summary](project-management/api-restructuring-summary.md)** - Current migration status
- **[Architecture Decision Records](adr/README.md)** - Technical decisions and rationale

## 🐛 **Troubleshooting**

### **Common Issues**

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

### **Development vs Production**

- **Development**: Use local dev servers for faster iteration
- **Production**: Use containerized stack for deployment
- **Testing**: Containerized stack provides production-like environment

## 🤝 **Contributing**

1. Follow the [Code of Conduct](../CODE_OF_CONDUCT.md)
2. Read [Contributing Guidelines](../CONTRIBUTING.md)
3. Follow [Code Standards](../code-standard.md)
4. Update documentation for any changes

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🔄 **Version History**

- **1.0.0** (2025-08-31) - Production ready with full stack containerization
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

## 🚨 **Important Notes**

- **Main Development Environment**: Docker container with frontend + backend (recommended)
- **API Base URL**: Use `http://localhost/api` for containerized deployment
- **Backend Port**: Direct access at `http://localhost:8081` for local development
- **Documentation**: All technical documentation is now organized in the `docs/` folder
- **Code Standards**: Follow the [code-standard.md](../code-standard.md) for development

---

**Built with ❤️ by the MutualMetrics Team**
