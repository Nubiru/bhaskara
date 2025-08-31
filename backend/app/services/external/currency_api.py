# -*- coding: utf-8 -*-
"""
@fileoverview External currency API service for live exchange rates
@version 1.0.0
@since 2025-08-25
@lastModified 2025-08-25

Responsabilidad
- Integrate with external currency API for live exchange rates
- Implement caching strategy for rate updates
- Handle API failures gracefully with fallback rates
- Provide real-time currency conversion data
"""

import asyncio
import aiohttp
import logging
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from dataclasses import dataclass
from config.settings import settings
from app.core.exceptions import ExternalAPIException, CacheException

logger = logging.getLogger(__name__)


@dataclass
class ExchangeRate:
    """Exchange rate data structure."""
    from_currency: str
    to_currency: str
    rate: float
    last_updated: datetime
    source: str


class CurrencyAPIService:
    """Service for fetching live currency exchange rates."""
    
    def __init__(self):
        self.base_url = settings.CURRENCY_API_BASE_URL
        self.api_key = settings.CURRENCY_API_KEY
        self.cache: Dict[str, ExchangeRate] = {}
        self.last_update = None
        self.update_interval = timedelta(seconds=settings.CURRENCY_UPDATE_INTERVAL)
        
        # Free API endpoints (no API key required)
        self.endpoints = {
            "latest": "/latest",
            "convert": "/convert",
            "symbols": "/symbols",
            "timeseries": "/timeseries"
        }
    
    async def get_exchange_rate(self, from_currency: str, to_currency: str) -> ExchangeRate:
        """
        Get exchange rate between two currencies.
        
        Args:
            from_currency: Source currency code (e.g., 'USD')
            to_currency: Target currency code (e.g., 'EUR')
        
        Returns:
            ExchangeRate object with current rate and metadata
        """
        # Normalize currency codes
        from_currency = from_currency.upper()
        to_currency = to_currency.upper()
        
        # Check cache first
        cache_key = f"{from_currency}_{to_currency}"
        if cache_key in self.cache:
            cached_rate = self.cache[cache_key]
            if datetime.now() - cached_rate.last_updated < self.update_interval:
                logger.debug(f"Using cached rate for {cache_key}: {cached_rate.rate}")
                return cached_rate
        
        try:
            # Fetch live rate from external API
            rate = await self._fetch_live_rate(from_currency, to_currency)
            
            # Cache the result
            self.cache[cache_key] = rate
            
            # Clean old cache entries if cache is full
            if len(self.cache) > settings.CACHE_MAX_SIZE:
                await self._clean_cache()
            
            return rate
            
        except Exception as e:
            logger.error(f"Failed to fetch live rate for {cache_key}: {e}")
            
            # Return cached rate if available (even if expired)
            if cache_key in self.cache:
                logger.warning(f"Using expired cached rate for {cache_key}")
                return self.cache[cache_key]
            
            # Return fallback rate
            return await self._get_fallback_rate(from_currency, to_currency)
    
    async def _fetch_live_rate(self, from_currency: str, to_currency: str) -> ExchangeRate:
        """Fetch live exchange rate from external API."""
        if from_currency == to_currency:
            return ExchangeRate(
                from_currency=from_currency,
                to_currency=to_currency,
                rate=1.0,
                last_updated=datetime.now(),
                source="internal"
            )
        
        # Try multiple free APIs in order of preference
        apis = [
            self._fetch_from_exchangerate_api,
            self._fetch_from_frankfurter_api,
            self._fetch_from_currency_api
        ]
        
        last_error = None
        for api_func in apis:
            try:
                rate = await api_func(from_currency, to_currency)
                logger.info(f"Successfully fetched rate from {api_func.__name__}")
                return rate
            except Exception as e:
                last_error = e
                logger.warning(f"API {api_func.__name__} failed: {e}")
                continue
        
        # If all APIs fail, raise exception
        raise ExternalAPIException(
            message="All currency APIs failed",
            api_name="currency_apis",
            details={"last_error": str(last_error)}
        )
    
    async def _fetch_from_exchangerate_api(self, from_currency: str, to_currency: str) -> ExchangeRate:
        """Fetch from ExchangeRate-API (free tier: 1000 requests/month)."""
        url = f"{self.base_url}/convert/{from_currency}/{to_currency}"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=10) as response:
                if response.status == 200:
                    data = await response.json()
                    return ExchangeRate(
                        from_currency=from_currency,
                        to_currency=to_currency,
                        rate=float(data.get("result", 0)),
                        last_updated=datetime.now(),
                        source="exchangerate-api"
                    )
                else:
                    raise ExternalAPIException(
                        message=f"ExchangeRate-API returned {response.status}",
                        api_name="exchangerate-api",
                        status_code=response.status
                    )
    
    async def _fetch_from_frankfurter_api(self, from_currency: str, to_currency: str) -> ExchangeRate:
        """Fetch from Frankfurter API (completely free, no API key)."""
        url = f"https://api.frankfurter.app/latest?from={from_currency}&to={to_currency}"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=10) as response:
                if response.status == 200:
                    data = await response.json()
                    rates = data.get("rates", {})
                    if to_currency in rates:
                        return ExchangeRate(
                            from_currency=from_currency,
                            to_currency=to_currency,
                            rate=float(rates[to_currency]),
                            last_updated=datetime.now(),
                            source="frankfurter-api"
                        )
                    else:
                        raise ExternalAPIException(
                            message=f"Currency {to_currency} not found in response",
                            api_name="frankfurter-api"
                        )
                else:
                    raise ExternalAPIException(
                        message=f"Frankfurter API returned {response.status}",
                        api_name="frankfurter-api",
                        status_code=response.status
                    )
    
    async def _fetch_from_currency_api(self, from_currency: str, to_currency: str) -> ExchangeRate:
        """Fetch from Currency-API (free tier: 100 requests/month)."""
        url = f"https://api.currencyapi.com/v3/latest?apikey={self.api_key}&base_currency={from_currency}&currencies={to_currency}"
        
        if not self.api_key:
            raise ExternalAPIException(
                message="Currency-API requires API key",
                api_name="currency-api"
            )
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=10) as response:
                if response.status == 200:
                    data = await response.json()
                    rates = data.get("data", {}).get(to_currency, {})
                    if "value" in rates:
                        return ExchangeRate(
                            from_currency=from_currency,
                            to_currency=to_currency,
                            rate=float(rates["value"]),
                            last_updated=datetime.now(),
                            source="currency-api"
                        )
                    else:
                        raise ExternalAPIException(
                            message=f"Rate not found in Currency-API response",
                            api_name="currency-api"
                        )
                else:
                    raise ExternalAPIException(
                        message=f"Currency-API returned {response.status}",
                        api_name="currency-api",
                        status_code=response.status
                    )
    
    async def _get_fallback_rate(self, from_currency: str, to_currency: str) -> ExchangeRate:
        """Get fallback exchange rate when all APIs fail."""
        # Use hardcoded fallback rates for common currencies
        fallback_rates = {
            "USD_EUR": 0.85,
            "USD_GBP": 0.73,
            "USD_JPY": 110.0,
            "EUR_USD": 1.18,
            "EUR_GBP": 0.86,
            "GBP_USD": 1.37,
            "GBP_EUR": 1.16,
        }
        
        fallback_key = f"{from_currency}_{to_currency}"
        if fallback_key in fallback_rates:
            rate = fallback_rates[fallback_key]
            logger.warning(f"Using fallback rate for {fallback_key}: {rate}")
            return ExchangeRate(
                from_currency=from_currency,
                to_currency=to_currency,
                rate=rate,
                last_updated=datetime.now(),
                source="fallback"
            )
        
        # Default fallback rate
        logger.warning(f"No fallback rate available for {fallback_key}, using 1.0")
        return ExchangeRate(
            from_currency=from_currency,
            to_currency=to_currency,
            rate=1.0,
            last_updated=datetime.now(),
            source="fallback_default"
        )
    
    async def _clean_cache(self):
        """Remove old cache entries to prevent memory issues."""
        current_time = datetime.now()
        expired_keys = [
            key for key, rate in self.cache.items()
            if current_time - rate.last_updated > self.update_interval * 2
        ]
        
        for key in expired_keys:
            del self.cache[key]
        
        logger.info(f"Cleaned {len(expired_keys)} expired cache entries")
    
    async def get_supported_currencies(self) -> List[str]:
        """Get list of supported currency codes."""
        try:
            url = f"{self.base_url}/symbols"
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=10) as response:
                    if response.status == 200:
                        data = await response.json()
                        return list(data.get("symbols", {}).keys())
                    else:
                        # Return common currencies if API fails
                        return ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "MXN"]
        except Exception as e:
            logger.error(f"Failed to fetch supported currencies: {e}")
            return ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "MXN"]
    
    async def refresh_all_rates(self):
        """Refresh all cached exchange rates."""
        logger.info("Starting refresh of all exchange rates")
        
        # Get list of currencies to refresh
        currencies = await self.get_supported_currencies()
        
        # Refresh rates for common currency pairs
        common_pairs = [
            ("USD", "EUR"), ("USD", "GBP"), ("USD", "JPY"),
            ("EUR", "USD"), ("EUR", "GBP"), ("EUR", "JPY"),
            ("GBP", "USD"), ("GBP", "EUR"), ("GBP", "JPY")
        ]
        
        tasks = []
        for from_curr, to_curr in common_pairs:
            if from_curr in currencies and to_curr in currencies:
                task = self.get_exchange_rate(from_curr, to_curr)
                tasks.append(task)
        
        # Execute all refresh tasks concurrently
        if tasks:
            await asyncio.gather(*tasks, return_exceptions=True)
            logger.info(f"Refreshed {len(tasks)} exchange rates")
        
        self.last_update = datetime.now()


# Global service instance
currency_service = CurrencyAPIService()
