import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './infraestructure/jwt.strategy';
import { User, UserSchema } from 'src/modules/auth/domain/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './application/auth.service';
import { UserRepository } from './infraestructure/user.repository';
import { AuthController } from './interfaces/controllers/auth.controller';

@Module({
  imports: [
    ConfigModule, // Importar si no es global, aunque tú ya lo tienes global (no hace daño)
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
      {
        provide: 'IAuthService',
        useClass: AuthService,
      }, 
      {
        provide: 'IUserRepository',
        useClass: UserRepository,
      },
      JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
