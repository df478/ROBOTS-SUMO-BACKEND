import { MigrationInterface, QueryRunner } from 'typeorm';
import { Equipo } from 'src/equipos/entity';

export class Equipos1751141580547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      { nombreEquipo: 'Team Alpha' },
      { nombreEquipo: 'Team Bravo' },
      { nombreEquipo: 'Team Charlie' },
      { nombreEquipo: 'Team Delta' },
      { nombreEquipo: 'Team Echo' },
      { nombreEquipo: 'Team Foxtrot' },
      { nombreEquipo: 'Team Golf' },
      { nombreEquipo: 'Team Hotel' },
      { nombreEquipo: 'Team India' },
      { nombreEquipo: 'Team Juliet' },
    ];
    for (const item of items) {
      const equipo = new Equipo({
        nombreEquipo: item.nombreEquipo,
      });
      await queryRunner.manager.save(equipo);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
