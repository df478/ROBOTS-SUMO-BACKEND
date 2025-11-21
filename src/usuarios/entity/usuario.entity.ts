import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  DeleteDateColumn,
} from 'typeorm';
import { Role } from '../constant/role.enum';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'usuarios' })
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla usuarios',
  })
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
    unique: true,
    comment: 'nombre de usuario',
    name: 'username',
  })
  username: string;

  @Column({
    length: 100,
    type: 'varchar',
    unique: true,
    comment: 'correo electronico',
    name: 'email',
  })
  email: string;

  @Column({
    length: 200,
    type: 'varchar',
    comment: 'contraseña del usuario',
    name: 'password',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    comment: 'rol del usuario',
    name: 'rol',
  })
  rol: Role;

  @DeleteDateColumn()
  deletedAt?: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  constructor(data?: Partial<Usuario>) {
    super();
    if (data) Object.assign(this, data);
  }
}
