# Manual de instalación

## 1. Requerimientos

| Nombre     | Versión | Descripción                                   | Instalación                                                                |
| ---------- | ------- | --------------------------------------------- | -------------------------------------------------------------------------- |
| PostgreSQL | ^16     | Gestor de base de datos relacional.           | [https://www.postgresql.org/download](https://www.postgresql.org/download) |
| NodeJS     | ^22     | Entorno de ejecución JavaScript/TypeScript.   | [https://nodejs.org](https://nodejs.org)                                   |
| npm        | ^10     | Gestor de paquetes de NodeJS.                 | Incluido con NodeJS                                                        |
| Docker     | ^24     | Contenedorización de aplicaciones (opcional). | [https://www.docker.com](https://www.docker.com)                           |

---

## 2. Instalación

### Clonación del proyecto e instalación de dependencias

```bash
# Clonar el repositorio
https://gitlab.com/eledavid88-group/BACKEND-PASANTIA-AGETIC

# Instalar dependencias
npm install
```

---

### Configuración de variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

---

### Es posible iniciar la aplicacion desde docker compose:

   ```bash
   docker compose -f 'docker-compose.yml' up -d --build
   ```
---

### Iniciar solamente la base de datos desde docker compose:

   ```bash
   docker compose -f 'docker-compose.yml' up -d --build 'db-postgres'
   ```
---

### Creación y configuración de la base de datos

1. Crea la base de datos `database_db` en PostgreSQL y asigna el esquema `public`.

2. Ejecuta las migraciones y seeders:

```bash
npm run setup
```

---

### Despliegue de la aplicación

* **Modo desarrollo**

  ```bash
  npm run start:dev
  ```

* **Modo producción**

  ```bash
  npm run build
  npm run start:prod
  ```

---

## 3. Comandos útiles

| Comando                            | Descripción                        |
| ---------------------------------- | ---------------------------------- |
| `npm run start:dev`                | Levanta el proyecto en desarrollo. |
| `npm run build`                    | Compila el proyecto.               |
| `npm run start:prod`               | Levanta el proyecto en producción. |
| `npm run setup`                    | Ejecuta las migraciones y seeders. |

---

## 4. Variables de entorno

### Aplicación

| Variable         | Descripción                            | Valor por defecto |
| ---------------- | -------------------------------------- | ----------------- |
| `NODE_ENV`       | Entorno (`development`, `production`). | development       |
| `PORT`           | Puerto donde se levantará la API.      | 3000              |
| `PATH_SUBDOMAIN` | Prefijo global para las rutas.         | api               |

### Base de datos

| Variable      | Descripción                     | Valor por defecto   |
| ------------- | ------------------------------- | ------------------- |
| `DB_HOST`     | Host de la base de datos.       | localhost           |
| `DB_PORT`     | Puerto de la base de datos.     | 5432                |
| `DB_USERNAME` | Usuario de la base de datos.    | postgres            |
| `DB_PASSWORD` | Contraseña de la base de datos. | postgres            |
| `DB_DATABASE` | Nombre de la base de datos.     | competencia\_robots |

### Autenticación (JWT)

| Variable         | Descripción                       | Valor por defecto |
| ---------------- | --------------------------------- | ----------------- |
| `JWT_SECRET`     | Clave secreta para firmar tokens. | —                 |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token.   | 1h                |

---

## 5. URL de la API

La API estará disponible en:

```
http://localhost:3000/api
```

La documentación Swagger en:

```
http://localhost:3000/api/docs
```

---

## 6. Autor

Eleazar Condori
✉️ [eledavid88@gmail.com](mailto:eledavid88@gmail.com)

---
