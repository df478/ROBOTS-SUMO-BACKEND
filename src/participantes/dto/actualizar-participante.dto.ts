import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarParticipanteDto {
  @ApiProperty({ example: 'Arturo Rodrigo Perez Chavez' })
  @IsOptional()
  nombreCompleto?: string;

  @ApiProperty({ example: '8526947' })
  @IsOptional()
  carnetIdentidad?: string;

  @ApiProperty({ example: '2003-05-23' })
  @IsOptional()
  fechaNacimiento?: string;

  @ApiProperty({ example: 'La Paz' })
  @IsOptional()
  departamento?: string;

  @ApiProperty({ example: 'Murillo' })
  @IsOptional()
  provincia?: string;

  @ApiProperty({ example: 'Achocalla' })
  @IsOptional()
  municipio?: string;
}
