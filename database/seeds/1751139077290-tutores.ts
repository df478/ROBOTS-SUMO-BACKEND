import { MigrationInterface, QueryRunner } from 'typeorm';
import { Tutor } from 'src/tutores/entity';

export class Tutores1751139077290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        nombreCompleto: 'Arturo Rodrigo Gutiérrez González',
        carnetIdentidad: '9578426',
      },
      {
        nombreCompleto: 'María Fernanda Quispe Flores',
        carnetIdentidad: '7421983',
      },
      {
        nombreCompleto: 'Carlos Eduardo Pérez Mamani',
        carnetIdentidad: '8624195',
      },
      {
        nombreCompleto: 'Ana Sofía Rojas Chávez',
        carnetIdentidad: '6732148',
      },
      {
        nombreCompleto: 'Javier Luis Choque Condori',
        carnetIdentidad: '9321457',
      },
      {
        nombreCompleto: 'Paola Alejandra Vargas Gómez',
        carnetIdentidad: '7912458',
      },
      {
        nombreCompleto: 'Fernando David Zurita Mercado',
        carnetIdentidad: '8523146',
      },
      {
        nombreCompleto: 'Lucía Raquel Salazar Aguilar',
        carnetIdentidad: '9132456',
      },
      {
        nombreCompleto: 'José Miguel Aliaga Arce',
        carnetIdentidad: '8249136',
      },
      {
        nombreCompleto: 'Natalia Beatriz Huanca Nina',
        carnetIdentidad: '7458219',
      },
    ];
    for (const item of items) {
      const tutor = new Tutor({
        nombreCompleto: item.nombreCompleto,
        carnetIdentidad: item.carnetIdentidad,
      });
      await queryRunner.manager.save(tutor);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
