import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PuntajeService } from '../service';
import { ActualizarPuntajeDto, CrearPuntajeDto } from '../dto';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ScoreDto } from '../dto/score.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Puntaje')
@Controller('puntajes')
export class PuntajeController {
  constructor(private puntajeServicio: PuntajeService) {}

  @ApiOperation({ summary: 'API para obtener el listado de puntajes' })
  @Get()
  async listar() {
    const result = await this.puntajeServicio.listar();
    return result;
  }

  @ApiOperation({
    summary: 'API para obtener el listado de puntajes y participantes',
  })
  @ApiOkResponse({
    type: [ScoreDto],
    description: 'Lista de puntajes por participante',
  })
  @Get('details')
  @Public()
  async listarPuntajesParticipantes(): Promise<ScoreDto[]> {
    return this.puntajeServicio.listarPuntajesParticipantes();
  }

  @ApiOperation({ summary: 'API para obtener un puntaje por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del puntaje que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: { id: string }) {
    const { id: idPuntaje } = params;
    const result = await this.puntajeServicio.buscarPorId(idPuntaje);
    return result;
  }

  @ApiOperation({ summary: 'API para crear un nuevo puntaje' })
  @ApiBody({
    type: CrearPuntajeDto,
    description:
      'Esta API permite crear un nuevo puntaje utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() puntajeDto: CrearPuntajeDto) {
    const result = await this.puntajeServicio.crear(puntajeDto);
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un puntaje' })
  @ApiParam({
    name: 'id',
    description: 'ID del puntaje que deseas modificar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarPuntajeDto,
    description:
      'Esta API permite actualizar un puntaje existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: { id: string },
    @Body() puntajeDto: ActualizarPuntajeDto,
  ) {
    const { id: idPuntaje } = params;
    const result = await this.puntajeServicio.actualizarDatos(
      idPuntaje,
      puntajeDto,
    );
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un puntaje por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del puntaje que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: { id: string }) {
    const { id: idPuntaje } = params;
    const result = await this.puntajeServicio.eliminar(idPuntaje);
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un puntaje por su ID (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del puntaje que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: { id: string }) {
    const { id: idPuntaje } = params;
    const result = await this.puntajeServicio.softDelete(idPuntaje);
    return result;
  }

  @ApiOperation({
    summary: 'API para restaurar un puntaje eliminado (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del puntaje que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: { id: string }) {
    const { id: idPuntaje } = params;
    const result = await this.puntajeServicio.restore(idPuntaje);
    return result;
  }
}
