import { IsEmail, IsEnum, IsOptional, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../constant/role.enum';

export class ActualizarUsuarioDto {
    @ApiProperty({ example: 'user123' })
    @IsOptional()
    username?: string;
  
    @ApiProperty({ example: 'example@gmail.com' })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    @IsOptional()
    email?: string;
  
    @ApiProperty({ example: 'P@ssw0rd' })
    @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }, {
      message: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos',
    })
    @IsOptional()
    password?: string;
  
    @ApiProperty({ enum: Role, example: Role.USER })
    @IsOptional()
    @IsEnum(Role)
    rol?: Role;
}
