import 'reflect-metadata';
import 'dotenv';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';

import swaggerDocument from '../../../../docs/swagger.json';
import createConnection from '../typeorm';
import { routes } from './routes';

const app = express();

createConnection();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  })
);

app.use('/api/v1', routes);

/**
 * Swagger-Ui middleware documentation route
 */
app.use('/api/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Celebrate middleware
 */
app.use(errors());

/**
 * Async Errors handler middleware
 */
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
);

export { app };
