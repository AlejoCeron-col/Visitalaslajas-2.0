# Guía de Inicio Rápido

Sigue estos pasos para tener el proyecto ejecutándose localmente en menos de 10 minutos.

## Requisitos Previos

- **Node.js**: 18.0.0 o superior
- **npm**: 8.0.0 o superior (incluido con Node)
- **PostgreSQL**: 13 o superior
- **Git**: Para clonar el repositorio
- **Editor de Código**: VS Code recomendado

### Verificar Instalaciones

```bash
# Verificar Node.js
node --version    # v18.0.0 o superior

# Verificar npm
npm --version     # 8.0.0 o superior

# Verificar PostgreSQL
psql --version    # postgresql 13 o superior
```

## Paso 1: Clonar el Repositorio

```bash
# Navegar a tu directorio de trabajo
cd ~/Proyectos

# Clonar el repositorio
git clone https://github.com/AlejoCeron-col/Visitalaslajas.git

# Entrar al directorio
cd Visitalaslajas
```

## Paso 2: Instalar Dependencias

```bash
# Desde la raíz del proyecto
npm install

# Esto instalará todas las dependencias definidas en package.json
# Incluye: Express, PostgreSQL, Jest, Playwright, etc.
```

Tiempo estimado: 2-3 minutos

## Paso 3: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar el archivo .env (usar tu editor favorito)
# En Linux/Mac:
nano .env
# En Windows:
notepad .env
```

### Variables Importantes a Configurar

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres
DB_NAME=visita_lajas_db

# URL de Conexión (se forma automáticamente)
DATABASE_URL=postgres://postgres:tu_contraseña@localhost:5432/visita_lajas_db

# Aplicación
NODE_ENV=development
PORT=3000

# Sesión
SESSION_SECRET=una-clave-super-secreta-aqui
```

## Paso 4: Crear y Configurar la Base de Datos

### Opción A: Con PostgreSQL instalado localmente

```bash
# 1. Acceder a psql
psql -U postgres

# 2. Crear la base de datos
CREATE DATABASE visita_lajas_db;

# 3. Salir
\q
```

### Opción B: Con Docker Compose

```bash
# Inicia PostgreSQL automáticamente
docker-compose up -d postgres

# El servidor estará disponible en localhost:5432
```

## Paso 5: Iniciar el Servidor

```bash
# Desde la raíz del proyecto
npm run dev

# Debería ver algo como:
# Servidor corriendo en http://localhost:3000
# Página principal disponible en http://localhost:3000/
# Mapa turístico disponible en http://localhost:3000/guia_turistica
```

## Paso 6: Acceder a la Aplicación

Abre tu navegador y accede a:

```
http://localhost:3000
```

### URLs Importantes

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000` | Página de inicio |
| `http://localhost:3000/guia_turistica` | Mapa interactivo |
| `http://localhost:3000/registro` | Registro de usuarios |
| `http://localhost:3000/iniciosesion` | Login |
| `http://localhost:3000/api-docs` | Documentación Swagger |

## Verificar que Funcione Todo

### Prueba 1: Página Principal

- Abre `http://localhost:3000`
- Deberías ver la página de inicio
- Intenta hacer clic en los botones de navegación

### Prueba 2: Mapa Turístico

- Navega a `/guia_turistica`
- Verifica que se cargan los lugares y guías
- Intenta interactuar con el mapa

### Prueba 3: Registro

- Navega a `/registro`
- Intenta registrar un usuario nuevo
- Verifica que no haya errores en la consola

### Prueba 4: Ejecutar Pruebas

```bash
# Terminal en raíz del proyecto

# Pruebas unitarias
npm run test:unit

# Pruebas de integración
npm run test:integration

# Todas las pruebas
npm test
```

## Solucionar Problemas Comunes

### Error: "Cannot connect to database"

```bash
# 1. Verificar que PostgreSQL está corriendo
psql -U postgres

# 2. Crear la base de datos si no existe
psql -U postgres -c "CREATE DATABASE visita_lajas_db;"

# 3. Verificar la URL en .env
echo $DATABASE_URL

# 4. Reintentar
npm run dev
```

### Error: "Port 3000 already in use"

```bash
# Cambiar puerto en .env
PORT=3001

# O matar el proceso en el puerto
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: "Module not found"

```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Node.js/npm versión incorrecta

```bash
# Verificar versiones
node --version
npm --version

# Si necesitas actualizar:
# Descargar desde https://nodejs.org
# O usando nvm (Node Version Manager)
nvm install 18
nvm use 18
```

## Próximos Pasos

Una vez que todo funcione:

1. **Lee el README.md**: Documentación completa del proyecto
2. **Explora la estructura**: Entiende cómo está organizado el código
3. **Revisa la documentación de API**: Accede a `/api-docs`
4. **Ejecuta las pruebas**: `npm test`
5. **Haz tus primeros cambios**: Modifica una vista, recarga el navegador

## Desarrollar Localmente

### Modo de Desarrollo

```bash
npm run dev
```

- Servidor se reinicia automáticamente al cambiar archivos
- Acceso a source maps para debugging
- Mensajes de error detallados

### Modo de Producción

```bash
npm start
```

- Optimizado para rendimiento
- Menos logs
- Manejo de errores diferente

## Documentación Adicional

- **[Arquitectura del Sistema](./Arquitectura-del-Sistema)**: Estructura general
- **[Configuración de BD](./Configuración-de-Base-de-Datos)**: Setup de PostgreSQL
- **[Variables de Entorno](./Variables-de-Entorno)**: Guía detallada
- **[Troubleshooting](./Problemas-Comunes)**: Soluciones a errores

## ¿Necesitas Ayuda?

- Revisa los [Problemas Comunes](./Problemas-Comunes)
- Consulta el [FAQ](./FAQ)
- Abre un [Issue en GitHub](https://github.com/AlejoCeron-col/Visitalaslajas/issues)

---

**Última actualización**: 3 de Junio, 2026
