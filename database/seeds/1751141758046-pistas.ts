import { MigrationInterface, QueryRunner } from 'typeorm';
import { Pista } from 'src/pistas/entity';

export class Pistas1751141758046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      { nombrePista: 'Pista 1' },
      { nombrePista: 'Pista 2' },
      { nombrePista: 'Pista 3' },
      { nombrePista: 'Pista 4' },
      { nombrePista: 'Pista 5' },
    ];
    for (const item of items) {
      const pista = new Pista({
        nombrePista: item.nombrePista,
      });
      await queryRunner.manager.save(pista);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
