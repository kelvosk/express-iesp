import express, { NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import AuthService from '../services/AuthService';

export const middleware = express.Router();

middleware.use((req, res, next: NextFunction) => {
  const authorization = req.headers['authorization']; // bearer eyJhbGciOiJIUzI1Ni.....
  if (authorization) {
    const [tokenType, token] = authorization.split(' ');

    if (tokenType === 'bearer') {
      const payload: JwtPayload = AuthService.validate(token);
      if (payload) {
        next();
        return;
      }
    }
  }
  res.status(400).json({ message: 'invalid token' });
});

export default middleware;
