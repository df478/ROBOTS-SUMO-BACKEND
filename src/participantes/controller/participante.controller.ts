import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParticipanteService } from '../service';
import { ActualizarParticipanteDto, CrearParticipanteDto } from '../dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Participante')
@Controller('participantes')
export class ParticipanteController {
  constructor(private participanteServicio: ParticipanteService) {}

  @ApiOperation({ summary: 'API para obtener el listado de participantes' })
  @Get()
  async listar() {
    const result = await this.participanteServicio.listar();
    return result;
  }

  @ApiOperation({ summary: 'API para obtener un participante por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del participante que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: { id: string }) {
    const { id: idParticipante } = params;
    const result = await this.participanteServicio.buscarPorId(idParticipante);
    return result;
  }

  @ApiOperation({ summary: 'API para crear un nuevo participante' })
  @ApiBody({
    type: CrearParticipanteDto,
    description:
      'Esta API permite crear un nuevo participante utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() participanteDto: CrearParticipanteDto) {
    const result = await this.participanteServicio.crear(participanteDto);
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un participante' })
  @ApiParam({
    name: 'id',
    description: 'ID del participante que deseas modificar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarParticipanteDto,
    description:
      'Esta API permite actualizar un participante existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: { id: string },
    @Body() participanteDto: ActualizarParticipanteDto,
  ) {
    const { id: idParticipante } = params;
    const result = await this.participanteServicio.actualizarDatos(
      idParticipante,
      participanteDto,
    );
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un participante por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del participante que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: { id: string }) {
    const { id: idParticipante } = params;
    const result = await this.participanteServicio.eliminar(idParticipante);
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un participante por su ID (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del participante que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: { id: string }) {
    const { id: idParticipante } = params;
    const result = await this.participanteServicio.softDelete(idParticipante);
    return result;
  }

  @ApiOperation({
    summary: 'API para restaurar un participante eliminado (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del participante que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: { id: string }) {
    const { id: idParticipante } = params;
    const result = await this.participanteServicio.restore(idParticipante);
    return result;
  }
}
