import { MigrationInterface, QueryRunner } from 'typeorm';
import { Participante } from 'src/participantes/entity';

export class Participantes1751140816256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        nombreCompleto: 'Arturo Rodrigo Gutiérrez González',
        carnetIdentidad: '9578426',
        fechaNacimiento: '1995-05-15',
        departamento: 'La Paz',
        provincia: 'Murillo',
        municipio: 'La Paz',
        tutor: 1,
      },
      {
        nombreCompleto: 'María Fernanda Quispe Flores',
        carnetIdentidad: '7421983',
        fechaNacimiento: '2000-08-22',
        departamento: 'Cochabamba',
        provincia: 'Cercado',
        municipio: 'Cochabamba',
        tutor: 2,
      },
      {
        nombreCompleto: 'Carlos Eduardo Pérez Mamani',
        carnetIdentidad: '8624195',
        fechaNacimiento: '1998-03-10',
        departamento: 'Santa Cruz',
        provincia: 'Andrés Ibáñez',
        municipio: 'Santa Cruz de la Sierra',
        tutor: 3,
      },
      {
        nombreCompleto: 'Ana Sofía Rojas Chávez',
        carnetIdentidad: '6732148',
        fechaNacimiento: '2001-12-05',
        departamento: 'Oruro',
        provincia: 'Cercado',
        municipio: 'Oruro',
        tutor: 4,
      },
      {
        nombreCompleto: 'Javier Luis Choque Condori',
        carnetIdentidad: '9321457',
        fechaNacimiento: '1997-07-19',
        departamento: 'Potosí',
        provincia: 'Tomás Frías',
        municipio: 'Potosí',
        tutor: 5,
      },
      {
        nombreCompleto: 'Paola Alejandra Vargas Gómez',
        carnetIdentidad: '7912458',
        fechaNacimiento: '2002-04-11',
        departamento: 'Tarija',
        provincia: 'Cercado',
        municipio: 'Tarija',
        tutor: 1,
      },
      {
        nombreCompleto: 'Fernando David Zurita Mercado',
        carnetIdentidad: '8523146',
        fechaNacimiento: '1999-11-23',
        departamento: 'Chuquisaca',
        provincia: 'Oropeza',
        municipio: 'Sucre',
        tutor: 2,
      },
      {
        nombreCompleto: 'Lucía Raquel Salazar Aguilar',
        carnetIdentidad: '9132456',
        fechaNacimiento: '1996-02-28',
        departamento: 'La Paz',
        provincia: 'Murillo',
        municipio: 'El Alto',
        tutor: 3,
      },
      {
        nombreCompleto: 'José Miguel Aliaga Arce',
        carnetIdentidad: '8249136',
        fechaNacimiento: '2003-06-15',
        departamento: 'Beni',
        provincia: 'Cercado',
        municipio: 'Trinidad',
        tutor: 4,
      },
      {
        nombreCompleto: 'Natalia Beatriz Huanca Nina',
        carnetIdentidad: '7458219',
        fechaNacimiento: '2001-09-09',
        departamento: 'Pando',
        provincia: 'Nicolás Suárez',
        municipio: 'Cobija',
        tutor: 5,
      },
    ];
    for (const item of items) {
      const participante = new Participante({
        nombreCompleto: item.nombreCompleto,
        carnetIdentidad: item.carnetIdentidad,
        fechaNacimiento: item.fechaNacimiento,
        departamento: item.departamento,
        provincia: item.provincia,
        municipio: item.municipio,
        tutor: { id: item.tutor } as any,
      });
      await queryRunner.manager.save(participante);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
