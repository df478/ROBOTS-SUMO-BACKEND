import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import passport from 'passport';
import helmet from 'helmet';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { DataSource } from 'typeorm';

import {write, writeFileSync} from 'fs';

export const SessionAppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // swagger
  createSwagger(app);
  
  await SessionAppDataSource.initialize();

  // configuration app

  app.use(passport.initialize())
  app.use(express.static('public'));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(helmet.hidePoweredBy());
  app.use(helmet());
  app.setGlobalPrefix(configService.get('PATH_SUBDOMAIN') || 'api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get('PORT');
  await app.listen(port ?? 3000);

  console.log(`🚀 Application running on: http://127.0.0.1:${port}/api/docs`);
}

function createSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_API_NAME)
    .setDescription(process.env.SWAGGER_API_DESCRIPTION)
    .setVersion(process.env.SWAGGER_API_CURRENT_VERSION)
    .addServer(`http://robots-sumo-backend.alacran.codelabnow.tech/api/`)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter your JWT token in the format: Bearer <token>',
    })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_API_ROOT, app, document);

  writeFileSync('./swagger.json', JSON.stringify(document, null, 2), 'utf8');
}

bootstrap();
