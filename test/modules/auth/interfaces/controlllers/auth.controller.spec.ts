import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from 'src/modules/auth/application/auth.service.interface';
import { AuthController } from 'src/modules/auth/interfaces/controllers/auth.controller';
import { LoginDto } from 'src/modules/auth/interfaces/dtos/login.dto';
import { RegisterDto } from 'src/modules/auth/interfaces/dtos/register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<IAuthService>;

  beforeEach(async () => {
    authService = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'IAuthService',
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('debe llamar a authService.register con los datos correctos y devolver resultado', async () => {
      const dto: RegisterDto = { /* aquí pones los campos necesarios del DTO */ } as RegisterDto;
      const expectedResult = { message: 'Usuario registrado' };

      (authService.register as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.register(dto);
      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('login', () => {
    it('debe llamar a authService.login con los datos correctos y devolver resultado', async () => {
      const dto: LoginDto = { /* campos necesarios del DTO */ } as LoginDto;
      const expectedResult = { token: 'jwt-token' };

      (authService.login as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.login(dto);
      expect(authService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
