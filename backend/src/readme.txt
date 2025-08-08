🧱 Estructura general del backend en FastAPI
Base completa con:

Endpoints REST (/analizar, /descargar)

Validación de entrada

Orquestación de funciones (Bhaskara, ingreso total, beneficio, etc.)

Descarga de archivo .json con los resultados

/backend
├── main.py
├── models.py
├── services.py
└── requirements.txt

▶️ Cómo ejecutar

1 Instalar dependencias:

bash
Copy
Edit
pip install -r requirements.txt

2 Correr servidor:

bash
Copy
Edit
uvicorn main:app --reload

Luego accedés a la documentación interactiva de FastAPI en:
📍 http://localhost:8000/docs