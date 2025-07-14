# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

## English

### Description
Microservice for freeCodeCamp that tracks users and their exercises. Allows creating users, adding exercises, and retrieving exercise logs with optional filters.

### Usage
- **POST** `https://sweet-creation-production-44a5.up.railway.app/api/users` with `username`
- **POST** `https://sweet-creation-production-44a5.up.railway.app/api/users/:_id/exercises` with `description`, `duration`, `date` (optional)
- **GET** `https://sweet-creation-production-44a5.up.railway.app/api/users` for list of users
- **GET** `https://sweet-creation-production-44a5.up.railway.app/api/users/:_id/logs` with `from`, `to`, `limit` (optional)

### Examples
- POST `{ "username": "fcc_test" }` → `{"username":"fcc_test","_id":"5fb5853f734231456ccb3b05"}`
- POST `{ "description": "test", "duration": 60, "date": "1990-01-01" }` → `{"username":"fcc_test","description":"test","duration":60,"date":"Mon Jan 01 1990","_id":"5fb5853f734231456ccb3b05"}`
- GET `/api/users/:_id/logs` → `{"username":"fcc_test","count":1,"_id":"5fb5853f734231456ccb3b05","log":[{"description":"test","duration":60,"date":"Mon Jan 01 1990"}]}`
- GET `/api/users/:_id/logs?from=1989-01-01&to=1991-01-01&limit=10`

### Technologies
- Node.js, Express, CORS, body-parser, MongoDB, Mongoose

### Author
Nicolas Amaya for freeCodeCamp.

---

## Español

### Descripción
Microservicio para freeCodeCamp que registra usuarios y sus ejercicios. Permite crear usuarios, agregar ejercicios y consultar logs de ejercicios con filtros opcionales.

### Uso
- **POST** `https://sweet-creation-production-44a5.up.railway.app/api/users` con `username`
- **POST** `https://sweet-creation-production-44a5.up.railway.app/api/users/:_id/exercises` con `description`, `duration`, `date` (opcional)
- **GET** `https://sweet-creation-production-44a5.up.railway.app/api/users` para lista de usuarios
- **GET** `https://sweet-creation-production-44a5.up.railway.app/api/users/:_id/logs` con `from`, `to`, `limit` (opcional)

### Ejemplos
- POST `{ "username": "fcc_test" }` → `{"username":"fcc_test","_id":"5fb5853f734231456ccb3b05"}`
- POST `{ "description": "test", "duration": 60, "date": "1990-01-01" }` → `{"username":"fcc_test","description":"test","duration":60,"date":"Mon Jan 01 1990","_id":"5fb5853f734231456ccb3b05"}`
- GET `/api/users/:_id/logs` → `{"username":"fcc_test","count":1,"_id":"5fb5853f734231456ccb3b05","log":[{"description":"test","duration":60,"date":"Mon Jan 01 1990"}]}`
- GET `/api/users/:_id/logs?from=1989-01-01&to=1991-01-01&limit=10`

### Tecnologías
- Node.js, Express, CORS, body-parser, MongoDB, Mongoose

### Autor
Nicolas Amaya para freeCodeCamp.
