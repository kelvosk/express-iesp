import express, { Request, Response } from 'express';

import authService from '../services/AuthService';
import userService, { UserRequest } from '../services/UserService';
import { asyncHandler } from '../util/Utils';

const router = express.Router();

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { password, userName } = req.body;
    const token = await authService.login(userName, password);
    res.json({ token });
  })
);

router.post(
  '/sign-up',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.create(req.body as UserRequest);
    const token = authService.createJWT(user);
    res.json({ token });
  })
);

export default router;
