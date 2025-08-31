/**
 * @fileoverview API Documentation Index for MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 * 
 * @description
 * Central hub for all API documentation, providing navigation to endpoints,
 * conventions, and integration guides. This document serves as the entry
 * point for developers working with the MutualMetrics API.
 * 
 * @dependencies
 * - API architecture documentation
 * - Endpoint specifications
 * - OpenAPI specification
 * - Integration guides
 * 
 * @usage
 * Start here to find any API-related documentation
 * 
 * @state
 * ✅ Functional - Complete API documentation index
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add API testing guide
 * - [PRIORITY: LOW] Add SDK documentation
 * 
 * @performance
 * - Organized for quick navigation
 * - Clear endpoint categorization
 * - Efficient information discovery
 * 
 * @accessibility
 * - Logical organization
 * - Consistent formatting
 * - Clear navigation structure
 * 
 * @security
 * - No sensitive information exposed
 * - Public API documentation only
 */

# 🔌 MutualMetrics API Documentation

Welcome to the comprehensive API documentation for MutualMetrics. This documentation covers all aspects of the API, from high-level architecture to detailed endpoint specifications.

## 🎯 **Quick Navigation**

### **🏗️ Architecture & Design**
- **[API Architecture](../architecture/api-architecture.md)** - Overall API design and principles
- **[System Architecture](../architecture/README.md)** - Complete system overview
- **[API Conventions](conventions.md)** - Standards and best practices

### **📍 Endpoints & Integration**
- **[API Endpoints](endpoints.md)** - Complete endpoint reference
- **[OpenAPI Specification](openapi.yaml)** - Machine-readable API spec
- **[Request/Response Examples](examples.md)** - Usage examples and patterns

### **🔧 Development & Testing**
- **[Frontend Integration](../development/frontend-integration.md)** - React integration guide
- **[Backend Development](../development/backend-development.md)** - FastAPI development guide
- **[Testing Strategy](../development/testing-strategy.md)** - API testing approach

## 🚀 **API Overview**

### **Current Version: v1**
The MutualMetrics API is currently at **version 1**, providing a stable and well-defined interface for all mathematical, financial, and business analytics operations.

### **Base URL Configuration**
- **Development**: `http://localhost/api/v1`
- **Production**: `https://api.mutualmetrics.com/api/v1`
- **Nginx Proxy**: Routes `/api/*` requests to backend on port 8081

### **API Structure**
```
/api/v1/
├── /math/           # Mathematical analysis
├── /business/       # Business analytics
├── /finance/        # Financial tools
├── /utils/          # Utility functions
├── /download/       # File downloads
├── /health          # Health checks
└── /ready           # Readiness checks
```

## 🔄 **Request/Response Flow**

### **Complete Flow**
1. **Frontend** → React Hook Form + Zod validation
2. **API Request** → Frontend makes request to `/api/v1/*`
3. **Nginx Proxy** → Receives on port 80, forwards to backend
4. **Backend Processing** → FastAPI with middleware and validation
5. **Service Layer** → Business logic services perform calculations
6. **Response** → Structured response flows back through the chain

### **Key Components**
- **Frontend**: React with modular API services
- **Proxy**: Nginx reverse proxy on port 80
- **Backend**: FastAPI with Pydantic validation
- **Services**: Coordinator pattern with pure calculation services

## 📊 **API Categories**

### **Mathematical Analysis (`/math`)**
- **Bhaskara Analysis**: Quadratic equation analysis with detailed solutions
- **Quadratic Functions**: General quadratic function analysis
- **Number Conversion**: Number system conversions (binary, decimal, hex)

### **Business Analytics (`/business`)**
- **Revenue Analysis**: Revenue calculations and projections
- **Cost Analysis**: Cost structure and analysis
- **Profit Analysis**: Profit calculations and margins
- **Break-even Analysis**: Break-even point calculations

### **Financial Tools (`/finance`)**
- **Compound Interest**: Compound interest calculations
- **Currency Converter**: Real-time currency conversion

### **Utility Functions (`/utils`)**
- **Number Converter**: Advanced number system conversions
- **Data Validation**: Input validation and sanitization

### **Download Services (`/download`)**
- **Analysis Downloads**: CSV and PDF exports
- **Report Generation**: Customizable report formats

## 🔒 **Security & Validation**

### **Input Validation**
- **Pydantic Schemas**: Strict validation for all inputs
- **Type Safety**: Strong typing with TypeScript and Python
- **Range Validation**: Business rule enforcement
- **Sanitization**: Input sanitization to prevent attacks

### **Security Measures**
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: Request throttling and abuse prevention
- **Error Handling**: Secure error messages without information leakage
- **Container Isolation**: Services run in isolated containers

## 📈 **Performance & Caching**

### **Optimization Strategies**
1. **Response Caching**: Cache calculation results for identical inputs
2. **Static Asset Caching**: Nginx caches frontend assets
3. **Connection Pooling**: Efficient external API connections
4. **Async Processing**: Non-blocking I/O operations

### **Monitoring & Observability**
- **Health Checks**: Regular service health monitoring
- **Performance Metrics**: Request timing and throughput
- **Error Tracking**: Comprehensive error logging and alerting
- **Request Correlation**: Unique request IDs for tracing

## 🔍 **Error Handling**

### **Error Categories**
1. **Validation Errors (400/422)**: Invalid input data
2. **Business Logic Errors (400)**: Business rule violations
3. **External API Errors (502)**: Third-party service failures
4. **System Errors (500)**: Internal server errors

### **Error Response Format**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid coefficient values",
    "details": {
      "field": "coefficient_a",
      "value": 0,
      "constraint": "must be non-zero"
    },
    "timestamp": "2025-08-26T18:30:00Z",
    "requestId": "req-12345"
  }
}
```

## 🚨 **Current Status & Migration**

### **API Restructuring Progress**
- **Phase 1**: ✅ Frontend restructuring and documentation
- **Phase 2**: ✅ Backend architecture refactoring
- **Phase 3**: 🔄 Frontend integration (in progress)
- **Phase 4**: ⏳ Legacy code cleanup (pending)

### **Recent Updates**
- **Docker Fix**: ✅ Fixed backend startup crash in container
- **Base URL**: ✅ Corrected Nginx proxy configuration
- **API Endpoints**: ✅ Updated to clean `/api/v1/*` structure
- **Service Architecture**: ✅ Refactored to coordinator pattern

### **Known Issues**
- **Frontend Integration**: In progress with new modular API services
- **Legacy Endpoints**: Being phased out in favor of v1 endpoints
- **Documentation**: Continuously updated to reflect current state

## 📚 **Integration Guides**

### **Frontend Integration**
- **React Components**: Forms and data visualization
- **API Services**: Modular service architecture
- **State Management**: React hooks and context
- **Error Handling**: User-friendly error messages

### **Backend Integration**
- **FastAPI Framework**: Modern Python web framework
- **Service Layer**: Coordinator pattern with pure services
- **Dependency Injection**: Service factory pattern
- **Middleware**: Comprehensive request/response processing

### **Third-party Integration**
- **Currency APIs**: Real-time exchange rates
- **External Services**: Future integrations planned
- **Webhooks**: Event-driven integrations
- **API Keys**: Secure authentication for external services

## 🧪 **Testing & Development**

### **Testing Strategy**
- **Unit Tests**: Individual component testing
- **Integration Tests**: API endpoint testing
- **End-to-End Tests**: Complete user flow testing
- **Performance Tests**: Load and stress testing

### **Development Tools**
- **OpenAPI Spec**: Interactive API documentation
- **Postman Collections**: Pre-configured API testing
- **Development Environment**: Docker-based development setup
- **Debugging Tools**: Comprehensive logging and monitoring

## 🚀 **Getting Started**

### **Quick Start**
1. **Read Architecture**: Understand the overall system design
2. **Review Endpoints**: Familiarize yourself with available endpoints
3. **Check Examples**: See request/response examples
4. **Test Integration**: Use the health check endpoint to verify connectivity

### **Development Setup**
1. **Clone Repository**: Get the latest code
2. **Start Docker**: Use docker-compose to start services
3. **Access API**: Test endpoints at `localhost/api/v1/health`
4. **Frontend Development**: Run frontend in development mode

### **Production Deployment**
1. **Build Container**: Create production Docker image
2. **Configure Environment**: Set production environment variables
3. **Deploy Services**: Use container orchestration
4. **Monitor Health**: Regular health checks and monitoring

---

*Last Updated: 2025-08-26*  
*API Documentation Version: 1.0.0*
