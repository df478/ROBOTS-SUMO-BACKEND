import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { TutorRepository } from '../repository'
import { CrearTutorDto } from '../dto'
import { ActualizarTutorDto } from '../dto'

@Injectable()
export class TutorService{
  constructor(
    @Inject(TutorRepository)
    private tutorRepositorio: TutorRepository
  ) {}

  async crear(tutorDto: CrearTutorDto) {
    return await this.tutorRepositorio.crear(tutorDto)
  }

  async listar() {
    return await this.tutorRepositorio.listar()
  }

  async buscarPorId(id: string) {
    const tutor = await this.tutorRepositorio.buscarPorId(id)
    if (!tutor) {
      throw new NotFoundException()
    }
    return tutor
  }

  async actualizarDatos(
    id: string,
    tutorDto: ActualizarTutorDto,
  ) {
    const tutor = await this.tutorRepositorio.buscarPorId(id)
    if (!tutor) {
      throw new NotFoundException()
    }
    await this.tutorRepositorio.actualizar(
      id,
      tutorDto,
    )
    return { id }
  }
  
  async eliminar(id: string) {
    const tutor = await this.tutorRepositorio.buscarPorId(id)
    if (!tutor) {
      throw new NotFoundException()
    }
    await this.tutorRepositorio.eliminar(id)
    return { id }
  }

  async softDelete(id: string) {
    const tutor = await this.tutorRepositorio.buscarPorId(id)
    if (!tutor) {
      throw new NotFoundException()
    }
    await this.tutorRepositorio.softDelete(id)
    return { id }
  }

  async restore(id: string) {
    const tutor = await this.tutorRepositorio.buscarPorIdConEliminados(id)
    if (!tutor) {
      throw new NotFoundException()
    }
    await this.tutorRepositorio.restore(id)
    return { id }
  }
}
