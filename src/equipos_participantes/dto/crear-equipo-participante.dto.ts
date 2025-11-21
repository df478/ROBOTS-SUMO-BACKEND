import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearEquipoParticipanteDto {
  @ApiProperty({
    description: 'ID del equipo (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsNotEmpty()
  @IsInt()
  equipoId: number;

  @ApiProperty({
    description: 'ID del participante (foreign key)',
    type: Number,
    format: 'int64',
    example: '1',
  })
  @IsNotEmpty()
  @IsInt()
  participanteId: number;
}

export class RespuestaCrearEquipoParticipanteDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
