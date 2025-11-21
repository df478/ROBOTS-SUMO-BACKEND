import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearRondaDto {
  @ApiProperty({ example: 'pendiente | en_curso | finalizada' })
  @IsNotEmpty()
  estado: 'pendiente' | 'en_curso' | 'finalizada';

  @ApiProperty({
    description: 'ID de la pista (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsNotEmpty()
  @IsInt()
  pistaId: number;

  @ApiProperty({
    description: 'ID del equipo rojo (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsNotEmpty()
  @IsInt()
  equipoRojoId: number;

  @ApiProperty({
    description: 'ID del equipo azul (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsNotEmpty()
  @IsInt()
  equipoAzulId: number;
}

export class RespuestaCrearRondaDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
