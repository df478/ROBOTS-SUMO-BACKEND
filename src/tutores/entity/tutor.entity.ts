import { BaseEntity, Entity, PrimaryGeneratedColumn, Column , OneToMany, DeleteDateColumn} from 'typeorm';

import { Participante } from 'src/participantes/entity/participante.entity';

@Entity({ name: 'tutores' })
export class Tutor extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla tutores',
  })
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    unique: true,
    comment: 'Nombres y apellidos del tutor',
    name: 'nombre_completo',
  })
  nombreCompleto: string;

  @Column({
    length: 50,
    type: 'varchar',
    unique: true,
    comment: 'Carnet de identidad del tutor',
    name: 'carnet_identidad',
  })
  carnetIdentidad: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Participante, participante => participante.tutor)
  participantes: Participante[];

  constructor(data?: Partial<Tutor>) {
    super();
    if (data) Object.assign(this, data);
  }
}
