import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { RondaRepository } from '../repository'
import { CrearRondaDto } from '../dto'
import { ActualizarRondaDto } from '../dto'

@Injectable()
export class RondaService{
  constructor(
    @Inject(RondaRepository)
    private rondaRepositorio: RondaRepository
  ) {}

  async crear(rondaDto: CrearRondaDto) {
    return await this.rondaRepositorio.crear(rondaDto)
  }

  async listar() {
    return await this.rondaRepositorio.listar()
  }

  async buscarPorId(id: string) {
    const ronda = await this.rondaRepositorio.buscarPorId(id)
    if (!ronda) {
      throw new NotFoundException()
    }
    return ronda
  }

  async actualizarDatos(
    id: string,
    rondaDto: ActualizarRondaDto,
  ) {
    const ronda = await this.rondaRepositorio.buscarPorId(id)
    if (!ronda) {
      throw new NotFoundException()
    }
    await this.rondaRepositorio.actualizar(
      id,
      rondaDto,
    )
    return { id }
  }
  
  async eliminar(id: string) {
    const ronda = await this.rondaRepositorio.buscarPorId(id)
    if (!ronda) {
      throw new NotFoundException()
    }
    await this.rondaRepositorio.eliminar(id)
    return { id }
  }

  async softDelete(id: string) {
    const ronda = await this.rondaRepositorio.buscarPorId(id)
    if (!ronda) {
      throw new NotFoundException()
    }
    await this.rondaRepositorio.softDelete(id)
    return { id }
  }

  async restore(id: string) {
    const ronda = await this.rondaRepositorio.buscarPorIdConEliminados(id)
    if (!ronda) {
      throw new NotFoundException()
    }
    await this.rondaRepositorio.restore(id)
    return { id }
  }
}
