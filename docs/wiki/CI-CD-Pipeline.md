# CI/CD Pipeline - GitHub Actions

Documentación completa sobre el pipeline de integración y despliegue continuo.

## Visión General

El pipeline se ejecuta automáticamente en cada:
- **Pull Request**: Valida código
- **Push a main**: Deploy automático a producción
- **Push a develop**: Validación sin deploy

## Stages del Pipeline

### 1️⃣ Build & Install

```yaml
- Setup Node.js 18
- npm ci (instalar dependencias)
```

**Tiempo**: ~30 segundos

### 2️⃣ Linting

```bash
npm run lint
```

Verifica:
- Sintaxis correcta
- Estilo de código consistente
- Problemas potenciales

**Tiempo**: ~10 segundos

### 3️⃣ Unit Tests

```bash
npm run test:unit
```

Requisitos:
- ✅ 85% coverage mínimo
- ✅ Todas las pruebas deben pasar

**Archivos testeados:**
- `__tests__/unit/auth.test.js`
- `__tests__/unit/places.test.js`
- `__tests__/unit/utils.test.js`

**Tiempo**: ~1 minuto

### 4️⃣ Integration Tests

```bash
npm run test:integration
```

Pruebas de:
- Rutas principales
- Sesión y autenticación
- API endpoints

**Archivos:**
- `__tests__/integration/routes.test.js`
- `__tests__/integration/session.test.js`
- `__tests__/integration/api.test.js`

**Tiempo**: ~1 minuto

### 5️⃣ E2E Tests

```bash
npm run test:e2e
```

Pruebas completas:
- Guía turística
- Registro de usuarios
- Consulta de reservas

**Archivos:**
- `e2e/guia_turistica.spec.js`
- `e2e/registro.spec.js`
- `e2e/consulta_reserva.spec.js`

**Tiempo**: ~2 minutos

### 6️⃣ Coverage Report

```bash
npm test -- --coverage
```

Genera reporte de cobertura con métricas:
- Líneas: 85%+
- Funciones: 85%+
- Branches: 85%+
- Statements: 85%+

**Tiempo**: ~30 segundos

### 7️⃣ Deploy a Producción (solo en main)

Automaticamente después de un merge a `main`:

```yaml
- Build aplicación
- Desplegar a Render o Railway
- Ejecutar smoke tests
```

**Tiempo**: ~2-5 minutos

## Archivo de Configuración

### `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    # ... pasos ...
    
  deploy-to-production:
    needs: build-and-test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    # ... pasos deploy ...
```

## Configuración de Secrets

Para habilitar deploys automáticos, agrega estos secrets en:
**Settings → Secrets and variables → Actions**

### Secrets Requeridos

```bash
# Render
RENDER_DEPLOY_HOOK=https://api.render.com/deploy/srv-xxxxx/...

# Railway
RAILWAY_DEPLOY_TOKEN=your_railway_token_here
```

### Cómo Agregar Secrets

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings**
3. En el menú lateral, haz clic en **Secrets and variables**
4. Haz clic en **Actions**
5. Haz clic en **New repository secret**
6. Ingresa el nombre y valor
7. Haz clic en **Add secret**

## Monitoreo del Pipeline

### Ver Ejecuciones

```
https://github.com/AlejoCeron-col/Visitalaslajas/actions
```

### Ver Detalles de Ejecución

1. Ve a la pestaña **Actions**
2. Haz clic en el workflow que te interesa
3. Haz clic en la ejecución específica
4. Ver logs de cada paso

## Logs y Debugging

### Acceder a Logs

```
Actions → Workflow → Run → Step
```

### Forzar Rerun

1. Ve a la ejecución fallida
2. Haz clic en **Re-run jobs**
3. Selecciona qué jobs re-ejecutar

### Debug Mode

Para activar logs detallados:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
```

## Badges en README

Añade badges para mostrar estado del pipeline:

```markdown
[![CI/CD Pipeline](https://github.com/AlejoCeron-col/Visitalaslajas/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/AlejoCeron-col/Visitalaslajas/actions)

[![Coverage Status](https://img.shields.io/codecov/c/github/AlejoCeron-col/Visitalaslajas)](https://codecov.io/gh/AlejoCeron-col/Visitalaslajas)
```

## Solucionar Fallos

### Fallo en Tests Unitarios

```bash
# 1. Ejecutar localmente
npm run test:unit

# 2. Ver qué tests fallan
npm run test:unit -- --verbose

# 3. Revisar cobertura
npm test -- --coverage

# 4. Corregir código o tests

# 5. Hacer push nuevamente
```

### Fallo en Tests E2E

```bash
# 1. Ejecutar con modo UI
npx playwright test --ui

# 2. Ejecutar en modo debug
npx playwright test --debug

# 3. Ver videos de fallos
# Los videos se guardan en playwright-results/
```

### Fallo en Deploy

1. Verificar que los secrets están configurados
2. Revisar logs en Actions
3. Verificar que el webhook de Render/Railway es válido
4. Reconectar el repositorio con Render/Railway

## Mejores Prácticas

### ✅ Commits

```bash
# Mensaje descriptivo
git commit -m "feat: agregar endpoint de lugares"

# Commits pequeños
git commit -m "fix: validación de email"
```

### ✅ Pull Requests

1. Crear rama descriptiva: `feature/nueva-funcionalidad`
2. Hacer commits atómicos
3. Escribir descripción clara
4. Esperar a que el pipeline pase
5. Pedir review a compañeros

### ✅ Main Branch

- Solo merge después de PR aprobado
- Pipeline debe pasar completamente
- Versión en main siempre lista para producción

## Variables de Entorno en Pipeline

```yaml
env:
  NODE_ENV: test
  DATABASE_URL: postgres://test:test@localhost:5432/test_db
```

## Servicios en Pipeline

```yaml
services:
  postgres:
    image: postgres:15
    env:
      POSTGRES_PASSWORD: postgres
```

## Caching de Dependencias

El pipeline cachea `node_modules` para acelerar builds:

```yaml
- uses: actions/setup-node@v3
  with:
    cache: 'npm'
```

## Triggers Alternativos

Puedes ejecutar workflows manualmente:

```yaml
on:
  workflow_dispatch:
    inputs:
      reason:
        description: 'Razón para ejecutar'
```

Luego en Actions → Run workflow

## Próximos Pasos

1. **Codecov Integration**: Agregar comentarios de cobertura a PRs
2. **Slack Notifications**: Alertas en Slack
3. **Release Automation**: Auto-incrementar versión en main
4. **Performance Testing**: Benchmarks en cada PR

---

**Última actualización**: 3 de Junio, 2026
