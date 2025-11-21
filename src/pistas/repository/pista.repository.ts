import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarPistaDto, CrearPistaDto } from '../dto';
import { Pista } from '../entity';

@Injectable()
export class PistaRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Pista)
      .createQueryBuilder('pistas')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
    return await this.dataSource
      .getRepository(Pista)
      .createQueryBuilder('pistas')
      .where({ id: id })
      .withDeleted()
      .getOne();
  }

  async actualizar(id: string, pistaDto: ActualizarPistaDto) {
    const datosActualizar = new Pista({
      ...pistaDto,
    });
    return await this.dataSource
      .getRepository(Pista)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(Pista)
      .createQueryBuilder('pistas')
      .select(['pistas.id', 'pistas.nombrePista']);

    return await query.getManyAndCount();
  }

  async crear(pistaDto: CrearPistaDto) {
    const { nombrePista } = pistaDto;

    const pista = new Pista();
    pista.nombrePista = nombrePista;

    return await this.dataSource.getRepository(Pista).save(pista);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(Pista).delete(id);
  }

  async softDelete(id: string) {
    return await this.dataSource
      .getRepository(Pista)
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .execute();
  }

  async restore(id: string) {
    return await this.dataSource
      .getRepository(Pista)
      .createQueryBuilder()
      .restore()
      .where('id = :id', { id })
      .execute();
  }
}
