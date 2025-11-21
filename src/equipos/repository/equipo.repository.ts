import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarEquipoDto, CrearEquipoDto } from '../dto';
import { Equipo } from '../entity';
import { EquipoParticipante } from 'src/equipos_participantes/entity/equipo-participante.entity';
import { Participante } from 'src/participantes/entity/participante.entity';
import { Tutor } from 'src/tutores/entity/tutor.entity';
import { EquipoDetailDto } from '../dto/equipo-detail.dto';

@Injectable()
export class EquipoRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Equipo)
      .createQueryBuilder('equipos')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
    return await this.dataSource
      .getRepository(Equipo)
      .createQueryBuilder('equipos')
      .where({ id: id })
      .withDeleted()
      .getOne();
  }

  async actualizar(id: string, equipoDto: ActualizarEquipoDto) {
    const datosActualizar = new Equipo({
      ...equipoDto,
    });
    return await this.dataSource
      .getRepository(Equipo)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(Equipo)
      .createQueryBuilder('equipos')
      .select(['equipos.id', 'equipos.nombreEquipo']);

    return await query.getManyAndCount();
  }

  async crear(equipoDto: CrearEquipoDto) {
    const { nombreEquipo } = equipoDto;

    const equipo = new Equipo();
    equipo.nombreEquipo = nombreEquipo;

    return await this.dataSource.getRepository(Equipo).save(equipo);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(Equipo).delete(id);
  }

  async softDelete(id: string) {
    return await this.dataSource
      .getRepository(Equipo)
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .execute();
  }

  async restore(id: string) {
    return await this.dataSource
      .getRepository(Equipo)
      .createQueryBuilder()
      .restore()
      .where('id = :id', { id })
      .execute();
  }

  async listarDetalles(): Promise<EquipoDetailDto[]> {
    const raw = await this.dataSource
      .getRepository(Equipo)
      .createQueryBuilder('e')
      .select('e.id', 'id')
      .addSelect('e.nombreEquipo', 'nombreEquipo')
      // participantes concatenados
      .addSelect(`STRING_AGG(DISTINCT p.nombreCompleto, ', ')`, 'participantes')
      // tutores concatenados (años de tutoría vía participante)
      .addSelect(
        `STRING_AGG(
            DISTINCT CONCAT(t.nombreCompleto),
            ', '
          )`,
        'tutores',
      )
      .leftJoin(EquipoParticipante, 'ep', 'ep.equipo = e.id')
      .leftJoin(Participante, 'p', 'p.id = ep.id')
      .leftJoin(Tutor, 't', 't.id = p.id')
      .groupBy('e.id')
      .addGroupBy('e.nombreEquipo')
      .getRawMany<{
        id: string;
        nombreEquipo: string;
        participantes: string;
        tutores: string;
      }>();

    return raw.map((r) => ({
      id: r.id,
      nombreEquipo: r.nombreEquipo,
      participantes: r.participantes || '',
      tutores: r.tutores || '',
    }));
  }
}
