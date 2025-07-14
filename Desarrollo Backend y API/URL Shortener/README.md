# URL Shortener Microservice

This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

### Description
Microservice for freeCodeCamp that shortens URLs. POST a URL to `https://zestful-imagination-production.up.railway.app/api/shorturl` to get a short URL and use `https://zestful-imagination-production.up.railway.app/api/shorturl/<short_url>` to redirect to the original.

### Usage
- **POST** `https://zestful-imagination-production.up.railway.app/api/shorturl` with `url=https://www.example.com`
- **GET** `https://zestful-imagination-production.up.railway.app/api/shorturl/<short_url>` to redirect

### Examples
- POST `{ "url": "https://www.freecodecamp.org" }` → `{"original_url":"https://www.freecodecamp.org","short_url":1}`
- GET `https://zestful-imagination-production.up.railway.app/api/shorturl/1` → Redirects to `https://www.freecodecamp.org`
- Invalid URL → `{"error":"invalid url"}`

### Technologies
- Node.js, Express, CORS, body-parser, dns

### Author
Nicolas Amaya for freeCodeCamp.

---

## Español

### Descripción
Microservicio para freeCodeCamp que acorta URLs. Envía una URL mediante POST a `https://zestful-imagination-production.up.railway.app/api/shorturl` para obtener una URL corta y usa `https://zestful-imagination-production.up.railway.app/api/shorturl/<short_url>` para redirigir a la original.

### Uso
- **POST** `https://zestful-imagination-production.up.railway.app/api/shorturl` con `url=https://www.example.com`
- **GET** `https://zestful-imagination-production.up.railway.app/api/shorturl/<short_url>` para redirigir

### Ejemplos
- POST `{ "url": "https://www.freecodecamp.org" }` → `{"original_url":"https://www.freecodecamp.org","short_url":1}`
- GET `https://zestful-imagination-production.up.railway.app/api/shorturl/1` → Redirige a `https://www.freecodecamp.org`
- URL inválida → `{"error":"invalid url"}`

### Tecnologías
- Node.js, Express, CORS, body-parser, dns

### Autor
Amaya Nicolas para freeCodeCamp.