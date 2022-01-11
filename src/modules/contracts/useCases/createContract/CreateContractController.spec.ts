import { PeopleAddressRepository } from '@modules/people/infra/typeorm/repositories/PeopleAddressRepository';
import { PeopleRepository } from '@modules/people/infra/typeorm/repositories/PeopleRepository';
import { PropertiesAddressRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesAddressRepository';
import { PropertiesRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesRepository';
import { hash } from 'bcrypt';
import { addYears } from 'date-fns';
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
let propertiesAddressRepository: PropertiesAddressRepository;
let propertiesRepository: PropertiesRepository;

describe('Create a new Contract', () => {
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
    propertiesRepository = new PropertiesRepository();
    peopleAddressRepository = new PeopleAddressRepository();
    propertiesAddressRepository = new PropertiesAddressRepository();
  });

  it('Should be able to create a new Contract', async () => {
    const { id: peopleAddressId } = await peopleAddressRepository.create({
      postal_code: '75000000',
      street: 'Some street',
      state: 'GO',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
    });

    const { id: propertyAddressId } = await propertiesAddressRepository.create({
      postal_code: '75000000',
      street: 'Another street',
      state: 'GO',
      city: 'Another City',
      neighborhood: 'Another neighborhood',
    });

    const { id: contractor_id } = await peopleRepository.create({
      address_id: peopleAddressId,
      document_id: '123456',
      name: 'John Doe',
      telephone: '+556299999999',
    });

    const { id: customer_id } = await peopleRepository.create({
      address_id: peopleAddressId,
      document_id: '123456',
      name: 'Jack John',
      telephone: '+556299999998',
    });

    const { id: property_id } = await propertiesRepository.create({
      address_id: propertyAddressId,
      description: 'some property',
      iptu_id: '123.4555.555.55',
      owner_id: contractor_id,
      registration_id: '123123123',
      registry_office: 'Some Office',
      measure_type: 'm2',
      measure_amount: 55,
    });

    const start_date = new Date().toISOString();
    const end_date = addYears(new Date(), 1).toISOString();

    console.log(start_date);
    console.log(end_date);

    const response = await request(app)
      .post(`${API_PREFIX}/contracts`)
      .send({
        description: 'Rent contract example',
        customer_id,
        property_id,
        price: 1200,
        start_date: new Date(),
        end_date,
        registration_id: '123456',
        registry_office: 'Some office',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    console.log(response.body);
  });
});
