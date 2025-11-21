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

import { Tutor } from 'src/tutores/entity/tutor.entity';
import { EquipoParticipante } from 'src/equipos_participantes/entity/equipo-participante.entity';

@Entity({ name: 'participantes' })
export class Participante extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla participantes',
  })
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    unique: true,
    comment: 'Nombres y apellidos del participante',
    name: 'nombre_completo',
  })
  nombreCompleto: string;

  @Column({
    length: 50,
    type: 'varchar',
    unique: true,
    comment: 'Carnet de identidad del participante',
    name: 'carnet_identidad',
  })
  carnetIdentidad: string;

  @Column({ type: 'date', name: 'fecha_nacimiento' })
  fechaNacimiento: string;

  @Column({ length: 50 })
  departamento: string;

  @Column({ length: 50 })
  provincia: string;

  @Column({ length: 50 })
  municipio: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Tutor, (tutor) => tutor.participantes, { nullable: true })
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutor;

  @OneToMany(() => EquipoParticipante, (ep) => ep.participante)
  equipos: EquipoParticipante[];

  constructor(data?: Partial<Participante>) {
    super();
    if (data) Object.assign(this, data);
  }
}
