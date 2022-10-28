import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppError } from '../middlewares/errors';
import User from '../models/User';

interface JWTPayload {
  id: number;
  userName: string;
}

class AuthService {
  private secret = process.env.JWT_SECRET ?? 'dev-secret';

  createJWT(user: User): string {
    const payload: JWTPayload = {
      id: user.id,
      userName: user.userName,
    };
    return jwt.sign(payload, this.secret);
  }

  async login(userName: string, password: string): Promise<string> {
    const user: User | null = await User.findOne({
      where: {
        userName,
      },
    });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return this.createJWT(user);
      }
      throw new AppError({
        customMessage: 'Invalid user or password',
        status: 400,
      });
    }
    throw new AppError({ customMessage: 'User not found', status: 400 });
  }

  validate(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (e) {
      throw new AppError({ customMessage: 'Invalid JWT', status: 401 });
    }
  }
}

export default new AuthService();
