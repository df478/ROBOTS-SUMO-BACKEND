import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPistaDto {
  @ApiProperty({ example: 'Pista 1' })
  @IsOptional()
  nombrePista?: string;
}
