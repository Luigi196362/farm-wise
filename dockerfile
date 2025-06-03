# Dockerfile para API Express + Node.js

# Imagen base oficial de Node.js (versión LTS)
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa la API (ejemplo 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
