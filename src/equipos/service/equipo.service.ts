import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EquipoRepository } from '../repository';
import { CrearEquipoDto } from '../dto';
import { ActualizarEquipoDto } from '../dto';
import { EquipoDetailDto } from '../dto/equipo-detail.dto';

@Injectable()
export class EquipoService {
  constructor(
    @Inject(EquipoRepository)
    private equipoRepositorio: EquipoRepository,
  ) {}

  async crear(equipoDto: CrearEquipoDto) {
    return await this.equipoRepositorio.crear(equipoDto);
  }

  async listar() {
    return await this.equipoRepositorio.listar();
  }

  async buscarPorId(id: string) {
    const equipo = await this.equipoRepositorio.buscarPorId(id);
    if (!equipo) {
      throw new NotFoundException();
    }
    return equipo;
  }

  async actualizarDatos(id: string, equipoDto: ActualizarEquipoDto) {
    const equipo = await this.equipoRepositorio.buscarPorId(id);
    if (!equipo) {
      throw new NotFoundException();
    }
    await this.equipoRepositorio.actualizar(id, equipoDto);
    return { id };
  }

  async eliminar(id: string) {
    const equipo = await this.equipoRepositorio.buscarPorId(id);
    if (!equipo) {
      throw new NotFoundException();
    }
    await this.equipoRepositorio.eliminar(id);
    return { id };
  }

  async softDelete(id: string) {
    const equipo = await this.equipoRepositorio.buscarPorId(id);
    if (!equipo) {
      throw new NotFoundException();
    }
    await this.equipoRepositorio.softDelete(id);
    return { id };
  }

  async restore(id: string) {
    const equipo = await this.equipoRepositorio.buscarPorIdConEliminados(id);
    if (!equipo) {
      throw new NotFoundException();
    }
    await this.equipoRepositorio.restore(id);
    return { id };
  }

  listarDetallesEquipos(): Promise<EquipoDetailDto[]> {
    return this.equipoRepositorio.listarDetalles();
  }
}
