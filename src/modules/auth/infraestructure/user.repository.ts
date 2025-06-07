import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository.interface';
import { User, UserDocument } from '../domain/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async save(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
