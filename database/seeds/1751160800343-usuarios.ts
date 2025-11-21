import { MigrationInterface, QueryRunner } from 'typeorm';
import { Usuario } from 'src/usuarios/entity';
import { Role } from 'src/usuarios/constant/role.enum';

export class Usuarios1751160800343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      { username: 'admin',
        email: 'admin@gmail.com',
        password: 'P@ssw0rd',
        rol: Role.ADMIN,
       },
      { username: 'user',
        email: 'user@gmail.com',
        password: 'P@ssw0rd',
       },
    ];
    for (const item of items) {
      const usuario = new Usuario({
        username: item.username,
        email: item.email,
        password: item.password,
        rol: item.rol || Role.USER,
      });
      await queryRunner.manager.save(usuario);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
