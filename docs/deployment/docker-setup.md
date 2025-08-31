/**
 * @fileoverview Docker Setup and Deployment Documentation for MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 * 
 * @description
 * Comprehensive Docker setup documentation covering container architecture,
 * Nginx proxy configuration, deployment procedures, and troubleshooting.
 * This document serves as the definitive guide for container deployment.
 * 
 * @dependencies
 * - Docker and Docker Compose
 * - Nginx configuration
 * - Supervisor process management
 * - FastAPI backend
 * 
 * @usage
 * Reference for Docker deployment and container management
 * 
 * @state
 * ✅ Functional - Complete Docker setup documentation
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add Kubernetes deployment guide
 * - [PRIORITY: LOW] Add production deployment considerations
 * 
 * @performance
 * - Optimized container configuration
 * - Efficient process management
 * - Resource-optimized builds
 * 
 * @accessibility
 * - Clear step-by-step instructions
 * - Comprehensive troubleshooting guide
 * - Visual configuration examples
 * 
 * @security
 * - Container isolation
 * - Process management security
 * - Network security configuration
 */

# 🐳 MutualMetrics Docker Setup

## 🎯 **Overview**

MutualMetrics uses a **single-container approach** with Docker for simplified deployment and management. This Docker container serves as our **main development environment** and includes both the React frontend and FastAPI backend, managed by Supervisor and served through Nginx.

**Why This is Our Main Development Environment:**
- ✅ **Single command** to start the entire stack
- ✅ **Consistent environment** across all development machines
- ✅ **Production-like setup** for realistic testing
- ✅ **Integrated debugging** with both frontend and backend logs
- ✅ **No environment conflicts** between different developers

## 🏗️ **Container Architecture**

### **Single Container Design**
```
mutualmetrics-stack/
├── Nginx (Port 80)           # Reverse proxy + static files
├── FastAPI Backend (Port 8081) # API services
└── Supervisor                 # Process management
```

### **Why Single Container?**
- **Simplicity**: Easier deployment and management
- **Resource Efficiency**: Shared resources between services
- **Development Friendly**: Single command to start everything
- **Production Ready**: Can be split into microservices later

## 🔧 **Dockerfile Configuration**

### **Multi-Stage Build**
```dockerfile
# Stage 1: Frontend Build
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Runtime
FROM python:3.12-slim
# ... system dependencies and configuration
```

### **Key Configuration Points**
- **Frontend Build**: Node.js Alpine for efficient frontend compilation
- **Runtime**: Python 3.12 slim for backend execution
- **System Dependencies**: Nginx, Supervisor, curl
- **Process Management**: Supervisor for service orchestration

## 🌐 **Nginx Configuration**

### **Nginx Setup**
The Nginx configuration serves two critical functions:

1. **Static File Server**: Serves the React frontend build
2. **Reverse Proxy**: Routes API requests to the backend

### **Configuration Details**
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    
    # Serve static files (React frontend)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://127.0.0.1:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### **Proxy Headers Explained**
- **Host**: Preserves original host header
- **X-Real-IP**: Client's real IP address
- **X-Forwarded-For**: Client's IP chain
- **X-Forwarded-Proto**: Original protocol (http/https)

## 🔄 **Process Management with Supervisor**

### **Supervisor Configuration**
```ini
[supervisord]
nodaemon=true
logfile=/var/log/supervisord.log
logfile_maxbytes=50MB
logfile_backups=10
loglevel=info

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
stdout_logfile=/var/log/nginx.log
stderr_logfile=/var/log/nginx-error.log
priority=100

[program:backend]
command=uvicorn app.main:app --host 127.0.0.1 --port 8081
directory=/app/backend
autostart=true
autorestart=true
stdout_logfile=/var/log/backend.log
stderr_logfile=/var/log/backend-error.log
priority=200
startretries=3
startsecs=5
redirect_stderr=true
stdout_logfile_maxbytes=50MB
stdout_logfile_backups=10
```

### **Process Priority**
- **Nginx (100)**: Higher priority, starts first
- **Backend (200)**: Lower priority, starts after Nginx
- **Start Retries**: 3 attempts with 5-second intervals
- **Log Management**: Comprehensive logging with rotation

## 🚀 **Deployment Commands**

### **Build and Start**
```bash
# Build the container
docker-compose -f docker-compose.stack.yml build mutualmetrics-stack

# Start the container
docker-compose -f docker-compose.stack.yml up -d mutualmetrics-stack

# Check status
docker-compose -f docker-compose.stack.yml ps

# View logs
docker-compose -f docker-compose.stack.yml logs mutualmetrics-stack
```

### **Development Commands**
```bash
# Start with rebuild
docker-compose -f docker-compose.stack.yml up --build -d

# Stop container
docker-compose -f docker-compose.stack.yml down

# Restart container
docker-compose -f docker-compose.stack.yml restart mutualmetrics-stack
```

## 🔍 **Troubleshooting Guide**

### **Common Issues and Solutions**

#### **1. Backend Process Crashes**
**Symptoms**: Backend exits with status 1, supervisor retries
**Solution**: Check import paths in supervisord configuration
```bash
# Check backend logs
docker-compose -f docker-compose.stack.yml logs mutualmetrics-stack

# Verify module imports
docker exec -it mutualmetrics-stack python -c "import app.main"
```

#### **2. Port Binding Issues**
**Symptoms**: Cannot access container on expected ports
**Solution**: Verify port mappings in docker-compose.yml
```bash
# Check port bindings
docker port mutualmetrics-stack

# Verify container is running
docker ps | grep mutualmetrics-stack
```

#### **3. Nginx Configuration Errors**
**Symptoms**: Frontend not loading or API requests failing
**Solution**: Check Nginx configuration and logs
```bash
# Check Nginx logs
docker exec -it mutualmetrics-stack tail -f /var/log/nginx-error.log

# Test Nginx configuration
docker exec -it mutualmetrics-stack nginx -t
```

#### **4. Frontend Build Issues**
**Symptoms**: Frontend assets not found or JavaScript errors
**Solution**: Verify frontend build process
```bash
# Check frontend build output
docker exec -it mutualmetrics-stack ls -la /usr/share/nginx/html

# Rebuild frontend
docker-compose -f docker-compose.stack.yml build --no-cache mutualmetrics-stack
```

### **Debugging Commands**
```bash
# Access container shell
docker exec -it mutualmetrics-stack /bin/bash

# Check process status
docker exec -it mutualmetrics-stack supervisorctl status

# View supervisor logs
docker exec -it mutualmetrics-stack tail -f /var/log/supervisord.log

# Check service health
curl http://localhost/api/v1/health
```

## 📊 **Health Monitoring**

### **Health Check Endpoint**
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8081/health || exit 1
```

### **Health Check Response**
```json
{
  "status": "healthy",
  "timestamp": "2025-08-26T18:30:00Z",
  "services": {
    "nginx": "running",
    "backend": "running",
    "supervisor": "running"
  },
  "version": "1.0.0"
}
```

### **Monitoring Commands**
```bash
# Check container health
docker inspect mutualmetrics-stack --format='{{.State.Health.Status}}'

# Monitor resource usage
docker stats mutualmetrics-stack

# Check service availability
curl -f http://localhost/api/v1/health
```

## 🔒 **Security Considerations**

### **Container Security**
- **Non-root User**: Consider running services as non-root user
- **Resource Limits**: Set memory and CPU limits
- **Network Isolation**: Use custom networks for isolation
- **Image Scanning**: Regular security scans of base images

### **Network Security**
- **Port Exposure**: Only expose necessary ports
- **Internal Communication**: Backend services communicate internally
- **Proxy Headers**: Preserve security headers through proxy
- **CORS Configuration**: Proper CORS setup for frontend

## 📈 **Performance Optimization**

### **Container Optimization**
- **Multi-stage Builds**: Reduce final image size
- **Layer Caching**: Optimize Docker layer caching
- **Resource Limits**: Set appropriate resource constraints
- **Process Management**: Efficient supervisor configuration

### **Nginx Optimization**
- **Gzip Compression**: Enable compression for text responses
- **Static File Caching**: Cache frontend assets
- **Connection Pooling**: Optimize backend connections
- **Buffer Tuning**: Adjust buffer sizes for performance

## 🔄 **Environment Configuration**

### **Environment Variables**
```bash
# Frontend configuration
VITE_API_BASE_URL=http://localhost/api

# Backend configuration
VITE_API_TIMEOUT=30000
VITE_ENVIRONMENT=development
```

### **Configuration Files**
- **docker-compose.stack.yml**: Container orchestration
- **Dockerfile.stack**: Container build instructions
- **supervisord.conf**: Process management
- **nginx.conf**: Web server configuration

## 🚀 **Production Deployment**

### **Production Considerations**
1. **Multi-container Setup**: Split into separate containers
2. **Load Balancing**: Use external load balancer
3. **SSL/TLS**: Enable HTTPS with certificates
4. **Monitoring**: Advanced monitoring and alerting
5. **Backup**: Container and data backup strategies

### **Scaling Strategy**
- **Horizontal Scaling**: Multiple container instances
- **Load Distribution**: Nginx upstream configuration
- **Resource Management**: Container resource limits
- **Auto-scaling**: Kubernetes or Docker Swarm integration

---

*Last Updated: 2025-08-26*  
*Docker Setup Version: 1.0.0*
