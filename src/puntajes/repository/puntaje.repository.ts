import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarPuntajeDto, CrearPuntajeDto } from '../dto';
import { Puntaje } from '../entity';
import { ScoreDto } from '../dto/score.dto';
import { Participante } from 'src/participantes/entity/participante.entity';
import { EquipoParticipante } from 'src/equipos_participantes/entity/equipo-participante.entity';

@Injectable()
export class PuntajeRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Puntaje)
      .createQueryBuilder('puntajes')
      .leftJoinAndSelect('puntajes.ronda', 'ronda')
      .leftJoinAndSelect('puntajes.equipo', 'equipo')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
    return await this.dataSource
      .getRepository(Puntaje)
      .createQueryBuilder('puntajes')
      .where({ id: id })
      .withDeleted()
      .getOne();
  }

  async actualizar(id: string, puntajeDto: ActualizarPuntajeDto) {
    const datosActualizar = new Puntaje();
    Object.assign(datosActualizar, puntajeDto);
    return await this.dataSource
      .getRepository(Puntaje)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(Puntaje)
      .createQueryBuilder('puntajes')
      .select(['puntajes.id', 'puntajes.puntaje'])
      .leftJoinAndSelect('puntajes.ronda', 'ronda')
      .leftJoinAndSelect('puntajes.equipo', 'equipo');

    return await query.getManyAndCount();
  }

  async crear(puntajeDto: CrearPuntajeDto) {
    const { puntaje, rondaId, equipoId } = puntajeDto;

    const puntajes = new Puntaje();
    puntajes.puntaje = puntaje;
    puntajes.ronda = { id: rondaId } as any;
    puntajes.equipo = { id: equipoId } as any;

    return await this.dataSource.getRepository(Puntaje).save(puntajes);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(Puntaje).delete(id);
  }

  async softDelete(id: string) {
    return await this.dataSource
      .getRepository(Puntaje)
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .execute();
  }

  async restore(id: string) {
    return await this.dataSource
      .getRepository(Puntaje)
      .createQueryBuilder()
      .restore()
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Lista cada participante con su puntaje total y datos de ubicación.
   */
  async listarPorParticipante(): Promise<ScoreDto[]> {
    const raw = await this.dataSource
      .getRepository(Participante)
      .createQueryBuilder('p')
      .select('p.id', 'id')
      .addSelect('p.nombreCompleto', 'participante')
      .addSelect('SUM(score.puntaje)', 'puntaje')
      .addSelect('p.departamento', 'departamento')
      .addSelect('p.provincia', 'provincia')
      .addSelect('p.municipio', 'municipio')
      .innerJoin(EquipoParticipante, 'ep', 'ep.participante = p.id')
      .innerJoin(Puntaje, 'score', 'score.equipo = ep.equipo')
      .groupBy('p.id')
      .addGroupBy('p.nombreCompleto')
      .addGroupBy('p.departamento')
      .addGroupBy('p.provincia')
      .addGroupBy('p.municipio')
      .getRawMany<{
        id: string;
        participante: string;
        puntaje: string;
        departamento: string;
        provincia: string;
        municipio: string;
      }>();

    return raw.map((r) => ({
      id: r.id,
      participante: r.participante,
      puntaje: Number(r.puntaje),
      departamento: r.departamento,
      provincia: r.provincia,
      municipio: r.municipio,
    }));
  }
}
