import { PeopleRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleRepositoryInMemory';
import { PropertiesRepositoryInMemory } from '@modules/properties/repositories/in-memory/PropertiesRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreatePropertyUseCase } from './CreatePropertyUseCase';

let createPropertyUseCase: CreatePropertyUseCase;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let peopleRepositoryInMemory: PeopleRepositoryInMemory;

describe('Create a property', () => {
  beforeEach(() => {
    propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
    peopleRepositoryInMemory = new PeopleRepositoryInMemory();

    createPropertyUseCase = new CreatePropertyUseCase(
      propertiesRepositoryInMemory,
      peopleRepositoryInMemory
    );
  });

  it('Should be able to create a new property', async () => {
    const person = await peopleRepositoryInMemory.create({
      address_id: 'some-address-id',
      document_id: '000.000.000-00',
      name: 'John Doe',
      telephone: '(62) 9 9999-9999',
    });

    const property = await createPropertyUseCase.execute({
      address_id: 'some-address-id',
      description: 'some property',
      iptu_id: '123.4555.555.55',
      owner_id: person.id,
      registration_id: '123123123',
      registry_office: 'Some Office',
      measure_type: 'm2',
      measure_amount: 55,
    });

    expect(property).toHaveProperty('id');
    expect(property.description).toEqual('some property');
    expect(property.address_id).toEqual('some-address-id');
    expect(property.owner_id).toEqual(person.id);
  });

  it('Should not be able to create a new property with a non existing owner (person)', async () => {
    await expect(async () => {
      await createPropertyUseCase.execute({
        address_id: 'some-address-id',
        description: 'some property',
        iptu_id: '123.4555.555.55',
        owner_id: 'non-existing-person',
        registration_id: '123123123',
        registry_office: 'Some Office',
        measure_type: 'm2',
        measure_amount: 55,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
