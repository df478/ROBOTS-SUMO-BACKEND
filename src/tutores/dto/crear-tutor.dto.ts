import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearTutorDto {
  @ApiProperty({ example: 'Arturo Rodrigo Perez Chavez' })
  @IsNotEmpty()
  nombreCompleto: string;

  @ApiProperty({ example: '8526947' })
  @IsNotEmpty()
  carnetIdentidad: string;
}

export class RespuestaCrearTutorDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
