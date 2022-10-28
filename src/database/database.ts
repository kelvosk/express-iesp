import { Sequelize } from 'sequelize-typescript';
import Todo from '../models/Todo';

import UserModel from '../models/User';

const databaseName = process.env.APP_DATABASE_NAME ?? 'iesp';
const storage = process.env.APP_STORAGE_PATH ?? './iesp-database.sqlite';

const database = new Sequelize({
  database: databaseName,
  dialect: 'sqlite',
  storage: process.env.NODE_ENV !== 'test' ? storage : undefined, // Não cria o arquivo do banco sqlite para os casos de test
  models: [UserModel, Todo],
});

export default database;
