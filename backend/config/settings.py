# -*- coding: utf-8 -*-
"""
@fileoverview Configuration management using Pydantic settings
@version 1.0.0
@since 2025-08-25
@lastModified 2025-08-25

Responsabilidad
- Centralized configuration management
- Environment-based settings with validation
- Type-safe configuration access
- Default values for development
"""

from typing import List, Optional
from pydantic import Field
from pydantic_settings import BaseSettings
from pydantic import field_validator
from pathlib import Path


class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    # Application metadata
    APP_NAME: str = Field(default="MutualMetrics Backend", env="APP_NAME")
    APP_VERSION: str = Field(default="1.0.0", env="APP_VERSION")
    DEBUG: bool = Field(default=True, env="DEBUG")
    
    # Server configuration
    HOST: str = Field(default="0.0.0.0", env="HOST")
    PORT: int = Field(default=8081, env="PORT")
    
    # CORS configuration
    ALLOWED_ORIGINS: List[str] = Field(
        default=[
            "http://localhost:5173",      # Vite dev server
            "http://127.0.0.1:5173",     # Vite dev server (alternative)
            "http://localhost:3000",      # React dev server
            "http://localhost:80",        # Docker frontend
            "http://localhost:8081",      # Docker backend API
        ],
        env="ALLOWED_ORIGINS"
    )
    
    # External API configuration
    CURRENCY_API_BASE_URL: str = Field(
        default="https://api.exchangerate-api.com/v4",
        env="CURRENCY_API_BASE_URL"
    )
    CURRENCY_API_KEY: Optional[str] = Field(default=None, env="CURRENCY_API_KEY")
    CURRENCY_UPDATE_INTERVAL: int = Field(default=3600, env="CURRENCY_UPDATE_INTERVAL")  # 1 hour
    
    # Cache configuration
    CACHE_TTL: int = Field(default=3600, env="CACHE_TTL")  # 1 hour
    CACHE_MAX_SIZE: int = Field(default=1000, env="CACHE_MAX_SIZE")
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = Field(default=100, env="RATE_LIMIT_PER_MINUTE")
    
    # Logging
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    LOG_FORMAT: str = Field(
        default="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        env="LOG_FORMAT"
    )
    
    # Database (future use)
    DATABASE_URL: str = Field(
        default="sqlite:///./mutualmetrics.db",
        env="DATABASE_URL"
    )
    
    # Security
    SECRET_KEY: str = Field(
        default="dev-secret-key-change-in-production",
        env="SECRET_KEY"
    )
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    
    # File paths
    BASE_DIR: Path = Field(default=Path(__file__).resolve().parent.parent)
    EXPORT_DIR: Path = Field(default=Path("/tmp/exports"))
    
    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        """Parse ALLOWED_ORIGINS from comma-separated string."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v
    
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
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Global settings instance
settings = Settings()
