import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarTutorDto {
  @ApiProperty({ example: 'Arturo Rodrigo Perez Chavez' })
  @IsOptional()
  nombreCompleto?: string;

  @ApiProperty({ example: '8526947' })
  @IsOptional()
  carnetIdentidad?: string;
}
