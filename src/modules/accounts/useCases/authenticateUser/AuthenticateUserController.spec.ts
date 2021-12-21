import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Authenticate User', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, created_at, updated_at, is_admin)
          VALUES ('${id}','admin', 'admin@dgs.com.br','${password}', now(), now(), true)`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to authenticate user', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'admin@dgs.com.br',
      password: 'admin',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
