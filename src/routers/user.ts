import express from 'express';

import User from '../models/User';
import UserService, { UserRequest } from '../services/UserService';
import { asyncHandler } from '../util/Utils';

const router = express.Router();

router.get(
  '/user',
  asyncHandler(async (req, res) => {
    const localUsers: User[] = await UserService.findAll();
    res.json(localUsers);
  })
);

router.get(
  '/user/:id',
  asyncHandler(async (req, res) => {
    const user = await UserService.findById(req.params.id as string);
    res.json(user);
  })
);

router.put(
  '/user/:id',
  asyncHandler(async (req, res) => {
    const user = await UserService.update(
      req.params.id as string,
      req.body as UserRequest
    );
    res.json(user);
  })
);

export default router;
