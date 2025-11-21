import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { Ronda } from 'src/rondas/entity/ronda.entity';

@Entity({ name: 'pistas' })
export class Pista extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla pistas',
  })
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    unique: true,
    comment: 'Nombre de la pista',
    name: 'nombre_pista',
  })
  nombrePista: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Ronda, (ronda) => ronda.pista)
  rondas: Ronda[];

  constructor(data?: Partial<Pista>) {
    super();
    if (data) Object.assign(this, data);
  }
}
