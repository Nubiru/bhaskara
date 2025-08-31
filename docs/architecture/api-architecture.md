/**
 * @fileoverview API Architecture Documentation for MutualMetrics
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 * 
 * @description
 * Comprehensive API architecture documentation covering the new v1 API design,
 * Nginx proxy configuration, request/response patterns, and architectural
 * decisions. This document serves as the definitive reference for API design.
 * 
 * @dependencies
 * - FastAPI backend framework
 * - Nginx reverse proxy
 * - Docker containerization
 * - Frontend API services
 * 
 * @usage
 * Reference for API design, development, and integration
 * 
 * @state
 * ✅ Functional - Complete API architecture documentation
 * 
 * @bugs
 * - None known
 * 
 * @todo
 * - [PRIORITY: LOW] Add API versioning strategy details
 * - [PRIORITY: LOW] Add rate limiting configuration
 * 
 * @performance
 * - RESTful design for optimal caching
 * - Nginx proxy for load distribution
 * - Efficient request/response patterns
 * 
 * @accessibility
 * - Clear endpoint documentation
 * - Consistent response formats
 * - Comprehensive error handling
 * 
 * @security
 * - Input validation with Pydantic
 * - CORS configuration
 * - Rate limiting protection
 */

# 🔌 MutualMetrics API Architecture

## 🎯 **Overview**

The MutualMetrics API follows a **RESTful design** with a **versioned architecture** (currently v1). The API is designed to be intuitive, consistent, and performant, with comprehensive error handling and validation.

## 🏗️ **API Design Principles**

### **Core Principles**
1. **RESTful Design** - Follows REST conventions for resource-based operations
2. **Consistent Response Format** - Standardized success/error response structure
3. **Comprehensive Validation** - Input validation using Pydantic schemas
4. **Versioned Endpoints** - Clear versioning strategy for API evolution
5. **Error Handling** - Consistent error responses with meaningful messages

### **Design Patterns**
- **Resource-Oriented** - Endpoints represent business resources
- **Stateless** - Each request contains all necessary information
- **Cacheable** - Responses designed for optimal caching
- **Uniform Interface** - Consistent HTTP methods and status codes

## 🔄 **Request/Response Flow**

### **Complete Request Flow**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│   Nginx     │───▶│   FastAPI   │───▶│   Service   │
│             │    │   Proxy     │    │   Backend   │    │   Layer     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
   React Form         Port 80             Port 8081         Business Logic
   Validation         /api/* →            /api/v1/*         Calculation
                      /backend:8081
```

### **Detailed Flow Steps**
1. **Frontend Validation**: React Hook Form + Zod validation
2. **API Request**: Frontend makes request to `/api/v1/*`
3. **Nginx Proxy**: Receives request on port 80, forwards to backend
4. **Backend Processing**: FastAPI handles request with middleware
5. **Service Layer**: Business logic services perform calculations
6. **Response**: Structured response flows back through the chain

## 🌐 **Nginx Proxy Configuration**

### **Proxy Setup**
The Nginx proxy serves two critical functions:
1. **Reverse Proxy**: Routes API requests to the backend
2. **Static File Server**: Serves the React frontend build

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

### **Why This Configuration?**
- **Port 80**: Standard HTTP port, accessible from browsers
- **Backend Port 8081**: Internal container port, not exposed to host
- **Proxy Headers**: Preserve original request information
- **Path Rewriting**: `/api/*` → backend root for clean routing

## 📍 **API Endpoint Structure**

### **Version 1 API Structure**
```
/api/v1/
├── /math/                    # Mathematical analysis
│   ├── /bhaskara            # Quadratic equation analysis
│   └── /quadratic           # General quadratic functions
├── /business/               # Business analytics
│   ├── /revenue             # Revenue analysis
│   ├── /costs               # Cost analysis
│   ├── /profit              # Profit analysis
│   └── /breakeven           # Break-even analysis
├── /finance/                # Financial tools
│   ├── /compound-interest   # Compound interest calculations
│   └── /currency-converter  # Currency conversion
├── /utils/                  # Utility functions
│   └── /number-converter    # Number system conversion
├── /download/               # File download endpoints
│   ├── /analysis            # General analysis download
│   ├── /revenue             # Revenue analysis download
│   ├── /costs               # Cost analysis download
│   ├── /profit              # Profit analysis download
│   └── /breakeven           # Break-even analysis download
├── /health                  # Health check endpoint
└── /ready                   # Readiness check endpoint
```

### **Endpoint Naming Conventions**
- **Plural Nouns**: `/revenue`, `/costs`, `/profit`
- **Kebab Case**: `/compound-interest`, `/currency-converter`
- **Descriptive Names**: `/number-converter`, `/breakeven`
- **Consistent Structure**: All endpoints follow the same pattern

## 📤 **Request/Response Patterns**

### **Standard Request Format**
```typescript
// Request structure
interface ApiRequest<T> {
  data: T;
  timestamp: string;
  clientVersion: string;
  sessionId: string;
  description?: string;
}

// Example: Bhaskara analysis request
{
  "data": {
    "coefficients": {
      "a": 1,
      "b": -5,
      "c": 6
    },
    "mode": "full"
  },
  "timestamp": "2025-08-26T18:30:00Z",
  "clientVersion": "1.0.0",
  "sessionId": "uuid-here",
  "description": "Quadratic equation analysis"
}
```

### **Standard Response Format**
```typescript
// Success response
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
  processingTime: number;
  requestId: string;
}

// Error response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    requestId: string;
  };
}
```

### **HTTP Status Codes**
- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input data
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: Server-side error
- **503 Service Unavailable**: Service temporarily unavailable

## 🔒 **Security & Validation**

### **Input Validation**
- **Pydantic Schemas**: All inputs validated against strict schemas
- **Type Safety**: Strong typing for all request parameters
- **Range Validation**: Numeric values checked against business rules
- **Sanitization**: Input sanitization to prevent injection attacks

### **CORS Configuration**
```python
# FastAPI CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "https://mutualmetrics.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

### **Rate Limiting**
- **Request Throttling**: Prevents API abuse
- **IP-based Limits**: Per-client request limits
- **Endpoint-specific Limits**: Different limits for different operations
- **Graceful Degradation**: Returns 429 status when limits exceeded

## 📊 **Performance & Caching**

### **Caching Strategy**
1. **Response Caching**: Cache calculation results for identical inputs
2. **Static Asset Caching**: Nginx caches frontend assets
3. **API Response Caching**: Intelligent caching based on request parameters
4. **Cache Invalidation**: Automatic cache invalidation for data changes

### **Optimization Techniques**
- **Connection Pooling**: Efficient database and external API connections
- **Async Processing**: Non-blocking I/O operations
- **Response Compression**: Gzip compression for large responses
- **Pagination**: Large result sets paginated for performance

## 🔍 **Error Handling**

### **Error Categories**
1. **Validation Errors**: Invalid input data (400/422)
2. **Business Logic Errors**: Business rule violations (400)
3. **External API Errors**: Third-party service failures (502)
4. **System Errors**: Internal server errors (500)

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

### **Error Handling Strategy**
- **Graceful Degradation**: Return meaningful errors instead of crashes
- **Logging**: Comprehensive error logging for debugging
- **User Feedback**: Clear error messages for end users
- **Recovery**: Automatic retry mechanisms where appropriate

## 🔄 **API Versioning Strategy**

### **Versioning Approach**
- **URL-based Versioning**: `/api/v1/*`, `/api/v2/*`
- **Semantic Versioning**: Major.Minor.Patch versioning
- **Backward Compatibility**: Maintain compatibility during transitions
- **Deprecation Policy**: Clear deprecation timelines

### **Migration Strategy**
1. **Phase 1**: Implement new v1 endpoints alongside legacy
2. **Phase 2**: Update frontend to use v1 endpoints
3. **Phase 3**: Deprecate legacy endpoints with warnings
4. **Phase 4**: Remove legacy endpoints after transition period

## 📈 **Monitoring & Observability**

### **Health Checks**
- **Health Endpoint**: `/api/v1/health` for basic health status
- **Readiness Endpoint**: `/api/v1/ready` for service readiness
- **Dependency Checks**: Verify all required services are available
- **Performance Metrics**: Response time and throughput monitoring

### **Logging & Tracing**
- **Structured Logging**: JSON-formatted logs for easy parsing
- **Request Correlation**: Unique request IDs for tracing
- **Performance Metrics**: Request timing and resource usage
- **Error Tracking**: Comprehensive error logging and alerting

## 🚀 **Future API Enhancements**

### **Planned Features**
1. **GraphQL Support**: Alternative to REST for complex queries
2. **WebSocket Endpoints**: Real-time updates for long calculations
3. **Bulk Operations**: Batch processing for multiple calculations
4. **Streaming Responses**: Progressive result delivery for large calculations

### **API Evolution**
- **OpenAPI 3.1**: Latest OpenAPI specification support
- **AsyncAPI**: Event-driven API documentation
- **API Gateway**: Advanced routing and rate limiting
- **Service Mesh**: Advanced service communication patterns

---

*Last Updated: 2025-08-26*  
*API Architecture Version: 1.0.0*
