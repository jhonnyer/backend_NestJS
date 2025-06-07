import { LoginDto } from "../interfaces/dtos/login.dto";
import { RegisterDto } from "../interfaces/dtos/register.dto";
import { User } from "../domain/user.schema";

export interface IAuthService {
  register(dto: RegisterDto): Promise<User>;
  login(dto: LoginDto): Promise<{
    accessToken: string;
    user: { id: string; email: string; fullName: string };
  }>;
}
