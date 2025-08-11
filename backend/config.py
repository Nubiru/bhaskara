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

