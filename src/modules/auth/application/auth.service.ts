import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/auth/domain/user.schema';
import { IAuthService } from './auth.service.interface';
import { IUserRepository } from '../domain/user.repository.interface';
import { RegisterDto } from '../interfaces/dtos/register.dto';
import { LoginDto } from '../interfaces/dtos/login.dto';

@Injectable()
export class AuthService implements IAuthService{
  
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = {
      ...dto,
      password: hashedPassword,
    } as User;
    return this.userRepository.save(user);
  }
  
  async login(dto: LoginDto) :Promise<{accessToken: string; user: { id: string; email: string; fullName: string };}>  {
    
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: { id: user._id.toString(), email: user.email, fullName: user.fullName },
    };
  }
}
