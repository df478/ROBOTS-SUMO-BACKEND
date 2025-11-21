import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PistaRepository } from '../repository'
import { CrearPistaDto } from '../dto'
import { ActualizarPistaDto } from '../dto'

@Injectable()
export class PistaService{
  constructor(
    @Inject(PistaRepository)
    private pistaRepositorio: PistaRepository
  ) {}

  async crear(pistaDto: CrearPistaDto) {
    return await this.pistaRepositorio.crear(pistaDto)
  }

  async listar() {
    return await this.pistaRepositorio.listar()
  }

  async buscarPorId(id: string) {
    const pista = await this.pistaRepositorio.buscarPorId(id)
    if (!pista) {
      throw new NotFoundException()
    }
    return pista
  }

  async actualizarDatos(
    id: string,
    pistaDto: ActualizarPistaDto,
  ) {
    const pista = await this.pistaRepositorio.buscarPorId(id)
    if (!pista) {
      throw new NotFoundException()
    }
    await this.pistaRepositorio.actualizar(
      id,
      pistaDto,
    )
    return { id }
  }
  
  async eliminar(id: string) {
    const pista = await this.pistaRepositorio.buscarPorId(id)
    if (!pista) {
      throw new NotFoundException()
    }
    await this.pistaRepositorio.eliminar(id)
    return { id }
  }

  async softDelete(id: string) {
    const pista = await this.pistaRepositorio.buscarPorId(id)
    if (!pista) {
      throw new NotFoundException()
    }
    await this.pistaRepositorio.softDelete(id)
    return { id }
  }

  async restore(id: string) {
    const pista = await this.pistaRepositorio.buscarPorIdConEliminados(id)
    if (!pista) {
      throw new NotFoundException()
    }
    await this.pistaRepositorio.restore(id)
    return { id }
  }
}
