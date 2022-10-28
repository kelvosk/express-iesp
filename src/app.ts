import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import database from './database/database';
import authorizationMiddleware from './middlewares/authorization';
import { errorLogHandle, errorResponseHandle } from './middlewares/errors';
import authRouter from './routers/auth';
import todoRouter from './routers/todo';
import userRouter from './routers/user';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(authRouter);
app.use(authorizationMiddleware);
app.use(todoRouter);
app.use(userRouter);

app.use(errorLogHandle);
app.use(errorResponseHandle);

app.listen(process.env.PORT, async () => {
  await database.sync({force: true});
  console.log(`Servidor rodando: http://localhost:${process.env.PORT}`);
});

export default app;
