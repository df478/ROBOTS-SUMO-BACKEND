import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EquipoService } from '../service';
import { ActualizarEquipoDto, CrearEquipoDto } from '../dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { EquipoDetailDto } from '../dto/equipo-detail.dto';

@ApiTags('Equipo')
@Controller('equipos')
export class EquipoController {
  constructor(private equipoServicio: EquipoService) {}

  @ApiOperation({ summary: 'API para obtener el listado de equipos' })
  @Get()
  async listar() {
    const result = await this.equipoServicio.listar();
    return result;
  }

  @ApiOperation({
    summary: 'Obtener detalle de equipos con participantes y tutores',
  })
  @ApiOkResponse({ type: [EquipoDetailDto] })
  @Get('details')
  listarDetalleEquipos(): Promise<EquipoDetailDto[]> {
    return this.equipoServicio.listarDetallesEquipos();
  }

  @ApiOperation({ summary: 'API para obtener un equipo por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: { id: string }) {
    const { id: idEquipo } = params;
    const result = await this.equipoServicio.buscarPorId(idEquipo);
    return result;
  }

  @ApiOperation({ summary: 'API para crear un nuevo equipo' })
  @ApiBody({
    type: CrearEquipoDto,
    description:
      'Esta API permite crear un nuevo equipo utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() equipoDto: CrearEquipoDto) {
    const result = await this.equipoServicio.crear(equipoDto);
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un equipo' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo que deseas modificar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarEquipoDto,
    description:
      'Esta API permite actualizar un equipo existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: { id: string },
    @Body() equipoDto: ActualizarEquipoDto,
  ) {
    const { id: idEquipo } = params;
    const result = await this.equipoServicio.actualizarDatos(
      idEquipo,
      equipoDto,
    );
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un equipo por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: { id: string }) {
    const { id: idEquipo } = params;
    const result = await this.equipoServicio.eliminar(idEquipo);
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un equipo por su ID (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: { id: string }) {
    const { id: idEquipo } = params;
    const result = await this.equipoServicio.softDelete(idEquipo);
    return result;
  }

  @ApiOperation({
    summary: 'API para restaurar un equipo eliminado (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del equipo que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: { id: string }) {
    const { id: idEquipo } = params;
    const result = await this.equipoServicio.restore(idEquipo);
    return result;
  }
}
