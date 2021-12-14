import { PeopleRepositoryInMemory } from '@modules/people/repositories/in-memory/PeopleRepositoryInMemory';

import { CreatePersonUseCase } from './CreatePersonUseCase';

let createPersonUseCase: CreatePersonUseCase;
let peopleRepositoryInMemory: PeopleRepositoryInMemory;

describe('Create a Person', () => {
  beforeEach(() => {
    peopleRepositoryInMemory = new PeopleRepositoryInMemory();
    createPersonUseCase = new CreatePersonUseCase(peopleRepositoryInMemory);
  });

  it('Should be able to create a Person', async () => {
    const person = await createPersonUseCase.execute({
      address_id: 'some-address-id',
      document_id: '000.000.000-00',
      name: 'John Doe',
      telephone: '(62) 9 9999-9999',
      email: 'johndoe@example.com',
    });

    expect(person).toHaveProperty('id');
  });
});
