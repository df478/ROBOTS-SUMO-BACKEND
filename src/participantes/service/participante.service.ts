import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ParticipanteRepository } from '../repository'
import { CrearParticipanteDto } from '../dto'
import { ActualizarParticipanteDto } from '../dto'

@Injectable()
export class ParticipanteService{
  constructor(
    @Inject(ParticipanteRepository)
    private participanteRepositorio: ParticipanteRepository
  ) {}

  async crear(participanteDto: CrearParticipanteDto) {
    return await this.participanteRepositorio.crear(participanteDto)
  }

  async listar() {
    return await this.participanteRepositorio.listar()
  }

  async buscarPorId(id: string) {
    const participante = await this.participanteRepositorio.buscarPorId(id)
    if (!participante) {
      throw new NotFoundException()
    }
    return participante
  }

  async actualizarDatos(
    id: string,
    participanteDto: ActualizarParticipanteDto,
  ) {
    const participante = await this.participanteRepositorio.buscarPorId(id)
    if (!participante) {
      throw new NotFoundException()
    }
    await this.participanteRepositorio.actualizar(
      id,
      participanteDto,
    )
    return { id }
  }
  
  async eliminar(id: string) {
    const participante = await this.participanteRepositorio.buscarPorId(id)
    if (!participante) {
      throw new NotFoundException()
    }
    await this.participanteRepositorio.eliminar(id)
    return { id }
  }

  async softDelete(id: string) {
    const participante = await this.participanteRepositorio.buscarPorId(id)
    if (!participante) {
      throw new NotFoundException()
    }
    await this.participanteRepositorio.softDelete(id)
    return { id }
  }

  async restore(id: string) {
    const participante = await this.participanteRepositorio.buscarPorIdConEliminados(id)
    if (!participante) {
      throw new NotFoundException()
    }
    await this.participanteRepositorio.restore(id)
    return { id }
  }
}
