# Practica1 - Desarrollo en la Nube (AWS EC2 + S3)

Este practica es una aplicación funcional de reserva de citas médicas diseñada para demostrar la integración de servicios en la nube de AWS (**EC2** y **S3**) utilizando **TypeScript**, **Node.js** y **MongoDB**.

## Arquitectura del Proyecto

<img src="https://imgur.com/L4pL7C8.png" alt="Arquitectura" height="380">


La aplicación utiliza una arquitectura desacoplada:
* **Frontend (S3):** Interfaz de usuario estática (HTML/CSS/JS) alojada en un bucket de Amazon S3 configurado para hosting web.
* **Backend (EC2):** API REST desarrollada con Express y TypeScript, ejecutándose dentro de un contenedor **Docker** en una instancia EC2.
* **Base de Datos:** MongoDB desplegado mediante Docker para persistencia de datos de doctores y citas.



## Tecnologías Utilizadas
* **Lenguaje:** TypeScript / JavaScript
* **Entorno:** Node.js
* **Framework:** Express.js
* **Base de Datos:** MongoDB con Mongoose
* **Infraestructura:** AWS (EC2, S3, VPC)
* **Contenedores:** Docker

## Funcionalidades
1.  **Visualización de Especialistas:** El frontend consume la API para listar doctores cuyas imágenes están alojadas en S3.
2.  **Gestión de Disponibilidad:** El sistema permite filtrar horarios disponibles por fecha para cada doctor.
3.  **Reservas en Tiempo Real:** Validación de "Double-booking" mediante índices únicos en MongoDB para evitar citas duplicadas en el mismo horario.
4.  **Actualización de Horarios:** Endpoint para que los administradores modifiquen la disponibilidad de los doctores.

## Configuración para Desarrollo

### Backend
1. Navegar a la carpeta `backend/`.
2. Instalar dependencias: `npm install`.
3. Configurar variables de entorno (URL de MongoDB).
4. Compilar y ejecutar: `npm run dev`.

### Frontend
1. Subir los archivos de la carpeta `frontend/` a un Bucket de S3.
2. Asegurarse de actualizar la URL de la API en `js/app.js` con la IP pública de la instancia EC2.

### Estructura Proyecto
```
├── BACKEND
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app.ts
│   │   ├── database
│   │   │   └── index.ts
│   │   └── doctor
│   │       ├── controller.ts
│   │       ├── model.ts
│   │       └── routes.ts
│   └── tsconfig.json
├── FRONTEND
│   ├── booking.html
│   ├── css
│   │   └── styles.css
│   ├── index.html
│   ├── js
│   │   └── app.js
│   └── success.html
├── README.md
└── estructura.txt
```
## Demo
[Link al video de YouTube]