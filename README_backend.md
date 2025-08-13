Este archivo servirá como guía para el desarrollador del frontend.

# Backend de Funciones Cuadráticas y Análisis Económico

Este proyecto es el backend de una aplicación educativa para resolver funciones cuadráticas y mostrar análisis económicos (ingreso total, costo total, beneficio, punto de equilibrio, etc.) usando FastAPI.

## 📦 Instalación

1. Clonar el repositorio
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>/backend
   ```

2. Dependencias (dos opciones)

   - Opción A: con entorno virtual (recomendado)
     ```bash
     # Crear y activar venv
     python -m venv venv
     # Windows PowerShell
     .\venv\Scripts\Activate.ps1
     # Windows cmd
     venv\Scripts\activate
     # Linux/Mac
     source venv/bin/activate

     # Actualizar pip y requisitos
     python -m pip install --upgrade pip setuptools wheel
     pip install -r requirements.txt
     ```

   - Opción B: sin venv (instalación para usuario actual)
     ```bash
     python -m pip install --upgrade pip setuptools wheel
     pip install --user -r requirements.txt
     ```

   - Si ves errores de permisos en PowerShell al activar venv:
     ```powershell
     Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
     ```

3. Variables de entorno (opcional)
   ```bash
   APP_NAME=FuncionesCuadraticasAPI
   APP_VERSION=1.0.0
   ```

4. 🚀 Ejecutar servidor
   ```bash
   uvicorn main:app --reload
   ```

El backend estará disponible en: http://127.0.0.1:8000

📡 Endpoints disponibles (MVP)

- GET `/health`
- POST `/analizar/bhaskara`  body: `{ coefficients:{a,b,c}, mode?, description? }`
- GET `/analisis/ingreso-total`  params: `precio, cantidad, description?`
- GET `/analisis/costo-total`  params: `costos_fijos, costos_variables, cantidad?, description?`
- GET `/analisis/beneficio`  params: `ingreso_total, costo_total, description?`
- GET `/analisis/punto-equilibrio`  params: `costos_fijos, precio, costo_variable_unitario, description?`

Notas:
- CORS local permitido para `http://localhost:5173` y `http://127.0.0.1:5173`.
- Las rutas en `backend/routers/` son ejemplos; `main.py` implementa los endpoints usados por el frontend.

