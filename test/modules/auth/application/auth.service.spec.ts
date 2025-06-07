import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/auth/application/auth.service';
import { IUserRepository } from 'src/modules/auth/domain/user.repository.interface';
import { RegisterDto } from 'src/modules/auth/interfaces/dtos/register.dto';
import { User } from 'src/modules/auth/domain/user.schema';
import { Types } from 'mongoose';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<IUserRepository>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get('IUserRepository');
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user if email not taken', async () => {
      const dto: RegisterDto = {
        fullName: 'Juan Pérez',
        email: 'juan@example.com',
        password: '123456',
      };

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.save.mockImplementation(async (user: User) => ({
        ...user,
        _id: new Types.ObjectId(),
        }));


      const result = await authService.register(dto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('email', dto.email);
    });
  });
});
