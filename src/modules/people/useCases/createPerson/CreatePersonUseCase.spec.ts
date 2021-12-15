import { PeopleAddressRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleAddressRepositoryInMemory';
import { PeopleRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreatePersonUseCase } from './CreatePersonUseCase';

let createPersonUseCase: CreatePersonUseCase;
let peopleRepositoryInMemory: PeopleRepositoryInMemory;
let peopleAddressRepositoryInMemory: PeopleAddressRepositoryInMemory;

describe('Create a Person', () => {
  beforeEach(() => {
    peopleRepositoryInMemory = new PeopleRepositoryInMemory();
    peopleAddressRepositoryInMemory = new PeopleAddressRepositoryInMemory();
    createPersonUseCase = new CreatePersonUseCase(
      peopleRepositoryInMemory,
      peopleAddressRepositoryInMemory
    );
  });

  it('Should be able to create a Person', async () => {
    const address = await peopleAddressRepositoryInMemory.create({
      cep: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    const person = await createPersonUseCase.execute({
      address_id: address.id,
      document_id: '000.000.000-00',
      name: 'John Doe',
      telephone: '(62) 9 9999-9999',
      email: 'johndoe@example.com',
    });

    expect(person).toHaveProperty('id');
  });

  it('Should not be able to create a Person with already exists document_id', async () => {
    const address = await peopleAddressRepositoryInMemory.create({
      cep: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    await expect(async () => {
      await createPersonUseCase.execute({
        address_id: address.id,
        document_id: '000.000.000-00',
        name: 'John Doe',
        telephone: '(62) 9 9999-9999',
        email: 'johndoe@example.com',
      });

      await createPersonUseCase.execute({
        address_id: address.id,
        document_id: '000.000.000-00',
        name: 'John Doe',
        telephone: '(62) 9 9999-9999',
        email: 'johndoe@example.com',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a Person with non-existing address', async () => {
    await expect(async () => {
      await createPersonUseCase.execute({
        address_id: 'invalid-address-id',
        document_id: '000.000.000-00',
        name: 'John Doe',
        telephone: '(62) 9 9999-9999',
        email: 'johndoe@example.com',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
