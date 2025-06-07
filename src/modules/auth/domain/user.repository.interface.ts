import { User } from './user.schema';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
