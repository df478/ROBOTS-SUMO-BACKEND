import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarParticipanteDto, CrearParticipanteDto } from '../dto';
import { Participante } from '../entity';

@Injectable()
export class ParticipanteRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Participante)
      .createQueryBuilder('participantes')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
      return await this.dataSource
        .getRepository(Participante)
        .createQueryBuilder('participantes')
        .where({ id: id })
        .withDeleted()
        .getOne();
    }

  async actualizar(id: string, participanteDto: ActualizarParticipanteDto) {
    const datosActualizar = new Participante({
      ...participanteDto,
    });
    return await this.dataSource
      .getRepository(Participante)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(Participante)
      .createQueryBuilder('participantes')
      .select([
        'participantes.id',
        'participantes.nombreCompleto',
        'participantes.carnetIdentidad',
        'participantes.fechaNacimiento',
        'participantes.departamento',
        'participantes.provincia',
        'participantes.municipio',
      ]);

    return await query.getManyAndCount();
  }

  async crear(participanteDto: CrearParticipanteDto) {
    const {
      nombreCompleto,
      carnetIdentidad,
      fechaNacimiento,
      departamento,
      provincia,
      municipio,
    } = participanteDto;

    const participante = new Participante();
    participante.nombreCompleto = nombreCompleto;
    participante.carnetIdentidad = carnetIdentidad;
    participante.fechaNacimiento = fechaNacimiento;
    participante.departamento = departamento;
    participante.provincia = provincia;
    participante.municipio = municipio || "";

    return await this.dataSource.getRepository(Participante).save(participante);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(Participante).delete(id);
  }

  async softDelete(id: string) {
      return await this.dataSource
        .getRepository(Participante)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
    }
  
    async restore(id: string) {
      return await this.dataSource
        .getRepository(Participante)
        .createQueryBuilder()
        .restore()
        .where('id = :id', { id })
        .execute();
    }
}
