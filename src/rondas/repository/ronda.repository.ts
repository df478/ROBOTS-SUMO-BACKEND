import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarRondaDto, CrearRondaDto } from '../dto';
import { Ronda } from '../entity';

@Injectable()
export class RondaRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Ronda)
      .createQueryBuilder('rondas')
      .leftJoinAndSelect('rondas.pista', 'pista')
      .leftJoinAndSelect('rondas.equipo_rojo', 'equipo_rojo')
      .leftJoinAndSelect('rondas.equipo_azul', 'equipo_azul')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
      return await this.dataSource
        .getRepository(Ronda)
        .createQueryBuilder('rondas')
        .where({ id: id })
        .withDeleted()
        .getOne();
    }

  async actualizar(id: string, rondaDto: ActualizarRondaDto) {
    const datosActualizar = new Ronda();
    Object.assign(datosActualizar, rondaDto);
    return await this.dataSource
      .getRepository(Ronda)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(Ronda)
      .createQueryBuilder('rondas')
      .select(['rondas.id', 'rondas.estado'])
      .leftJoinAndSelect('rondas.pista', 'pista')
      .leftJoinAndSelect('rondas.equipo_rojo', 'equipo_rojo')
      .leftJoinAndSelect('rondas.equipo_azul', 'equipo_azul');

    return await query.getManyAndCount();
  }

  async crear(rondaDto: CrearRondaDto) {
    const { estado, pistaId, equipoRojoId, equipoAzulId } = rondaDto;

    const rondas = new Ronda();
    rondas.estado = estado;
    rondas.pista = { id: pistaId } as any;
    rondas.equipo_rojo = { id: equipoRojoId } as any;
    rondas.equipo_azul = { id: equipoAzulId } as any;

    return await this.dataSource.getRepository(Ronda).save(rondas);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(Ronda).delete(id);
  }

  async softDelete(id: string) {
      return await this.dataSource
        .getRepository(Ronda)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
    }
  
    async restore(id: string) {
      return await this.dataSource
        .getRepository(Ronda)
        .createQueryBuilder()
        .restore()
        .where('id = :id', { id })
        .execute();
    }
}
