import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PuntajeRepository } from '../repository'
import { CrearPuntajeDto } from '../dto'
import { ActualizarPuntajeDto } from '../dto'
import { ScoreDto } from '../dto/score.dto';

@Injectable()
export class PuntajeService{
  constructor(
    @Inject(PuntajeRepository)
    private puntajeRepositorio: PuntajeRepository
  ) {}

  async crear(puntajeDto: CrearPuntajeDto) {
    return await this.puntajeRepositorio.crear(puntajeDto)
  }

  async listar() {
    return await this.puntajeRepositorio.listar()
  }

  async buscarPorId(id: string) {
    const puntaje = await this.puntajeRepositorio.buscarPorId(id)
    if (!puntaje) {
      throw new NotFoundException()
    }
    return puntaje
  }

  async actualizarDatos(
    id: string,
    puntajeDto: ActualizarPuntajeDto,
  ) {
    const puntaje = await this.puntajeRepositorio.buscarPorId(id)
    if (!puntaje) {
      throw new NotFoundException()
    }
    await this.puntajeRepositorio.actualizar(
      id,
      puntajeDto,
    )
    return { id }
  }
  
  async eliminar(id: string) {
    const puntaje = await this.puntajeRepositorio.buscarPorId(id)
    if (!puntaje) {
      throw new NotFoundException()
    }
    await this.puntajeRepositorio.eliminar(id)
    return { id }
  }

  async softDelete(id: string) {
    const puntaje = await this.puntajeRepositorio.buscarPorId(id)
    if (!puntaje) {
      throw new NotFoundException()
    }
    await this.puntajeRepositorio.softDelete(id)
    return { id }
  }

  async restore(id: string) {
    const puntaje = await this.puntajeRepositorio.buscarPorIdConEliminados(id)
    if (!puntaje) {
      throw new NotFoundException()
    }
    await this.puntajeRepositorio.restore(id)
    return { id }
  }

  listarPuntajesParticipantes(): Promise<ScoreDto[]> {
    return this.puntajeRepositorio.listarPorParticipante();
  }
}
