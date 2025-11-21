import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { TutorService } from '../service';
import { ActualizarTutorDto, CrearTutorDto } from '../dto';
import { ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Tutor')
@Controller('tutores')
export class TutorController {
  constructor(private tutorServicio: TutorService) {}

  @ApiOperation({ summary: 'API para obtener el listado de tutores' })
  @Get()
  async listar() {
    const result = await this.tutorServicio.listar();
    return result;
  }

  @ApiOperation({ summary: 'API para obtener un tutor por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del tutor que deseas obtener',
    example: '1',
    type: 'string',
  })
  @Get(':id')
  async obtenerPorId(@Param() params: {id: string}) {
    const { id: idTutor } = params;
    const result = await this.tutorServicio.buscarPorId(idTutor);
    return result;
  }


  @ApiOperation({ summary: 'API para crear un nuevo tutor' })
  @ApiBody({
    type: CrearTutorDto,
    description:
      'Esta API permite crear un nuevo tutor utilizando los datos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Post()
  async crear(@Body() tutorDto: CrearTutorDto) {
    const result = await this.tutorServicio.crear(tutorDto);
    return result;
  }

  @ApiOperation({ summary: 'API para actualizar un tutor' })
  @ApiParam({
    name: 'id',
    description: 'ID del tutor que deseas actualizar',
    example: '1',
    type: 'string',
  })
  @ApiBody({
    type: ActualizarTutorDto,
    description:
      'Esta API permite actualizar un tutor existente utilizando los atributos proporcionados en el cuerpo de la solicitud.',
    required: true,
  })
  @Patch(':id')
  async actualizar(
    @Param() params: {id: string},
    @Body() tutorDto: ActualizarTutorDto,
  ) {
    const { id: idTutor } = params;
    const result = await this.tutorServicio.actualizarDatos(
      idTutor,
      tutorDto,
    );
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un tutor por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del tutor que deseas eliminar',
    example: '1',
    type: 'string',
  })
  @Delete('eliminar/:id')
  async eliminar(@Param() params: {id: string}) {
    const { id: idTutor } = params;
    const result = await this.tutorServicio.eliminar(idTutor);
    return result;
  }

  @ApiOperation({ summary: 'API para eliminar un tutor por su ID (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'ID del tutor que deseas eliminar (soft delete)',
    example: '1',
    type: 'string',
  })
  @Patch('soft-delete/:id')
  async softDelete(@Param() params: {id: string}) {
    const { id: idTutor } = params;
    const result = await this.tutorServicio.softDelete(idTutor);
    return result;
  }

  @ApiOperation({ summary: 'API para restaurar un tutor eliminado (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'ID del tutor que deseas restaurar',
    example: '1',
    type: 'string',
  })
  @Patch('restore/:id')
  async restore(@Param() params: {id: string}) {
    const { id: idTutor } = params;
    const result = await this.tutorServicio.restore(idTutor);
    return result;
  }
}
