import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UsuarioRepository } from '../repository'
import { CrearUsuarioDto } from '../dto'
import { ActualizarUsuarioDto } from '../dto'

@Injectable()
export class UsuarioService{
  constructor(
    @Inject(UsuarioRepository)
    private usuarioRepositorio: UsuarioRepository
  ) {}

  async crear(usuarioDto: CrearUsuarioDto) {
    return await this.usuarioRepositorio.crear(usuarioDto)
  }

  async listar() {
    return await this.usuarioRepositorio.listar()
  }

  async buscarPorId(id: string) {
    const usuario = await this.usuarioRepositorio.buscarPorId(id)
    if (!usuario) {
      throw new NotFoundException()
    }
    return usuario
  }

  async actualizarDatos(
    id: string,
    usuarioDto: ActualizarUsuarioDto,
  ) {
    const usuario = await this.usuarioRepositorio.buscarPorId(id)
    if (!usuario) {
      throw new NotFoundException()
    }
    await this.usuarioRepositorio.actualizar(
      id,
      usuarioDto,
    )
    return { id }
  }
  
  async eliminar(id: string) {
    const usuario = await this.usuarioRepositorio.buscarPorId(id)
    if (!usuario) {
      throw new NotFoundException()
    }
    await this.usuarioRepositorio.eliminar(id)
    return { id }
  }

  async softDelete(id: string) {
    const usuario = await this.usuarioRepositorio.buscarPorId(id)
    if (!usuario) {
      throw new NotFoundException()
    }
    await this.usuarioRepositorio.softDelete(id)
    return { id }
  }

  async restore(id: string) {
    const usuario = await this.usuarioRepositorio.buscarPorIdConEliminados(id)
    if (!usuario) {
      throw new NotFoundException()
    }
    await this.usuarioRepositorio.restore(id)
    return { id }
  }
}
