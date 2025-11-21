import { Module } from '@nestjs/common'
import { TutorController } from 'src/tutores/controller/tutor.controller'
import { TutorService } from 'src/tutores/service/tutor.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TutorRepository } from 'src/tutores/repository/tutor.repository'
import { Tutor } from 'src/tutores/entity/tutor.entity'

@Module({
  controllers: [TutorController],
  providers: [TutorService, TutorRepository],
  imports: [TypeOrmModule.forFeature([Tutor])],
})
export class TutorModule {}
