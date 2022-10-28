import bcrypt from 'bcrypt';

import { AppError } from '../middlewares/errors';
import User from '../models/User';

export interface UserRequest {
  userName: string;
  name: string;
  active?: boolean;
  password: string;
}

const SALT = process.env.PASSWORD_SALT ?? 10;

class UserService {
  async findById(id?: string | number | undefined): Promise<User> {
    if (!id) {
      throw new AppError({ customMessage: 'Id required', status: 404 });
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new AppError({ customMessage: 'User not found', status: 404 });
    }
    return user;
  }

  findAll(): Promise<User[]> {
    return User.findAll({
      attributes: {
        exclude: ['active', 'password'],
      },
    });
  }

  async update(id: number | string, userRequest: UserRequest): Promise<User> {
    const user = await this.findById(id);
    return user.update(userRequest);
  }

  async create(userRequest: UserRequest): Promise<User> {
    const { password } = userRequest;
    const user = await User.count({
      where: { userName: userRequest.userName },
    });

    if (user) {
      throw new AppError({
        customMessage: 'Already registered user',
        status: 400,
      });
    }

    try {
      const hash = await bcrypt.hash(password, parseInt(SALT.toString(), 10));

      return User.create({
        ...userRequest,
        password: hash,
        active: true,
      });
    } catch (e) {
      throw new AppError({
        customMessage: 'Bcrypt error',
        status: 400,
      });
    }
  }
}

export default new UserService();
