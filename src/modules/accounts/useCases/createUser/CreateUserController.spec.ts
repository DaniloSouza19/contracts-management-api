import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

import { CreateUserError } from './errors/CreateUserError';

const API_PREFIX = '/api/v1';
let connection: Connection;

describe('Create a User', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create an user', async () => {
    const response = await request(app).post(`${API_PREFIX}/users`).send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('johndoe@example.com');
  });

  it('Should not be able to create a user with an already existing email', async () => {
    const response = await request(app).post(`${API_PREFIX}/users`).send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    const createUserError = new CreateUserError();

    expect(response.statusCode).toBe(createUserError.statusCode);
    expect(response.body.message).toBe(createUserError.message);
  });
});
