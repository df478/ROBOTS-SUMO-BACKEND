import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearPistaDto {
  @ApiProperty({ example: 'Pista 1' })
  @IsNotEmpty()
  nombrePista: string;
}

export class RespuestaCrearPistaDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
