import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EquipoParticipanteService } from '../service';
import {
  ActualizarEquipoParticipanteDto,
  CrearEquipoParticipanteDto,
} from '../dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('EquipoParticipante')
@Controller('equiposParticipantes')
export class EquipoParticipanteController {
  constructor(private equipoParticipanteServicio: EquipoParticipanteService) {}

  @ApiOperation({
    summary: 'API para obtener el listado de equiposParticipantes',
  })
  @Get()
  async listar() {
    const result = await this.equipoParticipanteServicio.listar();
    return result;
  }

  @ApiOperation({ summary: 'API para obtener un equipoParticipante por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipoParticipante que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: { id: string }) {
    const { id: idEquipoParticipante } = params;
    const result =
      await this.equipoParticipanteServicio.buscarPorId(idEquipoParticipante);
    return result;
  }

  @ApiOperation({ summary: 'API para crear un nuevo equipoParticipante' })
  @ApiBody({
    type: CrearEquipoParticipanteDto,
    description:
      'Esta API permite crear un nuevo equipoParticipante utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() equipoParticipanteDto: CrearEquipoParticipanteDto) {
    const result = await this.equipoParticipanteServicio.crear(
      equipoParticipanteDto,
    );
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un equipoParticipante' })
  @ApiParam({
    name: 'id',
    description: 'ID del equipoParticipante que deseas modificar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarEquipoParticipanteDto,
    description:
      'Esta API permite actualizar un equipoParticipante existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: { id: string },
    @Body() equipoParticipanteDto: ActualizarEquipoParticipanteDto,
  ) {
    const { id: idEquipoParticipante } = params;
    const result = await this.equipoParticipanteServicio.actualizarDatos(
      idEquipoParticipante,
      equipoParticipanteDto,
    );
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un equipoParticipante por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del equipoParticipante que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: { id: string }) {
    const { id: idEquipoParticipante } = params;
    const result =
      await this.equipoParticipanteServicio.eliminar(idEquipoParticipante);
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un equipoParticipante por su ID (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del equipoParticipante que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: { id: string }) {
    const { id: idEquipoParticipante } = params;
    const result = await this.equipoParticipanteServicio.softDelete(idEquipoParticipante);
    return result;
  }

  @ApiOperation({
    summary: 'API para restaurar un equipoParticipante eliminado (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del equipoParticipante que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: { id: string }) {
    const { id: idEquipoParticipante } = params;
    const result = await this.equipoParticipanteServicio.restore(idEquipoParticipante);
    return result;
  }
}
