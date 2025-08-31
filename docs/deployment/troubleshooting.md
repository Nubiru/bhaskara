/**
 * @fileoverview Troubleshooting Guide for MutualMetrics Docker Deployment
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 * 
 * @description
 * Comprehensive troubleshooting guide covering common Docker deployment issues,
 * error resolution, and debugging procedures for the MutualMetrics platform.
 * This document serves as the definitive reference for resolving deployment problems.
 * 
 * @dependencies
 * - Docker and Docker Compose
 * - FastAPI backend
 * - Pydantic validation
 * - Python dependencies
 * 
 * @usage
 * Reference for resolving deployment and runtime issues
 * 
 * @state
 * ✅ Functional - Complete troubleshooting guide
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add more error scenarios
 * - [PRIORITY: LOW] Add performance troubleshooting
 * 
 * @performance
 * - Quick error resolution
 * - Systematic debugging approach
 * - Clear solution steps
 * 
 * @accessibility
 * - Step-by-step instructions
 * - Clear error descriptions
 * - Logical problem-solving flow
 * 
 * @security
 * - No sensitive information exposed
 * - Safe debugging procedures
 */

# 🔍 MutualMetrics Troubleshooting Guide

## 🎯 **Overview**

This troubleshooting guide covers common issues encountered during MutualMetrics deployment and provides systematic solutions for resolving them. Each issue includes symptoms, root causes, and step-by-step resolution procedures.

## 🚨 **Critical Issues**

### **1. Backend Process Crashes on Startup**

#### **Symptoms**
- Container starts but backend process exits with status 1
- Supervisor retries but eventually gives up
- Error: `backend (exit status 1; not expected)`
- Container health check fails

#### **Root Causes**
1. **Python Module Import Errors**: Incorrect import paths in supervisord configuration
2. **Pydantic Version Compatibility**: Using deprecated parameters in newer versions
3. **Missing Dependencies**: Required Python packages not installed
4. **Configuration Errors**: Invalid environment variables or settings

#### **Resolution Steps**

##### **Step 1: Check Container Logs**
```bash
# View detailed container logs
docker-compose -f docker-compose.stack.yml logs mutualmetrics-stack

# Follow logs in real-time
docker-compose -f docker-compose.stack.yml logs -f mutualmetrics-stack
```

##### **Step 2: Verify Module Imports**
```bash
# Access container shell
docker exec -it mutualmetrics-stack /bin/bash

# Test Python module imports
python -c "import app.main; print('✓ Main module import successful')"

# Check specific imports that might be failing
python -c "from app.core.dependencies import get_health_status; print('✓ Dependencies import successful')"
```

##### **Step 3: Check Process Status**
```bash
# Check supervisor process status
docker exec -it mutualmetrics-stack supervisorctl status

# View supervisor logs
docker exec -it mutualmetrics-stack tail -f /var/log/supervisord.log

# Check backend logs specifically
docker exec -it mutualmetrics-stack tail -f /var/log/backend.log
```

#### **Common Solutions**

##### **Fix 1: Pydantic Version Compatibility**
**Problem**: `PydanticUserError: 'regex' is removed. use 'pattern' instead`

**Root Cause**: Pydantic v2 removed the `regex` parameter in favor of `pattern`

**Solution**: Update all schema definitions:
```python
# OLD (deprecated)
regex="^(completo|raices|vertice|optimal)$"

# NEW (correct)
pattern="^(completo|raices|vertice|optimal)$"
```

**Files to Check**:
- `backend/app/models/schemas.py`
- Any other Pydantic model files

**Search Command**:
```bash
grep -r "regex=" backend/app/
```

##### **Fix 2: Module Import Path Issues**
**Problem**: `ModuleNotFoundError: No module named 'app.main'`

**Root Cause**: Incorrect working directory or import path in supervisord

**Solution**: Verify supervisord configuration:
```ini
[program:backend]
command=uvicorn app.main:app --host 127.0.0.1 --port 8081
directory=/app/backend
```

**Verification**:
```bash
# Check current working directory
docker exec -it mutualmetrics-stack pwd

# Verify file structure
docker exec -it mutualmetrics-stack ls -la /app/backend/

# Test import from correct location
docker exec -it mutualmetrics-stack bash -c "cd /app/backend && python -c 'import app.main'"
```

### **2. Port Binding Issues**

#### **Symptoms**
- Cannot access container on expected ports
- Connection refused errors
- Port already in use errors

#### **Resolution**
```bash
# Check port bindings
docker port mutualmetrics-stack

# Verify container is running
docker ps | grep mutualmetrics-stack

# Check for port conflicts
netstat -tulpn | grep :80
netstat -tulpn | grep :8081

# Stop conflicting services
sudo systemctl stop nginx  # If running on host
sudo systemctl stop apache2  # If running on host
```

### **3. Nginx Configuration Errors**

#### **Symptoms**
- Frontend not loading
- API requests failing
- 502 Bad Gateway errors

#### **Resolution**
```bash
# Check Nginx configuration
docker exec -it mutualmetrics-stack nginx -t

# View Nginx logs
docker exec -it mutualmetrics-stack tail -f /var/log/nginx-error.log

# Check Nginx process status
docker exec -it mutualmetrics-stack supervisorctl status nginx

# Restart Nginx
docker exec -it mutualmetrics-stack supervisorctl restart nginx
```

### **4. Frontend Build Issues**

#### **Symptoms**
- Frontend assets not found
- JavaScript errors in browser
- 404 errors for static files

#### **Resolution**
```bash
# Check frontend build output
docker exec -it mutualmetrics-stack ls -la /usr/share/nginx/html

# Verify build process
docker-compose -f docker-compose.stack.yml build --no-cache mutualmetrics-stack

# Check Node.js build logs
docker-compose -f docker-compose.stack.yml build --progress=plain mutualmetrics-stack
```

## 🔧 **Systematic Debugging Approach**

### **Debugging Workflow**
1. **Identify Symptoms**: What exactly is failing?
2. **Check Logs**: Container, application, and system logs
3. **Verify Configuration**: Docker, Nginx, and application settings
4. **Test Components**: Individual service functionality
5. **Apply Fixes**: Systematic resolution of identified issues
6. **Verify Resolution**: Confirm the fix resolves the problem

### **Essential Debugging Commands**
```bash
# Container management
docker-compose -f docker-compose.stack.yml ps
docker-compose -f docker-compose.stack.yml logs mutualmetrics-stack
docker exec -it mutualmetrics-stack /bin/bash

# Process monitoring
docker exec -it mutualmetrics-stack supervisorctl status
docker exec -it mutualmetrics-stack ps aux

# Log analysis
docker exec -it mutualmetrics-stack tail -f /var/log/supervisord.log
docker exec -it mutualmetrics-stack tail -f /var/log/backend.log
docker exec -it mutualmetrics-stack tail -f /var/log/nginx-error.log

# Health checks
curl -f http://localhost/api/v1/health
curl -f http://localhost:8081/health
```

## 📊 **Performance Issues**

### **Slow Response Times**
- **Check Resource Usage**: `docker stats mutualmetrics-stack`
- **Monitor Logs**: Look for timeout errors
- **Verify Caching**: Check Nginx cache configuration
- **Database Queries**: Optimize slow database operations

### **High Memory Usage**
- **Check Memory Limits**: Verify Docker memory constraints
- **Monitor Processes**: Look for memory leaks
- **Optimize Images**: Use multi-stage builds
- **Resource Cleanup**: Regular container restarts

## 🔒 **Security Issues**

### **CORS Errors**
- **Verify CORS Configuration**: Check FastAPI CORS middleware
- **Check Origin Settings**: Ensure frontend origin is allowed
- **Test Headers**: Verify proper CORS headers

### **Authentication Issues**
- **Check API Keys**: Verify external service credentials
- **Validate Headers**: Ensure proper authorization headers
- **Test Endpoints**: Verify protected endpoint access

## 📝 **Prevention Strategies**

### **Regular Maintenance**
1. **Update Dependencies**: Keep Python packages current
2. **Monitor Logs**: Regular log review and analysis
3. **Health Checks**: Automated health monitoring
4. **Backup Configurations**: Version control for all configs

### **Best Practices**
1. **Use Latest Pydantic**: Avoid deprecated parameters
2. **Test Imports**: Verify all module imports work
3. **Validate Configuration**: Test configs before deployment
4. **Monitor Resources**: Track container resource usage

## 🚀 **Getting Help**

### **When to Escalate**
- **Critical Failures**: System completely down
- **Data Loss**: Potential data corruption
- **Security Breaches**: Unauthorized access
- **Performance Degradation**: Significant slowdown

### **Information to Collect**
1. **Error Messages**: Complete error text and stack traces
2. **Log Files**: Relevant log entries

---

## 🆕 **Recently Resolved Issues**

### **6. Missing RequestIDDep Dependency (RESOLVED ✅)**

#### **Error Message**
```
ImportError: cannot import name 'RequestIDDep' from 'app.core.dependencies'
```

#### **Root Cause**
The router was trying to import `RequestIDDep` which is used for generating unique request IDs for tracking, but this dependency was not implemented in the dependencies file.

#### **Solution Applied**
Added the missing `RequestIDDep` dependency to `backend/app/core/dependencies.py`:

```python
# ========================================
# REQUEST ID DEPENDENCY
# ========================================

def get_request_id() -> str:
    """Generate a unique request ID for tracking."""
    import uuid
    return str(uuid.uuid4())


# Type alias for FastAPI dependency injection
RequestIDDep = Depends(get_request_id)
```

#### **Files Modified**
- `backend/app/core/dependencies.py` - Added RequestIDDep implementation
- `backend/app/api/v1/router.py` - Uses RequestIDDep for all endpoints

#### **Status**
✅ **RESOLVED** - Container now starts successfully and API endpoints are accessible

---

### **7. Export Directory Permission Issues (RESOLVED ✅)**

#### **Error Message**
```
OSError: [Errno 30] Read-only file system: 'exportados'
```

#### **Root Cause**
The settings were trying to create an export directory in the backend folder, but the Docker container has read-only volumes mounted.

#### **Solution Applied**
1. **Updated settings.py**: Changed export directory to `/tmp/exports` and added error handling
2. **Updated Dockerfile**: Created export directory with proper permissions during build

```python
# In backend/config/settings.py
EXPORT_DIR: Path = Field(default=Path("/tmp/exports"))

@field_validator("EXPORT_DIR")
@classmethod
def create_export_dir(cls, v):
    """Ensure export directory exists."""
    try:
        v.mkdir(parents=True, exist_ok=True)
    except (OSError, PermissionError):
        # In Docker container, use /tmp if the default path is not writable
        v = Path("/tmp/exports")
        v.mkdir(parents=True, exist_ok=True)
    return v
```

```dockerfile
# In Dockerfile.stack
# Create export directory with proper permissions
RUN mkdir -p /tmp/exports && \
    chmod 755 /tmp/exports && \
    chown -R root:root /tmp/exports
```

#### **Files Modified**
- `backend/config/settings.py` - Updated export directory path and validation
- `Dockerfile.stack` - Added export directory creation

#### **Status**
✅ **RESOLVED** - Settings validation now passes and container starts successfully
3. **Configuration**: Current settings and changes
4. **Environment**: OS, Docker version, dependencies
5. **Steps to Reproduce**: Exact sequence of actions

---

*Last Updated: 2025-08-26*  
*Troubleshooting Guide Version: 1.0.0*
