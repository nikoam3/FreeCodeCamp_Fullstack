# File Metadata Microservice

This is the boilerplate for the File Metadata Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice

### Description
Microservice for freeCodeCamp that analyzes uploaded files, returning their name, type, and size in bytes.

### Usage
- **POST** `/api/fileanalyse` with a file in the `upfile` field.

### Examples
- POST with file `example.txt` → `{"name":"example.txt","type":"text/plain","size":12345}`
- No file → `{"error":"No file uploaded"}`

### Technologies
- Node.js, Express, CORS, Multer

### Author
Nicolas Amaya for freeCodeCamp.

---

## Español

### Descripción
Microservicio para freeCodeCamp que analiza archivos subidos, devolviendo su nombre, tipo y tamaño en bytes.

### Uso
- **POST** `/api/fileanalyse` con un archivo en el campo `upfile`.

### Ejemplos
- POST con archivo `example.txt` → `{"name":"example.txt","type":"text/plain","size":12345}`
- Sin archivo → `{"error":"No file uploaded"}`

### Tecnologías
- Node.js, Express, CORS, Multer

### Autor
Nicolas Amaya para freeCodeCamp.
