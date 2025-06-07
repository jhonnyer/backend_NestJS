import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthService } from '../../application/auth.service.interface';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private authService: IAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o usuario ya existe.' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario para obtener token JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso, devuelve token JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
