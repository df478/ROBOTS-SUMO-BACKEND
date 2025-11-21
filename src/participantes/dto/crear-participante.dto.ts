import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearParticipanteDto {
  @ApiProperty({ example: 'Arturo Rodrigo Perez Chavez' })
  @IsNotEmpty()
  nombreCompleto: string;

  @ApiProperty({ example: '8526947' })
  @IsNotEmpty()
  carnetIdentidad: string;

  @ApiProperty({ example: '2003-05-23' })
  @IsNotEmpty()
  fechaNacimiento: string;

  @ApiProperty({ example: 'La Paz' })
  @IsNotEmpty()
  departamento: string;

  @ApiProperty({ example: 'Murillo' })
  @IsNotEmpty()
  provincia: string;

  @ApiProperty({ example: 'Achocalla' })
  @IsOptional()
  municipio?: string;

}

export class RespuestaCrearParticipanteDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
