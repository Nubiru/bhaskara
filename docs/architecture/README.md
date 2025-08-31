/**
 * @fileoverview System Architecture Overview for MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 * 
 * @description
 * Comprehensive system architecture documentation covering the overall
 * design, components, and interactions of the MutualMetrics platform.
 * Includes the new Nginx proxy setup and API v1 architecture.
 * 
 * @dependencies
 * - Docker containerization
 * - Nginx reverse proxy
 * - FastAPI backend
 * - React frontend
 * 
 * @usage
 * Reference for understanding system design and architecture decisions
 * 
 * @state
 * ✅ Functional - Complete architecture documentation
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add performance metrics
 * - [PRIORITY: LOW] Add scaling considerations
 * 
 * @performance
 * - Nginx proxy for load distribution
 * - Containerized services for isolation
 * - Optimized API endpoints
 * 
 * @accessibility
 * - Clear component diagrams
 * - Logical flow documentation
 * 
 * @security
 * - Nginx security headers
 * - Container isolation
 * - API rate limiting
 */

# 🏗️ MutualMetrics System Architecture

## 🎯 **Overview**

MutualMetrics is a modern, containerized web application that provides mathematical, financial, and business analytics tools. The system is built with a microservices-inspired architecture using Docker containers, Nginx reverse proxy, and a modular API design.

## 🏛️ **Architecture Principles**

### **Core Design Principles**
1. **Separation of Concerns** - Each component has a single, well-defined responsibility
2. **Containerization** - All services run in isolated Docker containers
3. **API-First Design** - Backend exposes clean, RESTful APIs
4. **Progressive Enhancement** - Frontend gracefully degrades when features unavailable
5. **Security by Default** - Security headers, rate limiting, and input validation

### **Technology Stack**
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: FastAPI + Python 3.12
- **Proxy**: Nginx (reverse proxy and static file serving)
- **Containerization**: Docker + Docker Compose
- **Process Management**: Supervisor

## 🔄 **System Flow**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │───▶│   Nginx Proxy   │───▶│  FastAPI Backend│
│                 │    │   (Port 80)     │    │  (Port 8081)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Static Assets  │
                       │  (React Build)  │
                       └─────────────────┘
```

## 🐳 **Container Architecture**

### **Single Container Design**
The system uses a **single container approach** for simplicity and ease of deployment:

```
mutualmetrics-stack/
├── Nginx (Port 80) - Reverse proxy + static files
├── FastAPI Backend (Port 8081) - API services
└── Supervisor - Process management
```

### **Container Structure**
```
/app/
├── backend/           # Python backend code
├── start.sh          # Startup script
└── supervisord.conf  # Process configuration

/usr/share/nginx/html/ # React frontend build
/etc/nginx/            # Nginx configuration
```

## 🔌 **API Architecture**

### **API Versioning Strategy**
- **Current Version**: v1 (`/api/v1/*`)
- **Versioning Approach**: URL-based versioning
- **Backward Compatibility**: Legacy endpoints maintained during transition

### **API Structure**
```
/api/v1/
├── /math/           # Mathematical analysis
│   ├── /bhaskara    # Quadratic equation analysis
│   └── /quadratic   # General quadratic functions
├── /business/       # Business analytics
│   ├── /revenue     # Revenue analysis
│   ├── /costs       # Cost analysis
│   ├── /profit      # Profit analysis
│   └── /breakeven   # Break-even analysis
├── /finance/        # Financial tools
│   ├── /compound-interest    # Compound interest
│   └── /currency-converter  # Currency conversion
├── /utils/          # Utility functions
│   └── /number-converter    # Number system conversion
├── /download/       # File download endpoints
├── /health          # Health check
└── /ready           # Readiness check
```

### **Request/Response Flow**
1. **Frontend** makes request to `/api/v1/*`
2. **Nginx** receives request on port 80
3. **Nginx** proxies `/api/*` requests to backend on port 8081
4. **Backend** processes request and returns response
5. **Nginx** forwards response back to frontend

## 🚀 **Frontend Architecture**

### **Component Structure**
```
frontend/app/
├── components/       # Reusable UI components
│   ├── forms/       # Form components
│   ├── charts/      # Data visualization
│   ├── layout/      # Layout components
│   └── ui/          # Basic UI elements
├── services/        # API service layer
│   ├── api/         # Modular API services
│   └── hooks/       # Custom React hooks
├── routes/          # Application routing
├── i18n/            # Internationalization
└── types/           # TypeScript type definitions
```

### **API Service Architecture**
The frontend uses a **modular API service architecture**:

- **BaseApiService**: Common HTTP functionality and error handling
- **Specialized Services**: Math, Business, Finance, Download services
- **Unified Interface**: Consistent error handling and response processing

## 🔧 **Backend Architecture**

### **Service Architecture**
The backend follows a **coordinator pattern**:

- **Coordinator Services**: MathCoordinator, BusinessCoordinator, FinanceCoordinator
- **Pure Services**: Focused, single-responsibility calculation services
- **Dependency Injection**: Service factory pattern for lifecycle management

### **Core Components**
```
backend/app/
├── core/            # Core functionality
│   ├── dependencies.py    # Dependency injection
│   ├── exceptions.py      # Custom exception hierarchy
│   └── middleware.py      # Request/response middleware
├── services/        # Business logic services
│   ├── math_service.py    # Math operations coordinator
│   ├── business_service.py # Business analytics coordinator
│   └── finance_service.py # Financial tools coordinator
├── api/v1/          # API endpoints
│   └── router.py    # Main API router
└── models/          # Data models and schemas
```

## 🔒 **Security Architecture**

### **Security Measures**
1. **Nginx Security Headers**: CORS, XSS protection, content security policy
2. **Input Validation**: Pydantic schemas for all API inputs
3. **Rate Limiting**: Request throttling to prevent abuse
4. **Container Isolation**: Services run in isolated containers
5. **Error Handling**: Secure error messages without information leakage

### **CORS Configuration**
- **Frontend Origin**: `http://localhost` (development)
- **Allowed Methods**: GET, POST, PUT, DELETE
- **Allowed Headers**: Content-Type, Authorization
- **Credentials**: Supported for authenticated requests

## 📊 **Performance Architecture**

### **Optimization Strategies**
1. **Nginx Caching**: Static asset caching and compression
2. **API Response Caching**: Intelligent caching of calculation results
3. **Connection Pooling**: Efficient database and external API connections
4. **Async Processing**: Non-blocking I/O operations
5. **Resource Management**: Efficient memory and CPU usage

### **Monitoring and Observability**
- **Health Checks**: Regular service health monitoring
- **Logging**: Structured logging with correlation IDs
- **Metrics**: Request timing and error rate monitoring
- **Tracing**: Request flow tracking across services

## 🔄 **Deployment Architecture**

### **Environment Configuration**
- **Development**: Local Docker containers
- **Production**: Container orchestration ready
- **Configuration**: Environment-based configuration management

### **Scaling Considerations**
- **Horizontal Scaling**: Stateless backend services
- **Load Balancing**: Nginx proxy for request distribution
- **Resource Limits**: Container resource constraints
- **Auto-scaling**: Ready for Kubernetes deployment

## 📈 **Future Architecture Considerations**

### **Planned Improvements**
1. **Microservices Migration**: Split into separate containers
2. **Message Queues**: Async processing for heavy calculations
3. **Caching Layer**: Redis for session and result caching
4. **Database Integration**: Persistent storage for user data
5. **Authentication**: JWT-based user authentication

### **Technology Evolution**
- **GraphQL**: Consider for complex data queries
- **WebSockets**: Real-time updates for long calculations
- **Service Mesh**: Advanced service communication patterns
- **Observability**: Advanced monitoring and alerting

---

*Last Updated: 2025-08-26*  
*Architecture Version: 1.0.0*
