import { ApiProperty } from '@nestjs/swagger';

export class EquipoDetailDto {
  @ApiProperty({ example: '1', description: 'ID único del equipo' })
  id: string;

  @ApiProperty({ example: 'Los Invencibles', description: 'Nombre del equipo' })
  nombreEquipo: string;

  @ApiProperty({
    example: 'Ana Pérez, Luis Gómez, Carla Díaz',
    description: 'Nombres de los participantes concatenados',
  })
  participantes: string;

  @ApiProperty({
    example: 'Dr. Sánchez, Lic. Ramírez',
    description: 'Nombres de los tutores concatenados',
  })
  tutores: string;
}
