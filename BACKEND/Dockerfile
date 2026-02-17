# 1. Usar imagen ligera de Node
FROM node:20-alpine

# 2. Crear carpeta dentro del contenedor
WORKDIR /app

# 3. Copiar archivos de dependencias
COPY package*.json ./

# 4. Instalar dependencias (incluyendo TypeScript para poder compilar)
RUN npm install

# 5. Copiar todo el código fuente
COPY . .

# 6. Construir la app (Convierte TS a JS en la carpeta /dist)
RUN npm run build

# 7. Exponer el puerto
EXPOSE 3000

# 8. Comando para arrancar (Usa el JS compilado)
CMD ["npm", "start"]