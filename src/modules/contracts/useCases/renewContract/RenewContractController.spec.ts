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

const contractId = uuidV4();

describe('Renew a Contract', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.dropDatabase();
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

    /**
     * Insert all data
     */

    /**
     * insert peopleAddress and propertyAddress
     */

    const peopleAddressId = uuidV4();
    const propertiesAddressId = uuidV4();

    await Promise.all([
      connection.query(
        `INSERT INTO public.people_address
        (id, postal_code, street, state, city, neighborhood, created_at, updated_at)
        VALUES('${peopleAddressId}', '75000000','Some street','GO', 'Some City', 'Some neighborhood', now(), now())`
      ),
      connection.query(
        `INSERT INTO public.properties_address
        (id, postal_code, street, state, city, neighborhood, created_at, updated_at)
        VALUES('${propertiesAddressId}', '75000000','Some street','GO', 'Some City', 'Some neighborhood', now(), now())`
      ),
    ]);

    /**
     * insert people: customer and contractor
     */

    const customerId = uuidV4();
    const contractorId = uuidV4();

    await Promise.all([
      connection.query(
        `INSERT INTO public.people
        (id, "name", is_legal_person, document_id, telephone, email, address_id, created_at, updated_at)
        VALUES('${customerId}', 'John Doe', false, '123456', '+556299999999', null, '${peopleAddressId}', now(), now())
        `
      ),
      connection.query(
        `INSERT INTO public.people
        (id, "name", is_legal_person, document_id, telephone, email, address_id, created_at, updated_at)
        VALUES('${contractorId}', 'Jack John', false, '7891011', '+556299999999', null, '${peopleAddressId}', now(), now())
        `
      ),
    ]);

    /**
     * insert Property
     */

    const propertyId = uuidV4();

    await connection.query(
      `INSERT INTO public.properties
      (id, description, owner_id, address_id, iptu_id, registration_id, registry_office, measure_type, measure_amount, created_at, updated_at)
      VALUES('${propertyId}', 'some property', '${contractorId}', '${propertiesAddressId}','123456' ,'123.4555.555.55', 'Some Office', 'm2', 55, now(), now())
      `
    );

    /**
     * insert Contract
     */

    await connection.query(
      `INSERT INTO public.contracts
      (id, description, contractor_id, customer_id, property_id, price, start_date, end_date, registration_id, registry_office, created_at, updated_at)
      VALUES('${contractId}', 'Rent contract example', '${contractorId}', '${customerId}', '${propertyId}', 1100, now(), now() + interval '1' day, '123456', 'Some Office', now(), now())
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to renew a Contract', async () => {
    const start_date = new Date();
    const end_date = addYears(new Date(), 1);
    const price = 1200;

    const response = await request(app)
      .post(`${API_PREFIX}/contracts/${contractId}/renew`)
      .send({
        start_date,
        end_date,
        price,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const contractRenewed = response.body;

    expect(response.statusCode).toBe(200);
    expect(contractRenewed).toHaveProperty('id');
    expect(contractRenewed.new_start_date).toBe(start_date.toISOString());
    expect(contractRenewed.new_end_date).toEqual(end_date.toISOString());
    expect(contractRenewed.new_price).toEqual(price);
  });
});
