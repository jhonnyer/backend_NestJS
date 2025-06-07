import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña (mínimo 6 caracteres)', example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Juan Pérez' })
  @IsNotEmpty()
  fullName: string;
}
