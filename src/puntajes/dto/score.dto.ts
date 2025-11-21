
import { ApiProperty } from '@nestjs/swagger';

export class ScoreDto {
  @ApiProperty({ example: '1', description: 'ID único del participante' })
  id: string;

  @ApiProperty({ example: 'Arturo Pérez', description: 'Nombre completo del participante' })
  participante: string;

  @ApiProperty({ example: 150, description: 'Puntaje acumulado del participante' })
  puntaje: number;

  @ApiProperty({ example: 'La Paz', description: 'Departamento del participante' })
  departamento: string;

  @ApiProperty({ example: 'Murillo', description: 'Provincia del participante' })
  provincia: string;

  @ApiProperty({ example: 'Achocalla', description: 'Municipio del participante' })
  municipio: string;
}
