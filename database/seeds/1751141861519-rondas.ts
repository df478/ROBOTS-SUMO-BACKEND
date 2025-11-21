import { MigrationInterface, QueryRunner } from 'typeorm';
import { Ronda } from 'src/rondas/entity';

export class Rondas1751141861519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    type EstadoType = 'pendiente' | 'en_curso' | 'finalizada';
    const items: {
      estado: EstadoType;
      pistaId: number;
      equipoRojoId: number;
      equipoAzulId: number;
    }[] = [
      {
        estado: 'pendiente',
        pistaId: 1,
        equipoRojoId: 1,
        equipoAzulId: 2,
      },
      {
        estado: 'pendiente',
        pistaId: 2,
        equipoRojoId: 3,
        equipoAzulId: 4,
      },
      {
        estado: 'pendiente',
        pistaId: 3,
        equipoRojoId: 5,
        equipoAzulId: 6,
      },
      {
        estado: 'pendiente',
        pistaId: 4,
        equipoRojoId: 7,
        equipoAzulId: 8,
      },
      {
        estado: 'pendiente',
        pistaId: 5,
        equipoRojoId: 9,
        equipoAzulId: 10,
      },
    ];
    for (const item of items) {
      const ronda = new Ronda({
        estado: item.estado,
        pista: { id: item.pistaId } as any,
        equipo_rojo: { id: item.equipoRojoId } as any,
        equipo_azul: { id: item.equipoAzulId } as any,
      });
      await queryRunner.manager.save(ronda);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
