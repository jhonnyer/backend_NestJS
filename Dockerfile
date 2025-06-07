# Base de Node.js
FROM node:20-alpine

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y lock para instalar primero las dependencias
COPY package*.json ./

# Instalar dependencias (solo de producción para reducir tamaño)
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Compilar la app si es necesario
RUN npm run build

# Exponer el puerto de escucha de la app NestJS
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start:prod"]
