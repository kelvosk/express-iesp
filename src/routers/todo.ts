import express from 'express';

import Todo from '../models/Todo';
import TodoService, { TodoRequest } from '../services/TodoService';
import { asyncHandler } from '../util/Utils';

export const router = express.Router();
export const pathName = '/todo';

router.get(pathName, asyncHandler(async (req, res) => {
  const todo: Todo[] = await TodoService.findAll();
  res.json(todo)
}));

router.get(`${pathName}/:id`, asyncHandler(async (req, res) => {
  const todo = await TodoService.findById(req.params.id as string);
  res.json(todo)
}));

router.put(`${pathName}/:id`, asyncHandler(async (req, res) => {
  const todo = await TodoService.update(req.params.id as string, req.body as TodoRequest);
  res.json(todo)
}));

router.post(pathName, asyncHandler(async (req, res) => {
  const todo = await TodoService.create(req.body as TodoRequest)
  res.json(todo)
}))

export default router;
