# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Etapa 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Instalar dumb-init para manejar señales correctamente
RUN apk add --no-cache dumb-init

# Copiar node_modules desde builder
COPY --from=builder /app/node_modules ./node_modules

# Copiar código de la aplicación
COPY . .

# Crear directorio de sesiones
RUN mkdir -p /app/src/sessions

# Cambiar propietario de archivos
RUN chown -R node:node /app

# Usar usuario no-root
USER node

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Usar dumb-init para ejecutar la aplicación
ENTRYPOINT ["dumb-init", "--"]

# Comando para iniciar la aplicación
CMD ["npm", "start"]
