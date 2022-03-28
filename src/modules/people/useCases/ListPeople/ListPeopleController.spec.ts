import { PeopleAddressRepository } from '@modules/people/infra/typeorm/repositories/PeopleAddressRepository';
import { PeopleRepository } from '@modules/people/infra/typeorm/repositories/PeopleRepository';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

const API_PREFIX = '/api/v1';
let connection: Connection;
let token: string;

let peopleRepository: PeopleRepository;
let peopleAddressRepository: PeopleAddressRepository;

describe('List all People', () => {
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

    peopleRepository = new PeopleRepository();

    peopleAddressRepository = new PeopleAddressRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list all People', async () => {
    // Input values
    const address = await peopleAddressRepository.create({
      postal_code: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    const person1 = await peopleRepository.create({
      address_id: address.id,
      document_id: '000.000.000-00',
      name: 'John Doe',
      telephone: '(62) 9 9999-9999',
      email: 'johndoe@example.com',
    });

    await peopleAddressRepository.create({
      postal_code: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    const person2 = await peopleRepository.create({
      address_id: address.id,
      document_id: '000.000.000-00',
      name: 'John Doe',
      telephone: '(62) 9 9999-9999',
      email: 'johndoe@example.com',
    });

    const response = await request(app)
      .get(`${API_PREFIX}/people`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: person1.id,
          document_id: person1.document_id,
          name: person1.name,
          telephone: person2.telephone,
          email: person1.email,
        }),
        expect.objectContaining({
          id: person2.id,
          document_id: person2.document_id,
          name: person2.name,
          telephone: person2.telephone,
          email: person2.email,
        }),
      ])
    );
  });
});
