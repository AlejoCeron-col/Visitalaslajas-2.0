# Arquitectura del Sistema

## Visión General

Visita Las Lajas es una aplicación web monolítica con arquitectura cliente-servidor construida sobre Node.js y Express.

```
┌─────────────────────────────────────────────────────┐
│         Navegador del Usuario (Cliente)             │
│  HTML5 + CSS3 + JavaScript + EJS Templates          │
└────────────────┬────────────────────────────────────┘
                 │ HTTP/HTTPS
                 ▼
┌─────────────────────────────────────────────────────┐
│           Express.js Application Server             │
│  ┌──────────────┬──────────────┬──────────────┐     │
│  │   Rutas      │ Middleware   │  Controllers │     │
│  │  - Mapa      │  - CORS      │              │     │
│  │  - Auth      │  - Session   │              │     │
│  │  - Reservas  │  - Logs      │              │     │
│  └──────────────┴──────────────┴──────────────┘     │
└────────────────┬────────────────────────────────────┘
                 │ Pool de Conexiones
                 ▼
┌─────────────────────────────────────────────────────┐
│          PostgreSQL Database (BD Relacional)        │
│  ┌────────────┬──────────────┬───────────────┐      │
│  │ Usuarios   │  Lugares     │  Reservas     │      │
│  │ Guías      │  Atractivos  │  Evaluaciones │      │
│  └────────────┴──────────────┴───────────────┘      │
└─────────────────────────────────────────────────────┘
```

## Componentes Principales

### 1. Capa de Presentación (Frontend)

- **Vistas EJS**: Plantillas renderizadas en servidor
- **Assets Estáticos**: CSS, imágenes, JavaScript
- **Interactividad**: AJAX para operaciones asincrónicas

**Archivos Clave:**
```
src/views/layout/
├── index.ejs              # Página de inicio
├── guia_turistica.ejs     # Mapa interactivo
├── consulta_reserva.ejs   # Consulta de reservas
├── registro.ejs           # Formulario de registro
├── iniciosesion.ejs       # Formulario de login
└── components/            # Componentes reutilizables
    ├── header.ejs
    ├── footer.ejs
    └── cont_lugares.ejs
```

### 2. Capa de Aplicación (Backend)

#### Express Server (`src/app.js`)
- Configuración de middleware
- Setup de rutas
- Gestión de sesiones
- Manejo de errores

#### Rutas (`src/routes/`)
- **rutas.js**: Lugares, guías, reservas
- **sesion.js**: Autenticación (registro, login, logout)

#### Utilidades (`src/utils.js`)
- Validaciones de entrada
- Funciones de formateo
- Cálculos geográficos

### 3. Capa de Datos

#### Base de Datos PostgreSQL

**Tablas Principales:**

```sql
-- Usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  cedula VARCHAR(20) UNIQUE,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  telefono VARCHAR(15),
  fecha_nacimiento DATE,
  fecha_creacion TIMESTAMP
);

-- Guías
CREATE TABLE guias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  foto_url VARCHAR(255),
  rating INTEGER (1-5),
  especialidades TEXT[]
);

-- Lugares
CREATE TABLE lugares (
  id VARCHAR(50) PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  latitud DECIMAL,
  longitud DECIMAL,
  categoria VARCHAR(50)
);

-- Reservas
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios,
  guia_id INTEGER REFERENCES guias,
  fecha_visita DATE,
  lugares_seleccionados JSON,
  estado VARCHAR(20),
  fecha_creacion TIMESTAMP
);
```

## Flujos Principales

### 1. Flujo de Registro

```
Usuario → Formulario Registro → Validación → Hash Password → BD → Sesión
```

### 2. Flujo de Login

```
Usuario → Email + Password → Verificación → Sesión Activa → Redirect
```

### 3. Flujo de Reserva

```
Usuario → Selecciona Lugar + Guía → Validación → INSERT BD → Confirmación
```

### 4. Flujo de Consulta de Reserva

```
Usuario → Ingresa Cédula → SELECT BD → Mostrar Detalles
```

## Patrones y Principios

### MVC (Model-View-Controller)

- **Model**: BD + Pool de conexiones
- **View**: Plantillas EJS
- **Controller**: Funciones en rutas

### Middleware Pattern

```javascript
// Pipeline de middleware
Express → CORS → Body Parser → Session → Auth → Routes
```

### Repository Pattern

```javascript
// Funciones reutilizables de BD
- findUserByEmail()
- findUserByCedula()
- insertUser()
- getReservations()
```

## Seguridad

### Implementaciones

1. **Autenticación**: Session-based con express-session
2. **Encriptación**: Bcryptjs para contraseñas
3. **CORS**: Control de origen cruzado
4. **Validación**: Input validation en todas las rutas
5. **SQL Injection Prevention**: Prepared statements con pg

### Variables Sensibles

Almacenadas en `.env`:
- DATABASE_URL
- SESSION_SECRET
- PORT
- NODE_ENV

## Escalabilidad Futura

### Mejoras Planeadas

1. **Caché**: Redis para sesiones y datos frecuentes
2. **Load Balancing**: Nginx para múltiples instancias
3. **Microservicios**: Separar autenticación, reservas, etc.
4. **GraphQL**: Alternativa a REST API
5. **WebSockets**: Real-time notifications

## Deployment

### Opciones Disponibles

1. **Render**: Deploy directamente desde GitHub
2. **Railway**: PaaS simplificado
3. **Docker**: Containerización para cualquier servidor
4. **Vercel**: Para frontend estático (futuro)

---

**Última actualización**: 3 de Junio, 2026
