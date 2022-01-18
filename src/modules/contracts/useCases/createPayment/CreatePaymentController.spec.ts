import { ContractsRepository } from '@modules/contracts/infra/repositories/ContractsRepository';
import { PeopleAddressRepository } from '@modules/people/infra/typeorm/repositories/PeopleAddressRepository';
import { PeopleRepository } from '@modules/people/infra/typeorm/repositories/PeopleRepository';
import { PropertiesAddressRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesAddressRepository';
import { PropertiesRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesRepository';
import { hash } from 'bcrypt';
import { addDays, addYears } from 'date-fns';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

const API_PREFIX = '/api/v1';

let connection: Connection;
let token: string;

let contractsRepository: ContractsRepository;
let peopleRepository: PeopleRepository;
let propertiesRepository: PropertiesRepository;
let peopleAddressRepository: PeopleAddressRepository;
let propertiesAddressRepository: PropertiesAddressRepository;

describe('Create a new Payment', () => {
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
    contractsRepository = new ContractsRepository();
    peopleRepository = new PeopleRepository();
    propertiesRepository = new PropertiesRepository();
    peopleAddressRepository = new PeopleAddressRepository();
    propertiesAddressRepository = new PropertiesAddressRepository();
  });

  it('Should be able to create a new Payment', async () => {
    const { id: address_id } = await peopleAddressRepository.create({
      postal_code: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    const { id: contractor_id } = await peopleRepository.create({
      address_id,
      document_id: '123456',
      name: 'John Doe',
      telephone: '+556299999999',
    });

    const { id: customer_id } = await peopleRepository.create({
      address_id,
      document_id: '123456',
      name: 'Jack John',
      telephone: '+556299999998',
    });

    const { id: propertyAddressId } = await propertiesAddressRepository.create({
      postal_code: '75000000',
      street: 'Another street',
      state: 'GO',
      city: 'Another City',
      neighborhood: 'Another neighborhood',
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

    const start_date = new Date();
    const end_date = addYears(new Date(), 1);

    const contract = await contractsRepository.create({
      description: 'Rent contract example',
      customer_id,
      property_id,
      price: 1200,
      contractor_id,
      start_date,
      end_date,
      registration_id: '123456',
      registry_office: 'Some office',
    });

    const response = await request(app)
      .post(`${API_PREFIX}/contracts/${contract.id}/payments`)
      .send({
        description: 'First Payment',
        due_date: addDays(new Date(), 30),
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toHaveProperty('id');
    expect(response.statusCode).toBe(201);
    expect(response.body.description).toBe('First Payment');
    expect(Number(response.body.value)).toEqual(1200);
  });
});
