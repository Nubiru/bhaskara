Routers funcionales mínimos para que la arquitectura del backend ya quede operativa, y para que cada endpoint de los cálculos (Bhaskara, ingreso total, costo total, beneficio, punto de equilibrio) tenga su propio archivo.

📌Organiza el código

Cada módulo de cálculo tiene su propio router, lo que facilita mantenimiento y escalabilidad.

Si mañana agregas un nuevo análisis, no tocas main.py, solo creas un router nuevo y lo registras.

Mantiene las responsabilidades separadas

La lógica de cálculo vive en analisis/ o descargar/.

La lógica de rutas vive en routers/.

main.py solo importa y registra los routers.

Facilita testing y debugging

Puedes testear un solo router sin cargar todo el backend.

