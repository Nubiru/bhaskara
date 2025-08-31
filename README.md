# 🚀 MutualMetrics - Mathematical & Business Analytics Platform

**Version:** 1.0.0  
**Last Updated:** 2025-08-31  
**Status:** ✅ Production Ready - Full Stack Containerized

## 🎯 **Quick Start**

### **Main Development Environment - Docker Container (Recommended)**
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

### **Alternative: Local Development (For specific debugging)**
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/Mac: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8081
```

## 📚 **Documentation**

**All project documentation is organized in the [`docs/`](docs/) folder:**

- **[📖 Main Documentation](docs/README.md)** - Complete project overview and navigation
- **[🏗️ Architecture](docs/architecture/README.md)** - System design and technical architecture
- **[🔌 API Documentation](docs/api/README.md)** - API endpoints and integration guides
- **[🐳 Deployment](docs/deployment/README.md)** - Docker setup and deployment guides
- **[🧪 Development](docs/development/README.md)** - Development setup and workflow
- **[📋 Project Management](docs/project-management/README.md)** - Requirements, roadmap, and progress

## 🚨 **Important Notes**

- **API Base URL**: Use `http://localhost/api` for containerized deployment
- **Backend Port**: Direct access at `http://localhost:8081` for local development
- **Documentation**: All technical documentation is now organized in the `docs/` folder
- **Code Standards**: Follow the [code-standard.md](code-standard.md) for development

---

**Built with ❤️ by the MutualMetrics Team**

*For detailed information, start with the [Main Documentation](docs/README.md)*
