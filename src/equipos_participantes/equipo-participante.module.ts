import { Module } from '@nestjs/common'
import { EquipoParticipanteController } from 'src/equipos_participantes/controller/equipo-participante.controller'
import { EquipoParticipanteService } from 'src/equipos_participantes/service/equipo-participante.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EquipoParticipanteRepository } from 'src/equipos_participantes/repository/equipo-participante.repository'
import { EquipoParticipante } from 'src/equipos_participantes/entity/equipo-participante.entity'

@Module({
  controllers: [EquipoParticipanteController],
  providers: [EquipoParticipanteService, EquipoParticipanteRepository],
  imports: [TypeOrmModule.forFeature([EquipoParticipante])],
})
export class EquipoParticipanteModule {}
