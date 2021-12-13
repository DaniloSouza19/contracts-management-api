import 'reflect-metadata';
import express from 'express';

import '@shared/container';
import createConnection from '../typeorm';
import { routes } from './routes';

const app = express();

createConnection();

const APP_PORT = 3333;

app.use(express.json());

app.use(routes);

app.listen(
  APP_PORT,
  () => -console.log(`Server started on port:${APP_PORT} 🚀`)
);
