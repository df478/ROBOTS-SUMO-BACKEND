import { IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPuntajeDto {
  @ApiProperty({ example: '50' })
  @IsOptional()
  puntaje?: number;

  @ApiProperty({
    description: 'ID de la ronda (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  ronda?: number;

  @ApiProperty({
    description: 'ID del equipo (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  equipo?: number;
}
