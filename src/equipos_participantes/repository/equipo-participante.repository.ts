import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  ActualizarEquipoParticipanteDto,
  CrearEquipoParticipanteDto,
} from '../dto';
import { EquipoParticipante } from '../entity';

@Injectable()
export class EquipoParticipanteRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(EquipoParticipante)
      .createQueryBuilder('equipos_participantes')
      .leftJoinAndSelect('equipos_participantes.equipo', 'equipo')
      .leftJoinAndSelect('equipos_participantes.participante', 'participante')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
      return await this.dataSource
        .getRepository(EquipoParticipante)
        .createQueryBuilder('equipos_participantes')
        .where({ id: id })
        .withDeleted()
        .getOne();
    }

  async actualizar(
    id: string,
    equipoParticipanteDto: ActualizarEquipoParticipanteDto,
  ) {
    const datosActualizar = new EquipoParticipante();
    Object.assign(datosActualizar, equipoParticipanteDto);
    return await this.dataSource
      .getRepository(EquipoParticipante)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(EquipoParticipante)
      .createQueryBuilder('equipos_participantes')
      .select([
        'equipos_participantes.id',
      ])
      .leftJoinAndSelect('equipos_participantes.equipo', 'equipo')
      .leftJoinAndSelect(
        'equipos_participantes.participante',
        'participante',
      );

    return await query.getManyAndCount();
  }

  async crear(equipoParticipanteDto: CrearEquipoParticipanteDto) {
    const { equipoId, participanteId } = equipoParticipanteDto;

    const equipoParticipante = new EquipoParticipante();
    equipoParticipante.equipo = { id: equipoId } as any;
    equipoParticipante.participante = { id: participanteId } as any;

    return await this.dataSource
      .getRepository(EquipoParticipante)
      .save(equipoParticipante);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(EquipoParticipante).delete(id);
  }

  async softDelete(id: string) {
      return await this.dataSource
        .getRepository(EquipoParticipante)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
    }
  
    async restore(id: string) {
      return await this.dataSource
        .getRepository(EquipoParticipante)
        .createQueryBuilder()
        .restore()
        .where('id = :id', { id })
        .execute();
    }
}
