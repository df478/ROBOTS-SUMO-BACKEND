import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarTutorDto, CrearTutorDto } from '../dto';
import { Tutor } from '../entity';

@Injectable()
export class TutorRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Tutor)
      .createQueryBuilder('tutores')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
    return await this.dataSource
      .getRepository(Tutor)
      .createQueryBuilder('tutores')
      .where({ id: id })
      .withDeleted()
      .getOne();
  }

  async actualizar(id: string, tutorDto: ActualizarTutorDto) {
    const datosActualizar = new Tutor({
      ...tutorDto,
    });
    return await this.dataSource
      .getRepository(Tutor)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(Tutor)
      .createQueryBuilder('tutores')
      .select([
        'tutores.id',
        'tutores.nombreCompleto',
        'tutores.carnetIdentidad',
      ]);
    return await query.getManyAndCount();
  }

  async crear(tutorDto: CrearTutorDto) {
    const { nombreCompleto, carnetIdentidad } = tutorDto;

    const tutor = new Tutor();
    tutor.nombreCompleto = nombreCompleto;
    tutor.carnetIdentidad = carnetIdentidad;

    return await this.dataSource.getRepository(Tutor).save(tutor);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(Tutor).delete(id);
  }

  async softDelete(id: string) {
    return await this.dataSource
      .getRepository(Tutor)
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .execute();
  }

  async restore(id: string) {
    return await this.dataSource
      .getRepository(Tutor)
      .createQueryBuilder()
      .restore()
      .where('id = :id', { id })
      .execute();
  }
}
