import { MigrationInterface, QueryRunner } from 'typeorm';
import { Puntaje } from 'src/puntajes/entity';

export class Puntajes1751141880566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      { puntaje: 45, rondaId: 1, equipoId: 1 },
      { puntaje: 30, rondaId: 1, equipoId: 2 },
      { puntaje: 50, rondaId: 2, equipoId: 3 },
      { puntaje: 20, rondaId: 2, equipoId: 4 },
      { puntaje: 40, rondaId: 3, equipoId: 5 },
      { puntaje: 25, rondaId: 3, equipoId: 6 },
      { puntaje: 35, rondaId: 4, equipoId: 7 },
      { puntaje: 15, rondaId: 4, equipoId: 8 },
      { puntaje: 50, rondaId: 5, equipoId: 9 },
      { puntaje: 10, rondaId: 5, equipoId: 10 },
    ];
    for (const item of items) {
      const puntaje = new Puntaje({
        puntaje: item.puntaje,
        ronda: { id: item.rondaId } as any,
        equipo: { id: item.equipoId } as any,
      });
      await queryRunner.manager.save(puntaje);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
