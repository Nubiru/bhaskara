Este archivo servirá como guía para el desarrollador del frontend.

# Backend de Funciones Cuadráticas y Análisis Económico

Este proyecto es el backend de una aplicación educativa para resolver funciones cuadráticas y mostrar análisis económicos (ingreso total, costo total, beneficio, punto de equilibrio, etc.) usando FastAPI.

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>

Crear y activar un entorno virtual (recomendado)

python -m venv venv
# En Windows
venv\Scripts\activate
# En Linux/Mac
source venv/bin/activate


Instalar dependencias

pip install -r requirements.txt


Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

APP_NAME=FuncionesCuadraticasAPI
APP_VERSION=1.0.0

🚀 Ejecución del servidor
Para iniciar el servidor de desarrollo:

uvicorn main:app --reload


El backend estará disponible en: http://127.0.0.1:8000

📡 Endpoints disponibles
Análisis

GET /analisis/analisis_ingreso_total

GET /analisis/analisis_costo_total

GET /analisis/analisis_beneficio

GET /analisis/analisis_punto_equilibrio

GET /analisis/analisis_bhaskara

Descargas

GET /descargar/desc_ingreso_total

GET /descargar/desc_costo_total

GET /descargar/desc_beneficio

GET /descargar/desc_punto_equilibrio

GET /descargar/desc_desc_bhaskara

