import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorModule } from 'src/tutores/tutor.module';
import { ParticipanteModule } from 'src/participantes/participante.module';
import { EquipoModule } from 'src/equipos/equipo.module';
import { EquipoParticipanteModule } from 'src/equipos_participantes/equipo-participante.module';
import { PistaModule } from 'src/pistas/pista.module';
import { PuntajeModule } from 'src/puntajes/puntaje.module';
import { RondaModule } from 'src/rondas/ronda.module';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        keepConnectionAlive: true,
        synchronize: false,
      }),
    }),
    TutorModule,
    ParticipanteModule,
    EquipoModule,
    EquipoParticipanteModule,
    PistaModule,
    PuntajeModule,
    RondaModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
