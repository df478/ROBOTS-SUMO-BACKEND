import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PistaService } from '../service';
import { ActualizarPistaDto, CrearPistaDto } from '../dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Pista')
@Controller('pistas')
export class PistaController {
  constructor(private pistaServicio: PistaService) {}

  @ApiOperation({ summary: 'API para obtener el listado de pistas' })
  @Get()
  async listar() {
    const result = await this.pistaServicio.listar();
    return result;
  }

  @ApiOperation({ summary: 'API para obtener un pista por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del pista que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: { id: string }) {
    const { id: idPista } = params;
    const result = await this.pistaServicio.buscarPorId(idPista);
    return result;
  }

  @ApiOperation({ summary: 'API para crear un nuevo pista' })
  @ApiBody({
    type: CrearPistaDto,
    description:
      'Esta API permite crear un nuevo pista utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() pistaDto: CrearPistaDto) {
    const result = await this.pistaServicio.crear(pistaDto);
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un pista' })
  @ApiParam({
    name: 'id',
    description: 'ID del pista que deseas modificar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarPistaDto,
    description:
      'Esta API permite actualizar un pista existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: { id: string },
    @Body() pistaDto: ActualizarPistaDto,
  ) {
    const { id: idPista } = params;
    const result = await this.pistaServicio.actualizarDatos(idPista, pistaDto);
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un pista por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del pista que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: { id: string }) {
    const { id: idPista } = params;
    const result = await this.pistaServicio.eliminar(idPista);
    return result;
  }

  @ApiOperation({
    summary: 'API para eliminar un pista por su ID (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del pista que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: { id: string }) {
    const { id: idPista } = params;
    const result = await this.pistaServicio.softDelete(idPista);
    return result;
  }

  @ApiOperation({
    summary: 'API para restaurar un pista eliminado (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del pista que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: { id: string }) {
    const { id: idPista } = params;
    const result = await this.pistaServicio.restore(idPista);
    return result;
  }
}
