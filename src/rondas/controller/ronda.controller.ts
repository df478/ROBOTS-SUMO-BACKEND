import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RondaService } from '../service';
import { ActualizarRondaDto, CrearRondaDto } from '../dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Ronda')
@Controller('rondas')
export class RondaController {
  constructor(private rondaServicio: RondaService) {}

  @ApiOperation({ summary: 'API para obtener el listado de rondas' })
  @Get()
  async listar() {
    const result = await this.rondaServicio.listar();
    return result;
  }

  @ApiOperation({ summary: 'API para obtener un ronda por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del ronda que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: { id: string }) {
    const { id: idRonda } = params;
    const result = await this.rondaServicio.buscarPorId(idRonda);
    return result;
  }

  @ApiOperation({ summary: 'API para crear un nuevo ronda' })
  @ApiBody({
    type: CrearRondaDto,
    description:
      'Esta API permite crear un nuevo ronda utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() rondaDto: CrearRondaDto) {
    const result = await this.rondaServicio.crear(rondaDto);
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un ronda' })
  @ApiParam({
    name: 'id',
    description: 'ID del ronda que deseas modificar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarRondaDto,
    description:
      'Esta API permite actualizar un ronda existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: { id: string },
    @Body() rondaDto: ActualizarRondaDto,
  ) {
    const { id: idRonda } = params;
    const result = await this.rondaServicio.actualizarDatos(idRonda, rondaDto);
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un ronda por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del ronda que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: { id: string }) {
    const { id: idRonda } = params;
    const result = await this.rondaServicio.eliminar(idRonda);
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un ronda por su ID (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del ronda que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: { id: string }) {
    const { id: idRonda } = params;
    const result = await this.rondaServicio.softDelete(idRonda);
    return result;
  }

  @ApiOperation({
    summary: 'API para restaurar un ronda eliminado (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del ronda que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: { id: string }) {
    const { id: idRonda } = params;
    const result = await this.rondaServicio.restore(idRonda);
    return result;
  }
}
