# Documentación de API

La API de Visita Las Lajas proporciona endpoints RESTful para interactuar con el sistema de turismo.

## Acceso a la Documentación Interactiva

Swagger UI: **`http://localhost:3000/api-docs`**

Aquí puedes explorar y probar todos los endpoints en tiempo real.

## Base URL

```
http://localhost:3000/api
https://api.visitalaslajas.com/api (producción)
```

## Autenticación

La mayoría de endpoints requieren una sesión activa. Se usa express-session con cookies.

```javascript
// La sesión se mantiene automáticamente en las cookies
fetch('/api/endpoint', {
  credentials: 'include'  // Incluir cookies
})
```

## Endpoints Principales

### 🗺️ Lugares Turísticos

#### GET /api/lugares
Obtiene la lista de todos los lugares turísticos.

**Respuesta:**
```json
[
  {
    "id": "santuario",
    "nombre": "Santuario de Las Lajas",
    "descripcion": "Basílica construida sobre un cañón...",
    "coordenadas": [0.8042, -77.5847],
    "color": "#059669"
  },
  // más lugares...
]
```

**Códigos de Respuesta:**
- `200 OK`: Éxito
- `500 Server Error`: Error interno

---

#### GET /api/lugares/:id
Obtiene un lugar específico por ID.

**Parámetros:**
- `id` (string, path): ID del lugar

**Respuesta:**
```json
{
  "id": "santuario",
  "nombre": "Santuario de Las Lajas",
  "descripcion": "Basílica construida sobre un cañón...",
  "coordenadas": [0.8042, -77.5847],
  "color": "#059669"
}
```

**Códigos de Respuesta:**
- `200 OK`: Éxito
- `404 Not Found`: Lugar no existe

---

### 👨‍🏫 Guías Turísticos

#### GET /api/guias
Obtiene la lista de todos los guías disponibles.

**Respuesta:**
```json
[
  {
    "id": "g1",
    "nombre": "Carlos Mendoza",
    "foto": "https://i.pravatar.cc/150?img=11",
    "rating": 5,
    "especialidades": ["Naturaleza", "Historia"]
  },
  // más guías...
]
```

---

### 📅 Reservas

#### POST /api/reserva
Crea una nueva reserva.

**Parámetros (Body - JSON):**
```json
{
  "usuario_id": 1,
  "lugar_id": 1,
  "fecha": "2026-06-15",
  "hora": "10:00"
}
```

**Respuesta (201 Created):**
```json
{
  "id": 1,
  "usuario_id": 1,
  "lugar_id": 1,
  "fecha": "2026-06-15",
  "hora": "10:00",
  "estado": "confirmada",
  "fecha_creacion": "2026-06-03T10:30:00Z"
}
```

**Códigos de Respuesta:**
- `201 Created`: Reserva creada
- `400 Bad Request`: Datos faltantes o inválidos
- `401 Unauthorized`: No autenticado
- `500 Server Error`: Error al guardar

---

#### GET /api/reservas/:cedula
Obtiene las reservas de un usuario por cédula.

**Parámetros:**
- `cedula` (string, path): Cédula del usuario

**Respuesta:**
```json
[
  {
    "id": 1,
    "cedula": "1234567890",
    "nombre": "Juan Pérez",
    "fecha_visita": "2026-06-15",
    "lugar_id": 1,
    "estado": "confirmada"
  },
  // más reservas...
]
```

**Códigos de Respuesta:**
- `200 OK`: Éxito
- `404 Not Found`: No hay reservas
- `500 Server Error`: Error al consultar

---

### 👤 Autenticación

#### POST /registrar-usuario
Registra un nuevo usuario.

**Parámetros (Body):**
```json
{
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "3001234567",
  "fechanacimiento": "1990-01-15",
  "password": "SecurePassword123",
  "Conf_password": "SecurePassword123"
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "usuario": {
    "id": 1,
    "cedula": "1234567890",
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

**Códigos de Respuesta:**
- `201 Created`: Usuario registrado
- `400 Bad Request`: Datos inválidos
- `409 Conflict`: Usuario ya existe

---

#### POST /procesar-login
Inicia sesión.

**Parámetros (Body):**
```json
{
  "email": "juan@example.com",
  "password": "SecurePassword123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

**Códigos de Respuesta:**
- `200 OK`: Login exitoso
- `401 Unauthorized`: Credenciales inválidas
- `404 Not Found`: Usuario no existe

---

#### GET /logout
Cierra la sesión.

**Respuesta (302 Redirect):**
Redirige a la página de inicio.

---

## Códigos de Respuesta HTTP

| Código | Significado | Ejemplo |
|--------|------------|---------|
| `200` | OK | Solicitud exitosa |
| `201` | Created | Recurso creado |
| `400` | Bad Request | Datos inválidos |
| `401` | Unauthorized | No autenticado |
| `404` | Not Found | Recurso no existe |
| `409` | Conflict | Usuario/email duplicado |
| `500` | Server Error | Error interno |

## Errores

Todos los errores devuelven JSON con estructura:

```json
{
  "error": "Descripción del error"
}
```

## Rate Limiting

Actualmente sin límite. Se puede implementar en el futuro.

## CORS

El servidor permite CORS desde:
- `http://localhost:3000` (desarrollo)
- Tu dominio en producción (configurable en `.env`)

## Ejemplos de Uso

### JavaScript (Fetch API)

```javascript
// Obtener lugares
fetch('/api/lugares')
  .then(res => res.json())
  .then(data => console.log(data))

// Crear reserva
fetch('/api/reserva', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    usuario_id: 1,
    lugar_id: 1,
    fecha: '2026-06-15',
    hora: '10:00'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

### cURL

```bash
# Obtener guías
curl http://localhost:3000/api/guias

# Registrar usuario
curl -X POST http://localhost:3000/registrar-usuario \
  -H "Content-Type: application/json" \
  -d '{
    "cedula": "1234567890",
    "nombre": "Juan",
    "email": "juan@example.com",
    "password": "SecurePass123"
  }'
```

### Python

```python
import requests

# Obtener lugares
response = requests.get('http://localhost:3000/api/lugares')
places = response.json()

# Crear reserva
response = requests.post(
  'http://localhost:3000/api/reserva',
  json={
    'usuario_id': 1,
    'lugar_id': 1,
    'fecha': '2026-06-15',
    'hora': '10:00'
  }
)
```

## Documentación Interactiva

Para probar todos los endpoints interactivamente:

1. Accede a `http://localhost:3000/api-docs`
2. Expande cada endpoint
3. Haz clic en "Try it out"
4. Ingresa parámetros
5. Haz clic en "Execute"

---

**Última actualización**: 3 de Junio, 2026
