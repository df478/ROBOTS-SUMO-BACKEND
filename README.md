# Competencia de Robots SUMO – Backend NestJS

<p>
  <a href="./">
    <img src="https://img.shields.io/badge/version-v1.0.0-blue" alt="Versión">
  </a>
  <a href="./LICENSE">
      <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=green" alt="Licencia: MIT" />
  </a>
</p>

## Descripción

Backend para la **Competencia de Robots SUMO**, desarrollado con NestJS y PostgreSQL. Este sistema gestiona la inscripción de participantes, tutores, generación de equipos y rondas, puntajes, y clasificación de ganadores.

---

## Tecnologías

| Nombre      | Descripción                                                       | Sitio Web                                                |
| ----------- | ----------------------------------------------------------------- | -------------------------------------------------------- |
| NestJS      | Framework de Node.js con TypeScript para aplicaciones escalables. | [https://nestjs.com](https://nestjs.com)                 |
| TypeORM     | ORM para TypeScript y JavaScript para bases de datos.             | [https://typeorm.io](https://typeorm.io)                 |
| Passport.js | Middleware de autenticación para Node.js (JWT).                   | [http://www.passportjs.org](http://www.passportjs.org)   |
| OpenAPI     | Documentación de API con Swagger.                                 | [https://swagger.io](https://swagger.io)                 |
| PostgreSQL  | Sistema de gestión de bases de datos relacional.                  | [https://www.postgresql.org](https://www.postgresql.org) |
| Docker      | Contenedorización para despliegue.                                | [https://www.docker.com](https://www.docker.com)         |

---

## Funcionalidades implementadas

* CRUD de Tutores
* CRUD de Participantes
* CRUD de Equipos
* CRUD de Rondas
* CRUD de Pistas
* Registro de Puntajes
* Autenticación JWT (Admin)
* Generación automática de rondas y equipos
* Selección de los 3 mejores participantes
* Documentación de API con Swagger

---

## Instalación y configuración

*. Es posible iniciar la aplicacion desde docker compose:

   ```bash
   docker compose -f 'docker-compose.yml' up -d --build
   ```

1. Clona el repositorio:

   https://gitlab.com/eledavid88-group/BACKEND-PASANTIA-AGETIC

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Copia el archivo `.env.example` a `.env`:

   ```bash
   cp .env.example .env
   ```

4. Inicializa la base de datos :

   ```bash
   docker compose -f 'docker-compose.yml' up -d --build 'db-postgres'
   ```

5. Ejecuta las migraciones y seeders :

   ```bash
   npm run setup
   ```

6. Levanta el servidor:

   ```bash
   npm run start:dev
   ```

---

## Documentación

La documentación de la API estará disponible en:

```
http://localhost:3000/api/docs
```

---

## Licencia

[MIT](LICENSE).

---

## Autor

Eleazar Condori
[eledavid88@gmail.com](mailto:eledavid88@gmail.com)
