# -*- coding: utf-8 -*-
"""
@fileoverview Configuración central del backend (variables de entorno, constantes y paths)
@version 1.0.0
@since 2025-08-12
@lastModified 2025-08-12

Responsabilidad
- Cargar y exponer configuración de la aplicación (nombres, versiones, CORS, rutas de exportación)
- Proveer valores por defecto seguros para entorno local

No debe contener lógica de negocio ni rutas.
"""

from pathlib import Path
from typing import List
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Raíz del módulo backend
BASE_DIR = Path(__file__).resolve().parent

# Metadatos de la aplicación
APP_NAME: str = os.getenv("APP_NAME", "MutualMetrics Backend")
APP_VERSION: str = os.getenv("APP_VERSION", "0.1.0")

# CORS (orígenes permitidos)
DEFAULT_ALLOWED_ORIGINS: List[str] = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
ALLOWED_ORIGINS: List[str] = [
    origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", ",".join(DEFAULT_ALLOWED_ORIGINS)).split(",") if origin.strip()
]

# Directorio de exportación
EXPORT_DIR = Path(os.getenv("EXPORT_DIR", BASE_DIR / "exportados"))
EXPORT_DIR.mkdir(parents=True, exist_ok=True)

# Base de datos (reservado para futuro)
DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/db.sqlite3")

# config.py
import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Carpeta base del proyecto
BASE_DIR = Path(__file__).resolve().parent

# Configuración general de la API
APP_NAME = "API de Análisis y Exportación"
APP_VERSION = "1.0.0"
API_PREFIX = "/api"

# Carpeta donde se guardarán los archivos exportados
EXPORT_DIR = os.getenv("EXPORT_DIR", BASE_DIR / "exportados")

# Base de datos (opcional, para el futuro)
DB_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/db.sqlite3")

# Crear carpeta de exportación si no existe
os.makedirs(EXPORT_DIR, exist_ok=True)

from dotenv import load_dotenv
import os

load_dotenv()

EXPORT_DIR = os.getenv("EXPORT_DIR")
DATABASE_URL = os.getenv("DATABASE_URL")

