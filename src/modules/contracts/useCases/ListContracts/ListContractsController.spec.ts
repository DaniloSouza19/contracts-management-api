import { ContractsRepository } from '@modules/contracts/infra/repositories/ContractsRepository';
import { PeopleAddressRepository } from '@modules/people/infra/typeorm/repositories/PeopleAddressRepository';
import { PeopleRepository } from '@modules/people/infra/typeorm/repositories/PeopleRepository';
import { PropertiesAddressRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesAddressRepository';
import { PropertiesRepository } from '@modules/properties/infra/typeorm/repositories/PropertiesRepository';
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
let propertiesAddressRepository: PropertiesAddressRepository;
let propertiesRepository: PropertiesRepository;
let contractsRepository: ContractsRepository;

describe('List all Contracts', () => {
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
    propertiesAddressRepository = new PropertiesAddressRepository();
    propertiesRepository = new PropertiesRepository();
    contractsRepository = new ContractsRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to list all Contracts', async () => {
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

    const { id: property_address_id } =
      await propertiesAddressRepository.create({
        postal_code: '75000000',
        city: 'Some City',
        neighborhood: 'Some neighborhood',
        state: 'GO',
        street: 'Some street',
      });

    const property = await propertiesRepository.create({
      address_id: property_address_id,
      description: 'some property',
      iptu_id: '123.4555.555.55',
      owner_id: person1.id,
      registration_id: '123123123',
      registry_office: 'Some Office',
      measure_type: 'm2',
      measure_amount: 55,
    });

    const contract = await contractsRepository.create({
      contractor_id: person1.id,
      description: 'Rent contract example',
      customer_id: person2.id,
      property_id: property.id,
      price: 1200,
      start_date: new Date(),
      end_date: new Date(),
      registration_id: '123456',
      registry_office: 'Some office',
    });

    const response = await request(app)
      .get(`${API_PREFIX}/contracts`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contractor_id: contract.contractor_id,
          property_id: contract.property_id,
        }),
      ])
    );
  });
});
