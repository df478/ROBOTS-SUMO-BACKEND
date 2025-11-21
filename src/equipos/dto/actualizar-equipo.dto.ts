import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarEquipoDto {
  @ApiProperty({ example: 'Equipo 1' })
  @IsOptional()
  nombreEquipo?: string;

}
