import { IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarEquipoParticipanteDto {
  @ApiProperty({
    description: 'ID del equipo (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  equipo?: number;

  @ApiProperty({
    description: 'ID del participante (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  participante?: number;
}
