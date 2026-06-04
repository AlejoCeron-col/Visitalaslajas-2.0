# Configurar Wiki en GitHub

Guía paso a paso para activar y configurar la Wiki en tu repositorio.

## Paso 1: Habilitar Wiki en el Repositorio

### En GitHub

1. Ve a tu repositorio: `https://github.com/AlejoCeron-col/Visitalaslajas`
2. Haz clic en **Settings** (engranaje)
3. En el menú izquierdo, busca **Features**
4. Activa la casilla de verificación junto a **Wikis**
5. Haz clic en **Save changes**

### Verificar Activación

Deberías ver una pestaña **Wiki** en la navegación principal del repositorio.

## Paso 2: Crear Páginas de Wiki

### Opción A: Desde GitHub Web Interface

1. Haz clic en la pestaña **Wiki**
2. Haz clic en **Create the first page**
3. En "Page title" escribe: `Home`
4. En el editor, pega el contenido de [docs/wiki/Home.md](../wiki/Home.md)
5. En "Edit message" escribe: `Initial commit: Home page`
6. Haz clic en **Save Page**

### Opción B: Clonar Wiki Repository (Recomendado)

```bash
# Clonar el wiki como un repositorio separado
git clone https://github.com/AlejoCeron-col/Visitalaslajas.wiki.git
cd Visitalaslajas.wiki

# Copiar archivos de docs/wiki del proyecto
cp ../Visitalaslajas/docs/wiki/* .

# Agregar todos los cambios
git add .

# Commit
git commit -m "Initial wiki setup"

# Push
git push origin master
```

## Paso 3: Agregar Páginas de Wiki

### Usando Git (Recomendado)

```bash
# Navegar a la carpeta wiki
cd Visitalaslajas.wiki

# Copiar archivo de wiki
cp ../Visitalaslajas/docs/wiki/Arquitectura-del-Sistema.md .

# Commit y push
git add Arquitectura-del-Sistema.md
git commit -m "docs: agregar página de arquitectura"
git push
```

### Desde GitHub Web

1. Ve a **Wiki** del repositorio
2. Haz clic en **New Page**
3. Escribe el título de la página
4. Pega el contenido
5. Haz clic en **Save Page**

## Paso 4: Organizar la Estructura

### Nombres de Archivo

Los nombres de página en GitHub Wiki deben seguir este formato:

```
Page-Title → Page Title (se convierte automáticamente)
```

### Ejemplos

```
Home.md                              → Home
Arquitectura-del-Sistema.md         → Arquitectura del Sistema
Inicio-Rápido.md                    → Inicio Rápido
Documentación-de-API.md             → Documentación de API
CI-CD-Pipeline.md                   → CI/CD Pipeline
```

## Paso 5: Crear Sidebar (Navigation)

GitHub Wiki permite un sidebar personalizado.

### Crear archivo `_Sidebar.md`

```markdown
## Contenido

### Inicio
- [Home](Home)

### Guías
- [Inicio Rápido](Inicio-Rápido)
- [Instalación](Instalación-de-Dependencias)

### Desarrollo
- [Arquitectura](Arquitectura-del-Sistema)
- [API](Documentación-de-API)

### DevOps
- [CI/CD](CI-CD-Pipeline)
- [Docker](Docker-y-Docker-Compose)

### Testing
- [Pruebas](Pruebas-Unitarias)

### Troubleshooting
- [Problemas Comunes](Problemas-Comunes)
```

Commit y push este archivo también.

## Paso 6: Crear Footer (Opcional)

Similar al sidebar, crear `_Footer.md`:

```markdown
---
**Wiki de Visita Las Lajas**
- [GitHub](https://github.com/AlejoCeron-col/Visitalaslajas)
- [Issues](https://github.com/AlejoCeron-col/Visitalaslajas/issues)
- [Último actualizado](https://github.com/AlejoCeron-col/Visitalaslajas/wiki/_history)
```

## Paso 7: Páginas de Wiki Recomendadas

Copia estos archivos a tu wiki (están en `docs/wiki/`):

```
✅ Home.md
✅ Arquitectura-del-Sistema.md
✅ Inicio-Rápido.md
✅ Documentación-de-API.md
✅ CI-CD-Pipeline.md
```

### Adicionales (Crear según necesidad)

```
⭕ Instalación-de-Dependencias.md
⭕ Configuración-de-Base-de-Datos.md
⭕ Estructura-de-Carpetas.md
⭕ Pruebas-Unitarias.md
⭕ Pruebas-de-Integración.md
⭕ Pruebas-E2E.md
⭕ Deploy-en-Render.md
⭕ Deploy-en-Railway.md
⭕ Docker-y-Docker-Compose.md
⭕ Guía-de-Estilos-de-Código.md
⭕ Problemas-Comunes.md
⭕ FAQ.md
⭕ Guía-de-Contribución.md
```

## Paso 8: Actualizar Wiki desde Git

```bash
# Cuando quieras actualizar la wiki desde archivos locales

# 1. Navegar a wiki clonada
cd Visitalaslajas.wiki

# 2. Copiar archivos actualizados
cp ../Visitalaslajas/docs/wiki/* .

# 3. Commit y push
git add .
git commit -m "docs: actualizar wiki"
git push
```

## Comando Rápido: Setup Automatizado

```bash
#!/bin/bash
# Script para configurar wiki automáticamente

# 1. Clonar wiki
git clone https://github.com/AlejoCeron-col/Visitalaslajas.wiki.git
cd Visitalaslajas.wiki

# 2. Copiar archivos
cp ../Visitalaslajas/docs/wiki/* .

# 3. Commit y push inicial
git add .
git commit -m "Initial wiki setup with documentation"
git push origin master

# 4. Volver a carpeta principal
cd ..

echo "✅ Wiki configurada exitosamente!"
echo "Accede a: https://github.com/AlejoCeron-col/Visitalaslajas/wiki"
```

Guárdalo como `setup-wiki.sh` y ejecuta:
```bash
chmod +x setup-wiki.sh
./setup-wiki.sh
```

## Mantenimiento de la Wiki

### Actualizar Documentación

```bash
# Editar archivos en docs/wiki/
# Luego sincronizar con GitHub

cd Visitalaslajas.wiki
git pull
# Actualizar archivos
git add .
git commit -m "docs: actualizar documentación"
git push
```

### Revisar Historial

GitHub Wiki mantiene historial automático:

1. Ve a Wiki
2. Haz clic en **History** en cualquier página
3. Ver cambios pasados y revertir si es necesario

### Administradores de Wiki

Para dar acceso a otros a editar la wiki:

1. En repository Settings → **Manage access**
2. Invita colaboradores con rol **Contributor** o **Maintain**

## Características de GitHub Wiki

### ✅ Soportadas

- Markdown
- Sintaxis de código (code blocks)
- Tablas
- Listas
- Enlaces internos: `[Texto](Page-Name)`
- Imágenes

### ❌ No soportadas

- Archivos adjuntos directos
- Ejecutar código
- Comentarios en las páginas

## Solucionar Problemas

### Wiki no aparece

1. Verifica Settings → Features → Wikis esté activado
2. Espera 5 minutos y recarga
3. Limpia cache del navegador

### No puedo editar

- Verifica tener acceso al repositorio
- Pide al owner que te agregue como colaborador

### Los cambios no se ven

```bash
# En wiki repository
git pull
git log --oneline  # Verificar commits
```

## Vincular Wiki desde README

Añade esto en tu `README.md`:

```markdown
## 📚 Documentación

- **[README](/)**: Este archivo
- **[Wiki del Proyecto](https://github.com/AlejoCeron-col/Visitalaslajas/wiki)**: Documentación completa
- **[API Docs](http://localhost:3000/api-docs)**: Documentación interactiva

### Secciones de la Wiki

- [Arquitectura del Sistema](https://github.com/AlejoCeron-col/Visitalaslajas/wiki/Arquitectura-del-Sistema)
- [Inicio Rápido](https://github.com/AlejoCeron-col/Visitalaslajas/wiki/Inicio-Rápido)
- [Documentación de API](https://github.com/AlejoCeron-col/Visitalaslajas/wiki/Documentación-de-API)
- [CI/CD Pipeline](https://github.com/AlejoCeron-col/Visitalaslajas/wiki/CI-CD-Pipeline)
```

## Acceso a la Wiki

Una vez configurada, accede aquí:

```
https://github.com/AlejoCeron-col/Visitalaslajas/wiki
```

---

**Última actualización**: 3 de Junio, 2026
