import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Ronda } from 'src/rondas/entity/ronda.entity';
import { Equipo } from 'src/equipos/entity/equipo.entity';

@Entity({ name: 'puntajes' })
export class Puntaje extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla puntajes',
  })
  id: string;

  @Column({
    type: 'bigint',
    comment: 'Puntaje de 0 a 50',
  })
  puntaje: number;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Ronda, (ronda) => ronda.puntajes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ronda_id' })
  ronda: Ronda;

  @Index({ unique: true })
  @ManyToOne(() => Equipo, (equipo) => equipo, { nullable: false })
  @JoinColumn({ name: 'equipo_id' })
  equipo: Equipo;

  constructor(data?: Partial<Puntaje>) {
    super();
    if (data) Object.assign(this, data);
  }
}
