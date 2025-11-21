import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { EquipoParticipante } from 'src/equipos_participantes/entity/equipo-participante.entity';
import { Ronda } from 'src/rondas/entity/ronda.entity';

@Entity({ name: 'equipos' })
export class Equipo extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla equipos',
  })
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    comment: 'Nombre del equipo',
    name: 'nombre_equipo',
  })
  nombreEquipo: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => EquipoParticipante, (ep) => ep.equipo, { cascade: true })
  miembros: EquipoParticipante[];

  @OneToMany(() => Ronda, (ronda) => ronda.equipo_rojo)
  rondas_rojas: Ronda[];

  @OneToMany(() => Ronda, (ronda) => ronda.equipo_azul)
  rondas_azules: Ronda[];

  constructor(data?: Partial<Equipo>) {
    super();
    if (data) Object.assign(this, data);
  }
}
