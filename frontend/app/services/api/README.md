# 🚀 Modular API Service Architecture

## Overview

This directory contains the new modular API service architecture for MutualMetrics. The old monolithic `api.ts` service has been replaced with specialized services for different domains, providing better performance, maintainability, and developer experience.

## 🏗️ Architecture

```
services/api/
├── base.ts              # Base API service with common functionality
├── math.ts              # Mathematical analysis services
├── business.ts          # Business analysis services
├── finance.ts           # Financial tools services
├── download.ts          # Report download services
├── legacy.ts            # Legacy compatibility service (DEPRECATED)
├── index.ts             # Main export file
└── README.md            # This file
```

## 🔧 Services

### BaseApiService (`base.ts`)
- **Purpose**: Common HTTP functionality for all specialized services
- **Features**: 
  - Axios instance with interceptors
  - Error handling and transformation
  - Generic GET, POST, PUT, DELETE methods
  - Health check functionality
  - CSRF token handling

### MathApiService (`math.ts`)
- **Purpose**: Mathematical analysis including Bhaskara and quadratic equations
- **Endpoints**: `/api/v1/math/bhaskara`, `/api/v1/math/quadratic`
- **Features**:
  - Coefficient validation
  - Multiple analysis modes (roots, vertex, optimal, full)
  - Economic context support

### BusinessApiService (`business.ts`)
- **Purpose**: Business analysis including revenue, costs, profit, and breakeven
- **Endpoints**: `/api/v1/business/*`
- **Features**:
  - Revenue analysis
  - Cost analysis
  - Profit analysis
  - Break-even analysis

### FinanceApiService (`finance.ts`)
- **Purpose**: Financial tools including compound interest and currency conversion
- **Endpoints**: `/api/v1/finance/*`
- **Features**:
  - Compound interest calculations
  - Currency conversion (placeholder)

### DownloadApiService (`download.ts`)
- **Purpose**: Report downloads in various formats (CSV, PDF, Excel)
- **Endpoints**: `/api/v1/download/*`
- **Features**:
  - Multiple output formats
  - Progress tracking
  - Batch downloads

### LegacyApiService (`legacy.ts`)
- **Purpose**: Backward compatibility with old endpoints (DEPRECATED)
- **Status**: Will be removed after migration is complete
- **Features**: Deprecation warnings and migration guidance

## 📚 Usage

### Basic Usage

```typescript
// Import specific services
import { mathApiService, businessApiService } from '../services/api';

// Use mathematical analysis
const result = await mathApiService.analyzeBhaskara(request);

// Use business analysis
const revenue = await businessApiService.analyzeRevenue(request);
```

### Advanced Usage

```typescript
// Import service classes for advanced usage
import { MathApiService, BusinessApiService } from '../services/api';

// Create custom instances
const customMathService = new MathApiService();
const customBusinessService = new BusinessApiService();
```

### Health Checks

```typescript
import { checkAllServicesHealth } from '../services/api';

// Check all services health
const health = await checkAllServicesHealth();
console.log(health.overallStatus); // 'healthy' | 'degraded' | 'error'
```

## 🔄 Migration Guide

### From Old Monolithic Service

```typescript
// OLD WAY (Deprecated)
import { apiService } from '../services/api';
const result = await apiService.analyzeBhaskara(request);

// NEW WAY (Recommended)
import { mathApiService } from '../services/api';
const result = await mathApiService.analyzeBhaskara(request);
```

### Migration Map

| Old Method | New Service | New Method |
|------------|-------------|------------|
| `apiService.analyzeBhaskara` | `mathApiService` | `analyzeBhaskara` |
| `apiService.analyzeEconomia` | `mathApiService` | `analyzeBhaskara` (economic context) |
| `apiService.downloadAnalysis` | `downloadApiService` | `downloadAnalysis` |
| `apiService.healthCheck` | Any service | `healthCheck` |

## 🚀 Benefits

### Performance
- **Tree-shaking ready**: Import only needed services
- **Lazy loading support**: Load services on demand
- **Optimized validation**: Precompiled validation schemas

### Developer Experience
- **Clear separation of concerns**: Each service has specific responsibility
- **Consistent API patterns**: Same structure across all services
- **Enhanced type safety**: Full TypeScript support with proper types
- **Easy testing**: Modular services can be tested independently

### Maintainability
- **Single responsibility**: Each service handles one domain
- **Easy to extend**: Add new services without affecting existing ones
- **Centralized validation**: Update validation rules in one place
- **Clear error messages**: Consistent error handling across the app

## 🔍 Health Monitoring

### Individual Service Health

```typescript
// Check individual service health
const mathHealth = await mathApiService.getServiceStatus();
const businessHealth = await businessApiService.getServiceStatus();
```

### Overall System Health

```typescript
// Check all services health
const systemHealth = await checkAllServicesHealth();
console.log(systemHealth.services.math.status); // 'healthy' | 'unhealthy' | 'error'
```

## 🛠️ Development

### Adding New Services

1. Create new service file (e.g., `utilities.ts`)
2. Extend `BaseApiService`
3. Implement domain-specific methods
4. Add to `index.ts` exports
5. Update this README

### Service Template

```typescript
/**
 * @fileoverview [Service Name] API Service
 * @version 1.0.0
 * @author MutualMetrics Team
 * @since 2025-01-01
 * @lastModified 2025-08-26
 */

import { BaseApiService, ApiServiceError } from './base';
import { API_ENDPOINTS } from '../../constants/api';

export class [ServiceName]ApiService extends BaseApiService {
  // Implement service-specific methods
}

export const [serviceName]ApiService = new [ServiceName]ApiService();
```

## 📋 TODO

- [ ] Implement Zod validation schemas
- [ ] Add request/response caching
- [ ] Implement retry mechanisms
- [ ] Add performance metrics
- [ ] Create service discovery
- [ ] Add rate limiting support

## 🚨 Deprecation Timeline

- **Phase 1** (Current): Legacy service with deprecation warnings
- **Phase 2** (Next Release): Remove legacy service
- **Phase 3** (Future): Remove deprecated re-exports

## 📞 Support

For questions about the new architecture or migration assistance:

1. Check the migration guide: `getMigrationGuide()`
2. Review service health: `checkAllServicesHealth()`
3. Check migration status: `getMigrationStatus()`
