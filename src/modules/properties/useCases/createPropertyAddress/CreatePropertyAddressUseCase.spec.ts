import { PropertiesAddressRepositoryInMemory } from '@modules/properties/repositories/in-memory/PropertiesAddressRepositoryInMemory';

import { CreatePropertyAddressUseCase } from './CreatePropertyAddressUseCase';

let createPropertyAddressUseCase: CreatePropertyAddressUseCase;
let propertiesAddressRepositoryInMemory: PropertiesAddressRepositoryInMemory;

describe('Create a Property address', () => {
  beforeEach(() => {
    propertiesAddressRepositoryInMemory =
      new PropertiesAddressRepositoryInMemory();
    createPropertyAddressUseCase = new CreatePropertyAddressUseCase(
      propertiesAddressRepositoryInMemory
    );
  });

  it('Should be able to create a Property address', async () => {
    const propertyAddress = await createPropertyAddressUseCase.execute({
      postal_code: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    expect(propertyAddress).toHaveProperty('id');
  });
});
