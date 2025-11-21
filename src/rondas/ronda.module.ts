import { Module } from '@nestjs/common'
import { RondaController } from 'src/rondas/controller/ronda.controller'
import { RondaService } from 'src/rondas/service/ronda.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RondaRepository } from 'src/rondas/repository/ronda.repository'
import { Ronda } from 'src/rondas/entity/ronda.entity'

@Module({
  controllers: [RondaController],
  providers: [RondaService, RondaRepository],
  imports: [TypeOrmModule.forFeature([Ronda])],
})
export class RondaModule {}
