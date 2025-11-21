import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Pista } from 'src/pistas/entity/pista.entity';
import { Equipo } from 'src/equipos/entity/equipo.entity';
import { Puntaje } from 'src/puntajes/entity/puntaje.entity';

@Entity({ name: 'rondas' })
export class Ronda extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla rondas',
  })
  id: string;

  @ManyToOne(() => Pista, (pista) => pista.rondas, { nullable: false })
  @JoinColumn({ name: 'pista_id' })
  pista: Pista;

  @ManyToOne(() => Equipo, (equipo) => equipo.rondas_rojas, { nullable: false })
  @JoinColumn({ name: 'equipo_rojo_id' })
  equipo_rojo: Equipo;

  @ManyToOne(() => Equipo, (equipo) => equipo.rondas_azules, {
    nullable: false,
  })
  @JoinColumn({ name: 'equipo_azul_id' })
  equipo_azul: Equipo;

  @Column({
    length: 20,
    type: 'varchar',
    comment: 'Estado de la ronda: pendiente, en_curso o finalizada',
  })
  estado: 'pendiente' | 'en_curso' | 'finalizada';

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Puntaje, (puntaje) => puntaje.ronda, { cascade: true })
  puntajes: Puntaje[];

  constructor(data?: Partial<Ronda>) {
    super();
    if (data) Object.assign(this, data);
  }
}
