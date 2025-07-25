# desarrollo_backend_api_FCC

# Timestamp Microservice

## Español

### Descripción
Microservicio de timestamp para el desafío de freeCodeCamp. Convierte fechas entre formato Unix (milisegundos) y UTC. Soporta fechas ISO (ej. "2015-12-25"), timestamps Unix (ej. "1451001600000") y devuelve la fecha actual si no se proporciona parámetro.

### Tecnologías
Node.js, Express, CORS

### Uso
Ruta: `/api/:date?` (parámetro opcional).

#### Ejemplos:
- `https://desarrollobackendapifcc-production.up.railway.app/api/2015-12-25` → `{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`
- `https://desarrollobackendapifcc-production.up.railway.app/api/1451001600000` → `{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`
- `https://desarrollobackendapifcc-production.up.railway.app/api/` → Fecha actual
- `https://desarrollobackendapifcc-production.up.railway.app/api/invalid` → `{"error":"Invalid Date"}`

### Autor
Nicolás Amaya para freeCodeCamp.

## English

### Description
Timestamp Microservice for the freeCodeCamp challenge. Converts dates between Unix (milliseconds) and UTC formats. Supports ISO dates (e.g., "2015-12-25"), Unix timestamps (e.g., "1451001600000"), and returns the current date if no parameter is provided.

### Technologies
Node.js, Express, CORS

### Usage
Endpoint: `/api/:date?` (optional parameter).

### Examples:
- `https://desarrollobackendapifcc-production.up.railway.app/api/2015-12-25` → `{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`
- `https://desarrollobackendapifcc-production.up.railway.app/api/1451001600000` → `{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`
- `https://desarrollobackendapifcc-production.up.railway.app/api/` → Current date
- `https://desarrollobackendapifcc-production.up.railway.app/api/invalid` → `{"error":"Invalid Date"}`

### Author
Nicolás Amaya for freeCodeCamp.








