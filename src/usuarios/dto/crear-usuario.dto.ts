import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../constant/role.enum';

export class CrearUsuarioDto {
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos',
    },
  )
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: Role,
    example: Role.USER,
    required: false,
    default: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role)
  rol?: Role;
}

export class RespuestaCrearUsuarioDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
