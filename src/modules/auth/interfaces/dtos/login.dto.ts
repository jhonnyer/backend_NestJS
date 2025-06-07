import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  @IsNotEmpty()
  password: string;
}
