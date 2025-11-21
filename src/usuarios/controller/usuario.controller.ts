import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from '../service';
import { ActualizarUsuarioDto, CrearUsuarioDto } from '../dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioServicio: UsuarioService) {}

  @ApiOperation({ summary: 'API para obtener el listado de usuarios' })
  @Get()
  async listar() {
    const result = await this.usuarioServicio.listar();
    return result;
  }

  @ApiOperation({ summary: 'API para obtener un usuario por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: { id: string }) {
    const { id: idUsuario } = params;
    const result = await this.usuarioServicio.buscarPorId(idUsuario);
    return result;
  }

  @ApiOperation({ summary: 'API para crear un nuevo usuario' })
  @ApiBody({
    type: CrearUsuarioDto,
    description:
      'Esta API permite crear un nuevo usuario utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() usuarioDto: CrearUsuarioDto) {
    const result = await this.usuarioServicio.crear(usuarioDto);
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un usuario' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas actualizar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarUsuarioDto,
    description:
      'Esta API permite actualizar un usuario existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: { id: string },
    @Body() usuarioDto: ActualizarUsuarioDto,
  ) {
    const { id: idUsuario } = params;
    const result = await this.usuarioServicio.actualizarDatos(
      idUsuario,
      usuarioDto,
    );
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un usuario por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: { id: string }) {
    const { id: idUsuario } = params;
    const result = await this.usuarioServicio.eliminar(idUsuario);
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un usuario por su ID (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: { id: string }) {
    const { id: idUsuario } = params;
    const result = await this.usuarioServicio.softDelete(idUsuario);
    return result;
  }

  @ApiOperation({
    summary: 'API para restaurar un usuario eliminado (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: { id: string }) {
    const { id: idUsuario } = params;
    const result = await this.usuarioServicio.restore(idUsuario);
    return result;
  }
}
