import { PeopleAddressRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleAddressRepositoryInMemory';

import { CreatePersonAddressUseCase } from './CreatePersonAddressUseCase';

let createPersonAddressUseCase: CreatePersonAddressUseCase;
let peopleAddressRepositoryInMemory: PeopleAddressRepositoryInMemory;

describe('Create a Person address', () => {
  beforeEach(() => {
    peopleAddressRepositoryInMemory = new PeopleAddressRepositoryInMemory();
    createPersonAddressUseCase = new CreatePersonAddressUseCase(
      peopleAddressRepositoryInMemory
    );
  });

  it('Should be able to create a Person address', async () => {
    const personAddress = await createPersonAddressUseCase.execute({
      postal_code: '75000000',
      city: 'Some City',
      neighborhood: 'Some neighborhood',
      state: 'GO',
      street: 'Some street',
    });

    expect(personAddress).toHaveProperty('id');
  });
});
