import { Module } from '@nestjs/common'
import { EquipoController } from 'src/equipos/controller/equipo.controller'
import { EquipoService } from 'src/equipos/service/equipo.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EquipoRepository } from 'src/equipos/repository/equipo.repository'
import { Equipo } from 'src/equipos/entity/equipo.entity'

@Module({
  controllers: [EquipoController],
  providers: [EquipoService, EquipoRepository],
  imports: [TypeOrmModule.forFeature([Equipo])],
})
export class EquipoModule {}
