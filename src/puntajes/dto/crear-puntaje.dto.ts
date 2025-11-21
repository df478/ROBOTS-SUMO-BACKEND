import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearPuntajeDto {
  @ApiProperty({ example: '50' })
  @IsNotEmpty()
  puntaje: number;

  @ApiProperty({
    description: 'ID de la ronda (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsNotEmpty()
  @IsInt()
  rondaId: number;

  @ApiProperty({
    description: 'ID del equipo (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsNotEmpty()
  @IsInt()
  equipoId: number;
}

export class RespuestaCrearPuntajeDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
