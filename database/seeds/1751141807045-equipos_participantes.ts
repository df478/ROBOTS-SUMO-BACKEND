import { MigrationInterface, QueryRunner } from 'typeorm';
import { EquipoParticipante } from 'src/equipos_participantes/entity';

export class EquiposParticipantes1751141807045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      { equipoId: 1, participanteId: 1 },
      { equipoId: 1, participanteId: 2 },
      { equipoId: 2, participanteId: 3 },
      { equipoId: 2, participanteId: 4 },
      { equipoId: 3, participanteId: 5 },
      { equipoId: 3, participanteId: 6 },
      { equipoId: 4, participanteId: 7 },
      { equipoId: 4, participanteId: 8 },
      { equipoId: 5, participanteId: 9 },
      { equipoId: 5, participanteId: 10 },
    ];
    for (const item of items) {
      const equipoParticipante = new EquipoParticipante({
        equipo: { id: item.equipoId } as any,
        participante: { id: item.participanteId } as any,
      });
      await queryRunner.manager.save(equipoParticipante);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
