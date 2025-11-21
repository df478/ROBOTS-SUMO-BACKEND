import { IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarRondaDto {
  @ApiProperty({ example: 'pendiente | en_curso | finalizada' })
  @IsOptional()
  estado?: 'pendiente' | 'en_curso' | 'finalizada';

  @ApiProperty({
    description: 'ID de la pista (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  pista?: number;

  @ApiProperty({
    description: 'ID del equipo rojo (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  equipo_rojo?: number;

  @ApiProperty({
    description: 'ID del equipo azul (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  equipo_azul?: number;
}
