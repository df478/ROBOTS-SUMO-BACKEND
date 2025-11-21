import { Module } from '@nestjs/common'
import { PistaController } from 'src/pistas/controller/pista.controller'
import { PistaService } from 'src/pistas/service/pista.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PistaRepository } from 'src/pistas/repository/pista.repository'
import { Pista } from 'src/pistas/entity/pista.entity'

@Module({
  controllers: [PistaController],
  providers: [PistaService, PistaRepository],
  imports: [TypeOrmModule.forFeature([Pista])],
})
export class PistaModule {}
