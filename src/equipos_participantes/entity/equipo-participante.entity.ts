import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

import { Equipo } from 'src/equipos/entity/equipo.entity';
import { Participante } from 'src/participantes/entity/participante.entity';

@Entity({ name: 'equipos_participantes' })
export class EquipoParticipante extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla equipos_participantes',
  })
  id: string;

  @ManyToOne(() => Equipo, (equipo) => equipo.miembros, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  @Index({ unique: true })
  @ManyToOne(() => Participante, (participante) => participante.equipos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'participante_id' })
  participante: Participante;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(data?: Partial<EquipoParticipante>) {
    super();
    if (data) Object.assign(this, data);
  }
}
