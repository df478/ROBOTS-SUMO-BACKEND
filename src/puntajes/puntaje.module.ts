import { Module } from '@nestjs/common'
import { PuntajeController } from 'src/puntajes/controller/puntaje.controller'
import { PuntajeService } from 'src/puntajes/service/puntaje.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PuntajeRepository } from 'src/puntajes/repository/puntaje.repository'
import { Puntaje } from 'src/puntajes/entity/puntaje.entity'

@Module({
  controllers: [PuntajeController],
  providers: [PuntajeService, PuntajeRepository],
  imports: [TypeOrmModule.forFeature([Puntaje])],
})
export class PuntajeModule {}
