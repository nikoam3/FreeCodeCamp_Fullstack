# freeCodeCamp Backend Development and APIs Projects

## Español

### Descripción
Este repositorio contiene los cinco proyectos requeridos para obtener el certificado de **Desarrollo Backend y API** de freeCodeCamp. Cada proyecto es un microservicio desarrollado con Node.js y Express, desplegado en Railway, y cumple con los tests de freeCodeCamp. A continuación, se detalla cada proyecto con su enlace público para probar la funcionalidad.

### Proyectos

1. **Request Header Parser Microservice**  
   - **Descripción**: Devuelve información sobre el encabezado de la solicitud HTTP, como la dirección IP, idioma y software del cliente.  
   - **Uso**: GET `/api/whoami`  
   - **Enlace**: [https://overflowing-mindfulness-production.up.railway.app](https://overflowing-mindfulness-production.up.railway.app)

2. **Timestamp Microservice**  
   - **Descripción**: Convierte fechas en formato Unix y UTC. Acepta fechas en formato `YYYY-MM-DD` o timestamps Unix, o devuelve la fecha actual si no se proporciona.  
   - **Uso**: GET `/api/:date?`  
   - **Enlace**: [https://desarrollobackendapifcc-production.up.railway.app](https://desarrollobackendapifcc-production.up.railway.app)

3. **URL Shortener Microservice**  
   - **Descripción**: Acorta URLs mediante POST y redirige a la URL original con GET. Valida URLs usando una expresión regular y `dns.lookup`.  
   - **Uso**: POST `/api/shorturl`, GET `/api/shorturl/:short_url`  
   - **Enlace**: [https://zestful-imagination-production.up.railway.app](https://zestful-imagination-production.up.railway.app)

4. **Exercise Tracker**  
   - **Descripción**: Permite crear usuarios, registrar ejercicios y consultar logs de ejercicios con filtros opcionales (from, to, limit). Usa MongoDB para persistencia.  
   - **Uso**: POST `/api/users`, POST `/api/users/:_id/exercises`, GET `/api/users`, GET `/api/users/:_id/logs`  
   - **Enlace**: [https://sweet-creation-production-44a5.up.railway.app](https://sweet-creation-production-44a5.up.railway.app)

5. **File Metadata Microservice**  
   - **Descripción**: Analiza archivos subidos mediante un formulario, devolviendo nombre, tipo MIME y tamaño en bytes. Usa Multer para manejar archivos.  
   - **Uso**: POST `/api/fileanalyse` con campo `upfile`  
   - **Enlace**: [https://miraculous-ambition-production-f68f.up.railway.app](https://miraculous-ambition-production-f68f.up.railway.app)

### Tecnologías
- Node.js, Express, CORS, body-parser, Multer (File Metadata), Mongoose (Exercise Tracker)
- Desplegado en Railway
- MongoDB Atlas para Exercise Tracker

### Autor
Nicolas Amaya para freeCodeCamp.

---

## English

### Description
This repository contains the five projects required to earn the **Backend Development and APIs** certification from freeCodeCamp. Each project is a microservice built with Node.js and Express, deployed on Railway, and meets freeCodeCamp's test requirements. Below is a brief overview of each project with its public link for testing.

### Projects

1. **Request Header Parser Microservice**  
   - **Description**: Returns information about the HTTP request header, including IP address, language, and client software.  
   - **Usage**: GET `/api/whoami`  
   - **Link**: [https://overflowing-mindfulness-production.up.railway.app](https://overflowing-mindfulness-production.up.railway.app)

2. **Timestamp Microservice**  
   - **Description**: Converts dates to Unix timestamp and UTC format. Accepts dates in `YYYY-MM-DD` format or Unix timestamps, or returns the current date if none provided.  
   - **Usage**: GET `/api/:date?`  
   - **Link**: [https://desarrollobackendapifcc-production.up.railway.app](https://desarrollobackendapifcc-production.up.railway.app)

3. **URL Shortener Microservice**  
   - **Description**: Shortens URLs via POST and redirects to the original URL via GET. Validates URLs using a regex and `dns.lookup`.  
   - **Usage**: POST `/api/shorturl`, GET `/api/shorturl/:short_url`  
   - **Link**: [https://zestful-imagination-production.up.railway.app](https://zestful-imagination-production.up.railway.app)

4. **Exercise Tracker**  
   - **Description**: Allows creating users, logging exercises, and retrieving exercise logs with optional filters (from, to, limit). Uses MongoDB for persistence.  
   - **Usage**: POST `/api/users`, POST `/api/users/:_id/exercises`, GET `/api/users`, GET `/api/users/:_id/logs`  
   - **Link**: [https://sweet-creation-production-44a5.up.railway.app](https://sweet-creation-production-44a5.up.railway.app)

5. **File Metadata Microservice**  
   - **Description**: Analyzes uploaded files via a form, returning name, MIME type, and size in bytes. Uses Multer for file handling.  
   - **Usage**: POST `/api/fileanalyse` with `upfile` field  
   - **Link**: [https://miraculous-ambition-production-f68f.up.railway.app](https://miraculous-ambition-production-f68f.up.railway.app)

### Technologies
- Node.js, Express, CORS, body-parser, Multer (File Metadata), Mongoose (Exercise Tracker)
- Deployed on Railway
- MongoDB Atlas for Exercise Tracker

### Author
Amaya Nicolas for freeCodeCamp.