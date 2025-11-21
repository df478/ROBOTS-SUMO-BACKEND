import { Module } from '@nestjs/common'
import { UsuarioController } from 'src/usuarios/controller/usuario.controller'
import { UsuarioService } from 'src/usuarios/service/usuario.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioRepository } from 'src/usuarios/repository/usuario.repository'
import { Usuario } from 'src/usuarios/entity/usuario.entity'

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  imports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuarioModule {}
