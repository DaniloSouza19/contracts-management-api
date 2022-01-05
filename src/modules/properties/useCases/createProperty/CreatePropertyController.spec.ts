import { PeopleAddressRepository } from '@modules/people/infra/typeorm/repositories/PeopleAddressRepository';
import { PeopleRepository } from '@modules/people/infra/typeorm/repositories/PeopleRepository';
import { PropertiesAddressRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesAddressRepository';
import { hash } from 'bcrypt';
import request from 'supertest';
import { createConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';

import { PersonDoesNotExistsError } from './errors/PersonDoesNotExistsError';
import { PropertyAddressDoesNotExistsError } from './errors/PropertyAddressDoesNotExistsError';

const API_PREFIX = '/api/v1';
let connection: Connection;
let token: string;
let peopleRepository: PeopleRepository;
let peopleAddressRepository: PeopleAddressRepository;
let propertiesAddressRepository: PropertiesAddressRepository;

describe('Create a new Property', () => {
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

  beforeEach(() => {
    peopleRepository = new PeopleRepository();
    peopleAddressRepository = new PeopleAddressRepository();
    propertiesAddressRepository = new PropertiesAddressRepository();
  });

  it('Should not be able to create a new Property with non-existing Owner/Person', async () => {
    const responsePropertyAddress = await request(app)
      .post(`${API_PREFIX}/properties-address`)
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

    const { id: address_id } = responsePropertyAddress.body;

    const response = await request(app)
      .post(`${API_PREFIX}/properties`)
      .send({
        description: 'Some Property',
        owner_id: uuidV4(), // non-existing owner
        address_id,
        iptu_id: '123456',
        registration_id: '123456',
        registry_office: 'Some Office',
        measure_type: 'm2',
        measure_amount: 200,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const personDoesNotExistsError = new PersonDoesNotExistsError();

    expect(response.body.message).toBe(personDoesNotExistsError.message);
    expect(response.status).toBe(personDoesNotExistsError.statusCode);
  });

  it('Should not be able to create a new Property with non-existing property address', async () => {
    const { id: address_id } = await peopleAddressRepository.create({
      postal_code: '75000000',
      street: 'Some street',
      state: 'GO',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
    });

    const { id: owner_id } = await peopleRepository.create({
      name: 'Some Person',
      document_id: '000.000.000-00',
      telephone: '62 9 9999-9999',
      email: 'someperson@example.com',
      address_id,
    });

    const response = await request(app)
      .post(`${API_PREFIX}/properties`)
      .send({
        description: 'Some Property',
        owner_id,
        address_id: uuidV4(), // non-existing property address
        iptu_id: '123456',
        registration_id: '123456',
        registry_office: 'Some Office',
        measure_type: 'm2',
        measure_amount: 200,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const propertyAddressDoesNotExistsError =
      new PropertyAddressDoesNotExistsError();

    expect(response.body.message).toBe(
      propertyAddressDoesNotExistsError.message
    );
    expect(response.status).toBe(propertyAddressDoesNotExistsError.statusCode);
  });

  it('Should be able to create a new Property', async () => {
    const { id: address_id } = await peopleAddressRepository.create({
      postal_code: '75000000',
      street: 'Some street',
      state: 'GO',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
    });

    const { id: owner_id } = await peopleRepository.create({
      name: 'Some Person',
      document_id: '000.000.000-00',
      telephone: '62 9 9999-9999',
      email: 'someperson@example.com',
      address_id,
    });

    const propertiesAddress = await propertiesAddressRepository.create({
      postal_code: '75000000',
      street: 'Some street',
      state: 'GO',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
    });

    const response = await request(app)
      .post(`${API_PREFIX}/properties`)
      .send({
        description: 'Some Property',
        owner_id,
        address_id: propertiesAddress.id,
        iptu_id: '123456',
        registration_id: '123456',
        registry_office: 'Some Office',
        measure_type: 'm2',
        measure_amount: 200,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    console.log(response.body);

    expect(response.status).toBe(201);
  });
});
