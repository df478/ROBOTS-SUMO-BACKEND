import { Module } from '@nestjs/common'
import { ParticipanteController } from 'src/participantes/controller/participante.controller'
import { ParticipanteService } from 'src/participantes/service/participante.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParticipanteRepository } from 'src/participantes/repository/participante.repository'
import { Participante } from 'src/participantes/entity/participante.entity'

@Module({
  controllers: [ParticipanteController],
  providers: [ParticipanteService, ParticipanteRepository],
  imports: [TypeOrmModule.forFeature([Participante])],
})
export class ParticipanteModule {}
