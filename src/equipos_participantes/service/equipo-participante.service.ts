import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { EquipoParticipanteRepository } from '../repository'
import { CrearEquipoParticipanteDto } from '../dto'
import { ActualizarEquipoParticipanteDto } from '../dto'

@Injectable()
export class EquipoParticipanteService{
  constructor(
    @Inject(EquipoParticipanteRepository)
    private equipoParticipanteRepositorio: EquipoParticipanteRepository
  ) {}

  async crear(equipoParticipanteDto: CrearEquipoParticipanteDto) {
    return await this.equipoParticipanteRepositorio.crear(equipoParticipanteDto)
  }

  async listar() {
    return await this.equipoParticipanteRepositorio.listar()
  }

  async buscarPorId(id: string) {
    const equipoParticipante = await this.equipoParticipanteRepositorio.buscarPorId(id)
    if (!equipoParticipante) {
      throw new NotFoundException()
    }
    return equipoParticipante
  }

  async actualizarDatos(
    id: string,
    equipoParticipanteDto: ActualizarEquipoParticipanteDto,
  ) {
    const equipoParticipante = await this.equipoParticipanteRepositorio.buscarPorId(id)
    if (!equipoParticipante) {
      throw new NotFoundException()
    }
    await this.equipoParticipanteRepositorio.actualizar(
      id,
      equipoParticipanteDto,
    )
    return { id }
  }
  
  async eliminar(id: string) {
    const equipoParticipante = await this.equipoParticipanteRepositorio.buscarPorId(id)
    if (!equipoParticipante) {
      throw new NotFoundException()
    }
    await this.equipoParticipanteRepositorio.eliminar(id)
    return { id }
  }

  async softDelete(id: string) {
    const equipoParticipante = await this.equipoParticipanteRepositorio.buscarPorId(id)
    if (!equipoParticipante) {
      throw new NotFoundException()
    }
    await this.equipoParticipanteRepositorio.softDelete(id)
    return { id }
  }

  async restore(id: string) {
    const equipoParticipante = await this.equipoParticipanteRepositorio.buscarPorIdConEliminados(id)
    if (!equipoParticipante) {
      throw new NotFoundException()
    }
    await this.equipoParticipanteRepositorio.restore(id)
    return { id }
  }
}
