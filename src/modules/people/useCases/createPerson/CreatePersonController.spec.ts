import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

import { AddressNotFound } from './errors/AddressNotFoundError';
import { DocumentIdAlreadyExistsError } from './errors/DocumentIdAlreadyExistsError';

const API_PREFIX = '/api/v1';
let connection: Connection;
let token: string;

describe('Create a Person', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `insert into users(id, name, email, password, is_admin, created_at, updated_at)
        values ('${id}', 'admin', 'admin@dgs.com.br', '${password}', true, now(), now());
      `
    );

    const responseSession = await request(app)
      .post(`${API_PREFIX}/sessions`)
      .send({
        email: 'admin@dgs.com.br',
        password: 'admin',
      });

    token = responseSession.body.token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a Person', async () => {
    const responseAddress = await request(app)
      .post(`${API_PREFIX}/people-address`)
      .send({
        postal_code: '75000000',
        street: 'Some street',
        state: 'GO',
        city: 'Some City',
        neighborhood: 'Some neighborhood',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const { id: address_id } = responseAddress.body;

    const response = await request(app)
      .post(`${API_PREFIX}/people`)
      .send({
        name: 'Some Person',
        document_id: '000.000.000-00',
        telephone: '62 9 9999-9999',
        email: 'someperson@example.com',
        address_id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('address');
    expect(response.body.name).toBe('Some Person');
    expect(response.body.document_id).toBe('000.000.000-00');
  });

  it('Should not be able to create a Person with already exists document_id', async () => {
    const responseAddress = await request(app)
      .post(`${API_PREFIX}/people-address`)
      .send({
        postal_code: '75000000',
        street: 'Some street',
        state: 'GO',
        city: 'Some City',
        neighborhood: 'Some neighborhood',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const { id: address_id } = responseAddress.body;

    const response = await request(app)
      .post(`${API_PREFIX}/people`)
      .send({
        name: 'Some Person',
        document_id: '000.000.000-00',
        telephone: '62 9 9999-9999',
        email: 'someperson@example.com',
        address_id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const documentIdAlreadyExistsError = new DocumentIdAlreadyExistsError();

    expect(response.statusCode).toBe(documentIdAlreadyExistsError.statusCode);
    expect(response.body.message).toBe(documentIdAlreadyExistsError.message);
  });

  it('Should not be able to create a Person with non-existing address', async () => {
    const response = await request(app)
      .post(`${API_PREFIX}/people`)
      .send({
        name: 'Other Person',
        document_id: '000.000.000-01',
        telephone: '62 9 9999-9998',
        email: 'otherperson@example.com',
        address_id: uuidV4(), // some random uuid (non-existing address)
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const addressNotFound = new AddressNotFound();

    expect(response.statusCode).toBe(addressNotFound.statusCode);
    expect(response.body.message).toBe(addressNotFound.message);
  });
});
