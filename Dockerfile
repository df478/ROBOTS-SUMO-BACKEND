# Etapa 1: Construcción (build)
FROM node:22-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json* ./

# Instala todas las dependencias (incluyendo devDependencies)
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto (esto ejecuta el script "build" definido en package.json, p.ej. "nest build")
RUN npm run build

# Etapa 2: Imagen de producción
FROM node:22-alpine

WORKDIR /app

# Copia el archivo .env a la imagen
COPY .env .

# Copia el package.json y el lockfile
COPY package.json package-lock.json* ./
COPY ormconfig-default.ts .
COPY ormconfig-seed.ts .
COPY tsconfig.json .  
COPY src ./src

# Aquí se copia el directorio de migraciones seeds
COPY database/seeds ./database/seeds

# Instala solo las dependencias de producción
RUN npm install

# Copia el código compilado desde la etapa de build
COPY --from=builder /app/dist ./dist

# Copia el script de entrypoint y dale permisos de ejecución
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expone el puerto (ajusta según el que uses, por ejemplo 3012)
EXPOSE 3000

# Comando de inicio
ENTRYPOINT ["/app/entrypoint.sh"]
