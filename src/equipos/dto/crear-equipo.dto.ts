import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearEquipoDto {
  @ApiProperty({ example: 'Equipo 1' })
  @IsNotEmpty()
  nombreEquipo: string;
}

export class RespuestaCrearEquipoDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
