import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ActualizarUsuarioDto, CrearUsuarioDto } from '../dto';
import { Usuario } from '../entity';

@Injectable()
export class UsuarioRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuarios')
      .where({ id: id })
      .getOne();
  }

  async buscarPorIdConEliminados(id: string) {
      return await this.dataSource
        .getRepository(Usuario)
        .createQueryBuilder('usuarios')
        .where({ id: id })
        .withDeleted()
        .getOne();
    }

  async actualizar(id: string, usuarioDto: ActualizarUsuarioDto) {
    const datosActualizar = new Usuario({
      ...usuarioDto,
    });
    return await this.dataSource
      .getRepository(Usuario)
      .update(id, datosActualizar);
  }

  async listar() {
    const query = this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuarios')
      .select([
        'usuarios.id',
        'usuarios.username',
        'usuarios.email',
        'usuarios.rol',
      ]);
    return await query.getManyAndCount();
  }

  async crear(usuarioDto: CrearUsuarioDto) {
    const { username, email, password, rol } = usuarioDto;

    const usuario = new Usuario();
    usuario.username = username;
    usuario.email = email;
    usuario.password = password;
    usuario.rol = rol;

    return await this.dataSource.getRepository(Usuario).save(usuario);
  }

  async eliminar(id: string) {
    return await this.dataSource.getRepository(Usuario).delete(id);
  }

  async softDelete(id: string) {
      return await this.dataSource
        .getRepository(Usuario)
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();
    }
  
    async restore(id: string) {
      return await this.dataSource
        .getRepository(Usuario)
        .createQueryBuilder()
        .restore()
        .where('id = :id', { id })
        .execute();
    }
}
