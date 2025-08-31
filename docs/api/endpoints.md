# API Endpoints Reference

**Version:** 1.0.0  
**Last Updated:** 2025-08-25  
**Status:** ✅ Production Ready

## Overview

This document provides a complete reference for all API endpoints in MutualMetrics. The API follows RESTful principles and uses consistent response formats.

## Base URLs

### Containerized Deployment
- **API Base**: `http://localhost/api`
- **Documentation**: `http://localhost/api/docs`
- **Health Check**: `http://localhost/api/health`

### Local Development
- **API Base**: `http://localhost:8081`
- **Documentation**: `http://localhost:8081/docs`
- **Health Check**: `http://localhost:8081/health`

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "error": null
}
```

Error responses:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": { /* additional error info */ }
  }
}
```

## Endpoints

### 1. Health Check

#### GET /health
**Description**: Service health status and version information

**Response**:
```json
{
  "status": "ok",
  "uptime": 3600,
  "version": "1.0.0"
}
```

---

### 2. Mathematical Tools

#### GET /math/quadratic
**Description**: Quadratic function analysis using Bhaskara's formula

**Query Parameters**:
- `a` (float, required): Coefficient a (must be non-zero)
- `b` (float, required): Coefficient b
- `c` (float, required): Coefficient c
- `mode` (string, optional): Analysis mode (default: "completo")
- `description` (string, optional): Analysis description

**Response**:
```json
{
  "success": true,
  "data": {
    "equation": "x² - 5x + 6 = 0",
    "discriminant": 1,
    "roots": {
      "x1": 3,
      "x2": 2
    },
    "vertex": {
      "x": 2.5,
      "y": -0.25
    },
    "analysisId": "quadratic-123"
  }
}
```

**Modes Available**:
- `raices`: Roots only
- `vertice`: Vertex only
- `optimal`: Optimal analysis
- `completo`: Complete analysis

---

#### GET /math/economy
**Description**: Economic-focused quadratic analysis

**Query Parameters**: Same as quadratic
**Response**: Same format as quadratic

---

#### GET /math/number-converter
**Description**: Convert numbers between different bases (Hex, Octal, Decimal, Binary)

**Query Parameters**:
- `value` (string, required): Number to convert
- `from_base` (string, required): Source base (hex, octal, decimal, binary)
- `to_base` (string, required): Target base (hex, octal, decimal, binary)

**Response**:
```json
{
  "success": true,
  "data": {
    "originalValue": "255",
    "originalBase": "decimal",
    "convertedValue": "FF",
    "targetBase": "hex",
    "conversionId": "converter-456"
  }
}
```

---

### 3. Business Analytics

#### GET /business/revenue
**Description**: Revenue analysis based on price and quantity

**Query Parameters**:
- `precio` (float, required): Unit price
- `cantidad` (float, required): Quantity sold
- `description` (string, optional): Analysis description

**Response**:
```json
{
  "success": true,
  "data": {
    "totalRevenue": 1500.00,
    "unitPrice": 25.00,
    "quantity": 60,
    "analysisId": "revenue-789"
  }
}
```

---

#### GET /business/costs
**Description**: Total cost analysis

**Query Parameters**:
- `costos_fijos` (float, required): Fixed costs
- `costos_variables` (float, required): Variable costs
- `cantidad` (float, optional): Quantity for per-unit calculation
- `description` (string, optional): Analysis description

**Response**:
```json
{
  "success": true,
  "data": {
    "totalCosts": 2500.00,
    "fixedCosts": 1000.00,
    "variableCosts": 1500.00,
    "costPerUnit": 25.00,
    "analysisId": "cost-101"
  }
}
```

---

#### GET /business/profit
**Description**: Profit analysis

**Query Parameters**:
- `ingreso_total` (float, required): Total revenue
- `costo_total` (float, required): Total costs
- `description` (string, optional): Analysis description

**Response**:
```json
{
  "success": true,
  "data": {
    "grossProfit": 1000.00,
    "profitMargin": 0.40,
    "analysisId": "profit-202"
  }
}
```

---

#### GET /business/breakeven
**Description**: Break-even point analysis

**Query Parameters**:
- `costos_fijos` (float, required): Fixed costs
- `precio` (float, required): Selling price per unit
- `costo_variable_unitario` (float, required): Variable cost per unit
- `description` (string, optional): Analysis description

**Response**:
```json
{
  "success": true,
  "data": {
    "breakevenPoint": 500.00,
    "breakevenUnits": 50,
    "contributionMargin": 0.60,
    "analysisId": "breakeven-303"
  }
}
```

---

### 4. Financial Tools

#### GET /finance/compound-interest
**Description**: Compound interest calculation

**Query Parameters**:
- `principal` (float, required): Initial principal amount
- `tasa_anual` (float, required): Annual interest rate
- `frecuencia_anual` (integer, required): Compounding frequency per year
- `años` (integer, required): Number of years
- `contribuciones` (float, optional): Regular contributions
- `frecuencia_contribucion` (string, optional): Contribution frequency
- `description` (string, optional): Analysis description

**Response**:
```json
{
  "success": true,
  "data": {
    "finalAmount": 12833.59,
    "totalInterest": 2833.59,
    "totalContributions": 6000,
    "analysisId": "compound-404"
  }
}
```

---

#### GET /finance/currency-converter
**Description**: Convert between different currencies

**Query Parameters**:
- `amount` (float, required): Amount to convert
- `from_currency` (string, required): Source currency (e.g., "USD", "EUR")
- `to_currency` (string, required): Target currency (e.g., "USD", "EUR")

**Response**:
```json
{
  "success": true,
  "data": {
    "originalAmount": 100,
    "originalCurrency": "USD",
    "convertedAmount": 85.50,
    "targetCurrency": "EUR",
    "exchangeRate": 0.855,
    "conversionId": "currency-505"
  }
}
```

---

### 5. Download Endpoints

#### GET /download/analysis
**Description**: Download analysis results in various formats

**Query Parameters**:
- `format` (string, required): Output format (csv, pdf, excel)
- `analysis_ids` (string, required): Comma-separated list of analysis IDs

**Response**: File download (blob)

---

## Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_COEFFICIENT_A` | Coefficient 'a' must be non-zero | 400 |
| `INVALID_COEFFICIENT_B` | Coefficient 'b' must be a number | 400 |
| `INVALID_COEFFICIENT_C` | Coefficient 'c' must be a number | 400 |
| `BHASKARA_ANALYSIS_ERROR` | Bhaskara analysis failed | 500 |
| `REVENUE_ANALYSIS_ERROR` | Revenue analysis failed | 500 |
| `COST_ANALYSIS_ERROR` | Cost analysis failed | 500 |
| `PROFIT_ANALYSIS_ERROR` | Profit analysis failed | 500 |
| `BREAKEVEN_ANALYSIS_ERROR` | Break-even analysis failed | 500 |
| `COMPOUND_INTEREST_ANALYSIS_ERROR` | Compound interest analysis failed | 500 |
| `DOWNLOAD_ERROR` | Download operation failed | 500 |
| `BACKEND_ERROR` | Backend service error | 500 |
| `NETWORK_ERROR` | Network connectivity error | 500 |
| `TIMEOUT_ERROR` | Request timeout | 408 |
| `VALIDATION_ERROR` | Input validation failed | 400 |

## Rate Limiting

- **Default**: 100 requests per minute per IP
- **Burst**: 200 requests per minute per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Authentication

Currently, the API is open for development. Future versions will include:
- API key authentication
- JWT tokens for user sessions
- Role-based access control

## CORS Configuration

Allowed origins:
- `http://localhost:5173` (Vite dev server)
- `http://localhost` (Production frontend)
- `http://127.0.0.1:5173` (Alternative dev server)

## Testing

### Health Check
```bash
curl http://localhost/api/health
```

### Quadratic Analysis
```bash
curl "http://localhost/api/math/quadratic?a=1&b=-5&c=6&mode=completo"
```

### Revenue Analysis
```bash
curl "http://localhost/api/business/revenue?precio=25&cantidad=60"
```

### Number Converter
```bash
curl "http://localhost/api/math/number-converter?value=255&from_base=decimal&to_base=hex"
```

### Currency Converter
```bash
curl "http://localhost/api/finance/currency-converter?amount=100&from_currency=USD&to_currency=EUR"
```

## Versioning

API versioning is handled through the URL path:
- Current version: `/api/` (v1)
- Future versions: `/api/v2/`, `/api/v3/`, etc.

## Support

For API support and questions:
- Check the interactive documentation at `/api/docs`
- Review error logs in the backend service
- Contact the development team
