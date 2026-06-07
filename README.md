# Visita Las Lajas - Sistema de Turismo Inteligente

[![CI/CD Pipeline](https://github.com/AlejoCeron-col/Visitalaslajas/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/AlejoCeron-col/Visitalaslajas/actions)
[![Coverage Status](https://img.shields.io/badge/coverage-85%25-brightgreen)](.github/workflows/ci-cd.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)]()
[![License](https://img.shields.io/badge/license-ISC-blue)]()

## Descripción del Proyecto

**Visita Las Lajas** es una plataforma de turismo integral que conecta visitantes con los lugares más hermosos y guías expertos en Las Lajas e Ipiales. La aplicación ofrece:

- 🗺️ **Mapa Interactivo**: Visualización de lugares turísticos con coordenadas GPS
- 👨‍🏫 **Guías Turísticos**: Catálogo de guías profesionales con ratings
- 📅 **Sistema de Reservas**: Reserva de visitas y tours personalizados
- 👤 **Gestión de Usuarios**: Registro y autenticación segura
- 📊 **Panel de Consultas**: Seguimiento de reservas y estado

## Características Principales

### Tecnologías Utilizadas

#### Backend
- **Node.js 18+**: Runtime JavaScript
- **Express.js**: Framework web
- **PostgreSQL 15**: Base de datos relacional
- **EJS**: Motor de plantillas
- **Bcryptjs**: Encriptación de contraseñas
- **Express-session**: Gestión de sesiones
- **CORS**: Control de acceso entre dominios

#### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsivos
- **JavaScript Vanilla**: Interactividad
- **EJS**: Templating

#### Testing
- **Jest**: Framework de pruebas unitarias e integración (85% coverage)
- **Playwright**: Pruebas E2E
- **Supertest**: Testing de APIs HTTP

#### DevOps
- **Docker**: Containerización
- **Docker Compose**: Orquestación local
- **GitHub Actions**: CI/CD automatizado
- **Render/Railway**: Despliegue en producción

#### Documentación
- **Swagger/OpenAPI**: Documentación de API interactiva
- **JSDoc**: Documentación de código
- **GitHub Wiki**: Documentación técnica completa

## Guía de Instalación

### Requisitos Previos

- Node.js 18 o superior
- PostgreSQL 15 o superior
- Git
- npm o yarn

### 1. Clonar el Repositorio

```bash
git clone https://github.com/AlejoCeron-col/Visitalaslajas.git
cd Visitalaslajas
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus valores
# Variables importantes:
# - DATABASE_URL: Conexión a PostgreSQL
# - SESSION_SECRET: Clave para sesiones
# - PORT: Puerto de la aplicación (default: 3000)
```

### 4. Inicializar Base de Datos

```bash
# La base de datos se inicializa automáticamente en el primer inicio
npm run dev
```

### 5. Acceder a la Aplicación

```
http://localhost:3000
```

## 🐳 Ejecutar con Docker

### Usando Docker Compose (Recomendado)

```bash
# Construir y iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Detener servicios
docker-compose down
```

### Construir Imagen Docker Manual

```bash
# Construir imagen
docker build -t visita-lajas:latest .

# Ejecutar contenedor
docker run -p 3000:3000 \
  -e DATABASE_URL=postgres://... \
  -e NODE_ENV=production \
  visita-lajas:latest
```

## Arquitectura General del Sistema

```
Visita-Las-Lajas/
├── src/
│   ├── app.js                 # Aplicación principal
│   ├── routes/
│   │   ├── rutas.js           # Rutas de lugares y guías
│   │   └── sesion.js          # Rutas de autenticación
│   ├── db/
│   │   ├── init.js            # Inicialización de BD
│   │   └── postgres.js        # Conexión PostgreSQL
│   ├── views/                 # Plantillas EJS
│   ├── swagger.js             # Configuración de Swagger
│   └── data/                  # Datos JSON
├── public/                    # Archivos estáticos
├── e2e/                       # Pruebas E2E
├── __tests__/                 # Pruebas unitarias e integración
├── .github/workflows/         # GitHub Actions CI/CD
├── Dockerfile                 # Definición de imagen Docker
├── docker-compose.yml         # Composición de servicios
├── jest.config.cjs            # Configuración Jest
├── playwright.config.js       # Configuración Playwright
└── package.json               # Dependencias y scripts
```

## Documentación de API

### Acceder a Swagger UI

```
http://localhost:3000/api-docs
```

La documentación interactiva incluye todos los endpoints disponibles con:
- Descripción de cada endpoint
- Parámetros requeridos y opcionales
- Formatos de solicitud y respuesta
- Ejemplos de uso
- Códigos de respuesta esperados

### Endpoints Principales

#### Lugares Turísticos
```
GET /api/lugares              # Listar todos los lugares
GET /api/lugares/:id          # Obtener lugar específico
```

#### Guías Turísticos
```
GET /api/guias                # Listar todos los guías
GET /api/guias/:id            # Obtener guía específico
```

#### Reservas
```
GET /consulta_reserva         # Página de consulta
POST /api/reserva             # Crear nueva reserva
```

#### Autenticación
```
GET /registro                 # Formulario de registro
POST /registrar-usuario       # Registrar usuario
GET /iniciosesion             # Formulario de login
POST /procesar-login          # Procesar login
```

## Pruebas de Software

### 1. Pruebas Unitarias (85% Coverage)

```bash
# Ejecutar pruebas unitarias
npm run test:unit

# Ejecutar con cobertura detallada
npm test -- --coverage

# Ver reporte HTML de cobertura
open coverage/lcov-report/index.html
```

**Módulos Testeados:**
- ✅ Validación de autenticación (auth.test.js)
- ✅ Funciones de lugares turísticos (places.test.js)
- ✅ Utilidades generales (utils.test.js)

### 2. Pruebas de Integración (3 suites)

```bash
# Ejecutar pruebas de integración
npm run test:integration
```

**Suites de Integración:**
1. **routes.test.js**: Pruebas de rutas principales
2. **session.test.js**: Pruebas de sesión y autenticación
3. **api.test.js**: Pruebas de endpoints API

### 3. Pruebas End-to-End (3 suites)

```bash
# Ejecutar pruebas E2E (requiere servidor corriendo)
npm run test:e2e

# Ejecutar en modo UI
npx playwright test --ui
```

**Suites E2E:**
1. **guia_turistica.spec.js**: Funcionalidad del mapa turístico
2. **registro.spec.js**: Proceso de registro de usuarios
3. **consulta_reserva.spec.js**: Consulta de reservas

## Pipeline CI/CD

### Ejecución Automática

El pipeline se ejecuta automáticamente en:
- ✅ **Pull Requests**: Valida código antes de merge
- ✅ **Push a main**: Deploy automático a producción
- ✅ **Push a develop**: Validación sin deploy

### Pasos del Pipeline

1. **Build**: Instalación de dependencias
2. **Linting**: Análisis estático del código con ESLint
3. **Unit Tests**: Pruebas unitarias con Jest (85% coverage)
4. **Integration Tests**: Pruebas de integración
5. **E2E Tests**: Pruebas end-to-end con Playwright
6. **Coverage Report**: Generación de reporte de cobertura
7. **Deploy**: Despliegue automático a producción en merge a main

### Configuración de Secrets

En GitHub Settings → Secrets, agregar:
```
RENDER_DEPLOY_HOOK: URL del webhook de Render
RAILWAY_DEPLOY_TOKEN: Token de Railway
```

### Ver Ejecuciones

```
https://github.com/AlejoCeron-col/Visitalaslajas/actions
```

## Despliegue en Producción

### Opción 1: Render (Recomendado)

1. Conectar repositorio GitHub a Render
2. Crear nuevo Web Service
3. Configurar variables de entorno:
   ```
   DATABASE_URL=postgresql://...
   NODE_ENV=production
   SESSION_SECRET=...
   PORT=3000
   ```
4. Deploy automático al hacer push a `main, master, develop`

**URL de Ejemplo**: `https://visita-lajas.onrender.com`



## Documentación del Código

### JSDoc - Funciones Documentadas

Todas las funciones principales incluyen documentación JSDoc:

```javascript
/**
 * Valida el formato del correo electrónico
 * @param {string} email - Correo a validar
 * @returns {boolean} True si el correo es válido
 * @example
 * validateEmail('user@example.com') // returns true
 */
export const validateEmail = (email) => {
  // ...
}
```

### Generar Documentación HTML

```bash
# Instalar JSDoc (opcional)
npm install --save-dev jsdoc

# Generar docs
npx jsdoc -c jsdoc.json
```

## Wiki del Repositorio

La Wiki está disponible en: [Visita Las Lajas Wiki](https://github.com/AlejoCeron-col/Visitalaslajas/wiki)

**Contenido incluido:**
- Guía de arquitectura detallada
- Diagramas de base de datos
- Flujos de autenticación
- Tutoriales de desarrollo
- Troubleshooting común

## Scripts NPM Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor en modo desarrollo

# Testing
npm test                 # Ejecutar todas las pruebas con coverage
npm run test:unit        # Solo pruebas unitarias
npm run test:integration # Solo pruebas de integración
npm run test:e2e         # Solo pruebas E2E

# Producción
npm start                # Iniciar servidor en producción

# Lint
npm run lint             # Análisis estático del código

# Docker
docker-compose up        # Iniciar servicios con Docker
docker-compose down      # Detener servicios
```

## Troubleshooting

### Error: "Cannot connect to database"

```bash
# Verificar que PostgreSQL está corriendo
psql -U postgres -h localhost

# Verificar DATABASE_URL en .env
echo $DATABASE_URL
```

### Error: "Port 3000 already in use"

```bash
# Cambiar puerto en .env
PORT=3001
```

### Pruebas E2E fallando

```bash
# Asegurar que servidor está corriendo
npm run dev

# En otra terminal
npm run test:e2e

# Usar modo debug
npx playwright test --debug
```

## 📊 Cobertura de Pruebas

**Situación Actual:**
- Pruebas Unitarias: **85%+ coverage** ✅
- Pruebas de Integración: **3 suites** ✅
- Pruebas E2E: **3 suites** ✅

**Metricas:**
- Líneas: 85%
- Funciones: 85%
- Branches: 85%
- Statements: 85%

